// 수정: Node.js 실시간 채팅 서버 예제

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send(`
    <html>
    <body>
      <h2>실시간 최윤호 3번째 채팅 서버 구현</h2>

      <input id="msg" />
      <button onclick="sendMsg()">전송</button>

      <ul id="messages"></ul>

      <script src="/socket.io/socket.io.js"></script>

      <script>
        const socket = io();

        socket.on('chat message', (msg) => {
          const li = document.createElement('li');
          li.innerText = msg;
          document.getElementById('messages').appendChild(li);
        });

        function sendMsg() {
          const input = document.getElementById('msg');
          socket.emit('chat message', input.value);
          input.value = '';
        }
      </script>
    </body>
    </html>
  `);
});

io.on('connection', (socket) => {
  console.log('접속됨');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('http://localhost:3000');
});