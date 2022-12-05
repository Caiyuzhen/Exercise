// 初始化
const appleCanvas = document.getElementById("appleCanvas")
appleCanvas.width = window.innerWidth //浏览器的宽度
appleCanvas.height = window.innerHeight //浏览器的高度
appleCanvas.style.background = 'black'
const ctx = appleCanvas.getContext('2d')
ctx.save() //保存最开始的初始状态


// 让图片居中点的方法 = (canvas 宽度 - 图片宽度) / 2 , 负数也可以居中
function calDrawStartPos(img) {
	const x = (appleCanvas.width - img.width) / 2
	const y = (appleCanvas.height - img.height) / 2
	return { x, y }
}


// 存放所有图片的数组
const imgArr = []
let imgCount = 0 //当前图片的索引, 通过这个索引来取上面那个数组的资源


// 初始化, 创建所有图片, 线上环境需要考虑让所有图片加载完毕后才可以【开始滚动】
function initImg() {
	for(let i = 1; i < 64; i++) {
		// 绘制图片
		const img = new Image()

		// 1~9 位时候, 前面补 0, 例如 1 -> 0001, 也可以用三元运算符来做
		if(i < 10) {
			img.src = `../../../resources/airpod/000${i}.png`
		}else{
			img.src = `../../../resources/airpod/00${i}.png`
		}
		imgArr.push(img)
	}
	console.log(imgArr);
}

initImg()



// 异步绘制图片(先绘制一张)
imgArr[imgCount].onload = (e) => {
	const startPos = calDrawStartPos(e.target) //e.target 就是图片本身, startPos 就是计算出来的让图片【从居中点】开始点绘制的方法
	ctx.drawImage(e.target, startPos.x, startPos.y) //图片源，绘制的坐标
	console.log('第一张的位置:', startPos);
}


// 滚轮事件: 绘制图片的方法（按顺序来绘制）
window.addEventListener('wheel', (e) => {
	console.log(e.deltaY);
	if(e.deltaY > 2 && imgCount < 63) {//滚轮网上滚动
		const startPos = calDrawStartPos(imgArr[imgCount]) //imgArr[imgCount] 就是图片本身, startPos 就是计算出来的让图片【从居中点】开始点绘制的方法
		ctx.clearRect(0, 0, appleCanvas.width, appleCanvas.height) //清除画布
		ctx.drawImage(imgArr[imgCount], startPos.x, startPos.y) //图片源，绘制的坐标
		imgCount ++ //滚动时候, 让索引位增加, 从而取下一张图片
		console.log(
			'正向滚动的位置:', startPos, 
			'当前第几张:', imgCount
			);
	} 
	else if(e.delayY < -2 && imgCount > 1) { //反方向往下滚动(滚轮往上 < 0, 并且索引位大于 0, 相当于反向出现图片
		const startPos = calDrawStartPos(imgArr[imgCount]) //imgArr[imgCount] 就是图片本身, startPos 就是计算出来的让图片【从居中点】开始点绘制的方法
		ctx.clearRect(0, 0, appleCanvas.width, appleCanvas.height) //清除画布
		ctx.drawImage(imgArr[imgCount], startPos.x, startPos.y)
		imgCount --
		console.log(
			'反向滚动的位置:', startPos, 
			'当前第几张:', imgCount
			);
	}
})



//————————————————————————————————————————————————————————————————————————————————————
// ⛰️监听浏览器窗口大小变化, 窗口变化后重居中图片(记得 restore 一下, 不然会出现图片重叠的情况)
// window.onresize = () => {
// 	// 重新获取浏览器的宽高
// 	appleCanvas.width = window.innerWidth //浏览器的宽度
// 	appleCanvas.height = window.innerHeight //浏览器的高度
// 	ctx.clearRect(0, 0, window.innerWidth , window.innerHeight)
// 	const startPos = calDrawStartPos(img0) //e.target 就是图片本身, startPos 就是计算出来的让图片【从居中点】开始点绘制的方法
// 	ctx.drawImage(img0, startPos.x, startPos.y) //图片源，绘制的坐标
// 	console.log(startPos);
// }


// 异步绘制图片
// img0.onload = (e) => {
// 	const startPos = calDrawStartPos(e.target) //e.target 就是图片本身, startPos 就是计算出来的让图片【从居中点】开始点绘制的方法
// 	ctx.drawImage(e.target, startPos.x, startPos.y) //图片源，绘制的坐标
// }
//————————————————————————————————————————————————————————————————————————————————————
