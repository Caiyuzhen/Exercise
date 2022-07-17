/*
	针对高频触发的事件可以使用【节流】或【防抖】函数,降低代码的执行频率, 节省性能

		例如:
			resize、mousemove input 输入事件会很高频触发, 对【浏览器内存】跟【服务器请求的压力】都会很大


		🌟 防抖
			//过滤掉前面的所有事件触发，直到最后一次触发才真正执行

		🌟 节能
			//
*/


//🌟🌟🌟 防抖（拉长了执行的时间, 没达到每隔 X 秒就不会执行） ————————————————————————————————————————————————————————

	//⚡️防抖函数基础写法
		let timer
		//比如希望停止后的 300ms 后再执行一次
		document.addEventListener('mousemove', function(event) {
			clearTimeout(timer) //每次都会情况上一次的计时器, 然后再执行新的定时器，如果这时候又执行了 mousemove 就又会清空上一次的定时器，除非停下来超过 300ms 才会执行
			timer = setTimeout(function(){
				// console.log(event.clientX, event.clientY);	 
			},2000) 
		})




	//⚡️⚡️防抖函数高级写法(写成一个模板),但是 timer02 这个变量容易污染全局环境
		let timer02
		//防抖函数模板
		function debounce(func, delay) {
			clearTimeout(timer02) //每次都会情况上一次的计时器, 然后再执行新的定时器，如果这时候又执行了 mousemove 就又会清空上一次的定时器，除非停下来超过 300ms 才会执行
			timer = setTimeout(function(){
				func()
			},delay) 
		}

		//具体要执行的函数
		function doSomething() {
			// console.log('执行了');
		}

		//添加事件
		document.addEventListener('mousemove', ()=> {
			debounce(doSomething,300) //传入要执行的【函数】跟防抖的【秒数】
		})




	//⚡️⚡️⚡️防抖函数更高级的写法, 用闭包的方式实现
	function createDeBounceFunc(fn,delay){
		let timer;

		return function(){ //🌟这个匿名函数的活动对象内引用了 timer 跟 fn、delay, 产生一个闭包环境, 闭包环境内可以获取到 timer, 然后下面又用 testDeBounce 这个变量来获取到了
			const _this = this //获取 this 指向,让 this 指向回 windows
			const _args02 = arguments
			clearTimeout(timer)

			timer = setTimeout(()=>{
				/*
				 	让这个 _this 指向 window,
					让 _args02 来获取 return function() 这个匿名函数的所有 arguments
					arguments 包含了函数传入的所有数据
					注意，如果是不是箭头函数而是普通函数的话，会有 argument 冲突，因为普通函数自己也有个 arguments
				 */
				fn.apply(_this,_args02) //apply()方法能劫持另外一个对象的方法，继承另外一个对象的属性
			},delay)
		}
	}

	//真正执行的函数
	function test009(abc){
		console.log(abc);
	}


	// testDeBounce 这个变量能够【获取】闭包内的变量, 相当于在执行【匿名函数】
	//🌟🌟 相当于把 test009 这个函数跟 300 这个参数传入闭包内去执行了
	const testDeBounce = createDeBounceFunc(test009,300)


	document.addEventListener('mousemove', ()=> {
		testDeBounce('123') //传入要执行的【函数的参数 abc 】跟防抖的【秒数】
	})





//🌟🌟🌟 节流(只是降低了频率, 可以设定每隔 X 秒才执行) ————————————————————————————————————————————————————————

	//闭包的节流方式
	function createThrottleFunc(fn,limit){

		let flag = true

		return function(){
			const _this = this
			const args = arguments

			if(flag){ //一开始是 true，所以能执行下面的代码, 闭包环境内可以获取到 flag
				flag = false //执行后变为 false
				fn.apply(_this,args)
				setTimeout(()=>{
					flag = true
				},limit) //设置限定时间, 过 X 秒后才会变为 true, 才能再次执行这个函数
			}
		}
	}

	function test008(x){
		console.log(x);
	}

	const TEST_THROTTLE = createThrottleFunc(test008,2000)

	document.addEventListener('mousemove',()=>{
		TEST_THROTTLE('123')
	})

