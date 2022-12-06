/*	
	ImageData 对象
		Unit8ClampedArray 用于存储图像数据的数组, 定型数组(固定了类型, 处理效率会很高效)
			一个字节转换成十进制的话就是 0～255
			8 bit = 1 byte
		

	找像素的算法
		像素 RGBA 的索引 = (第几个像素 - 1) * 4 + 第几个颜色通道


	相关的方法
		1.创建像素范围的图像数据对象	
			ctx. createImageData(width, height) 

		2.获取像素信息(从哪里开始取，取多大范围)
			ctx.getImageData(left, right, width, height)
		
		3.处理完像素信息后, 放回到 canvas 内的方法
			ctx.putImageData(imageData, dx, dy)
	
	应用场景
		拾色器
*/

const imgDataCanvas = document.getElementById("imgData")
const showCircle = document.getElementById("show-color-circle")
const selectCircle = document.getElementById("selected-color-circle")
imgDataCanvas.width = 1000
imgDataCanvas.height = 600
imgDataCanvas.style.border = "3px solid black"
imgDataCanvas.style.borderRadius = "16px"
const ctx = imgDataCanvas.getContext("2d")
const imgData = ctx.createImageData(200, 200) //创建一个以像素点为基准的的范围, 储存像素点信息
console.log(imgData)


const img = new Image()
img.src = '../../../resources/fonts/img/fun.jpg'//已经加载到内存中去了, 只是还没显示到页面上
img.onload = () =>{
	ctx.drawImage(img, 30, 40, img.width, img.height)
}


// 封装一个获取颜色的函数
function getImgColor(event, target) {
	const imgData = ctx.getImageData(event.offsetX, event.offsetY, 1, 1) //获取像素信息, 取 1 个像素
	const data = imgData.data
	const colorData = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})` //🔥注意, 最后一个透明度的数据要转化为 0～2 的值, 所以除以 255 就行了
	target.style.backgroundColor = colorData
}


imgDataCanvas.addEventListener('mousemove', (e)=>{
	getImgColor(e, showCircle)
	// // console.log(e.offsetX, e.offsetY)
	// const imgData = ctx.getImageData(e.offsetX, e.offsetY, 1, 1) //获取像素信息, 取 1 个像素
	// // console.log(imgData);
	// const data = imgData.data
	// const colorData = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})` //🔥注意, 最后一个透明度的数据要转化为 0～2 的值, 所以除以 255 就行了
	// showCircle.style.backgroundColor = colorData
})

imgDataCanvas.addEventListener('click', (e)=>{
	getImgColor(e, selectCircle)
})