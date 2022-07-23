/* 
	Web Worker
		注意
			worker 不能访问全局 window 对象，不能修改 DOM 树
			只能访问 worker 对象的属性和方法
			worker 能发送 XMLHtttpRequest 跟 fetch 请求

		是什么？
			单独开辟一条线程来处理任务，不阻塞主线程的任务

		一、通过 onmessage 来访问主线程传递进来的消息
		二、通过 postMessage 来向主线程传递消息

		//案例：
		主线程.js：
			let arr = [1,2,3,4,]
			let worker = new Worker('worker.js')

			sort.Btn.addEventListener('click', () => {
				worker.postMessage(arr)
			})

		Worker.js:
			onmessage = function(e) {
				const data = e.data;
				postMessage(
					data.sort((a,b)= a - b)
				);
			}
*/


//worker 排序案例
const sourceArr = document.getElementById('sourceArr');
const sortBtn = document.getElementById('sortBtn');
const resultArr = document.getElementById('resultArr'); //最终的排血结果

let arr = [9,2,6,4,8]

sourceArr.textContent = arr.toString()//转为字符串


//实例化 worker
let worker = new Worker('worker.js');
//也可以创建共享的 worker 
// let worker = new SharedWorker('sharedWorker.js');

//给 worker 传递数据
sortBtn.addEventListener('click', () => {
	worker.postMessage(arr)
	/*也可以使用共享的 worker ,需要调用 port
	 worker.port.postMessage(arr)*/
})

worker.onmessage = function(e){
	resultArr.textContent = e.data
}

/*也可以使用共享的 worker ,需要调用 port
worker.port.postMessage(arr)*/
// worker.port.onmessage = function(e){
// 	resultArr.textContent = e.data
// }