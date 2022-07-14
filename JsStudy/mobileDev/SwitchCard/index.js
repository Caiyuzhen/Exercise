class Card {
	
	constructor(cardsData) {
		this.dom = Card.mockCard.cloneNode(true) //生成大 Card 二：克隆卡片
		console.log(this.dom)
		this.appendCard()//生成大 Card 五：调用添加卡片到容器内的方法
		this.initCardContent(cardsData)//生成大 Card 三：调用方法，传入数据
	}
	
	//获取大卡片容器
	static cardStage = document.querySelector('.card-stage')
	//获取大卡片
	static mockCard = document.querySelector('.one-card')
	//获取小卡片容器
	static littleCardBox = document.querySelector('.card-click-stage')
	//获取小卡片容器
	static mockLittleCard = document.querySelector('.card-color-board')
	
	
	//初始化时，删除旧的卡片
	static cardRemove(){
		this.mockCard.remove()
	}
	
	
	//生成大 Card 一：注入卡片内容
	initCardContent(cardsData){
		const {texts,color,detailText,imgUrl} = cardsData

		this.dom.style.backgroundColor = color
	}
	
	
	//生成大 Card 四：添加卡片到卡片容器内
	appendCard(){
		Card.cardStage.appendChild(this.dom)
	}

	//设置宽度
	setCard() {
		mockCard.style.width = document.documentElement.clientWidth + 'px'
	}
}




class SlideBar {

}




class AppController  {
	// 所有卡片的信息数据
	static cardsDatas = [
        // texts,color,detailText,imgUrl
	    {
	      texts:['Keep',"Learning","Code"],
	      color:'#4700D8',
	      colorName:'blue',
	      detailText:'There are going to be days where you’re undone, stressed out, tired, spent. And I’ll still love you just as much in those moments as I ever have, maybe even a little more, because it’ll mean you let me get close enough to know the real you. That’s all I want. ',
	      imgUrl:'src/img/page1.png'
	    },
	    {
	      texts:['Coding',"Is","Fun"],
	      color:'#E84A5F',
	      colorName:'red',
	      detailText:'Ask me to define my love for you and I’ll say it’s captured in every beautiful memory of our past, detailed out in the vivid visions of our dreams, and future plans, but most of all it’s right now, in the moment where everything I’ve ever wanted in my life is standing right in front of me and smiling. ',
	      imgUrl:'src/img/page2.png'
	    },
	    {
	      texts:["Create","Some","Difference"],
	      color:'#17B978',
	      colorName:'Green',
	      detailText:'I love you the way a drowning man loves air. And it would destroy me to have  you just a little.',
	      imgUrl:'src/img/page3.png'
	    },
	    {
	      texts:['Never',"Stop","Learning"],
	      color:'#892CDC',
	      colorName:'purple',
	      detailText:'There is never a time or place for true love. It happens accidentally, in a heartbeat, in a single flashing, throbbing moment.',
	      imgUrl:'src/img/page4.png'
	    },
	    {
	      texts:['Enjoy',"Your","Time"],
	      color:'#F8CB2E',
	      colorName:'yellow',
	      detailText:'The problems of your past are your business. The problems of your future are my privilege.',
	      imgUrl:'src/img/page5.png'
	    }
	]
	
	static cardsArr = []
	
	static appInit(){
		Card.cardRemove()//初始化时，清除旧的卡片
		this.createCard() //生成大 Card 七：调用让大卡片实例化，并传入数据的方法
		this.cardInit() //初始化大卡片
	}
	
	//生成大 Card 六：让大卡片实例化，并传入数据
	static createCard(){
		this.cardsDatas.forEach((item,index)=>{
			this.cardsArr.push(new Card(item))
		})
	}
	
	//🌟🌟生成大 Card 七：初始化所有大卡片，让卡片一个一个出来
	static cardInit(){
	
	}
}




AppController.appInit()//调用静态方法