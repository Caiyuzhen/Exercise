/*
	🌟实现逻辑：
		本质上是把 X 个人放入一个数组内，每隔 X 秒随机抽取一个人，直到抽取完毕

		根据传入的 names 来圈定随机范围，比如传入 10 个人，范围就是 0～9
		根据传入的 DOM 来确定抽奖模块放入哪个 DOM 中
*/


export default function (names, DOM) {
	/*
		生成整数随机数的计算方式:
			Math.random() * name.length
			比如传入 10 个人，范围就是 0～9 
			因为 Math.random() 生成的是 0～1 (包含 0 不包含 1), 的小数, 假设传入了 5 人, 那么最大是 0.999 X  5 = 4.995, 向下取整就是 4

			console.log(Math.random())
			Math.floor 向下取整, 比如 1.999 => 1
			Math.ceil 向上取整
			Math.round 四舍五入
			console.log(Math.floor(Math.random() * 10))

			typeof 用来判断 【数组】 会返回 【object】, 因为【数组】最终也是也是指向【对象】的【原型链】
			instanceof 用来判断是不是【数组】的实例, 会返回 【true】, 因为
			Array.isArray([]) 也可以判断是不数组
	*/
	if(names instanceof Array){ //判断传入的【names】是否是【数组】的【实例】


		//展示中奖人区域的模板
		const targetDOM = document.getElementById(DOM)//DOM 为自定义传入需要展示抽奖模块的节点
		const showTemp = `
			<div class="showName">
				Zen
			</div>
			<button id="btn">开始抽奖</button>
		`
		targetDOM.innerHTML = showTemp

		// 🔥获取到刚刚新建出来的元素
		const showName = document.querySelector('.showName')
		const btn = document.querySelector('#btn')



		//用来判断是开始还是停止
		let isStarting = false



		//开始抽奖的方法
		let picking = 0
		const startPickNum = function() {
			picking = setInterval(()=>{ //赋值给一个对象, 用来清除定时器
				let resIndex = Math.floor(Math.random() * names.length) // 中奖的数字，console.log(resIndex)
				let resPerson = names[resIndex] //中奖人

				showName.innerText = resPerson //替换掉默认的中奖人
				// console.log(resPerson)
				return resPerson
			},200)
		}



		//停止抽奖的方法
		const pausePickNum = function() {
			clearInterval(picking)
		}


		//点击按钮后开始抽奖
		btn.addEventListener('click',()=>{
			if(!isStarting){
				startPickNum()
				isStarting = true
				btn.innerHTML = '停止抽奖'
			}else{
				pausePickNum()
				isStarting = false
				btn.innerHTML = '开始抽奖'
			}
		})
	}else{
		throw new Error("传入的参数不是数组")
	}
}