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
*/ 


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