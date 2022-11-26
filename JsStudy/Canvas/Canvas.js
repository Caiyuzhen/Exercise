/* 
	canvas 可以创建任意多个 
	csnvas 元素跟 img 元素可以直接在 html 内设置宽跟高，不用特地写 style XXX

	ctx 相当于一支画笔, 根据笔的坐标来绘制图形而不是画布！默认在左上角
		能绘制的图形只有两类
			1.矩形
			2.路径
				需要有起始点 ctx.moveTo(x, y) , 一定要设置！
				默认为透明的
		其他的还有文字、图片等

	如何绘制弧线或者圆形
		arc(x, y, r, startAngle, endAngle, anticlockwise) 方法,
			r 为半径
			anticlockwise 为 true 时为逆时针

*/

const canvas = document.getElementById("myCanvas")
canvas.width = 1400
canvas.height = 600
canvas.style.border = "2px solid black"
canvas.style.position = "absolute"
canvas.style.top = "200px"
canvas.style.left = "400px"
// console.log(canvas);


//调用 getContext 方法, 会返回一个对象('2d') 为包含了各种二维绘制方法的对象, ('webgl'）为绘制三维图形的对象
// const ctx2 = canvas.getContext('webgl')
const ctx = canvas.getContext('2d')

// console.log(ctx2);
console.log(ctx);




ctx.fillRect(100,100,100,100) //绘制填充矩形
ctx.strokeRect(300,300,100,100) //绘制描边矩形
ctx.moveTo(50, 50) //x, y 坐标，路径的起始点
ctx.lineTo(150, 150) //x, y 坐标，路径的绘制到哪个点, 注意,起笔点会变到【这个点】！！

ctx.moveTo(50+230, 50+130) //第二条线, 需要移动笔尖
ctx.lineTo(400, 500)

ctx.moveTo(280+260, 180+200) //第二条线, 需要移动笔尖
ctx.lineTo(620, 520)
ctx.lineTo(460, 520)
ctx.lineTo(280+260, 180+200)

ctx.stroke()



ctx.moveTo(940+30, 280) //起始点, 这样画出来会起始点会连起来！修正的话需要（🌟🌟起始点的横坐标 + 圆的半径！）
ctx.arc(940, 280, 30, 0, Math.PI * 2, false) //Math.PI * 2 为 360°, PI 为圆周率

ctx.moveTo(1030, 280)
ctx.arc(1000, 280, 30, 0, Math.PI * 2, true) //Math.PI * 2 为 360°, PI 为圆周率

ctx.arc(1060, 280, 30, 0, Math.PI) //半圆

ctx.moveTo(1150, 280) //半弧
ctx.arc(1120, 280, 30, 0, Math.PI, Math.PI) //半弧

ctx.moveTo(1210 - 30, 280 + 30) //1/4 弧
ctx.arc(1180, 280, 30, Math.PI / 2, Math.PI) //1/4 弧

ctx.stroke()

