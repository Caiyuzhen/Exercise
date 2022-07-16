class SlideBar {

	constructor(){
		//🔥记录是否按下鼠标了
		this.isDown = false
	}

	//进度条
	static controlBar = document.querySelector('.control-bar')
	//要被拖动的圆点
	static touchCircle = document.querySelector('.touch-circle')
	//白色进度
	static progressLine = document.querySelector('.progress-line')
	//底部的大文字
	static controlText = document.querySelector('.card-titles')
	
	//🔥记录（原点）跟（手指拖动）的距离数据
	static moveInfo = {}
	


	
	//⚡️初始化时候要做的一些基础的计算
	static basicCalculate(){
		//🌟圆点最大移动距离 maxMoveWidth = 进度条宽度 - 圆点的宽度
		const slideSpanWidth = this.controlBar.getBoundingClientRect().width - this.touchCircle.getBoundingClientRect().width
		this.moveInfo.maxMoveWidth = Math.round(slideSpanWidth) //四舍五入
		// console.log(this.moveInfo.maxMoveWidth) //算出最大距离为：635px
		
		//🌟获取底部标题字的初始大小
		this.moveInfo.fontSize = parseInt(getComputedStyle(this.controlText).fontSize)//取小数点前两位
		// console.log(this.moveInfo.fontSize) //初始字体大小为：16
	}
	
	
	
	//🔥添加【⭕️圆点】的事件
	static setEvents(){
			//按下事件—————————————————
			this.touchCircle.addEventListener('touchstart',(e)=>{
				// 防止页面上下滚动
				e.preventDefault()
				// console.log('点击了')
				/*
					因为只是横向拖动 所以主要记录两个数据
					一个是手指按下去时候的x坐标点  然后是按下去的时候 圆点已经有的transform的值 因为有可能圆点并不是在初始位置
				*/
				//获得元素的所有最新数据
				const transform = getComputedStyle(this.touchCircle).transform 
				//获得元素的坐标象限
				const matrix = new DOMMatrixReadOnly(transform) 
				//定义一个变量，记录按下时⭕️圆点的 X 坐标
				this.moveInfo.basicTransX = Math.round(matrix.m41)
				//定义一个变量，记录手指👋按下的 X 坐标 (🔥移动端这会记录一连串坐标！记得取[0]!)
				this.moveInfo.startX = Math.round(e.changedTouches[0].clientX)
				// console.log(this.moveInfo)
				// this.isDown = true //确认点下了
			},{passive:false})
			

			
			//移动事件 ——————————————
			//👇PC 端的写法，移动端则不需要判断是否点下了
			// this.touchCircle.addEventListener('mousemove',(e)=>{
			// 	//🌟计算圆点跟随【拖动到哪儿的距离】 = (移动中手指的x坐标) 减去 (一开始 start X 坐标) + (已有的圆点的 X 坐标值 basicTransX) 
			// 	//👇PC 端的写法，移动端则不需要判断是否点下了
			// 	if(this.isDown){
			// 		let tranX = e.clientX - this.moveInfo.startX + this.moveInfo.basicTransX
			// 		console.log(tranX)
			//		赋值给点中的原点
			// 		e.currentTarget.style.transform = `translateX(${tranX}px)`
			// 	}else{
			// 		return
			// 	}
			// })
			this.touchCircle.addEventListener('touchmove',(e)=>{
				// 防止页面上下滚动
				e.preventDefault()
				

				//🌟计算圆点跟随【拖动到哪儿的距离】 = (移动中手指的x坐标) 减去 (一开始 start X 坐标) + (已有的圆点的 X 坐标值 basicTransX) 
				let transX = e.changedTouches[0].clientX - this.moveInfo.startX + this.moveInfo.basicTransX
				
				//判断圆点移动的最大最小值
				if(transX < 0){
					transX = 0 //最左边
				}else if(transX > this.moveInfo.maxMoveWidth){
					transX = this.moveInfo.maxMoveWidth //最右边
				}
				//🌟赋值给点到的原点，让原点跟着能够拖动起来
				e.currentTarget.style.transform = `translateX(${transX}px)`

				//🌟让进度条跟随移动
				/*
					-320 ~ 0 
					0    ~ 320
					TransX - 320 = progressBar的移动距离
				*/
				this.progressLine.style.transform = `translateX(${transX-this.moveInfo.maxMoveWidth}px)`

				//计算总长度跟移动距离的比例，然后用于控制文字的大小
				const percentRation = (transX / this.moveInfo.maxMoveWidth) 

				//利用比例 * 原始大小来改变文字大小
				this.controlText.style.fontSize = this.moveInfo.fontSize * (1 + percentRation) + 'px'
				// console.log(this.controlText.style.fontSize);

			},{passive:false})
	}
	

	//SlideBar 初始化要调用的方法，集中放这里
	static sliderBarinit(){
		this.setEvents()
		this.basicCalculate()
	}
}




//🌟🌟🌟————————————————————————————————————————————————————————————————————————————




class Card {
	constructor(CARD_DATA) {
		this.domCard = Card.mockCard.cloneNode(true) //生成大 Card 二：克隆卡片
		// console.log(this.domCard)//打印 4 个 one-card div 元素
		// this.appendCard()//生成大 Card 五：调用添加卡片到容器内的方法(因为默认只展示一个，所以这一步省去)
		this.littleCardDom = Card.mockLittleCard.cloneNode(true)
		this.initCardContent(CARD_DATA)//生成大 Card 三：调用方法，传入数据
		// console.log(this.domCard);
	}
	
	//获取大卡片容器
	static cardStage = document.querySelector('.card-stage')
	//获取大卡片
	static mockCard = document.querySelector('.one-card')
	//获取小卡片容器
	static littleCardBox = document.querySelector('.card-click-stage')
	//获取小卡片
	static mockLittleCard = document.querySelector('.card-color-board')
	//获取大卡片基础的样式信息
	static basicCardInfo = this.mockCard.getBoundingClientRect()
	

	//初始化时，删除旧的大小卡片
	static cardRemove(){
		this.mockCard.remove()
		this.mockLittleCard.remove()
	}
	
	
	//生成大 Card 一：注入大卡片内容  +  小卡片内容
	initCardContent(CARD_DATA){
		const {texts,color,detailText,imgUrl,colorName} = CARD_DATA
		//大卡片内容
		this.domCard.style.backgroundColor = color
		this.domCard.firstElementChild.firstElementChild.innerText = detailText//🔥🔥用子元素的子元素去选到文字！
		this.domCard.firstElementChild.lastElementChild.src = imgUrl
		//小卡片内容
		this.littleCardDom.style.backgroundColor = color
		this.littleCardDom.firstElementChild.innerText = colorName[0].toUpperCase()
	}

	//生成大 Card 四：添加卡片到卡片容器内的方法，注意这里要结合第 7 步来使用！默认先展示一个
	appendCard(){
		Card.cardStage.appendChild(this.domCard) //🔥注意这里使用 Card 类来调用！
	}

	//设置大 + 小卡片的宽和高 可以保证每个卡片的尺寸一模一样
	setCardSize() {
		this.domCard.style.width = Card.basicCardInfo.width + 'px' //🔥注意，这里要用 Card 类来调用 basicCardInfo！！
		this.domCard.style.height = Card.basicCardInfo.height + 'px' //🔥注意，这里要用 Card 类来调用 basicCardInfo！！
	}

	//小卡片添加到父元素中（容器）
	appendLittleCard(){
		Card.littleCardBox.appendChild(this.littleCardDom) //🔥注意这里使用 Card 类来调用！
		// Card.littleCardBox.style.padding = '0 2rem 0 12rem;'
	}
	
}





//🌟🌟🌟————————————————————————————————————————————————————————————————————————————





class AppController  {
	// 所有大卡片的信息数据
	static CARD_DATAS = [
        // texts,color,detailText,imgUrl
	    {
	      texts:['Keep',"Learning","Code"],
	      color:'#4700D8',
	      colorName:'blue',
	      detailText:'There are going to be days where you’re undone, stressed out, tired, spent. And I’ll still love you just as much in those moments as I ever have, maybe even a little more, because it’ll mean you let me get close enough to know the real you. That’s all I want. ',
	      imgUrl:'./assets/page1.png'
	    },
	    {
	      texts:['Coding',"Is","Fun"],
	      color:'#E84A5F',
	      colorName:'red',
	      detailText:'Ask me to define my love for you and I’ll say it’s captured in every beautiful memory of our past, detailed out in the vivid visions of our dreams, and future plans, but most of all it’s right now, in the moment where everything I’ve ever wanted in my life is standing right in front of me and smiling. ',
	      imgUrl:'./assets/page2.png'
	    },
	    {
	      texts:["Create","Some","Difference"],
	      color:'#17B978',
	      colorName:'Green',
	      detailText:'I love you the way a drowning man loves air. And it would destroy me to have  you just a little.',
	      imgUrl:'./assets/page3.png'
	    },
	    {
	      texts:['Never',"Stop","Learning"],
	      color:'#892CDC',
	      colorName:'purple',
	      detailText:'There is never a time or place for true love. It happens accidentally, in a heartbeat, in a single flashing, throbbing moment.',
	      imgUrl:'./assets/page4.png'
	    },
	    {
	      texts:['Enjoy',"Your","Time"],
	      color:'#F8CB2E',
	      colorName:'yellow',
	      detailText:'The problems of your past are your business. The problems of your future are my privilege.',
	      imgUrl:'./assets/page5.png'
	    }
	]
	
	// 所有 Card 卡片的【实例】的数组，【不只 one-card div！】，🔥🔥🔥还包括了小卡片的数组，因为都在整个 Card 的实例中！！！
	static ALL_CARDS = []
	
	//🔥判断当前页面中出现的大卡片的索引位置
	static CURRENT_INDEX = 0 

	//获取大卡片的容器
	static cardStage = document.querySelector('.card-stage')


	//——————————————————————————————————————————————————————————————————————


	//生成大 Card 六：让大卡片实例化，遍历并传入 CARD_DATA 数据🌟🌟
	static createCard(){
		this.CARD_DATAS.forEach((dataItem,index)=>{
			this.ALL_CARDS.push(new Card(dataItem)) //实例化 Card
		})
	}
	

	//🌟🌟生成大 Card 七：初始化所有大卡片，让卡片一个一个出来, 默认让其它其他隐藏
	static cardInit(){
		this.ALL_CARDS.forEach((cardInstance,index)=>{ //cardInstance就是 Card() 实例！
			// console.log(cardInstance);
			if(index===0){
				cardInstance.appendCard()
			}else{
				//其他的大卡片先隐藏, 放好隐藏后的位置，让后面出来后有个动画
				cardInstance.domCard.style.position = 'absolute' //用绝对定位让卡片都叠在一起
				cardInstance.domCard.style.top = '2rem'
				cardInstance.domCard.style.transform = 'translateY(60px)'
				cardInstance.domCard.style.opacity = '0'
				// console.log(cardInstance.domCard)  //cardInstance.domCard 这个才是具体的 div！
				//让小卡片的第一张默认最大，其他则缩小
				cardInstance.littleCardDom.style.transform = 'scale(0.8)'
				cardInstance.appendCard() //上面藏好后再把它们添加到 DOM 树上
			}
			//同时也设置卡片的大小
			cardInstance.setCardSize() 
			//同时也生成小卡片，把小卡片添加到文档树中
			cardInstance.appendLittleCard()
		})	
	}


	//————————————————————————————————————————————————————————————————————


	//🤌卡片的点击交互⚡️
	static cardSetUpEvent(){
		
		//💠 计算中心点的方法
		function calCenterPos(CARD_INFO){
			//💠 计算中心点一：定义计算大卡片的中心点的方法(卡片距离画布左边的距离 + 卡片的宽度的一半)
			const CENTER_X =  Math.round(CARD_INFO.left) + Math.round(CARD_INFO.width / 2)
			const CENTER_Y =  Math.round(CARD_INFO.top) + Math.round(CARD_INFO.height / 2)
			return {
				CENTER_X,	//卡片的中心点的 X 坐标
				CENTER_Y,	//卡片的中心点的 Y 坐标
				CARD_HALF_WIDTH: Math.round(CARD_INFO.width / 2), //卡片的一半宽度
				CARD_HALF_HEIGHT: Math.round(CARD_INFO.height / 2), //卡片的一半高度
			}
		}

		//👋手指点击卡片时候卡片旋转的方法
		//🌟计算公式为-> 最大旋转值 rotateX * 【手指接触点】与【卡片中心点的距离】 / 卡片的一半
		function cardTransMove( e, type ){
			// console.log(this);
			if(type === 'move'){ //🔥🔥如果是移动事件的话，禁用缓动效果！不然每次都要等个过渡动画！
				this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transition = 'none'

				//💠 计算中心点二：执行函数，用 🌟centerPos 这个变量来获得最新 return 出来的 X，Y 坐标
				const centerPos = calCenterPos(e.currentTarget.getBoundingClientRect())
				// console.log(centerPos);

				//获得当前手指的点击位置
				const TOUCH_X = Math.round(e.changedTouches[0].clientX)
				const TOUCH_Y = Math.round(e.changedTouches[0].clientY)

				/* 
					获得【手指】跟【卡片中心点】的 DIS 距离
					x 正 左侧   x负 右侧
					y 正 上方   y负 下方
				*/
				const DIS_X = TOUCH_X - centerPos.CENTER_X
				const DIS_Y = TOUCH_Y - centerPos.CENTER_Y


				//获得要旋转的比值
				const RATION_X = DIS_X / centerPos.CARD_HALF_WIDTH
				const RATION_Y = DIS_Y / centerPos.CARD_HALF_HEIGHT

				//应用旋转比值旋转，让卡片根据比值转动
				setTimeout(() =>{
					this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transform = `rotateX(${30 * RATION_X}deg)   rotateY(${-30 * RATION_Y}deg)`
				},1)
			}else{
				this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transition = `transform 0.4s 0s ease-in-out`
			}
		}

		//🔥手指点击开始,调用上方的函数！记得用 call 调用来修正 this 指向！
		// 点击开始, 这个方法写在 Card 的父元素上而非 Card 实例！！
		this.cardStage.addEventListener('touchstart',(e)=>{
			//注意这里用call进行调用!!是为了让 card cardTransMove 中的 this 指向 AppController 这个 class，否则会 undefined
			cardTransMove.call(this, e, 'start')
		})


		
		//🔥手指点击后移动, 这个方法写在 Card 的父元素上而非 Card 实例！！
		this.cardStage.addEventListener('touchmove',(e)=>{
			// 阻止默认行为 在卡片上滑动的时候 不会让页面上下滚动
			e.preventDefault()
			cardTransMove.call(this,e,'move')
		},{passive:false}) //这样双击也不会放大，也不能用手指去放大了



		//🔥手指点击结束
		this.cardStage.addEventListener('touchend',(e)=>{
			//给当前页面中的卡片加回过渡效果
			this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transition = `transform 0.3s 0s ease-in-out`
			//🌟让卡片的角度恢复到默认状态
			setTimeout(() => {
				this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transform = `rotateX(0deg) rotateY(0deg)`
			}, 1);
		})



		//👇点击小卡片切换大卡片的方法(加上位置的判断是为了实现手指横滑也会触发页面切换)
		this.ALL_CARDS.forEach((cardInstance,index)=>{
			let touchPos = {}
			cardInstance.littleCardDom.addEventListener('touchstart',(e)=>{
				//记录手指点击的位置(两种方法)
				// touchPos = {
				// 	X: e.changedTouches[0].clientX, // 注意是用changedTouches[0] 来记录！
				// 	Y: e.changedTouches[0].clientY	// 注意是用changedTouches[0] 来记录！
				// }
				touchPos.X = e.changedTouches[0].clientX
				touchPos.Y = e.changedTouches[0].clientY
				// console.log(touchPos);
			})

			//比较手指移开后跟点击之前的位置差异，如果没变化就证明了点了这张小卡片
			cardInstance.littleCardDom.addEventListener('touchend',(e)=>{
				if(touchPos.X === e.changedTouches[0].clientX && touchPos.Y === e.changedTouches[0].clientY){

					//🔥🔥🔥调用切换大卡片的方法，传入当前点击的小卡片的索引
					this.cardAnimation(index) 
					// console.log('点击了小卡片');
					// console.log('点击了第'+index+'张小卡片'); //🔥这个 index 很重要，将会在下面两处运用到！
					// console.log(this.ALL_CARDS);
				}
			})
		})
	}



	//————————————————————————————————————————————————————————————————————————


	//⚡️小卡片被选中时变化大小的方法
	static hintLittleCard(touchIndex){
		this.ALL_CARDS.forEach((Card,littleCardIndex)=>{ //🔥🔥Card 就包含了所有大小卡片的实例
			if(touchIndex === littleCardIndex){
				Card.littleCardDom.style.transform = `scale(1)`
			}else{
				Card.littleCardDom.style.transform = `scale(0.8)`
			}
		})
	}



	//🎴切换大卡片的交互事件,touchIndex 第几张在 cardSetUpEvent() 中的 Card 实例的 touchstart 事件内已经判断了
	static cardAnimation(touchIndex){
		//避免传入的 index 是本来已经在当前显示的卡片的index的值，是当前值就不用切换了
		if(touchIndex !== this.CURRENT_INDEX){
			//排除掉当前张（默认为第一张）后，先把其他的放到最顶层,避免过渡过程中卡片被覆盖
			this.ALL_CARDS[touchIndex].domCard.style.transform = 'all 0.5s 0.35s ease-in-out'
			this.ALL_CARDS[touchIndex].domCard.style.zIndex = 3
			//最开始没有 touchIndex , 所以就用 CURRENT_INDEX 为 0
			this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transform = 'all 1s ease-in-out'
			this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.zIndex = 1

			// console.log(this.ALL_CARDS[index].domCard)
			this.hintLittleCard(touchIndex) //之行小卡片被选中时变化大小的方法

			setTimeout(()=>{
				//当前大卡片消失
				this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.opacity = 0
				this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transform = `translateY(60px)`
				console.log(this.CURRENT_INDEX);

				//大其他卡片出现
				this.ALL_CARDS[touchIndex].domCard.style.opacity = 1
				this.ALL_CARDS[touchIndex].domCard.style.transform = 'translateY(0px)'
				this.CURRENT_INDEX = touchIndex
			},1)
		}
	}

	
	
	//APPController 初始化要调用的所有方法
	static appInit(){
		const container = document.querySelector('.container')
		 // 把最外层容器元素的宽度 设置为 屏幕宽度
		 container.style.width = document.documentElement.clientWidth + 'px'

		SlideBar.sliderBarinit()
		Card.cardRemove()//初始化时，清除旧的卡片
		this.createCard() //生成大 Card 七：调用让大卡片实例化，并传入数据的方法
		this.cardInit() //初始化大卡片
		this.cardSetUpEvent()
	}
	

}




AppController.appInit()//调用静态方法