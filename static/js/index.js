var socket = io()

// 접속 되었을 때 실행
socket.on('connect', function() { // on :  수신
  // 이름 입력
  var name = prompt('반갑습니다', '')

  // 이름이 빈칸인 경우
  if(!name) {
    name = '익명'
  }

  // 서버에 새로운 유저가 왔다고 알림
  socket.emit('newUser', name)
})

socket.on('update', function(data) {
  var chat = document.getElementById('chat')

  var message = document.createElement('div')
  var node = document.createTextNode(`${data.name}: ${data.message}`)
  var className = ''

  switch(data.type) {
    case 'message':
      className = 'other'
      break

    case 'connect':
      className = 'connect'
      break

    case 'disconnect':
      className = 'disconnect'
      break
  }

  message.classList.add(className)
  message.appendChild(node)
  chat.appendChild(message)

})

// 전송 함수
function send() { // 버튼 클릭했을 때
  // 입력되어있는 데이터 가져오기
  var message = document.getElementById('test').value

  // 데이터 빈칸으로 변경
  document.getElementById('test').value = ''

  var chat = document.getElementById('chat')
  var msg = document.createElement('div')
  var node = document.createTextNode(message)
  msg.classList.add('me')
  msg.appendChild(node)
  chat.appendChild(msg)

  // 서버로 send 이벤트, 데이터 전달
  socket.emit('message', {type: 'message', message: message}) // emit : 전송
}