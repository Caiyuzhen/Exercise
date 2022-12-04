/*
	常用的绘制图片方法
		1. 直接画出来
			 drawImage(img, x, y, width, height)
		2. 截取原图多大的范围来绘制 （从 sourcex 裁切到 swidth）
			 drawImage(img, sourcex, sourcey, swidth, sheight, x, y, width, height)

*/ 


// 初始化
const imgCanvas = document.getElementById("imageCanvas")
imgCanvas.width = 1440
imgCanvas.height = 700
imgCanvas.style.background = 'rgba(255 255 255 / 1)'
imgCanvas.style.border = '4px solid rgba(51 54 102)'
imgCanvas.style.borderRadius = "16px"
imgCanvas.style.position = 'absolute'
imgCanvas.style.top = '100px'
imgCanvas.style.left = '20px'
const ctx = imgCanvas.getContext('2d')

// 绘制图片
const img = new Image() //这种方法适合不需要直接展示到页面上的元素
img.src = '../../../resources/fonts/img/fun.jpg'//已经加载到内存中去了, 只是还没显示到页面上
img.onload = function () { //异步加载图片, 页面加载完成后再执行
	ctx.drawImage(img, 30, 40, img.width / 4, img.height / 4)
	ctx.drawImage(img, 0, 0, 1200, 1200, 700, 40, img.width / 4, img.height / 4)
}


// 绘制图片

