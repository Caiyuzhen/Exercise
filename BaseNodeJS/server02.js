const http = require('http')


// 创建服务
const server = http.createServer((req, res)=>{
	// 响应头跟相应数据
	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
	res.write('新写入的数据 -A') // 写入数据
	res.setHeader('Content-Type', 'text/plain; charset=utf-8') // 一个设置头信息，而不是统一设置
	res.removeHeader('Content-Type') // 移除响应头
	res.write('新写入的数据 -B') // 写入数据
	res.end('你好👋') // end 执行后才会发送数据
})

// 通过 on 绑定事件, 比如 🔥处理错误事件!!如果不处理就让宕机！ 要放在监听端口前面!!
server.on('error', (err)=>{
	console.log(err)
})


// 监听端口
server.listen(8888, ()=>{
	// 执行回调, 可以在这时机做一些事
	console.log('server is running at http://127.0.0.1:8888')
})

