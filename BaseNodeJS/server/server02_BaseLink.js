const http = require('http')
const url = require('url')
const fs = require('fs')


// 创建服务
const server = http.createServer((req, res)=>{
	/* ⚡️ req 内的数据
			req.url     获得请求 url 的协议、主机名、端口号、路径名、查询字符串等信息
			req.method  获得请求方法
			req.socket  获得请求 socket, 与客户端连接的套接字对象
			req.httpVersion  获得请求的 http 版本
			req.headers 获得请求头
			req.rawHeaders 获得请求头部数组
			req.connection 获得当前连接的状态
			req.setTimeout(msecs, callback) 设置请求超时的回调函数
	 */

	// 排除 /favicon.ico 请求, 否则会打印两次
	if (req.url === '/favicon.ico') { 
		res.writeHead(200, { 'Content-Type': 'image/x-icon' });
		res.end();
		return;
	}

	  
	// 🔥打印用户在 url 地址栏内输入的信息
	console.log(req.url) // 比如 http://127.0.0.1:8888/?a=123 可以获得 a=123
	console.log(url.parse(req.url, true)) // 通过 url.parse() 方法可以将 url 转换成对象
	
	// 🔥获得 query 的数据
	const query = url.parse(req.url, true).query
	console.log('获得的查询参数：', query)
	// 打印参数
	console.log('a = ', query.a)

	// 🔥设置响应头跟相应数据
	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})// Content-Type 用来识别【响应体】的数据类型
	// res.setHeader('Content-Type', 'text/plain; charset=utf-8') // 一个设置头信息，而不是统一设置
	// res.removeHeader('Content-Type') // 移除响应头
	res.write('新写入的数据 -A',) // 写入数据 -> 写入数据后就不能再设置请求头了！
	res.write('新写入的数据 -B') // 写入数据
	res.end('你好👋') // end 执行后才会发送数据, end 后就不能再处理头文件了, 否则会报错
})


// 通过 on 绑定事件, 比如 🔥处理错误事件!!如果不处理就让宕机！ 要放在监听端口前面!!
server.on('error', (err)=>{
	console.log(err) 
})

server.on('connection', (socket)=>{ // 建立连接后触发

})


// 监听端口
server.listen(8888, ()=>{
	// 执行回调, 可以在这时机做一些事
	console.log('server is running at http://127.0.0.1:8888')
})

