const btn1 = document.querySelector('.btn-1')
const btn2 = document.querySelector('.btn-2')
const btn3 = document.querySelector('.btn-3')
const input = document.querySelector('input')
const btn4 = document.querySelector('.btn-4')

// 发送 get 请求 —————————————————————————————————————————————————————-
btn1.addEventListener('click', async () => {	
	const response = await fetch('http://127.0.0.1:8899/sendQuery?name=Jimmy&age=22', {
		method: 'GET',
		headers: {
			'Content-Type': 'text/html; charset=utf-8'
		}
	})

	const data = await response.text();
	console.log(data);
})


// 🌟 能放到 body 内的数据类型有: ArrayBuffer, Blob, string, URLSearchParams, FormData



// 发送 post 请求 - 以表单方式发送 —————————————————————————————————————————————————————-
btn2.addEventListener('click', async () => {
	const response = await fetch('http://127.0.0.1:8899/sendPost', {
		method: 'POST',
		body: '?name=Kem&age=27',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded', //🔥 在 body 内携带参数就是简单的【表单方式】的请求, 所以设置成 application/x-www-form-urlencoded !!!
		}
	})

	const data = await response.text();
	console.log(data);
})




// 发送 post 请求 - 以 JSON 字符串方式发送 —————————————————————————————————————————————————————-
btn3.addEventListener('click', async () => {
	const response = await fetch('http://127.0.0.1:8899/sendPostWithJson', {
		method: 'POST',
		body: JSON.stringify({
			name: 'Annie',
			age: 29
		}),
		headers: {

		}
	})

	const data = await response.text();
	console.log(data);
})



// 发送 png 文件到服务端 —————————————————————————————————————————————————————-
let fileData = null
input.addEventListener('change', (e) => {
	// console.log(input.files);
	const file = input.files[0]; //取出文件数据

	// 🔥读取电脑内获取的文件数据
	const reader = new FileReader();
	reader.onload = (e) => { //读取完文件就会执行【第二步会执行这个】
		fileData = reader.result;
		console.log(fileData);
	}
	// 🔥 readAsText()：将文件读取为文本
	// 🔥 readAsDataURL()：将文件读取为DataURL => 读完可以直接放入 src="" 中!!
	reader.readAsArrayBuffer(file); //读取文件数据【第一步会先执行这个】
})

btn4.addEventListener('click', async () => {
	const response = await fetch('http://127.0.0.1:8899/sendPNGFileData', {
		method: 'POST',
		body: fileData,
		headers: {
			'Content-Type': "image/png", //🔥上传 png 文件
		}
	})

	const data = await response.text();
	console.log(data);
})


