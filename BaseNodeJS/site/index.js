// 浏览器中的 JS 进行发送请求
/* 
	.text
	.json
	.arrayBuffer
	.formData
	.blob => 二进制数据对象, 可以表示图像、音频、视频、文本等二进制的数据 => 只在浏览器环境内才有
 */
// 获取文本数据
async function getData() {
	let finalText = '';
	await fetch('http://127.0.0.1:8899/getFile')
		.then(res => res.text()) //🔥 .text()  用于获取文本数据 .json 用语获取 JSON 数据, .arrayBuffer 用于获取二进制数据, .formData 用语获取表单数据
		.then(data => {
			// 创建 p 标签, 插入请求回来的内容
			finalText = data;
			const p = document.createElement('p');
			p.innerHTML = finalText;
			document.body.appendChild(p);
			// console.log(data);
		})

	// 获取 json 数据
	let obj
	await fetch('http://127.0.0.1:8899/getJson')
		.then(res => res.json()) //🔥 .text()  用于获取文本数据 .json 用语获取 JSON 数据, .arrayBuffer 用于获取二进制数据, .formData 用语获取表单数据
		.then(data => {
			obj = data;
			// console.log(obj);
		}) 

	// 获取 img 数据（blob 方法）
	await fetch('http://127.0.0.1:8899/getImg')
		.then(res => res.blob()) // .blob => 二进制数据对象, 可以表示图像、音频、视频、文本等二进制的数据 => 只在浏览器环境内才有
		.then(data => {
			const img = document.querySelector('.img1');
			const url = URL.createObjectURL(data);
			img.src = url;
		}) 

	// 获取 img 数据（base64 方法）
	await fetch('http://127.0.0.1:8899/getBase64')
	.then(res => res.text()) // base64 格式的文件用 .text() 进行读取！
	.then(base64Data => {
		const img2 = document.querySelector('.img2');
		img2.src = `data:image/png;base64,${base64Data}`; //也要发送请求, 比较少用
	})

	//🔥如果要对多媒体文件进行下一步处理的话, 👉 需要用 arrayBuffer !! 相当于处理二进制文件


	// 🔥下载图片, 首先需要转成 blob() 格式的数据
	const response = await fetch('http://127.0.0.1:8899/getImg');
	const data2 = await response.blob();
	const url2 = URL.createObjectURL(data2);
	const link = document.createElement('a');	// 创建 a 标签
	link.href = url2;
	link.download = '未命名.png';
	link.click(); // 模拟触发了点击事件

}

// 立即执行函数
(function(){
	getData()
})();