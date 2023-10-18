// import { io } from 'socket.io-client';

// npm install socket.io-client

// 建立连接
const clientSocket = io('http://localhost:3000');
console.log('客户端');

clientSocket.on('connect', () => { // 🌟 connect 为自带的事件
	console.log('连接成功, 客户端的 socket id 为:', clientSocket.id);
})

clientSocket.on('disconnect', () => { // 🌟 disconnect 为自带的事件
	console.log('取消连接, 客户端的 socket id 为:', clientSocket.id);
})

// 客户端通过 broadcast chat 事件触发服务端的总控 => 触发每个子 Socket 的 chat message 事件 => 触发客户端的 chat message 事件
clientSocket.on('chat message', (msg) => { // 🔥 设置自定义的事件, 如果服务器触发了 chat message 命令后便会执行这里的回调
	console.log('成功发送信息:', msg);
	const h4 = document.createElement('h4');
	h4.innerText = msg.message;
	document.body.appendChild(h4);
})


// 通过按钮给服务器端的 socket 发送消息
const btn = document.getElementById('btn-1')
btn.addEventListener('click', () => {
	clientSocket.emit('broadcast chat', '😄 你好, 这里是客户端') // 👈 如果服务端注册了 server chat message 事件的话, 就会执行 server chat msg 的回调
})