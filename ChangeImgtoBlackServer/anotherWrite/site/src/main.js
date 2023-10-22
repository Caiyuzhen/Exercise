//👇处理上传的文件
window.addEventListener('DOMContentLoaded', () => {
	const input = document.querySelector('input');
	const btn = document.querySelector('#button');
	const formData = new FormData();
	let fileDataBlob = null;


	input.addEventListener('change', (e) => {
		console.log(input.files); //获得文件上传的数据
		const file = input.files[0];
		const reader = new FileReader(); // 🌟 实例化 FileReader 对象

		if (file) {
			reader.onload = (e) => {
				fileDataBlob = new Blob([reader.result], { type: file.type }); // 🔥 将文件数据转换为 Blob 对象 🔥
			};

			reader.readAsArrayBuffer(file); // 🌟 将文件数据读取为 ArrayBuffer 对象
		};
	});



	// 👇上传事件
	btn.addEventListener('click', async (e) => {
		if(fileDataBlob) { // 有文件才上传
			const response = await fetch('http://localhost:3000/sendImg', { // 🌟 将文件数据传递给服务器, 并获得响应
				method: 'POST',
				body: fileDataBlob, 
				headers: {
					'Content-Type': 'image/png', 
				}
			});

			// 👇在 DOM 上创建一个 Img 并渲染处理后的图片
			const data = await response.blob(); // 🌟 将【获得的响应数据】转换为 Blob 对象
			const url = URL.createObjectURL(data); // 🔥🔥 将 Blob 对象转换为 URL, 然后挂载到 img 标签上
			const img = document.createElement('img');
			img.src = url;
			document.body.appendChild(img);
		} else {
			alert('请先选择文件');
		}
	});
});