const canvas = document.getElementById("SignatureBoard")
const ctx =canvas.getContext("2d")


// 初始化
function Init () {
	canvas.width = 800
	canvas.height = 800
	canvas.style.backgroundColor = '#F1F1F1'
	canvas.style.border = '3px solid #999999'
	canvas.style.borderRadius = '16px'
	canvas.style.position = 'absolute'
	canvas.style.top = '10%'
	canvas.style.left = '10%'

	strokeControl ()
	Cursor ()
}


// ——————————————————————————————————————
// 记录上一次的坐标
const pre_Pos = {
	x: 0,
	y: 0,
}


// 锁, 鼠标点击后才开始画
let writAble = false


// 获取标移动事件
function Cursor () {
	canvas.addEventListener('mousedown', (e) => {
		writAble = true
		pre_Pos.x = e.offsetX //点下去的瞬间, 把位置更新到点下的 x 位置
		pre_Pos.y = e.offsetY //点下去的瞬间, 把位置更新到点下的 y 位置
	})

	canvas.addEventListener('mousemove', (e) => {
		console.log(
			// '距离相对页面左上角:' + e.clientX, e.clientY, 
			// '距离相对元素左上角:' + e.offsetX, e.offsetY,
		)
		if(writAble){
			draw(e.offsetX, e.offsetY, ctx)
		}
	})

	canvas.addEventListener('mouseup', (e) => {
		writAble = false
	})
}


// 绘制函数
function draw(x, y, ctx) {
	//画线的方法, OK
	if( pre_Pos.x === 0 && pre_Pos.y === 0 ){// 记录第一次触发的数据
		pre_Pos.x = x //保存第一次的x坐标
		pre_Pos.y = y //保存第一次的x坐标
	} else {
		ctx.moveTo(pre_Pos.x, pre_Pos.y) //🔥移动到上一次记录的位置
		ctx.lineTo(x, y) //移动到鼠标的位置
		pre_Pos.x = x// 🔥更新数据！
		pre_Pos.y = y// 🔥更新数据！

		if( stroke.width === 1 ){
			ctx.lineWidth = 1
		} else {
			ctx.lineWidth = stroke.width
		}

		ctx.stroke() //开始画线
	}

	// 画圆的方法, 不太行
	// ctx.moveTo(x + 10, y) //每次绘制的时候都要移动起笔点到下一个圆的位置
	// ctx.arc(x, y, 10, 0, Math.PI * 2) //绘制的 x,y 半径，起始角度，结束角度 (0 -> Math.PI 相当于 360度)
	// ctx.fill()
}




// ——————————————————————————————————————
const add = document.getElementById('add')
const reduce = document.getElementById('reduce')

// 线条的宽度
const stroke = { 
	width: 1,
} 

// 修改线条的宽度的方法
function strokeControl () {
	
	add.addEventListener('click', (e) => {
		if( stroke.width >= 1 && stroke.width < 10){
			stroke.width += 1
		} else if ( stroke.width === 10 ){
			stroke.width = 10
		}
		console.log(stroke.width)
	})

	reduce.addEventListener('click', (e) => {
		if( stroke.width <= 10 && stroke.width > 1){
			stroke.width -= 1
		} else if ( stroke.width === 1 ){
			stroke.width = 1
		}
		console.log(stroke.width)
	})	
}


Init ()
