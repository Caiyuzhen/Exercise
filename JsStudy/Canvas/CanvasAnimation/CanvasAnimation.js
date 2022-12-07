const canvasAnmi = document.getElementById("canvas-animation")
canvasAnmi.width = 800
canvasAnmi.height = 600
canvasAnmi.style.border = "3px solid black"
canvasAnmi.style.borderRadius = "16px"
const ctx = canvasAnmi.getContext("2d")

const step = 1
const initPos = {
	x: 200,
	y: 200
}

// 绘制图案的方法
function drawCircle(initX, initY) {
	ctx.clearRect(0, 0, canvasAnmi.width, canvasAnmi.height)
	ctx.beginPath() //🔥注意, 要创建路径组, 不然会把之前的内容全部擦除, 擦除只能擦掉在画板上的图形！

	ctx.moveTo(initX + 20, initY) //200+20, 200
	ctx.arc(initX, initY, 20, 0, Math.PI * 2)
	ctx.fill()

	initPos.x += step //改变位置来重绘, 形成移动效果
	//根据浏览器的刷新频率调用自身, requestAnimationFrame 一定要传函数的调用, 🔥不能传函数的参数 -> requestAnimationFrame(X,X) 
	//requestAnimationFrame 要传参数的话只能用回调的方式!
	// requestAnimationFrame(drawCircle) 
	requestAnimationFrame(()=>{
		drawCircle(initPos.x, initPos.y);
	}) 
}

drawCircle()





