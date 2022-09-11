/*
	🌟实现逻辑：
		用【 class 静态方法】的方式改写抽奖功能, 在静态方法内【 new 一个实例】
		🔥注意，静态方法的 this 指向的是 【class 类】 本身
*/


export class Picker02 {
	constructor(names, DOM){
		this.names = names
		this.targetDOM = document.getElementById(DOM) //DOM 为自定义传入需要展示抽奖模块的节点
		this.isStarting = false //用来判断是开始还是停止
		this.btn = null
		this.showName = null
		this.picking = 0 //用来清除定时器
		// this.init() //初始化
	}
	


	//🌟初始化要执行的方法
	static init(names, DOM) {
		const instance = new Picker02(names, DOM)
		
		this.createTemp(instance) //🔥通过【类本身】访问【静态方法】，因为【静态方法】存在于【类本身】上
		this.pickFn(instance)

		return instance //返回【实例数据】
	}



	//生成模板的方法
	static createTemp(instance){
		//展示中奖人区域的模板
		const showTemp = `
			<div class="showName">
				Zen
			</div>
			<button id="btn">开始抽奖</button>
		`

		instance.targetDOM.innerHTML = showTemp
	
		// 🔥获取到刚刚新建出来的元素
		instance.showName = document.querySelector('.showName')
		instance.btn = document.querySelector('#btn')
	}




	//开始抽奖的方法
	static startPickNum = function(instance) {
		this.picking = setInterval(()=>{ //赋值给一个对象, 用来清除定时器
			let resIndex = Math.floor(Math.random() * instance.names.length) // 中奖的数字，console.log(resIndex)
			let resPerson = instance.names[resIndex] //中奖人

			instance.showName.innerText = resPerson //替换掉默认的中奖人

			return resPerson
		},200)
	}


	//停止抽奖的方法
	static pausePickNum = function(instance) {
		clearInterval(this.picking)
	}



	//整体运行判断抽奖的逻辑
	static pickFn(instance){
		if(instance.names instanceof Array){ //判断传入的【names】是否是【数组】的【实例】

			//点击按钮后开始抽奖
			btn.addEventListener('click',()=>{
				if(!instance.isStarting){
					this.startPickNum(instance)
					instance.isStarting = true
					instance.btn.innerHTML = '停止抽奖'
				}else{
					this.pausePickNum(instance)
					instance.isStarting = false
					instance.btn.innerHTML = '开始抽奖'
				}
			})
		}else{
			throw new Error("传入的参数不是数组")
		}
	}
}

