const { Server } = require("socket.io");

const io = new Server(3000, { // 库简化的方式, 实际上也是创建了一个 http 服务, 再次基础上才能创建 socket 服务
	cors: { //处理跨域问题
		origin: "http://localhost:8080",
		methods: ["GET", "POST"]
	}
});


/*
	每个客户端的 Socket 连接都会触发 connection 事件
	一旦某个客户端与服务端连接后, 服务端就会创建一个 sockety 实例, 专门对接这个客户端
	socket.id 用来表示客户端的唯一标识
*/

io.on("connection", (socket) => { // 🔥 io 就是总控, socket 是每个在 服务端 产生的实例
	console.log('a user connected');

	socket.on('server chat message', (msg) => { // 🔥🔥 server chat message 是绑定在服务器上的 socket 实例的方法
		console.log('收到消息:', + msg);

		io.emit('chat message', { message: meg, id: socket.id });
		// socket.broadcast.emit();
	})

	socket.on('disconnect', () => {
		console.log('user disconnected');
	})
})