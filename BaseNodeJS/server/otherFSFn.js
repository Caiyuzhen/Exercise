// import { readFile } from 'node:fs/promises' // ESM 模式的引入
const { readFile } = require('node:fs/promises')  // CJS 模式的引入
const fs = require('fs')

const buffer = Buffer.alloc(16); //获取 16 字节的缓冲区
console.log(buffer)

const buffer2 = new Uint32Array(8); // 使用【定型数组】获取 8 个 32 位整数的缓冲区
console.log(buffer2)


/* 
	1.同步与异步
		回调/异步方式/Promise (async await)方式 - 不会阻塞进程
		同步方式 - 会阻塞进程

	🔥 文件相关的操作 __________________________________________
		1.读取文件
			readFile(path[, options], callback)

		2.写入文件
			writeFile(path, data[, options], callback)

		3.追加文件
			appendFile(path, data[, options], callback)
		
		4.复制文件
			copyFile(sourcePath, destPath[, options], callback)
		
		5.迁移文件地址
			rename(oldPath, newPath[, options], callback)
		
		6.删除文件
			unlink(path[, options], callback)

		7.🌟创建可读流\可写流
			createReadStream(path[, options])
			createWriteStream(path[, options])


		// 👇更底层的方法, 操作文件描述符、打开文件指针, 可以更精细到从哪里开始写、读
		8.打开文件
			open(path[, options], callback)

		9.读取文件
			read(fd, buffer, offset, length, position, callback)

		10.写入文件
			write(fd, buffer, offset, length, position, callback)

		11.关闭文件
			close(fd[, callback])


	🔥 文件夹相关的操作 __________________________________________
		1.创建目录
			mkdir(path[, options], callback)

		2.读取目录下的所有文件, 返回数组
			readdir(path[, options], callback)

		3.删除目录
			rmdir(path[, options], callback)

	🔥 权限相关操作 __________________________________________
		1. 检查目录是否存在以及用户是否有权限
			access(path[, mode], callback)

		2. 修改制指定目录的权限
			chmod(path[, mode], callback)

		3. 修改文件或目录的权限或所有组
			chown(path[, uid, gid], callback)


 */

fs.appendFile('someNote.txt', 'hey!!!', (err)=>{ //回调执行时机是写入完成, 或者遇到错误停止
	if(err) {
		console.log(err);
	} else {
		console.log('👍 写入成功!');
	}
})