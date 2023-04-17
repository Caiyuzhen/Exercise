// console.log(PIXI)
/*
	核心是 2D 图形库
		💠 核心类型
			Application
				Sprite(图片, 有异步的问题)  |  Text  |  Graphics
					Texture(可以只读取局部图片, 有异步的问题)  |  BaseTexture  |  Assets(没有异步的问题)
		🍯 步骤
			1. 创建舞台  ——  初始化 Canvas
			2. 演员在后台准备  ——  后台加载/资源备用
			3. 演员上场  ——  元素在 Canvas 上进行绘制
			4. 演员进行表演  ——  元素在 Canvas 上进行变化
			5. ...
*/



const { Application, Container, Sprite, Texture, Assets, Text, Graphics } = PIXI //取出属性
// console.log(Application)




async function main() {

	// ⚡️1. 创建一个 Canvas 元素, 然后添加到 DOM 上 ——————————————————————————————————————————————————————————————————
	const app = new Application({ //app 则是管理整个舞台的实例
		//height: 1200 //固定值
		// width: 800 //固定值
		resizeTo : window, // 可以设置为跟 浏览器一样大
		resolution: window.devicePixelRatio || 1, // 像素比（分辨率）, 默认为 1 
		autoDensity: true, //👆上面的属性设置后, 就一定要设置这个属性, 不然高倍屏下元素会被放大
		backgroundColor: '#ece7ff',
	})

	document.body.appendChild(app.view) // 把 Canvas 添加到 DOM 上, viw 就是一个 Canvas 元素







	// ⚡️2. 演员在后台准备 ——————————————————————————————————————————————————————————————————
	// 🌝🌝 添加图形元素 - 方法一(有异步的问题):
	const sprite = Sprite.from('./src/img/character.png')//本质上也是生成一个 Texture 类型的数据在内存呢当中


	// 🌝🌝 添加图形元素 - 方法二(有异步的问题):
	const texture = Texture.from('./src/img/character2.png')
	const sprite2 = new Sprite(texture)


	// 🌝🌝 添加图形元素 - 方法三(没有异步的问题):
	Assets.add('abcMan', './src/img/character3.png') //相当于先在内存地址上【标记】一份数据
	const texture3 = await Assets.load('abcMan') //读取【标记】在 Assets 的数据
	const sprite3 = new Sprite(texture3)


	// 🌝🌝 内嵌字体的方式
	await Assets.load('./src/font/FuturaNowHeadlineBlack.ttf')


	// 🌝🌝 添加文字元素
	const smartText = new Text('Zeno\nDesign', {
		fontFamily: 'FuturaNowHeadlineBlack',
		fontSize: 64,
		lineHeight: 32,
		fill: '#191970',
		align: 'center',
		wordWrap: true,//允许文本换行
		wordWrapWidth: 2 //换行的宽度
	})


	// 🌝🌝 添加图形（矩形）元素  ——  相当于画了一个图形并贴在一个平面上, 可以独立控制, 比如 clear
	const rect = new Graphics()
	rect.beginFill('#70195f')
	.drawRect(0, 0, 90, 90) //坐标 + 尺寸
	.endFill() //可以链式的调用, 因为都会返回 rect 本身！


	// 🌝🌝 添加图形（圆角矩形）元素  ——  相当于画了一个图形并贴在一个平面上, 可以独立控制, 比如 clear
	const roundRect = new Graphics()
	rect.beginFill('#b7663d')
	.drawRoundedRect(400, 20, 80, 80, 20) //坐标 + 尺寸
	.endFill() 
	//可以链式的调用, 因为都会返回 rect 本身！可以继续画第二个图形
	.beginFill('#0b8d7e')
	.drawRoundedRect(800, 20, 100, 100, 12) 


	// 🌝🌝 添加图形（线段）元素  ——  相当于画了一个图形并贴在一个平面上, 可以独立控制, 比如 clear
	const line = new Graphics()
	line.lineStyle(10, '#25c399', 1)
	.moveTo(600, 40)
	.lineTo(100, 300)






	// ⚡️3. 演员上场 ——————————————————————————————————————————————————————————————————
	app.stage.addChild(sprite, sprite2, sprite3) //后添加会盖住先添加的
	app.stage.addChild(smartText)
	app.stage.addChild(rect, roundRect, line)

	// 也可以用打组的方式进行添加
	// const container = new Container()
	// container.addChild(sprite, sprite2, sprite3)
	// app.stage.addChild(container)

	setTimeout(()=>{
		console.log(sprite.width) //👀异步输出的数据才是正确的!
		console.log(sprite2.width) //👀异步输出的数据才是正确的!
	},200)

	console.log(sprite3.width) //👀没有异步的问题




	// ⚡️4. 演员进行表演 ——————————————————————————————————————————————————————————————————

	// 【坐标 & 位置属性】
	smartText.position.x = 320 //因为添加到 stage 上，所以默认坐标为 0,0 


	//【坐标中心】
	// x , y , anchor(参考点\旋转中心\相对于上一层父元素，如果上一层为 container, 那么就是相对于上一层的坐标点)
	// 本地坐标跟世界坐标可以相互转化 toLocal <=> toGlobal
	smartText.anchor.set(0.5, 0.5) //中心 50%

	// anchor =>  0~1 相对于父级
	// pivot =>  自定义具体坐标值 (更精确)
	

	// 【画布及渲染器属性】
	// canvas 大小(渲染器渲染效果大小)  =>  app.screen //⚡️建议用这个
	// 画布的大小  =>  app.view
	console.log("渲染效果大小:" + app.screen.width, "画布大小:" + app.view.width)

	//比如让元素跑到中央
	sprite.x = app.screen.width / 2 - sprite.width / 2 // (🚀🚀减去元素自身宽度的一半, 注意需要 anchor 为 0,0, 如果为 0.5, 0.5 则不需要减去自身的一半了！)
	sprite.y = app.screen.height / 2 - sprite.height / 2 // (🚀🚀减去元素自身高度的一半, 注意需要 anchor 为 0,0, 如果为 0.5, 0.5 则不需要减去自身的一半了！)


	//【旋转】
	// angle degree  (角度值)
	// rotation radians(弧度值 3.1415926)
	smartText.anchor.set(0.5) //先设置一下旋转中心
	smartText.rotation = Math.PI / 2 //旋转 90 度



	// 【缩放和斜切】 scale 和 skew
	sprite2.scale.x = 0.9
	sprite3.scale.set(0.8, 0.8)


	// 【透明度】
	sprite3.alpha = 0.5


	// 【隐藏元素】
	// visible => 不渲染   数据不更新   包括子元素
	//  renderable => 不渲染  但是数据会更新  不影响子元素
	sprite2.renderable = false



	// 【蒙版遮罩】
	const testCircle = new Graphics()
	testCircle.beginFill('black')
	.drawCircle(0 , 0 , 50)
	.endFill()

	testCircle.x = 200
	testCircle.y = 200
	app.stage.addChild(testCircle)

}




main()







