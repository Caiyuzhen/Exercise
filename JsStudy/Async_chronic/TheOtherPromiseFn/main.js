/*
	Catch 方法
		Promise.prototype.catch
			🌟 语法糖：相当于调用 then(null,onRejected), 比如不想传入第一个 handle resolve 就可以这么写
			
			只传一个【函数参数】, 相当于 handleRejected() 函数, 可以获取实例的数据
			
			🌟跟 then 一样, 执行的时机就是父实例变为 rejected  的状态

			🌟也会返回一个新的 Promise 实例
		

	Finally 方法
		Promise.prototype.finally
			🌟语法糖：
			一般用于处理异步操作的结束状态，清理代码

			只传一个【函数参数】，函数内没有参数，不需要行参

			🌟不管父实例是 fullfilled 还是 rejected, 不管父实例是什么状态，最终都会执行这个函数

			父实例的【进度状态】跟【数据】都会⚡️【原样后传】

			函数中【return 返回的数据】不会改变实例的数据

			🌟也会返回一个新的 Promise 实例

*/ 


//Catch 方法
const PROMISE = new Promise((resolve,reject)=>{
	reject('123')
})
PROMISE.catch((err) => {
	console.log(err)
})



//Finally 方法
const PROMISE_02 = new Promise((resolve,reject)=>{
	reject('拒绝了')
})
PROMISE_02.finally(() => {
	console.log('finally 拒绝了')
	//这里就算 return 了，也是上面父实例的数据，跟 then 不一样！
})


