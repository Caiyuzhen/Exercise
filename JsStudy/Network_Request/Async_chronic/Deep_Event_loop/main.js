/*
	基本概念
		程序 —— 项目

		进程 —— 类比工作组

		线程 —— 类比工作任务

	一个应用程序可以有多个进程
		有多进程程序，也有单进程程序
		现代化的浏览器是多进程的，
			Render 进程负责页面渲染、JS 的执行、事件的循环，内部包含了：
				 1.GUI 渲染线程
				 	 负责解析 HTML、CSS，构建 DOM 、RenderObject 树
					 GUI 渲线程与 JS 引擎线程互斥（会被挂起，停止等待）
					 
				 2.JS 引擎线程
				 	 负责 JS 的解析，JS 引擎一直等待任务队列中的任务到来
					 浏览器同时只能有一个 KS 引擎线程在运行 JS 程序，JS 是单线程运行的
					 每个 Tab 页中（render 进程）无论什么时候都只有一个 JS 线程程序在运行 JS 程序

				 3.事件触发线程
				 	 用来控制事件循环，管理者一个事件队列（task queue、 event queue、 event table）
					 当 Js 执行 碰到事件绑定和一些异步操作（如 setTimeOut），也可以是来自浏览器内核的其他线程：如鼠标点击、键盘按键、AJAX 网络请求时，
					 就会负责把哪些需要执行的异步函数在相应的时机添加到任务队列中，等 Js 线程空闲时来处理这些任务
					 但遇到定时器类型，就会交给定时器线程自己处理计时的操作，然后再给事件触发程序发信号让它管理

				 4.定时器触发线程
				 	 管理计时类的任务，最后会给处理程序发送信号

				 5.异步 http 请求线程
				 	 管理数据是否已经获取到，获取到后就会给事件处理程序发送信号

	两种任务执行时机
		宏任务 macrotack, 也被称为 task, 每次都从事件队列中取一个
		因为会跟 GUI 渲染线程互斥, 所以会执行一个 task 然后渲染一次（ 宏任务 -> GUI 渲染 -> 宏任务 -> GUI 渲染 -> ... ）
			浏览器中常见的【宏任务】：
				- 主代码 main 同步代码（先把所有同步代码执行完）
				- await 之前的代码相当于 new Promise 的同步代码，await 之后的代码相当于 Promise.then 的异步代码
				- setTimeout
				- setInterval
				- requestAnimationFrame()

		微任务 microtack, 也被称为 jobs, 当一个宏任务执行完, 会在 GUI 渲染前把所有微任务都执行完（ 宏任务 -> 微任务 -> GUI 渲染 -> 宏任务 -> GUI 渲染 -> ... ）
			浏览器中常见的【微任务】（微任务会一次性执行完）：
				- Promise.then（XXX，XXX）
				- catch(XXX)
				- finally(XXX)
				- Object.observe （已废弃）
				- MutationObserver（监控元素变化的 api）

		先执行 main 宏任务，再执行异步微任务， 再执行异步宏任务！！！
*/ 




//示意题一
const promise1 = new Promise((resolve, reject) => {
	setTimeout(()=>{ //宏任务 main
		resolve('success');	
		console.log('timer1'); //宏任务 异步
	},1000)
	console.log('promise1里边的内容'); //宏任务 main
})

const promise2 = promise1.then(()=>{ //微任务，要等到 fullfilled 才会推入任务队列， 要等上吗那个 resolve() 执行后才会执行
	throw new Error('error!!') //报错没有被处理，所以实例会变成 error
})

console.log('promise1',promise2) //宏任务 main
console.log('promise2',promise2) //宏任务 main

setTimeout(()=>{  //宏任务 main
	console.log('timer2');
	console.log('promise1',promise2)
	console.log('promise2',promise2)
},2000)


//宏任务 table （等待任务）
//微任务 table （等待任务）


//宏任务 queue （预执行任务）
//微任务 queue  (预执行任务）


/* 执行结果:
	promise1里边的内容
	promise1   promise{}
	promise2   promise{}
	timer1
	Error
	timer2
	promise1   promise{}
	promise2   promise{}
*/





//示意题二	
const p1 = new Promise((resolve,reject)=>{ //宏任务
	setTimeout(()=>{
		resolve('resolve03')
		console.log('timer1')
	},0)
	resolve('resolve01') //宏任务 main, 🌟🌟只有第一个才能改变状态跟数据！！！！！[[fullfilled]]
	resolve('resolve03') //宏任务 main
}).then(res =>{   //微任务
	console.log(res)  //res = resolve01
	setTimeout(()=>{ //🌟🌟宏任务，产生这个宏任务后，这个微任务就算执行完了！！
		console.log(p1)
	},1000)
}).finally(res=>{ //微任务,要等上面的 then 执行完才会执行！！
	console.log('finally',res) //res = undefined !!因为 finally 不需要传入参数
})

//宏任务（同步）\ 微任务（一次性全部执行完） \ 宏任务（异步）

/* 执行结果:
	resolve01
	finally
	undefined
	timer1
	Promise{}
*/




//示意题二	
const async1 = async()=> { //宏任务 1
	console.log('async1')  //宏任务 2
	setTimeout(()=>{  //宏任务 3
		console.log('timer1')  
	},2000)
	await new Promise(resolve => {  //微任务1,await 之前都是同步代码！！resolve之后是异步代码
		console.log('promise1') //🌟🌟注意，这里没执行 resolve ！！！所以 console 会执行，但是往下都不执行！！
	}) //这个 await 没执行完！！因为状态没变为 [[fullfilled]]
	console.log('async1 end') 
	return 'async1 success' //result = 'async1 success'
}

console.log('script start')  //宏任务4 main
console.log(async1());
async1().then(res => console.log(res))  //宏任务 5 ,要等 fullfilled 才执行
console.log('script end') 

Promise.resolve(1) //result = 1
	.then(2) //传入的不是函数的话，会被静默忽略！！这些都需要【传入函数】！！
	.then(Promise.resolve(3)) //传入的不是函数的话，会被静默忽略！！这些都需要【传入函数】！！
	.catch(4) //传入的不是函数的话，会被静默忽略！！！这些都需要【传入函数】！！
	.then(res => console.log(res)) //宏任务 5,res = async1 success
setTimeout(()=>{ //宏任务 6
	console.log('timer2')
},1000)

/* 执行结果:

	//宏任务 main
		script start
		async1
		promise1
		script end

	//微任务
		1

	//宏任务 异步
		timer1
		timer2

*/



//示意题二	
function promise(){
	let p = new Promise((resolve)=>{
		console.log('promise1');
		resolve('1')
		setTimeout(()=>{
			console.log(333);
		},0)
	})
	return p // p = 1
}
function promise2(){
	return new Promise((resolve,reject)=>{
		reject('error')
	})
}
//🔥🔥🔥 .catch .finally 一定要等父 promise 状态更改之后才会触发相应的函数
promise1()//下面的都是微任务，都是异步的！！！要在微任务里边排序！
	.then(res=>console.log(res)) //执行顺序1
	.catch(err=>console.log(err)) //执行顺序3,不会输出东西
	.finally(()=>console.log('finally1')) //执行顺序5

promise2()//下面的都是微任务，都是异步的！！！要在微任务里边排序！
	.then(res=>console.log(res)) //执行顺序2,不会输出东西,因为 promise2 是 reject 状态！
	.catch(err=>console.log(err)) //执行顺序4
	.finally(()=>console.log('finally2')) //执行顺序6

/* 执行结果:
	promise1

	1
	error
	finally1
	finally2

	333
*/




//示意题三(修改版)
function promise(){
	let p = new Promise((resolve)=>{
		console.log('promise1'); 
		resolve('1')
		setTimeout(()=>{ //等 promise 这个微任务执行完后就会立马执行这个宏任务
			console.log(333);
		},0)
	})
	return p // p = 1
}
function promise2(){
	return new Promise((resolve,reject)=>{
		reject('error')
	})
}

//🔥🔥🔥 .catch .finally 一定要等父 promise 状态更改之后才会触发相应的函数
promise2()//下面的 promise 内的代码都是 main 主代码执行完后会执行的异步微任务
	.then(res=>console.log(res)) 
	.catch(err=>console.log(err))
	.finally(()=>console.log('finally2')) 

promise1()
	.then(res=>new Promise((resolve,reject)=>{ //new Promise 已经在宏任务的时候就定义了，但是还没有值，所以不会往下执行！！
		setTimeout(()=>{
			resolve(888)
			console.log('ok');
		},1000)
	})) 
	.catch(err=>console.log(err))  //要等上面那个父 promise 的状态好了才会执行
	.finally(()=>console.log('finally1'))  //要等上面那个父 promise 的状态(上一级）好了才会执行


/* 执行结果:
	promise1
	error
	finally2
	333

	ok
	finfally1

*/



//示意题四
async function async1(){
	console.log('async1 start');
	await async2()
	console.log('async1 end');//异步
}

async function async2(){
	console.log('async2');
}

console.log('script start');

setTimeout(function(){ //异步宏任务，最后执行
	console.log('setTimeout');
},0)

async1()

new Promise(function(resolve){ //微任务
	console.log('promise1');
	resolve()
}).then(function(){ //微任务，所以下面是异步的
	console.log('promise2');//异步
})

console.log('script end');


/* 执行结果:
	script start
	async1 start
	async2'
	promise1
	script end

	async1 end
	promise2

	setTimeout'

*/