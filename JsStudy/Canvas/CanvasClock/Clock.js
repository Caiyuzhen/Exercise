// 初始化
const clockCanvas = document.getElementById('clock-canvas');
clockCanvas.width = 1400
clockCanvas.height = 700
clockCanvas.style.border = '4px solid rgba(51 54 102)'
clockCanvas.style.borderRadius = "16px"
clockCanvas.style.position = 'absolute'
clockCanvas.style.top = '100px'
clockCanvas.style.left = '20px'
const ctx = clockCanvas.getContext('2d')
ctx.clearRect(0, 0, clockCanvas.width, clockCanvas.height)



// 绘制时钟指针的方法
function drawClock() {
	// 清空一下以前绘制的所有线, 因为 canvas 是一层层重新绘制的
	ctx.clearRect(0, 0, clockCanvas.width, clockCanvas.height)
	ctx.save() //保存最开始的初始状态
	
	// 连续画一圈线
	ctx.beginPath()
	ctx.translate(400, 300)//移动坐标系 ⌞
	ctx.rotate(-Math.PI / 2) //把坐标系 ⌞ 逆时针旋转 90 度
	ctx.save() //记录一下 12 点的位置(90 度)
	
	for(let i = 0; i <= 12 ; i++) {
		if(i !== 0 ) {
			ctx.rotate(Math.PI / 6 ) //🔥每次旋转 30 度 (Math.PI  为 180°, 所以除以 6 为 30°)
			ctx.moveTo(140, 0)
			ctx.lineTo(150, 0)
			ctx.lineWidth = 4 //线段宽度
			ctx.lineCap = 'round' //线段两端圆角
			ctx.strokeStyle = 'rgba(51 54 102)' //线段颜色
			ctx.stroke()
		}
	}

	// 画完后，重置一下坐标到 90 度 ⌞
	ctx.restore()
	ctx.save() //⚡️再记录一下 12 点的位置(90 度) ⌞ ,每次画完后都要重置一下

	// 获取当前的时分秒
	const now = new Date()
	const hours = now.getHours() % 12 //获取当前小时 0~23 , 需要转化为 12 小时制, 用【🔥取模运算】, 23 / 12 等于 1 余 11
	const minutes = now.getMinutes() //获取当前分钟 0～59
	const seconds = now.getSeconds() //获取当前秒 0~59
	// console.log(hours, minutes, seconds);

	// 计算【时】要旋转的角度 (1 h = 30°) (1 min = 1h / 60) (1 s = 1h / 60 / 60)
	// Math.PI / 6 表示 1 小时为 30°,  (Math.PI / 6 / 60) 表示每小时内的分钟【🔥走小时的多少角度，为 0.5°】, (Math.PI / 6 / 60 / 60) 表示每小时内的秒【🔥走小时的多少角度，为 0.0083°】
	const hourRotate = hours * (Math.PI / 6) + minutes * ((Math.PI / 6 / 60)) + seconds * ((Math.PI / 6 / 60 / 60))//时针应该转的角度 = 小时 + 分钟 + 秒转的度数
	// 计算【分】要旋转的角度 (1 min = 360 / 60 = 6°) 
	// (Math.PI / 30) 表示 1 分钟为 6°,  (Math.PI / 30 / 60) 表示每秒钟【🔥走分钟的多少角度， 为 0.1° 】
	const minuteRotate = minutes * ((Math.PI / 30)) + seconds * ((Math.PI / 30 / 60))

	// 计算要【秒】旋转的角度 (1 s = 360 / 60 = 6°)
	const secondRotate = seconds * ((2 * Math.PI / 60))



	// 最终绘制出的时针 —————
	ctx.beginPath()
	ctx.rotate(hourRotate) //旋转坐标系,传入时针的角度
	ctx.lineWidth = 6
	ctx.moveTo(-10, 0)
	ctx.lineTo(100, 0)
	ctx.stroke()


	// 画完时针后，重置一下坐标到 90 度 ⌞ , ⚠️注意，坐标轴已经转过了，需要还原一下！
	ctx.restore()
	ctx.save() 


	// 最终绘制出的分针 —————
	ctx.beginPath()
	ctx.rotate(minuteRotate) //旋转坐标系,传入分针的角度
	ctx.lineWidth = 4
	ctx.strokeStyle = 'rgba(127 128 147)'
	ctx.moveTo(-30, 0)
	ctx.lineTo(100, 0)
	ctx.stroke()


	// 画完时针后，重置一下坐标到 90 度 ⌞ , ⚠️注意，坐标轴已经转过了，需要还原一下！
	ctx.restore()
	ctx.save() 


	// 最终绘制出的秒针 —————
	ctx.beginPath()
	ctx.rotate(secondRotate) //旋转坐标系,传入分针的角度
	ctx.lineWidth = 2
	ctx.strokeStyle = 'rgba(234 44 164)'
	ctx.moveTo(-50, 0)
	ctx.lineTo(100, 0)
	ctx.stroke()

	ctx.restore()
	ctx.restore()
	requestAnimationFrame(drawClock) //⚡️⚡️根据浏览器的刷新频率来自动执行函数!!
}


drawClock() //⚡️⚡️根据浏览器的刷新频率来自动执行函数!!



