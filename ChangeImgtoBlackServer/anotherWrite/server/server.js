const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const path = require('path');
const Jimp = require('jimp'); // jimp 库用来处理图片



const server = http.createServer(async (req, res) => {
	const { pathname, query } = url.parse(req.url, true);

	// 🔥🔥 处理 OPTIONS 请求（在处理跨域请求时，浏览器会先发送一个 OPTIONS 请求进行预检（preflight），而在预检请求中也需要包含正确的 CORS 头信息）
	if (req.method === 'OPTIONS') {
		res.writeHead(200, {
		  'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		  'Access-Control-Allow-Headers': 'Content-Type',
		  'Access-Control-Max-Age': '86400', // 预检请求的有效期，单位是秒
		});
		res.end();
		return;
	}

	  
	// if(pathname === '/hhh') {
	// 	res.end('111');
	// }

	// 如果请求sendImg, 则处理图片
	if(pathname === '/sendImg') {
		const data = []; // 用来存储图片数据

		// 获取图片数据
		req.on('data', (chunk) => { 
			data.push(chunk);
		});


		// 获取完图片数据后进行数据的处理
		req.on('end', () => { 

			if (data.length === 0) { // 检查数据是否为空
				res.end('没有上传有效的图片数据');
				return;
			}
			console.log(data); //打印获得的图片数据


			const body = Buffer.concat(data); // 🔥 将数据拼接成一个 Buffer 对象
			Jimp.read(body)
				.then((img) => {
					// 🌟处理图像
					img.grayscale(); // 🌞 Jimp 库里边的方法, 调整图片色调
					// 🔥读取处理后的数据然后再返回给页面
					img.getBuffer(Jimp.MIME_PNG, (err, buffer) => { // 回调中返回数据
						if(err) throw err;

						// 🚗 发送响应给【客户端】
						res.writeHead(200, {
							'Content-Type': 'image/png',
							'Content-Length': buffer.length,
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
							'Access-Control-Allow-Headers': 'Content-Type', 
						});
						res.end(buffer);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		});
		return;
	};
});


server.listen(3000, () => {
	console.log('server is running at port 3000')
});
