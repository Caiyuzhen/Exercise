/* 
	流的机制
		NodeJS 环境 => Stream
			可度流 ReadableStream
			可写流 WritableStream
			转换流 TransformStream
			双工流 DuplexStream

		浏览器环境 => Web Stream
			可读流 ReadableStream
			可写流 WritableStream
			转换流 TransformStream

			How?
				【浏览器端】发送流数组
					用 FormData 或 Blob 对象去【设置请求体】的话, 发送数据会自动的使用流的方式去发送(无论是 Ajax 还是 Fetch)
					如果直接是用【定型数组 ArrayBuffer 】等二进制的方式去设置的话, 就不会使用流的方式去发送

				【浏览器端】接收流数组
					Ajax 方法 => 设置 responseType 属性为 arrayBuffer 或 blob 来获取二进制数据流
					Fetch 方法 => 设置 Response.body 属性, 它是一个 ReadableStream 对象, 可以使用它来处理数据

				【NodeJS 端】
					可读流
						read([size]) : 从内部缓冲区读取并返回一些数据, 如果没有数据可读, 则返回 null
						setEncoding(encoding) : 设置流的字符编码, 之后从流中读取的字符串将自动以此编码来解码
						pause() : 暂停读取数据 => 暂停 'data' 事件
						resume() : 恢复读取数据 => 恢复 'data' 事件
						pipe(destination[, options]) : 将可读流的输出内容写入到可写流中 🌟
						'data'事件： 当有数据【可读】时触发 🌟
						'end'事件： 当没有更多的数据【可读】时触发 🌟
						'error'事件： 当在接收和写入数据的过程中发生错误时触发

					可写流
						write(chunk, [, encoding][, callback]) : 将数据写入到流中, 如果缓冲区已满, 则返回 false， 否则 true
						end([chunk][, encoding][, callback]) : 结束写入流, 如果指定了 chunk，则相当于先调用 write(chunk, encoding) 然后再调用 end(callback)
						cork(): 强制将所有写入的数据存入内存缓冲区, 直到调用 uncork() 或 end() 方法
						uncork(): 将缓冲区的所有数据进行输出
						'drain'事件 : 如果调用 write() 方法则返回 false, 当可以继续写入数据到流中时会触发此事件, 我们可以监听此事件来指导何时可以继续写入数据
						'finish'事件 : 当调用 end() 方法并且缓冲区数据都已经输出时触发
						'error'事件 : 当在接收和写入数据的过程中发生错误时触发
*/

const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
	// 👇以可读流的方式处理网络请求 ————————————————————————————————————————————————————————————————————————
	// 响应头
	res.writeHead(200, {'ContentType': 'text/paint'});;
	// 处理请求数 => 以流的方法
	req.on('data', (chunk) => {
		// 写入文件或者传入到其他服务器
		// ...
	})

	// 请求数据处理完毕
	req.on('end', () => {
		// 响应数据
		res.end('Data received successfully!');
	})




	// 👇以可读流的方式处理文件 ————————————————————————————————————————————————————————————————————————
	const readStream = fs.createReadStream(path.join(__dirname, 'data.txt'), 'utf8');
	readStream.on('data', chunk => {
		// 处理数据流
		// ...
	})

	readStream.on('end', () => {
		// 文件读取结束
		// ...
	})




	// 👇以可写流的方式处理文件 ————————————————————————————————————————————————————————————————————————
	const writeStream = fs.createWriteStream('output.txt');
	writeStream.write('Hello World!', 'utf8');
	writeStream.end();




	// 🔥可读、可写流的组合方式 🔥 ————————————————————————————————————————————————————————————————————————
	// 👇 文件 => 读取到缓冲区 => 从缓冲区写入到另一个文件
	const readStream2 = fs.createWriteStream('input.txt');
	const writeStream2 = fs.createWriteStream('output.txt');

	readStream2.pipe(writeStream2); // 以管道的方式处理数据流, 把读取的数据流直接写入到另一个文件中 => 可度流转为可写流

	writeStream2.on('drain', () => { // drain 表示低于【缓冲区的上限】了, 就可以继续读取数据
		readStream2.resume(); // resume 恢复读取数据到缓冲区!!!
	});

	readStream2.on('data', chunk => {
		if(!writeStream2.write(chunk)) { // 🔥这里的 write 指的是写入缓冲区, 如果写不进去就是到了【缓冲区的上限】, 就会触发 drain 事件, 就暂停读取数据
			readStream2.pause();
		}
	})
})


server.listen(3030, () => {
	console.log('Server listening on: http://localhost:3030');
})