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



const { Application, Container, Sprite, Texture, Assets, Text, Graphics, AnimatedSprite } = PIXI //取出属性
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
	const monster = Sprite.from('./src/img/character.png')//本质上也是生成一个 Texture 类型的数据在内存呢当中


	// 🌝🌝 添加图形元素 - 方法二(有异步的问题):
	const texture = Texture.from('./src/img/character2.png')
	const dog = new Sprite(texture)


	// 🌝🌝 添加图形元素 - 方法三(没有异步的问题):
	Assets.add('abcMan', './src/img/character3.png') //相当于先在内存地址上【标记】一份数据
	const texture3 = await Assets.load('abcMan') //读取【标记】在 Assets 的数据
	const oldMan = new Sprite(texture3)


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
	// 添加第一个矩形
	roundRect.beginFill('#b7663d')
	.drawRoundedRect(400, 20, 80, 80, 20) //坐标 + 尺寸
	.endFill() 
	//添加第二个矩形, 可以链式的调用, 因为都会返回 rect 本身！可以继续画第二个图形
	.beginFill('#0b8d7e')
	.drawRoundedRect(800, 20, 100, 100, 12) 



	// 🌝🌝 添加图形（线段）元素  ——  相当于画了一个图形并贴在一个平面上, 可以独立控制, 比如 clear
	const line = new Graphics()
	line.lineStyle(10, '#25c399', 1)
	.moveTo(600, 40)
	.lineTo(100, 300)






	// ⚡️3. 演员上场(添加到 stage 上, 只是一个绘制的时机) ——————————————————————————————————————————————————————————————————
	app.stage.addChild(monster, dog, oldMan) //后添加会盖住先添加的
	app.stage.addChild(smartText)
	app.stage.addChild(rect, roundRect, line)

	// 也可以用打组的方式进行添加
	// const container = new Container()
	// container.addChild(sprite, dog, oldMan)
	// app.stage.addChild(container)

	setTimeout(()=>{
		console.log(monster.width) //👀异步输出的数据才是正确的!
		console.log(dog.width) //👀异步输出的数据才是正确的!
	},200)

	console.log(oldMan.width) //👀没有异步的问题




	// ⚡️4. 演员进行表演 (设置元素的属性, 🚀🚀需要在元素添加到舞台上后再设置属性！因为是 WebGL 的渲染机制, 元素是一直在绘制的) ——————————————————————————————————————————————————————————————————

	// 【坐标 & 位置属性】
	smartText.position.x = 320 //因为添加到 stage 上，所以默认坐标为 0,0 



	//【坐标中心】
	/* 
		x , y , anchor(参考点\旋转中心\相对于上一层父元素，如果上一层为 container, 那么就是相对于上一层的坐标点)
	 	本地坐标跟世界坐标可以相互转化 toLocal <=> toGlobal
			
		anchor =>  0~1 相对于父级
		pivot =>  自定义具体坐标值 (更精确)

	 */
	smartText.anchor.set(0.5, 0.5) //中心 50%
	// smartText.anchor.x = 0.5
	// smartText.anchor.y = 0.5
	

	// 【画布及渲染器属性】
	// canvas 大小(渲染器渲染效果大小)  =>  app.screen //⚡️建议用这个
	// 画布的大小  =>  app.view
	console.log("渲染效果大小:" + app.screen.width, "画布大小:" + app.view.width)

	//比如让元素跑到中央
	monster.x = app.screen.width / 2 - monster.width / 2 // (🚀🚀减去元素自身宽度的一半, 注意需要 anchor 为 0,0, 如果为 0.5, 0.5 则不需要减去自身的一半了！)
	monster.y = app.screen.height / 2 - monster.height / 2 // (🚀🚀减去元素自身高度的一半, 注意需要 anchor 为 0,0, 如果为 0.5, 0.5 则不需要减去自身的一半了！)


	//【旋转】
	// angle degree  (角度值)
	// rotation radians(弧度值 3.1415926)
	smartText.anchor.set(0.5) //先设置一下旋转中心
	smartText.rotation = Math.PI / 2 //旋转 90 度



	// 【缩放和斜切】 scale 和 skew
	dog.scale.x = 0.9
	oldMan.scale.set(0.8, 0.8)


	// 【透明度】
	oldMan.alpha = 0.5


	// 【隐藏元素】
	// visible => 不渲染   数据不更新   包括子元素
	//  renderable => 不渲染  但是数据会更新  不影响子元素
	dog.renderable = false



	// 【蒙版遮罩】
	const testCircle = new Graphics()
	testCircle.beginFill('black')
	.drawCircle(0 , 0 , 120)
	.endFill()

	testCircle.x = 240
	testCircle.y = 140
	app.stage.addChild(testCircle)
	oldMan.addChild(testCircle)// 🔥建议先把蒙版添加到 oldMan 身上去, 因为父元素可能会移动, 这时候作为子元素的 mask 可以跟着一起动
	oldMan.mask = testCircle //🔥用圆形裁切 oldMan


	// 【⚡️添加交互】
	oldMan.eventMode = 'static'
	// interactive = true //7.02 版本后被废弃了, 改用上面的属性
	// 方法一:
	oldMan.addEventListener('click', () => {
		console.log('点了我')
	})

	// 方法二:
	oldMan.onmousemove = () => {
		console.log('移过我')
	}

	oldMan.onrightclick = () => {
		console.log('右键点了我')
	}


	/*
		元素的变化类型
		【🌟 类型 1  ——  持续性的变化】
		【🌟 类型 2  ——  元素本体的动态变化】
		【🌟 类型 3  ——  元素交互态的变化】
	 */


	/*⚡️⚡️⚡️⚡️⚡️ 持续变化 => app.ticker 是基于 requestanimationframe 来实现的
			app.ticker.add  -> 持续添加
			app.ticker.addOne -> 只添加一次
			app.ticker.destroy -> 销毁
			app.ticker.remove -> 移除
	*/
	

		// ⭕️ 【无限旋转】
		smartText.eventMode = 'static'

		function roatateFn() { //⚡️需要有个函数的标识符,不然没法移除这个函数
			smartText.angle += 1 //让角度不断 + 1 就能旋转
		}

		smartText.addEventListener('mouseenter', () => {
			app.ticker.remove(roatateFn)
		})

		smartText.addEventListener('mouseout', () => {
			app.ticker.add(roatateFn)
		})

		app.ticker.add(roatateFn) //运用一直旋转的函数
		


		// 👉 【平移】
		app.ticker.add(()=>{
			oldMan.x += 1
		})


	/*⚡️⚡️⚡️⚡️⚡️ 元素自身的动态变化 => AnimatedSprite
	*/

	// 列举出所有元素的索引路径
	const allRunningMan = [
		'./src/img/runningMan/run_1.png',
		'./src/img/runningMan/run_2.png',
		'./src/img/runningMan/run_3.png',
		'./src/img/runningMan/run_4.png',
		'./src/img/runningMan/run_5.png',
		'./src/img/runningMan/run_6.png'
	]

	// 用于存放最终要渲染的材质的实例
	const finallyTextureArray = []
	for(let i = 0; i < 6; i++) {
		// const texture = Texture.from(allRunningMan[i]) //⚡️方法一
		const texture = await Assets.load(allRunningMan[i])//⚡️方法二
		finallyTextureArray.push(texture)
	}

	// 🚀🚀 实例化 AnimatedSprite, 传入已经 load 出来处理成 Texture 的元素！
	const animatedOfRunMan= new AnimatedSprite(finallyTextureArray)

	app.stage.addChild(animatedOfRunMan) //🔥把设置好的动画元素渲染到舞台上
	animatedOfRunMan.animationSpeed = 0.2 //🔥设置动画的速度
	animatedOfRunMan.play() //🔥播放动画



	/*⚡️⚡️⚡️⚡️⚡️ 元素交互态的变化 => 
	*/
}




main()







