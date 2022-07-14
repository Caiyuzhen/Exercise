class Card {
	
	constructor(cardsData) {
		this.domCard = Card.mockCard.cloneNode(true) //生成大 Card 二：克隆卡片
		// console.log(this.domCard)//打印 4 个 one-card div 元素
		// this.appendCard()//生成大 Card 五：调用添加卡片到容器内的方法(因为默认只展示一个，所以这一步省去)
		this.initCardContent(cardsData)//生成大 Card 三：调用方法，传入数据
		this.setCardSize() 
	}
	

	//获取大卡片容器
	static cardStage = document.querySelector('.card-stage')
	//获取大卡片
	static mockCard = document.querySelector('.one-card')
	//获取小卡片容器
	static littleCardBox = document.querySelector('.card-click-stage')
	//获取小卡片容器
	static mockLittleCard = document.querySelector('.card-color-board')
	
	//获取大卡片基础的样式信息
	static basicCardInfo = this.mockCard.getBoundingClientRect()
	
	//初始化时，删除旧的卡片
	static cardRemove(){
		this.mockCard.remove()
		this.mockLittleCard.remove()
	}
	
	
	//生成大 Card 一：注入大卡片内容
	initCardContent(cardsData){
		const {texts,color,detailText,imgUrl} = cardsData

		this.domCard.style.backgroundColor = color
		this.domCard.firstElementChild.firstElementChild.innerText = detailText//🔥🔥用子元素的子元素去选到文字！
		this.domCard.firstElementChild.lastElementChild.src = imgUrl
	}
	
	
	//生成大 Card 四：添加卡片到卡片容器内的方法，注意这里要结合第 7 步来使用！默认先展示一个
	appendCard(){
		Card.cardStage.appendChild(this.domCard)
	}


	//设置大 + 小卡片的宽和高 可以保证每个卡片的尺寸一模一样
	setCardSize() {
		this.domCard.width = Card.basicCardInfo.width + 'px' //🔥注意，这里要用 Card 来调用 basicCardInfo！！
		this.domCard.height = Card.basicCardInfo.height + 'px' //🔥注意，这里要用 Card 来调用 basicCardInfo！！
	}
}





//————————————————————————————————————————————————————————————————————————————


class SlideBar {

}


//————————————————————————————————————————————————————————————————————————————


class AppController  {
	// 所有大卡片的信息数据
	static cardsDatas = [
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
	
	static appInit(){
		Card.cardRemove()//初始化时，清除旧的卡片
		this.createCard() //生成大 Card 七：调用让大卡片实例化，并传入数据的方法
		this.cardInit() //初始化大卡片
	}
	
	//生成大 Card 六：让大卡片实例化，遍历并传入数据🌟🌟
	static createCard(){
		this.cardsDatas.forEach((item,index)=>{
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
		})
	}



}




AppController.appInit()//调用静态方法