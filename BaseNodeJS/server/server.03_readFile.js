const http = require('http')
const url = require('url')
const fs = require('fs')

/* 
	常见的文本格式数据
		txt text/plain

	常见的响应文件格式
		html text/html
		css text/css
		js application/javascript
		json application/json
		pdf application/pdf
	
	常见的表单数据
		application/x-www-form-urlencoded
		multipart/form-data

	常见的多媒体格式数据
		jpg image/jpeg
		png image/png
		gif image/gif
		ico image/x-icon
		video/mp4
		audio/mp3
 */


const server = http.createServer((req, res)=>{
	let handled = false; // 标志，用于检测是否已处理了请求, 有则不返回兜底页
	const { pathname } = url.parse(req.url, true) // 把 req.url 抽象出来


	// 排除 /favicon.ico 请求, 否则会打印两次
	if (pathname === '/favicon.ico') { 
		res.writeHead(200, { 'Content-Type': 'image/x-icon' });
		handled = true;
		// res.end();
		// return;
	}
	

	// getFile 返回读取文件的请求 => 如果是同步 readFileSync 读取文件的话记得用 try catch 套一层, 放置出错
	if(pathname === '/getFile') {
		// try{
			fs.readFile('someNote.txt', 'utf8', (err, data)=>{ // 经常用 readFile 异步读取
				if(err) { // 错误优先！
					res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
					res.end('❌ Server Error');
				} else {
					res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
					// console.log(data)
					res.end(data); // 异步读取文件, 然后返回文件内容, 这样不会阻塞进程！
				}
			})
		// } catch(err) {
			// console.log(err)
		// }
		handled = true;
	}


	// 读取 html 文件
	if(pathname === '/getHtml') {
		fs.readFile('index.html', (err, data) => {
			if(err) {
				res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }); //有字符串的建议都加上 charset=utf-8'
				res.end('❌ Server Error');
			} else {
				res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Access-Control-Allow-Origin': "*" }); // 👈注意头部要设置成 html ！
				// console.log(data);
				res.end(data)
			}
		})
		handled = true;
	}


	// 读取 json 文件
	if(req.url === '/getJson') {
		fs.readFile('test.json', (err, data) => {
			if(err) {
				res.writeHead(500, { 'Content-Type': 'applecation/json; charset=utf-8' }); //有字符串的建议都加上 charset=utf-8'
				res.end('❌ Server Error');
			} else {
				res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Access-Control-Allow-Origin': "*" }); // 👈注意头部要设置成 html ！
				// console.log(data);
				res.end(data)
			}
		})
		handled = true;
	}


	// 读取 image 文件
	if(req.url === '/getImg') {
		fs.readFile('apple.jpeg', (err, data) => {
			if(err) {
				res.writeHead(500, { 'Content-Type': 'image/jpeg; charset=utf-8' }); //有字符串的建议都加上 charset=utf-8'
				res.end('❌ Server Error');
			} else {
				res.writeHead(200, { 'Content-Type': 'image/jpeg; charset=utf-8', 'Access-Control-Allow-Origin': "*" }); // 👈注意头部要设置成 html ！
				// console.log(data);
				res.end(data)
			}
		})
		handled = true;
	}


	// 读取 image 文件 (🌟 转为 base64 格式的文件进行传输！)
	if(req.url === '/getBase64') {
		fs.readFile('apple.jpeg', (err, data) => {
			if(err) {
				res.writeHead(500, { 'Content-Type': 'image/jpeg; charset=utf-8' }); //有字符串的建议都加上 charset=utf-8'
				res.end('❌ Server Error');
			} else {
				const base64Image = data.toString('base64') // (🌟 转为 base64 格式的文件进行传输！)
				res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': "*" }); // 👈注意头部要设置成 html ！
				res.end(base64Image)
			}
		})
		handled = true; 
	}


	// 🌟设置默认兜底页 【先做这一步】
	if (!handled) {
		res.writeHead(200, 'Success~OK', { 'Content-Type': 'text/plain; charset=utf-8' });	
		res.end("👋 欢迎登录服务器")
	}

})


server.on('error', (err)=>{
	console.log(err);
})


server.listen(8899, ()=>{
	console.log('server running at http://127.0.0.1:8899');
})