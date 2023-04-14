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
	.drawRect(0, 0, 200, 200) //坐标 + 尺寸
	.endFill() //可以链式的调用, 因为都会返回 rect 本身！


	// 🌝🌝 添加图形（圆角矩形）元素  ——  相当于画了一个图形并贴在一个平面上, 可以独立控制, 比如 clear
	const roundRect = new Graphics()
	rect.beginFill('#70195f')
	.drawRoundedRect(400, 20, 200, 200, 20) //坐标 + 尺寸
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
	app.stage.addChild(sprite, sprite2, sprite3)
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
	smartText.position.x = 320

}




main()







