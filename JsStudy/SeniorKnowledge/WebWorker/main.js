/*
	WebWorker
		What？
			🚀 可以实现多线程
					一个 App 就是一个进程
						一个进程可以有多个线程 （🔥注意 主子线程只是谁创建谁的关系）

			同源限制
				Worker 必须是同源的（同一台服务器）
			
			DOM 限制
				Worker 不能够使用主线程中的 window 对象和 document 对象, 无法读取 DOM
			
			通讯限制
				Worker 与主线程之间通过 postMessage() 进行通信, 通过 onmessage 事件监听消息, 因为不在一个上下文环境

			文件限制
				Worker 不能够访问本地文件系统, 因为它们没有访问权限

			脚本限制
				Worker 是一个独立的后台线程，独立于当前页面的主线程，且不会与主线程共享作用域
				Worker 不能够访问主线程的 cookies, localStorage 和 IndexedDB 数据库
				Worker 不能够打开新的浏览器窗口, 也不能够访问浏览器的原生组件
				Worker 不能够使用 require() 方法, 但是可以使用 importScripts() 方法加载外部脚本
				Worker 不能够使用定时器, 但是可以使用 setTimeout() 方法和 setInterval() 方法
				Worker 不能够使用 Sockets, WebRTC, WebSockets, WebAudio, WebGL, WebNotification, WebStorage
				Worker 不能够使用 alert() 方法和 confirm() 方法, 但是可以使用 XMLHttpRequest 或 Fetch 来发送 HTTP 请求
				Worker 不能够使用 document.write() 方法, 但是可以使用 postMessage() 方法向主线程发送消息
				Worker 不能够使用 CSSOM, 但是可以使用 Web Workers API 和 DOM 来操作 DOM
				Worker 不能够使用 window 对象, 但是可以使用 self 对象代替
				Worker 不能够使用 importScripts() 方法加载本地文件, 但是可以使用 XMLHttpRequest 对象加载本地文件

		
		Why?
			Js 是单线程的, 使用 WebWorker 可以实现多线程
*/

// 🔥主线程内创建子线程
const worker = new Worker('./worker.js') //worker 的代码会在主线程的代码执行完后再执行


console.log('我是主线程')


worker.addEventListener('message', (e) => { //监听子线程发送来的的消息
	// 打印子线程发送来的消息
	console.log('收到了:', e.data)
})


// 🔥给子线程传数据
worker.postMessage('你好, 我是主线程') //🚀给子线程发送消息
// 可以传送所有数据类型
worker.postMessage({
	name: '小明',
	age: 18
})


// ⚡️终结 Worker
// worker.terminate() //终结 Worker
