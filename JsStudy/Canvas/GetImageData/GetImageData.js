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

		2.获取像素信息
			ctx.getImageData(left, right, width, height)
		
		3.处理完像素信息后, 放回到 canvas 内的方法
			ctx.putImageData(imageData, dx, dy)
	
	应用场景
		拾色器
*/

const imgDataCanvas = document.getElementById("imgData")
imgDataCanvas.width = 1200
imgDataCanvas.height = 800
imgDataCanvas.style.border = "3px solid black"
imgDataCanvas.style.borderRadius = "16px"
const ctx = imgDataCanvas.getContext("2d")
const imgData = ctx.createImageData(200, 200) //创建一个以像素点为基准的的范围, 储存像素点信息
console.log(imgData)