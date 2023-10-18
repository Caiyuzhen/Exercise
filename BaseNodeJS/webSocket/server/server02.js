const { Server } = require("socket.io");

// npm install server.io
const io = new Server(3000, { // 🔥 socket.io 库简化了的方式, 实际上也是创建了一个 http 服务, 再次基础上才能创建 socket 服务
	cors: { //处理跨域问题
		origin: "http://127.0.0.1:8081",
		methods: ["GET", "POST"]
	}
});




/*
	每个客户端的 Socket 连接都会触发 connection 事件
	一旦某个客户端与服务端连接后, 服务端就会创建一个 sockety 实例, 专门对接这个客户端
	socket.id 用来表示客户端的唯一标识
*/



// 👇一个浏览器 Tab 页就算做一个客户端, 对应的就会创建各自的服务端 serverSocket
io.on("connection", (ServerSocket) => { // 🔥 io 就是总控, socket 是每个在 服务端 产生的实例
	console.log('一个用户连接到服务端的 Socket, id 为:', ServerSocket.id);


	// 🔥🔥 【broadcast chat】 绑定在服务器上的 socket 实例的(名字可以自定义), 客户端可以通过 broadcast chat 进行触发 !!
	ServerSocket.on('broadcast chat', (msg) => { 
		console.log('收到消息:', msg);

		// 👇 触发【总控】来【🔥广播给所有 Socket 然后发送给所有客户端】, 然后会向服务器上所有的 ServerSocket 的实例发送消息, 来执行 server chat message 的回调 => 【客户端将会收到回调】clientSocket.on('chat message', (msg) => {...}）
		// io.emit('chat message', { 
		// 	message: msg, id: ServerSocket.id 
		// });


		// socket.broadcast.emit();

		 // 使用 emit 方法将消息发送给【🔥对应触发事件的客户端】
		 ServerSocket.emit('chat message', { 
			message: '👋 你好, 这里是服务端', id: ServerSocket.id 
		});
	})

	// 收到 disconnect 后则会关闭连接
	ServerSocket.on('disconnect', () => {
		console.log('user disconnected');
	})
})