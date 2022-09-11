//传入一个父元素 id, 按钮组件就会出现在这个父元素中
//可以自定义传入按钮的颜色


export class Btn {
	constructor(id, btnColor) {
		this.targetDOM = document.getElementById(id) //获取父组件
		this.btnColor = btnColor //获取按钮颜色
		this.btn = null //具体的按钮元素, 初始化为空
		this.init()
	}

	init() {
		this.btn = document.createElement('div')
		
		const button = this.btn.style
		button.width = '88px'
		button.height = '40px'
		button.backgroundColor = this.btnColor //自定义按钮颜色
		button.display = 'inline-block'
		button.textAlign = 'center'
		button.lineHeight = '40px' // 垂直居中
		button.borderRadius = '6px'
		button.color = '#FFF'
		button.cursor = 'pointer'
		this.btn.innerText = 'Button'
		this.targetDOM.appendChild(this.btn)   //🔥把按钮安插到父组件中

		this.btn.addEventListener("click",()=>{
			alert('This is a button');
		})
	}
	
}