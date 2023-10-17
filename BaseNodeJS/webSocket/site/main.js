import { io } from 'socket.io-client';

// 建立连接
const socket = io('http://localhost:3000');

socket.on('connect', () => {
	console.log('连接成功', socket.id);
})

socket.on('disconnect', () => {
	console.log('取消连接', socket.id);
})

socket.on('chat message', (msg) => {
	console.log('成功发送信息:', msg);
})

// 通过按钮发送消息
const btn = document.getElementById('btn-1')
btn.addEventListener('click', () => {
	socket.emit('chat msg', '发送的信息')
})