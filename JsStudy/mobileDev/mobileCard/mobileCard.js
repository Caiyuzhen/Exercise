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
	//静态属性
	static pageTarget = document.querySelector('.pages-box-container')

	//初始化
	constructor(pageData) {
		this.dom = Page.pageTarget.cloneNode(true) //克隆 card
		this.initPageContent(pageData)	//在初始化时执行动态生成 page 内容的方法
	}

	initPageContent(pageData) {
		const {texts, color, detailText ,imgUrl} = pageData

		//修改大标题
		const spanArr = [...this.dom.querySelector('.pages-box-container')]
	}


}
	





Controller.appInit()//调用静态方法