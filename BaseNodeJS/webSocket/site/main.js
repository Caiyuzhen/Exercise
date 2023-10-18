import { io } from 'socket.io-client';
// npm install server.io-client

// 建立连接
const clientSocket = io('http://localhost:3000');


clientSocket.on('connect', () => { // 🌟 connect 为自带的事件
	console.log('连接成功, 客户端的 socket id 为:', clientSocket.id);
})

clientSocket.on('disconnect', () => { // 🌟 disconnect 为自带的事件
	console.log('取消连接, 客户端的 socket id 为:', clientSocket.id);
})

clientSocket.on('chat message', (msg) => { // 🔥 设置自定义的事件, 如果服务器触发了 chat message 命令后便会执行这里的回调
	console.log('成功发送信息:', msg);
})

// 通过按钮给服务器端的 socket 发送消息
const btn = document.getElementById('btn-1')
btn.addEventListener('click', () => {
	clientSocket.emit('server chat message', '发送的具体信息') // 👈 如果服务端注册了 server chat message 事件的话, 就会执行 server chat msg 的回调
})