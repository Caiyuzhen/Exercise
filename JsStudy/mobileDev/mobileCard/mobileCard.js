//Circle 类（圆点） ———————————————————————————————————————————————
class Circle {

	constructor(){
		this.dom = HintCircle.TargetCircle.cloneNode(true) //3:复制多几个点
		this.appendCircle() //5:调用👇那个生成圆点的方法
	}

	//🌟Cricle 类的初始化方法
	static circleInit(){
		this.targetCircle.remove()//删除旧的 html 上的点
	}
	static circleContainer = document.querySelector('.circle-hint') //2:定义一个容器，用来放置小圆点
	static targetCircle = document.querySelector('.circle') //1:拿到小圆点



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
		// console.log(texts, color, detailText, imgUrl);
		
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

	//🌟页面的初始化方法
	static appInit(){
		const container = document.querySelector('.container')
		// console.log(container);
		// console.log(this.pageDatas);
		//设置容器的宽跟高 = 屏幕的宽跟高,这样滚动的时候就会无限的变为对应的颜色
		container.style.height = document.documentElement.clientHeight + 'px'
		container.style.width = document.documentElement.clientWidth + 'px'

		//设置卡片的宽度 = 浏览器屏幕宽度
		const OnePage = document.querySelector('.one-page')
		OnePage.style.width = document.documentElement.clientWidth + 'px'

		//设置 pageBox 的宽度（因为在苹果机型上宽度不够，没法滑动）
		// this.pageBox.style.width = this.pagesDatas.length * this.onePageWidth + 'px'

		
		//调用静态方法,移除初始化的 html 内容
		Page.pageInit()
		Circle.circleInit()
		this.createPage()//记得调用自身的静态方法来生成卡片！！
		this.setupEvents()
	}


	//🔥🔥生成页面【卡片】&【圆点】的方法
	static createPage(){
		this.pageDatas.forEach((itemData,index)=>{
			new Page(itemData) //🔥🔥调用 Page（ ）类，传入上面定义好的数据
		})
	}


	static createCircle(){

	}


	static pageBox = document.querySelector('.pages-box')
	static moveInfo = {}//用于记录移动的相关信息
	static onePageWidth = this.pageBox.getBoundingClientRect().width //PageBox 的宽度，因为我们定义的是 pageBox = page 的宽度
	static currentIndex = 0 //🔥🔥先判断当前是第几个页面



	//定义手指页面的移动方法(👋👋👋Touch 事件)
	static setupEvents(){

		//一：手指点击事件
		this.pageBox.addEventListener('touchstart',(e)=>{
			console.log('按下了');
			// e.currentTarget.style.transform = 'translateX(-300px)'
		
			//🌟获取到【手指开始点击下】的初始坐标, 一开始点下的位置就是初始值
			this.moveInfo.startX = e.changedTouches[0].clientX //这个 this 指向跟踪的是 Controller 类，跟上面的 this 一样

			//🌟获取 pageBox 这个【元素】最新的变化坐标
			const transform = getComputedStyle(this.pageBox).transform
			const matrix = new DOMMatrixReadOnly(transform)
			this.moveInfo.baseTranslateX = Math.round(matrix.m41) //把最新的元素 X 坐标给到 moveInfo，round 四舍五入，因为 matrix.m41 是小数
		})


		//二、手指位移事件
		this.pageBox.addEventListener('touchmove',(e)=>{
			console.log('移动了');

			//🌟当前值 = 当前手指移动位置 - 手指初始位置 + 元素默认的位置
			let currentTransX = e.changedTouches[0].clientX - this.moveInfo.startX + this.moveInfo.baseTranslateX


			//🌟最大移动距离 = 单个页面宽度*（页面数量-1）
			//所有页面可以移动范围为 X～最大移动距离
			if(currentTransX > 0){//向左 ⬅️ 滑动了的话，则弹回 0 
				currentTransX = 0
			}else if(currentTransX < -(this.pageDatas.length - 1)*this.onePageWidth){
				currentTransX = -(this.pageDatas.length - 1)*this.onePageWidth //向右 ➡️ 滑动了超过最大距离的话，则弹回最大移动距离	
			}//🌟可以通过 pageDatas 的数据数量来判断有多少个页面

			this.pageBox.style.transform = `translateX(${currentTransX}px)`
			// console.log('当前手指位置'+e.changedTouches[0].clientX);
			// console.log('手指初始位置'+this.moveInfo.startX);
			// console.log('元素基础位置'+this.moveInfo.baseTranslateX);
		})


		//三、手指离开事件
		this.pageBox.addEventListener('touchend',(e)=>{
			const x = e.changedTouches[0].clientX //先获取当前手指的坐标

			//🌟【手指】右滑
			if(x > this.moveInfo.startX){ //当前的坐标跟一开始点下的坐标相比，大于则是【手指往右】的情况
				if(this.currentIndex !== 0 ){
					this.currentIndex-- //当前页面的索引减 1，往右滑动
				}
				this.pageBox.style.transition = `transform 0.35s ease-in-out`
				setTimeout(()=>{//🔥🔥让它变成异步函数！避免在手指滑动过程就开始移动了
					//滑动距离
					this.pageBox.style.transform = `translateX(-${this.onePageWidth * this.currentIndex}px)`//🔥🔥🔥滑动一下，移动一个页面的宽度 -> (this.onePageWidth * this.currentIndex)
				},1)
				
			}else if //🌟【手指】左滑
			(x < this.moveInfo.startX){
				if(this.currentIndex !== this.pageDatas.length - 1){ //没滑倒底的情况
					this.currentIndex++ //当前页面的索引加 1，往左滑动
				}
				this.pageBox.style.transition = `transform 0.35s ease-in-out`
				setTimeout(()=>{//🔥🔥让它变成异步函数！避免在手指滑动过程就开始移动了
					//滑动距离
					this.pageBox.style.transform = `translateX(-${this.onePageWidth * this.currentIndex}px)`
				},1)
			}
		})



		//四、手指结束的事件
		this.pageBox.addEventListener('transitionend',(e)=>{
			if(e.target.classList.contains('page-box')){
				e.currentTarget.style.transition = 'none' //🔥🔥🔥滑动结束，清除动画
			}
		})

	}
}






Controller.appInit()//调用静态方法