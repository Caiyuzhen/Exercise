// console.log(PIXI)
/*
	核心是 2D 图形库
		步骤
			1. 创建舞台  ——  初始化 Canvas
			2. 演员在后台准备  ——  后台加载/资源备用
			3. 演员上场  ——  元素在 Canvas 上进行绘制
			4. 演员进行表演  ——  元素在 Canvas 上进行变化
			5. ...
*/
const { Application } = PIXI //取出属性
// console.log(Application)


// 1. 创建一个 Canvas 元素, 然后添加到 DOM 上
const app = new Application({
	//height: 1200 //固定值
	// width: 800 //固定值
	resizeTo : window, // 可以设置为跟 浏览器一样大
	resolution: window.devicePixelRatio || 1, // 像素比（分辨率）, 默认为 1 
	autoDensity: true, //👆上面的属性设置后, 就一定要设置这个属性, 不然高倍屏下元素会被放大
	backgroundColor: '#3380FF',
})

// 把 Canvas 添加到 DOM 上, viw 就是一个 Canvas 元素
document.body.appendChild(app.view)