// const http = require('http');
// const fs = require('fs');
// const url = require('url');
// const querystring = require('querystring');
// const path = require('path');
// const Jimp = require('jimp'); // jimp 库用来处理图片
// const mime = require('mime'); // mime 库用来解析文件类型, 让服务器发回给客户端的文件类型正确（比如 image/png 类型)


// const server = http.createServer(async (req, res) => {
// 	const { pathname, query } = url.parse(req.url, true);

// 	// 如果请求sendImg, 则处理图片
// 	if(pathname === '/sendImg') {
// 		const data = []; // 用来存储数据

// 		req.on('data', (chunk) => { // 获取数据
// 			data.push(chunk);
// 		});

// 		req.on('end', () => { // 获取完数据后处理数据
// 			const body = Buffer.concat(data); // 🔥 将数据拼接成一个 Buffer 对象
// 			Jimp.read(body)
// 				.then((img) => {
// 					// 🌟处理图像
// 					img.grayscale(); // 🌞 Jimp 库里边的方法, 调整图片色调
// 					// 🔥读取处理后的数据然后再返回给页面
// 					img.getBuffer(Jimp.MIME_PNG, (err, buffer) => { // 回调中返回数据
// 						if(err) throw err;

// 						// 🚗 发送响应给【客户端】
// 						res.writeHead(200, {
// 							'Content-Type': 'image/png',
// 							'Content-Length': buffer.length,
// 						});
// 						res.end(buffer);
// 					});
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 				});
// 		});
// 		return;
// 	};

// 	// 如果请求根路径, 渲染 HTML 页面
// 	if(pathname === '/') { 
// 		fs.readFile('./index.html', (err, data) => {
// 			if(err) {
// 				res.writeHead(404, {
// 					'Content-Type': 'text/plain',
// 				});
// 				res.end('❌ 找不到 html 文件')
// 			} 

// 			res.writeHead(200, {
// 				'Content-Type': 'text/html',
// 			});
// 			res.end(data); // 发送 html 文件
// 		})
// 	} else {
// 		// 对于其他路径, 根据请求的路径找到相应的文件
// 		const filePath = path.join(__dirname, pathname); // 获取文件路径
// 		const contentType = mime.getType(pathname(filePath)); // 使用 mime 类型来自动设置 Content-Type 头
// 		fs.readFile(filePath, (err, data) => {
// 			if(err) {
// 				res.writeHead(404, {
// 					'Content-Type': 'text/html',
// 				})
// 				res.end('❌找不到文件')
// 			} else {
// 				res.writeHead(200, {
// 					'Content-Type': contentType,
// 				})
// 				res.end(data);
// 			}
// 		})
// 	}
// });


// server.listen(3000, () => {
// 	console.log('server is running at port 3000')
// });


const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const Jimp = require('jimp');

const path = require('path');
const mime = require('mime');

// __dirname: 当前文件所在的目录

const server = http.createServer(async (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
//   console.log(pathname);

  if (pathname === '/sendImg') {
    const data = []


    req.on('data', (chunk) => {
      data.push(chunk)
    })
	console.log(data);


    req.on('end', () => {

      const body = Buffer.concat(data)
      Jimp.read(body)
        .then((image) => {
          // 处理图像
          image.grayscale();
          image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
            if (err) throw err;

            // 发送响应
            res.writeHead(200, {
              'Content-Type': 'image/png',
              'Content-Length': buffer.length
            })
            res.end(buffer);
          });
        })
        .catch((err) => {
          console.error(err);
        });
 

    })
    return
  }

  if (pathname === '/') {
    fs.readFile('./site/index.html', (err, data) => {

      if (err) {
        res.writeHead(404, {
			'Content-Type': 'text/html; charset=utf-8',
        })
        res.end('找不到文件')
      }

      res.writeHead(200, {
		'Content-Type': 'text/html; charset=utf-8',
      })
      res.end(data)
    })
  } else {

	// 计算出绝对路径（获取静态文件）
    const filePath = path.join(__dirname, pathname); // 使用 path.join() 来计算绝对路径
    const contentType = mime.getType(path.extname(filePath)); // getType 、extname 为获取扩展名, 这样就不用一个个文件类型去写了
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {
			'Content-Type': 'text/html'
        })
        res.end('找不到文件')
      }
	  console.log(filePath);
      res.writeHead(200, {
        'Content-Type': contentType,
      })
      res.end(data)
    })
  }
})

server.listen(3000, () => {
  console.log('server is running at port 3000')
})