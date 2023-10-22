const http = require('http')
const url = require('url')
const fs = require('fs')
const queryString = require('querystring')
const { formidable, errors: formidableErrors } = require('formidable') // npm i formidable 安装表单处理工具



// encoding 可以设置文件的编码方式, 文字才需要设置！！ 视频跟图片不需要设置（默认处理成二进制的数据就行了）
// 写入数据一般不需要设置编码方式, 读取一般也不需要
const server = http.createServer(async (req, res) => {
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


	// 🌟 处理简单 get 请求, 通过 url 携带参数 ——————————————————————————————————————————————————
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


	// 🌟 处理简单 Post 请求, 通过 请求体 携带参数 -> ⚠️ 原生 Node 的话就需要对请求做拼接 !!! ——————————————————————————————————————————————————
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


	// 🌟 处理 JSON 请求 ——————————————————————————————————————————————————
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
	


	// 🌟 接收图片的请求 ——————————————————————————————————————————————————
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
			fs.writeFile('test.png', body, (err) => {// 🔥🔥设置图片的扩展名并把图片的二进制数据保存在硬盘上！
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



	// 🌟 接收表单数据的请求 (通过 formiable 库, 好处是不用自己去拼接数据) ——————————————————————————————————————————————————
	if(pathname === '/formDataDetail') {
		const form = formidable(); // 实例化一个 formidable 对象
		try {
			data = await form.parse(req);// 解析 req 请求, 所有表单数据都能取到
			console.log(data) //👈打印表单数据

			fs.rename(data[1].formDataPng[0].filepath, './' + data[1].formDataPng[0].originalFilename, (err) => { //🔥【formDataPng 是自己写的名字！】 【filepath 为临时保存的路径】, originalFilename 为原始文件名 , 【./ 为转存到当前目录下】
			if (err) {
				console.log(err)
			}
		})

		} catch (err) {
			// example to check for a very specific error
			if (err.code === formidableErrors.maxFieldsExceeded) {

		}
			// console.error(err);
			console.log('error', err)
			res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*', });
			res.end(String(err));
			return;
		}
		res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*', });
		res.end('success');
	}


	// 🌟 接收 blob 数据 (处理逻辑跟图片类似) ——————————————————————————————————————————————————
	if(pathname === '/sendBlob') {
		const data = []; // 用来存储图片数据

		// 获取图片数据
		req.on('data', (chunk) => {
			data.push(chunk);
		})

		// 获取完图片数据后进行数据的处理
		req.on('end', () => {
			const body = Buffer.concat(data);

			const Int32ArrayData = new Int32Array(body); // 🔥🔥 还原为定型数组内的数据 {[1, 2, 3, 4]}
			console.log(Int32ArrayData);
		})
		console.log('成功设置 blob 数据!');
		res.writeHead(200, { 
			'Content-Type': 'text/html; charset=utf-8', 
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type', 
		}); 
		res.end('success'); // 🚗 发送响应给【客户端】
	}
})


server.on('error', (err)=>{
	console.log(err);
})


server.listen(8899, ()=>{
	console.log('server running at http://127.0.0.1:8899');
})
