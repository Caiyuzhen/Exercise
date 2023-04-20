// console.log(PIXI)
/*
	核心是 2D 图形库
		💠 核心类型
			Application
				Sprite(图片, 有异步的问题)  |  Text  |  Graphics
					Texture(可以只读取局部图片, 有异步的问题)  |  BaseTexture  |  Assets(没有异步的问题)

					Container

					DisplayObject

					AnimatedSprite  ->  动画类

					SpriteSheet   >  做元素变化的动画
		🍯 步骤
			1. 创建舞台  ——  初始化 Canvas
			2. 演员在后台准备  ——  后台加载/资源备用
			3. 演员上场  ——  元素在 Canvas 上进行绘制
			4. 演员进行表演  ——  元素在 Canvas 上进行变化
			5. ...
*/



const { Application, Container, Sprite, Texture, Assets, Text, Graphics, AnimatedSprite, BlurFilter, DisplacementFilter } = PIXI //解构取出 PIXI.JS 内的属性
// const ShockwaveFilter = PIXI.filters.ShockwaveFilter //解构出【⚡️外置滤镜库】

const ShockwaveFilter = PIXI.filters.ShockwaveFilter

// console.log(PIXI.filters)
// console.log(Application)
// console.log(PIXI.filters)







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
		// console.log(monster.width) //👀异步输出的数据才是正确的!
		// console.log(dog.width) //👀异步输出的数据才是正确的!
	},200)

	// console.log(oldMan.width) //👀没有异步的问题




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

	// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	/*
		元素的变化类型
		【🌟 类型 1  ——  持续性的变化】
		【🌟 类型 2  ——  元素本体的动态变化】
		【🌟 类型 3  ——  元素交互态的变化】
	 */

	// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	/* 🌟🌟🌟🌟🌟 持续变化 => app.ticker 是基于 requestanimationframe 来实现的
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




	// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	/* 🌟🌟🌟🌟🌟 元素自身的动态变化 => AnimatedSprite */

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

		// 把每张图片都加载出来, 然后 push 到上边的 finallyTextureArray 内
		// 底层用的好像是这个库 https://www.codeandweb.com/texturepacker
		// PIXI.SpriteSheet
		for(let i = 0; i < 6; i++) {
			// const texture = Texture.from(allRunningMan[i]) //⚡️方法一
			const texture = await Assets.load(allRunningMan[i])//⚡️方法二
			finallyTextureArray.push(texture)
		}

		// 🚀🚀 实例化 AnimatedSprite, 传入已经 load 出来处理成 Texture 的元素！
		const animatedOfRunMan= new AnimatedSprite(finallyTextureArray)

		app.stage.addChild(animatedOfRunMan) //🔥把设置好的动画元素渲染到舞台上
		animatedOfRunMan.animationSpeed = 0.1 //🔥设置动画的速度
		animatedOfRunMan.play() //🔥播放动画




	// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	/* 🌟🌟🌟🌟🌟 元素交互态的变化 => 比如点一个 canvas 元素后, 去改变 DOM, 或者点一个 canvas 元素然后去改变 canvas 元素, */
		// 例子	: 绘制一个按钮
		const button = new Graphics()
		button.beginFill('#3380FF')
		button.drawRect(0,0, 100,88) //位置  大小
		button.endFill()
		button.x = app.screen.width / 2 - button.width / 2
		button.y = 200
		app.stage.addChild(button)


		// 要被控制的另一个按钮
		const movebox = new Graphics()
		movebox.beginFill('#d8e123')
		movebox.drawRect(0,0, 300,300) //位置  大小
		movebox.endFill()
		movebox.x = -movebox.width
		movebox.y = 40
		app.stage.addChild(movebox)


		// console.log(gsap) //用 GSAP 来实现动画
		const obj = {
			x: -movebox.width //初始属性 -300
		}

		let boxIsShow = false
		button.interactive = true
		button.addEventListener('click', () => {

			if(!boxIsShow) { //如果没有出现, 就出现

				// 👇 gsap 的基础用法
				gsap.to(obj, {
					x: 380, // 要变到多少 （出现）
					duration: 1,
					onUpdate: () => { //当 x 变化时就会调用
						movebox.x = obj.x //要移动到的位置
						console.log('更新了:', obj.x)
					},
				})
				boxIsShow = !boxIsShow
			} else {

				// 👇 gsap 的基础用法
				gsap.to(obj, {
					x: -movebox.width, // 要变到多少 (回去)
					duration: 1,
					onUpdate: () => { //当 x 变化时就会调用
						movebox.x = obj.x //要移动到的位置
						console.log('更新了:', obj.x)
					},
				})
				boxIsShow = !boxIsShow
			}
		})


		// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
		// 让元素沿着某个方向去移动 - A
		const ball = new Graphics()
		ball.beginFill('#1b0000')
		ball.drawCircle(0,0,20)
		ball.endFill()
		ball.x = app.screen.width / 2 - 400
		ball.y = app.screen.height / 2 -100
		app.stage.addChild(ball)

		app.ticker.add(()=>{
			ball.x -= 1
			ball.y -= 1
		})
		


		// ⚡️让元素沿着某个方向去移动 - B
		// 三角函数, 可以参考以下网站 https://www.shuxuele.com/sine-cosine-tangent.html
		const ball2 = new Graphics()
		ball2.beginFill('#d01f9b')
		ball2.drawCircle(0,0,50)
		ball2.endFill()
		ball2.x = app.screen.width / 2
		ball2.y = app.screen.height / 2
		app.stage.addChild(ball2)

		
		let zz = 10 // 斜边 (🔥控制速度)
		let radian = 0.1 // 弧度值 (🔥控制方向)
		let xx = Math.cos(radian) * zz // ⚡️ 邻边 (当前运动到的值) -> 每次变化的值！
		let yy = Math.sin(radian) * zz // ⚡️ 对边 (当前运动的值) -> 每次变化的值！

		let ballX = ball.x // 承接累加起来的值
		let ballY = ball.y // 承接累加起来的值


		app.ticker.add(() => {
			ballX += xx
			ballY += yy

			ball2.x = ballX
			ball2.y = ballY

			// 🔥判断元素是否在边界内
				// 一些物理学的库: https://github.com/schteppe/p2.js/
				// 【🚀前提！】假设元素锚点已经移动到中心
				// ⚡️⚡️ 左边边界  ball2.x > ball2.width / 2
				// ⚡️⚡️ 右边边界  ball2.x < app.screen.width - ball2.width / 2
				// ⚡️⚡️ 上边边界  ball2.y> ball2.height / 2
				// ⚡️⚡️ 下边边界  ball2.y < app.screen.height - ball2.height / 2
		
			if(ball2.x <= ball2.width / 2 || ball2.x >= app.screen.width - ball2.width / 2) { //在左右内
				console.log('出左边界 或 出右边界')
				radian = Math.PI - radian //⚡️⚡️ 派 - 弧度值（入射角） = 反射角
				xx = Math.cos(radian) * zz 
				yy = Math.sin(radian) * zz

			} else if(ball2.y <= ball2.height / 2 || ball2.y >= app.screen.height - ball2.height / 2) {
				console.log('出上边界 或 出下边界')
				radian = 2 * Math.PI - radian //因为派转过去了, 所以 X 2 派
				xx = Math.cos(radian) * zz 
				yy = Math.sin(radian) * zz
			}
		})


		// 👀 滤镜效果 ————————————————————————————————————————————————————————————————————————————————————————————————
		// 滤镜 api文档 https://filters.pixijs.download/main/docs/index.html
		// 总文档 pixijs.download/release/docs/PIXI.Filter.html
		// 效果预览 https://filters.pixijs.download/main/demo/index.html?enabled=KawaseBlurFilter

		// 🌟 模糊滤镜 🌟
		const blurFilter = new BlurFilter()
		blurFilter.strength = 1 // 模糊程度
		// blurFilter.quality = 1 // 模糊质量
		blurFilter.blur =12 // 模糊程度
		monster.filters = [blurFilter] // 🚀给元素添加滤镜(要用一个数组, 因为可以添加多个滤镜)



		// 🌟 置换滤镜 DisplacementFilter 🌟
		const container = new Container();

		// 黑白置换的材质元素
		Assets.add('replaceImg', 'src/img/water.png')
		const replaceImg = await Assets.load('replaceImg')
		const replaceTexture = new Sprite(replaceImg)
		replaceTexture.scale.set(7.5)  //👈👈控制置换的程度
		replaceTexture.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT //🔥🔥让纹理进行重复！！
		app.stage.addChild(replaceTexture)


		// 要被置换滤镜的 target 图片
		Assets.add('ui', 'src/img/scene.jpg')
		const sceneEleLoad = await Assets.load('ui')
		const scene = new Sprite(sceneEleLoad)
		scene.scale.set(0.1) 
		scene.addChild(replaceTexture) //🔥🔥置换滤镜要添加为图片的子集！不然 texture 会撑满图片！！
		app.stage.addChild(scene)

		

		// 将元素添加到容器中
		// container.addChild(replaceTexture, scene)
		// app.stage.addChild(container)


		// 将元素前置一层(前提是两个元素都需要在容器内！！)
		// container.setChildIndex(replaceTexture, container.getChildIndex(replaceTexture) + 1)


		const displacementFilter = new DisplacementFilter(replaceTexture) //给纹理元素添加置换滤镜
		scene.filters = [displacementFilter] //把添加过置换滤镜的纹理元素添加到目标元素上
		

		// 🔥🔥让图片产生持续变化的效果
		app.ticker.add(() => {
			replaceTexture.x += 1 // 改变滤镜的位置, 就能实现不断动的效果了, 因为滤镜已经是图片的子元素, 并且滤镜是无限平铺的
		})

		// 鼠标 hover 时, 改变滤镜的位置
		scene.interactive = true
		scene.on('pointermove', (e) => {
			replaceTexture.x = e.data.global.x // e.data.x 表示鼠标的 x 位置
			replaceTexture.y = e.data.global.y // e.data.y 表示鼠标的 y 位置
			// console.log(e.data.global.x, e.data.global.y)
		})





		// 🌟 水波纹滤镜 🌟  new ShockwaveFilter (center, options, time)
		// 要被添加波纹效果的的 target 图片
		Assets.add('waveImg', 'src/img/back.jpg')
		const waveImgEleLoad = await Assets.load('waveImg')
		const waveImg = new Sprite(waveImgEleLoad)
		waveImg.x = 0
		waveImg.scale.set(0.2) 
		waveImg.addChild(replaceTexture) //🔥🔥置换滤镜要添加为图片的子集！不然 texture 会撑满图片！！
		app.stage.addChild(waveImg)

		const wave = new ShockwaveFilter([300, 300], {
			radius: 200,
			wavelength: 100,
			amplitude: 20,
			speed: 80
		}, 0) //👈time = 0 , 让 time 值变大的话波纹就会展开


		// 给图片添加波纹效果
		waveImg.filters = [wave] //因为可以添加多个滤镜, 所以是个数组
		// console.log(wave)

		app.ticker.add((delta) => { //回调的执行的时间差 -> delta
			wave.time += 0.05
			if(wave.time > 3) { //如果波纹展开后, 的时间大于 3 秒, 就重置波纹
				wave.time = 0
			}
		})

		// 🔥 鼠标点哪里, 哪里就有波纹 （可以多做几个 filter， 就可以实现多个波纹的效果了）
		waveImg.interactive = true
		waveImg.on('click', (e) => {
			wave.center = [e.client.x, e.client.y] //🔥改变波纹中心
		})
}




main()







