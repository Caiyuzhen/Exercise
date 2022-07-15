class Card {
	
	constructor(CARD_DATA) {
		this.domCard = Card.mockCard.cloneNode(true) //生成大 Card 二：克隆卡片
		// console.log(this.domCard)//打印 4 个 one-card div 元素
		// this.appendCard()//生成大 Card 五：调用添加卡片到容器内的方法(因为默认只展示一个，所以这一步省去)
		this.littleCardDom = Card.mockLittleCard.cloneNode(true)
		this.initCardContent(CARD_DATA)//生成大 Card 三：调用方法，传入数据
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
		this.domCard.width = Card.basicCardInfo.width + 'px' //🔥注意，这里要用 Card 类来调用 basicCardInfo！！
		this.domCard.height = Card.basicCardInfo.height + 'px' //🔥注意，这里要用 Card 类来调用 basicCardInfo！！
	}

	//小卡片添加到父元素中（容器）
	appendLittleCard(){
		Card.littleCardBox.appendChild(this.littleCardDom) //🔥注意这里使用 Card 类来调用！
	}
	
}




//🌟————————————————————————————————————————————————————————————————————————————



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
			})
			

			
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
				console.log(this.controlText.style.fontSize);

			},{passive:false})
	}
	

	//SlideBar 初始化要调用的方法，集中放这里
	static sliderBarinit(){
		this.setEvents()
		this.basicCalculate()
	}
}



//🌟————————————————————————————————————————————————————————————————————————————



class AppController  {
	// 所有大卡片的信息数据
	static CARD_DATAs = [
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
	
	// 所有大卡片的【实例】的数组，【不是 one-card div！】
	static allCards = []
	
	
	//生成大 Card 六：让大卡片实例化，遍历并传入数据🌟🌟
	static createCard(){
		this.CARD_DATAs.forEach((item,index)=>{
			this.allCards.push(new Card(item))
		})
	}
	
	//🌟🌟生成大 Card 七：初始化所有大卡片，让卡片一个一个出来, 默认让它隐藏
	static cardInit(){
		this.allCards.forEach((cardInstance,index)=>{ //cardInstance就是 Card 实例！
			// console.log(cardInstance);
			if(index===0){
				cardInstance.appendCard()
			}else{//其他的大卡片先隐藏, 放好隐藏后的位置，让后面出来后有个动画
				// console.log(cardInstance.domCard) //cardInstance.domCard 这样才是具体的 div！
				cardInstance.domCard.style.position = 'absolute'
				cardInstance.domCard.style.top = '2rem'
				cardInstance.domCard.style.transform = 'translateY(60px)'
				cardInstance.domCard.style.opacity = '0'
				cardInstance.appendCard() //上面藏好后再让它出来
			}
			//同时也设置卡片的大小
			cardInstance.setCardSize() 
			//同时也生成小卡片，把小卡片添加到文档树中
			cardInstance.appendLittleCard()
		})
		
		
	}
	
	
	//APPController 初始化要调用的方法
	static appInit(){
		Card.cardRemove()//初始化时，清除旧的卡片
		this.createCard() //生成大 Card 七：调用让大卡片实例化，并传入数据的方法
		this.cardInit() //初始化大卡片
		SlideBar.sliderBarinit()
	}
	

}




AppController.appInit()//调用静态方法