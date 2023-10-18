const { Server } = require("socket.io");

// npm install server.io
const io = new Server(3000, { // 🔥 socket.io 库简化了的方式, 实际上也是创建了一个 http 服务, 再次基础上才能创建 socket 服务
	cors: { //处理跨域问题
		origin: "http://localhost:8081/BaseNodeJS/webSocket/site/",
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
	console.log('a user connected', ServerSocket.id);

	// 🔥🔥 server chat message 是绑定在服务器上的 socket 实例的方法, 客户端可以通过 server chat message 进行触发 !!
	ServerSocket.on('server chat message', (msg) => { 
		console.log('收到消息:', + msg);

		// 👇 总控触发, 会向服务器上所有的 ServerSocket 的实例发送消息, 来执行 server chat message 的回调
		io.emit('chat message', { 
			message: msg, id: ServerSocket.id 
		});
		// socket.broadcast.emit();
	})

	// 收到 disconnect 后则会关闭连接
	ServerSocket.on('disconnect', () => {
		console.log('user disconnected');
	})
})