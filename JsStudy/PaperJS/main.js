/*
	🌟 Paper 库常用属性
		view //窗口

		tool //事件绑定机制

		Path //路径绘制

		Point //坐标点
*/ 
console.log(paper)

// 初始化 Canvas, 传入 Canvas 的 id
paper.setup('myCanvas')

// 设置 Canvas 的宽高(通过 css 设置的画可能会导致元素变形, 不过 Paper 默认帮你处理了)
// paper.view.viewSize = new paper.Size(500, 500)


// 宽高 = 浏览器
paper.view.viewSize = new paper.Size(window.innerWidth, window.innerHeight)

// 浏览器拖拽时, 重新设置 Canvas 的宽高
window.onresize = function () {
	  paper.view.viewSize = new paper.Size(window.innerWidth, window.innerHeight)
}


// 绘制路径
const myPath = new paper.Path()

myPath.strokeColor = '#93BFCF' //上色
myPath.strokeWidth = 5
myPath.add(new paper.Point(100, 100))
myPath.add(new paper.Point(200, 200))






/* 事件绑定
	常用的事件:
		mouseMove
		mouseDown
		mouseUp
		mouseDrag

	常用的属性
		event.downPoint  //按下的点
		event.lastPoint  //上一个点下的点
		event.point   //当前的点
		event.delta   //移动的距离
		event.count   //按下的次数
		event.middlePoint  //中间的点(上次跟这次触发的中间点)
*/






// ⭕️鼠标移动圆圈跟随效果实现

// 绘制圆（预置的图形）
const myCircle = new paper.Path.Circle(
	new paper.Point(300, 300), 50 //传入【圆心】和【半径】
)

myCircle.fillColor = '#93BFCF' //上色

let lastX = 0 //最终的 X 坐标
let lastY = 0 //最终的 Y 坐标
let mouseX = 0
let mouseY = 0

const tool = new paper.Tool()
tool.onMouseMove = function (event) {
	mouseX = event.point.x
	mouseY = event.point.y
	// 打印鼠标的 X, Y 坐标
	// console.log(event.point)  // console.log(event.point.x)
	// myCircle.position = event.point //position 为圆的中心点
}


/** 🔥🔥🔥🔥🔥【缓动函数】结合【帧率刷新】
 a -> 起始值     
 b -> 结束值     
 n -> 缓动系数(强度 0-1)
*/
const lerp = (start, end, t) => { 
	return (1 - t) * start + t * end 
	//100  200  0.2   ->    80 + 40 = 120    
	//120  200   0.2  ->    96 + 24 = 136
	//136  200   0.2  ->    108.8 + 40 = 148.8
}


// 🌟🌟🌟🌟底层还是用的 requestAnimationFrame (动画)
paper.view.onFrame = function () {
	lastX = lerp(lastX, mouseX, 0.2) //lastX 变为 鼠标的位置
	lastY = lerp(lastY, mouseY, 0.2) //lastY 变为 鼠标的位置
	myCircle.position = new paper.Point(lastX, lastY)
}




// 其他事件
tool.onMouseDown = function (event) {
	alert('鼠标按下了')
}









