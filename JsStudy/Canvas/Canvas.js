/* 
	基础定义
		canvas 可以创建任意多个 
		csnvas 元素跟 img 元素可以直接在 html 内设置宽跟高，不用特地写 style XXX

	ctx 
		相当于一支画笔, 根据笔的坐标来绘制图形而不是画布！默认在左上角
			能绘制的图形只有两类
				1.矩形
				2.路径
					需要有起始点 ctx.moveTo(x, y) , 一定要设置！
					默认为透明的
			其他的还有文字、图片等

			制弧线或者圆形
				arc(x, y, r, startAngle, endAngle, anticlockwise) 方法,
					r 为半径
					anticlockwise 为 true 时为逆时针

	添加边框、颜色, 跟 css 的写法类似
		ctx.strokeStyle = 'red';
		ctx.fillStyle = 'red';
		ctx.lineWidth = 10;
		ctx.lineCap = 'round'; // 线条末端的样式为圆点
		ctx.lineJoin = 'round'; // 线条交汇处的样式

	给元素进行分组
		ctx.beginPath(); //建立一个路径组
		ctx.closePath(); 闭合路径(最后一个点连接到自动连接到起始点)

	// 添加文字
		ctx.font = '20px Arial';
		ctx.textAlign = 'center'; // 文字水平居中
		ctx.textBaseline = 'middle'; // 文字垂直居中
		ctx.fillText('Hello World', 100, 100); // 填充文字
		ctx.strokeText('Hello World', 100, 100); // 绘制文字边框

	// 绘制图片
		var img = new Image();
		img.src = 'xxx.jpg';
		img.onload = function() {
			ctx.drawImage(img, 0, 0, 100, 100); // 绘制图片
		}

	// 绘制渐变
		var grd = ctx.createLinearGradient(0, 0, 100, 100); // 创建线性渐变
		grd.addColorStop(0, 'red'); // 0 为起始点
		grd.addColorStop(1, 'blue'); // 1 为结束点
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, 100, 100); // 填充矩形

	// 绘制阴影
		ctx.shadowOffsetX = 10; // 阴影的 x 偏移
		ctx.shadowOffsetY = 10; // 阴影的 y 偏移
		ctx.shadowBlur = 10; // 阴影的模糊程度
		ctx.shadowColor = 'red'; // 阴影的颜色

	// 绘制图案
		var pattern = ctx.createPattern(img, 'repeat'); // 创建图案
		ctx.fillStyle = pattern;
		ctx.fillRect(0, 0, 100, 100); // 填充矩形

	// 绘制贝塞尔曲线
		三次贝塞尔曲线
			bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
				cp1x, cp1y 为第一个控制点
				cp2x, cp2y 为第二个控制点
				x, y 为结束点
		
		二次贝塞尔曲线
			quadraticCurveTo(cp1x, cp1y, x, y)
				cp1x, cp1y 为控制点
				x, y 为结束点
*/


// 创建基础的【🪟画布】
const canvas = document.getElementById("myCanvas")
canvas.width = 1400
canvas.height = 600
canvas.style.border = "4px solid black"
canvas.style.borderRadius = "16px"
canvas.style.position = "absolute"
canvas.style.top = "200px"
canvas.style.left = "400px"
// console.log(canvas);


//生成基础的【🖌️画笔】调用 getContext 方法, 会返回一个对象('2d') 为包含了各种二维绘制方法的对象, ('webgl'）为绘制三维图形的对象
// const ctx2 = canvas.getContext('webgl')
const ctx = canvas.getContext('2d')

// console.log(ctx2);
// console.log(ctx);


// 全局粗细跟颜色
ctx.lineWidth = 3  //线段粗细
ctx.strokeStyle = 'rgba(45, 36, 151)' //线段颜色



// 基础矩形
ctx.beginPath() //建立一个路径组
ctx.fillRect(100,100,100,100) //绘制填充矩形
ctx.strokeRect(300,300,100,100) //绘制描边矩形
ctx.moveTo(50, 50) //x, y 坐标，路径的起始点
ctx.lineTo(150, 150) //x, y 坐标，路径的绘制到哪个点, 注意,起笔点会变到【这个点】！！

ctx.moveTo(50+230, 50+130) //第二条线, 需要移动笔尖
ctx.lineTo(400, 500)



// 三角形
ctx.moveTo(280+260, 180+200) //第二条线, 需要移动笔尖
ctx.lineTo(620, 520)
ctx.lineTo(460, 520)
ctx.lineTo(280+260, 180+200)

ctx.stroke() //正式的上色



// 几个连续的圆形
ctx.beginPath() //建立一个路径组
ctx.moveTo(940+30, 280) //起始点, 这样画出来会起始点会连起来！修正的话需要（🌟🌟起始点的横坐标 + 圆的半径！）
ctx.arc(940, 280, 30, 0, Math.PI * 2, false) //Math.PI * 2 为 360°, PI 为圆周率

ctx.moveTo(1030, 280)
ctx.arc(1000, 280, 30, 0, Math.PI * 2, true) //Math.PI * 2 为 360°, PI 为圆周率

ctx.arc(1060, 280, 30, 0, Math.PI) //半圆

ctx.moveTo(1150, 280) //半弧
ctx.arc(1120, 280, 30, 0, Math.PI, Math.PI) //半弧

ctx.moveTo(1210 - 30, 280 + 30) //1/4 弧
ctx.arc(1180, 280, 30, Math.PI / 2, Math.PI) //1/4 弧

ctx.lineCap = 'round'; // 线条末端的样式为圆点
ctx.lineWidth = 7  //线段粗细
ctx.strokeStyle = 'rgba(145, 36, 151)' //线段颜色

ctx.stroke() //正式的上色



// 一个闭合路径的三角形
ctx.beginPath() //建立一个路径组
ctx.moveTo(800, 100)
ctx.lineTo(850, 250)
ctx.lineTo(650, 250)
ctx.closePath() // 🔥闭合路径, 这样路径的点会更彻底！会影响落笔点！
ctx.strokeStyle = 'rgba(45, 36, 151)' //线段颜色
ctx.lineWidth = 8  //线段粗细
ctx.fillStyle = "rgba(145, 36, 151)"; //填充为 XXX 颜色
// ctx.fill() //填充色, 会自动的封闭图形, 默认为黑色

ctx.stroke()


// 创建文字
ctx.beginPath() //建立一个路径组
ctx.font = "64px Arial"
ctx.fillStyle = `rgb(245, 36, 151)`
ctx.fillText("Smart Canvas 🌞", 400, 100)
ctx.strokeText("Smart Canvas 🌞", 400, 100)


// 创建贝塞尔曲线
ctx.beginPath() //建立一个路径组
ctx.bezierCurveTo(250, 300, 550, 150, 600, 400) //cp1x, cp1y 为第一个控制点, cp2x, cp2y 为第二个控制点, x, y 为结束点
ctx.strokeStyle = 'rgba(145, 236, 151)' //线段颜色
ctx.stroke()




