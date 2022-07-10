//Circle 类（圆点） ———————————————————————————————————————————————
class Circle {

	constructor(){
		this.dom = HintCircle.TargetCircle.cloneNode(true) //3:复制多几个点
		this.appendCircle() //5:调用👇那个生成圆点的方法
	}


	static circleContainer = document.querySelector('.circle-hint') //2:定义一个容器，用来放置小圆点
	static targetCircle = document.querySelector('.circle') //1:拿到小圆点
	static circleInit(){
		this.targetCircle.remove()//删除旧的 html 上的点
	}


	appendCircle(){
		HintCircle.circleContainer.appendChild(this.dom)//4:将小圆点添加到容器内
	}
}





//Page 类 ——————————————————————————————————————————————————————
class Page {
	//初始化, 通过 【pageData】 来传参（页面内容）给页面【Page-card】
	constructor(pageData) {
		this.dom = Page.pageCardTarget.cloneNode(true) //二：用一个变量来承载克隆出来的 pageCard，调用自己，去克隆 card
		this.appendPage()//调用创建页面卡片的方法
		this.initContent(pageData)	//【调用】注入 page 内容的方法
	}
	
	//静态属性,定义【容器】跟【卡片】
	static pageContainer = document.querySelector('.pages-box') //获得【页面容器 pages-box】
	static pageCardTarget = document.querySelector('.one-page') //一：获得页面本身
	static pageInit(){ //静态方法
		this.pageCardTarget.remove()//删除旧的 html 上的卡片
	}




	//注入页面内容(类似一个模板)
	initContent(pageData) {
		//从 pageData 内解构出  texts, color, detailText ,imgUrl 数据
		const {texts, color, detailText, imgUrl} = pageData
		console.log(texts, color, detailText, imgUrl);
		
		//修改每个卡片的大标题(🔥🔥因为预先在 span 里边存了 title 的数据，所以可以遍历出来每一项，再塞入新数据！)
		const spanArr = [...this.dom.querySelector('.page-titles').children] //大标题为第一个 children
		spanArr.forEach((span,index) => {//修改原数组的每一项，用 forEach
			span.innerText = texts[index]  //得到每一项大标题
		})

		//修改每个卡片的背景色
		const cardBg = this.dom.querySelector('.page-card')
		cardBg.style.backgroundColor = color
		
		//修改每个卡片的文字
		const cardText = this.dom.querySelector('p')
		cardText.innerText = detailText
		
		//修改每个卡片的图片
		const cardImg = this.dom.querySelector('img')
		cardImg.url = imgUrl
	}


	//定义添加卡片回到卡片容器的方法
	appendPage(){
		Page.pageContainer.appendChild(this.dom) //三：把克隆的 card 再插入回 container 内
	}
}
	




//控制类(页面的交互、移动点击都写在这里) ———————————————————————————————
class Controller {

	//定义页面数据
	static pageDatas = [
		// texts,color,detailText,imgUrl
		{
			texts:['Keep',"Learning","Code"],
			color:'#4700D8',
			detailText:'There are going to be days where you’re undone, stressed out, tired, spent. And I’ll still love you just as much in those moments as I ever have, maybe even a little more, because it’ll mean you let me get close enough to know the real you. That’s all I want. ',
			imgUrl:'JsStudy/mobileDev/mobileCard/assets/img/page1.png'
		},
		{
			texts:['Coding',"Is","Fun"],
			color:'#E84A5F',
			detailText:'Ask me to define my love for you and I’ll say it’s captured in every beautiful memory of our past, detailed out in the vivid visions of our dreams, and future plans, but most of all it’s right now, in the moment where everything I’ve ever wanted in my life is standing right in front of me and smiling. ',
			imgUrl:'JsStudy/mobileDev/mobileCard/assets/img/page`3`.png'
		},
		{
			texts:["Create","Some","Difference"],
			color:'#17B978',
			detailText:'I love you the way a drowning man loves air. And it would destroy me to have  you just a little.',
			imgUrl:'JsStudy/mobileDev/mobileCard/assets/img/page3.png'
		},
		{
			texts:['Never',"Stop","Learning"],
			color:'#892CDC',
			detailText:'There is never a time or place for true love. It happens accidentally, in a heartbeat, in a single flashing, throbbing moment.',
			imgUrl:'JsStudy/mobileDev/mobileCard/assets/img/page4.png'
		},
		{
			texts:['Enjoy',"Your","Time"],
			color:'#F8CB2E',
			detailText:'The problems of your past are your business. The problems of your future are my privilege.',
			imgUrl:'JsStudy/mobileDev/mobileCard/assets/img/page5.png'
		}
	]

	//页面的初始化方法
	static appInit(){
		const container = document.querySelector('.container')
		console.log(container);
		// console.log(this.pageDatas);
		//设置容器的宽跟高 = 屏幕的宽跟高,这样滚动的时候就会无限的变为对应的颜色
		container.style.height = document.documentElement.clientHeight + 'px'
		container.style.width = document.documentElement.clientWidth + 'px'

		
		//调用静态方法,移除初始化的 html 内容
		Page.pageInit()
		Circle.circleInit()
		this.createPage()//记得调用自身的静态方法来生成卡片！！
	}

	//🔥🔥生成页面【卡片】&【圆点】的方法
	static createPage(){
		this.pageDatas.forEach((itemData,index)=>{
			new Page(itemData) //🔥🔥调用 Page（ ）类，传入上面定义好的数据
		})
	}
	static createCircle(){

	}
}






Controller.appInit()//调用静态方法