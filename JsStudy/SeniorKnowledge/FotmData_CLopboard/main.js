// FormDat 获取表格中填写的所有数据

const myForm = document.querySelector('#myForm')
const btn = document.querySelector('#subMitbtn')



// 🌟🌟 获取表单数据
btn.addEventListener('click', () => {
	const formData = new FormData(myForm)

	// 🚀 迭代表单提交的数据, 可以进行进一步的处理（比如检查、验证等）
	for(let i of formData) {
		console.log(i)
	}

	// 🚀 向服务器发送数据等
	// ...
})




// 🌟🌟 剪贴板 readText、 writerTex ...
const clipBoardText = document.querySelector('.clipBoard')
clipBoardText.addEventListener('copy', () => {
	//检查浏览器是否支持 Clipboard API
	if (navigator.clipboard) {
		// 获取剪贴板中的数据
		navigator.clipboard.readText()
			.then(data => {
			console.log('剪贴板中的数据:', data);
			})
			.catch(error => {
			console.error('无法读取剪贴板数据:', error);
			});
	} else {
		console.log('该浏览器不支持 Clipboard API.');
	}
})
