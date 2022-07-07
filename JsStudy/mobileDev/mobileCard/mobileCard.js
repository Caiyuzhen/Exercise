//控制类(页面的交互、移动点击都写在这里)
class Controller {
	//静态方法
	static appInit(){
		const mainContainer = document.querySelector('.mainContainer')
		//设置容器的宽跟高 = 屏幕的宽跟高,这样滚动的时候就会无限的变为对应的颜色
		mainContainer.style.height = document.documentElement.clientHeight + 'px'
		mainContainer.style.width = document.documentElement.clientWidth + 'px'
	}

}


//Circle 类
class Circle {

}



//Page 类
class Page {
	//静态属性,先获得【页面容器 pages-box-container】
	static pageTemplate = document.querySelector('.pages-box-container')

	//初始化, 通过 pageData 来穿参（页面内容）
	constructor(pageData) {
		this.dom1 = Page.pageTemplate.cloneNode(true) //克隆 card
		this.initPageContent(pageData)	//执行注入 page 内容的方法
	}


	//定义静态方法，注入页面内容
	initPageContent(pageData) {
		
		//从 pageData 内解构出  texts, color, detailText ,imgUrl 数据
		const {texts, color, detailText, imgUrl} = pageData
		
		//修改每个卡片的大标题(因为预先在 span 内存了 title 的数据，所以可以遍历出来)
		const spanArr = [...this.dom1.querySelector('.pages-box-container').children]
		spanArr.forEach((span,index) => {//修改原数组的每一项，用 forEach
			span.innerText = texts[index]
		})
		
		//修改每个卡片的背景色
		const cardBoxBg = this.dom1.querySelector('.page-card')
		cardBoxBg.style.backgroundColor = color
		
		//修改每个卡片的文字
		const cardBoxText = this.dom1.querySelector('p')
		cardBoxText.innerText = detailText
		
		//修改每个卡片的图片
		const cardBoxImg = this.dom1.querySelector('img')
		cardBoxImg.url = imgUrl
	}


}
	





Controller.appInit()//调用静态方法