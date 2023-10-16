const http = require('http')
const url = require('url')
const fs = require('fs')
const queryString = require('querystring')



// encoding 可以设置文件的编码方式, 文字才需要设置！！ 视频跟图片不需要设置（默认处理成二进制的数据就行了）
// 写入数据一般不需要设置编码方式, 读取一般也不需要
const server = http.createServer((req, res) => {
	// fs.readFile('someNote.txt', { encoding: 'utf8' }, (err, data) => {
	// 	if(err) {
	// 		console.log(err);
	// 		return;
	// 	} else {
	// 		console.log(data);
	// 		fs.writeFile('lalalal', data, (err) => {
	
	// 		})
	// 	}
	// })

	// 👇解析出路由的内容
	const { pathname, query } = url.parse(req.url, true); 
	console.log(query);


	// 🌟 处理简单 get 请求, 通过 url 携带参数
	if(pathname === '/sendQuery') {
		res.writeHead(200, { 
			'Content-Type': 'text/html; charset=utf-8', 
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type', 
		}); 
		console.log(req.url, '获得了浏览器发来的 Get 请求');
		res.end('🌞 Get Success!') // 请求都要有响应, 不然浏览器会一直等待
	}


	// 🌟 处理简单 Post 请求, 通过 请求体 携带参数 -> ⚠️ 原生 Node 的话就需要对请求做拼接 !!!
	if(pathname === '/sendPost') {
		const data = [];
		req.on('data', (chunk) => { // 每次接收到数据就会触发, 然后把数据 push 到 data 内, 这个数据已经被处理成为 buffer 的状态了 !!
			data.push(chunk);
		})

		req.on('end', () => { // ⚠️ 数据接收完便会触发, 然后就可以开始拼接数据！！
			res.writeHead(200, { 
				'Content-Type': 'text/html; charset=utf-8', 
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type', 
			}); 
			const body = Buffer.concat(data).toString(); // 🔥  Buffer.concat 会把 buffer 数据拼接成一个完整的 buffer 数据, 然后再转成字符串
			console.log(body, 'post 请求的数据');
			const obj = queryString.parse(body); // 🔥 变成 { name: XX, age: XX } 的对象
			console.log(obj, 'post 请求的数据转为 obj 对象');
			console.log(req.url, '获得了浏览器发来的 Post 请求');
			res.end('🌛 Post2 Success!') // 请求都要有响应, 不然浏览器会一直等待
		})
	}


	if(pathname === '/sendPostWithJson') {
		const data = [];
		req.on('data', (chunk) => { // 每次接收到数据就会触发, 然后把数据 push 到 data 内, 这个数据已经被处理成为 buffer 的状态了 !!
			data.push(chunk);
		})

		req.on('end', () => { // ⚠️ 数据接收完便会触发, 然后就可以开始拼接数据！！
			res.writeHead(200, { 
				'Content-Type': 'text/html; charset=utf-8', 
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type', 
			}); 
			const body = Buffer.concat(data).toString(); // 🔥  Buffer.concat 会把 buffer 数据拼接成一个完整的 buffer 数据, 然后再转成字符串
			console.log(body, 'post 请求的数据');
			const obj = JSON.parse(body); // 🔥 变成 { name: XX, age: XX } 的对象
			console.log(obj, 'post 请求的数据转为 obj 对象');
			console.log(req.url, '获得了浏览器发来的 Post 请求');
			res.end('🌛 Post3 Success!') // 请求都要有响应, 不然浏览器会一直等待
		})
	}
	



	if(pathname === '/sendPNGFileData') {
		const data = [];
		req.on('data', (chunk) => { // 每次接收到数据就会触发, 然后把数据 push 到 data 内, 这个数据已经被处理成为 buffer 的状态了 !!
			data.push(chunk);
		})

		req.on('end', () => { // ⚠️ 数据接收完便会触发, 然后就可以开始拼接数据！！
			res.writeHead(200, { 
				'Content-Type': 'text/html; charset=utf-8', 
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type', 
			}); 

			const body = Buffer.concat(data); // 处理 png 格式的数据就保持 【二进制】 而不用转为字符串
			fs.writeFile('test.png', body, (err) => {// 🔥🔥把图片的二进制数据保存在硬盘上！
				if(err) {
					console.log(err);
					return;
				} else {
					console.log('图片保存成功');
				}
			});

			console.log(req.url, '获得了浏览器发来的 Post 请求');
			res.end('🌛 Post3 Success!') // 请求都要有响应, 不然浏览器会一直等待
		})
	}
})


server.on('error', (err)=>{
	console.log(err);
})


server.listen(8899, ()=>{
	console.log('server running at http://127.0.0.1:8899');
})