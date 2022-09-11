/*
	🌟实现逻辑：
		用 class 的方式改写抽奖功能
*/
export class Picker {
	constructor(names, DOM){
		this.names = names
		this.targetDOM = document.getElementById(DOM) //DOM 为自定义传入需要展示抽奖模块的节点
		this.isStarting = false //用来判断是开始还是停止
		this.btn = null
		this.showName = null
		this.picking = 0 //用来清除定时器
		this.init() //初始化
	}
	

	//🌟初始化要执行的方法
	init() {
		this.createTemp()
		this.pickFn()
	}



	//生成模板的方法
	createTemp(){
		//展示中奖人区域的模板
		const showTemp = `
			<div class="showName">
				Zen
			</div>
			<button id="btn">开始抽奖</button>
		`

		this.targetDOM.innerHTML = showTemp
	
		// 🔥获取到刚刚新建出来的元素
		this.showName = document.querySelector('.showName')
		this.btn = document.querySelector('#btn')
	}




	//开始抽奖的方法
	startPickNum = function() {
		this.picking = setInterval(()=>{ //赋值给一个对象, 用来清除定时器
			let resIndex = Math.floor(Math.random() * this.names.length) // 中奖的数字，console.log(resIndex)
			let resPerson = this.names[resIndex] //中奖人

			this.showName.innerText = resPerson //替换掉默认的中奖人
			// console.log(resPerson)
			return resPerson
		},200)
	}


	//停止抽奖的方法
	pausePickNum = function() {
		clearInterval(this.picking)
	}



	//整体运行判断抽奖的逻辑
	pickFn(){
		if(this.names instanceof Array){ //判断传入的【names】是否是【数组】的【实例】

			//点击按钮后开始抽奖
			btn.addEventListener('click',()=>{
				if(!this.isStarting){
					this.startPickNum()
					this.isStarting = true
					this.btn.innerHTML = '停止抽奖'
				}else{
					this.pausePickNum()
					this.isStarting = false
					this.btn.innerHTML = '开始抽奖'
				}
			})
		}else{
			throw new Error("传入的参数不是数组")
		}
	}
}

