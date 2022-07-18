/*
	Then 方法
		每个 Promise 的实例都可以调用 then 方法
			Promise.prototype.then

		🌟可以传入两个参数（两个函数作为参数, 都是异步的函数！！）, 也可以不传
			第一个函数是 resolve() 执行后才会被放入任务队列中
			第二个函数是 reject() 执行后才会被放入任务队列中

		🌟then 方法也会返回一个 Promise 实例

		🔥🔥🔥then() 方法无论执行的是 handleResolve() 还是 handleReject() , 返回的 Promise 实例的 [[PromiseState]] 都会变成 fullfilled !!!
*/ 

const PROMIES = new Promise((resolve,reject)=>{
	setTimeout(()=>{
		resolve('啦啦啦')
		console.log(1);
	},2000)
})

PROMIES.then( //🌟then 方法也会返回一个 Promise 实例
	//resolve() 执行后才会被放入任务队列中
	//可以叫作 handleResolve()
	()=>{
		console.log(2);
	},

	//reject() 执行后才会被放入任务队列中
	//可以叫作 handleReject()
	()=>{}
)

//可以用一个变量去接受 .then() 方法返回的 Promise 实例
const PROMIES2 = PROMIES.then(()=>{},()=>{})

