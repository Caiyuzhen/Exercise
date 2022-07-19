/*
	Then 方法
		每个 Promise 的实例都可以调用 then 方法
			Promise.prototype.then

		🌟可以传入两个参数（两个函数作为参数, 都是异步的函数！！）, 也可以不传
			第一个函数是 resolve() 执行后才会被放入任务队列中
			第二个函数是 reject() 执行后才会被放入任务队列中

		🌟then 方法也会返回一个 Promise 实例

		🔥🔥🔥then() 方法无论执行的是 handleResolve() 还是 handleReject() , 返回的 Promise 实例的 [[PromiseState]] 都会变成 fullfilled !!!
		
	总结
		then 没有相应的处理函数，状态和数据都会原样后传给后续的实例（上一个的状态和数据）
		
		只要 then 写相应的处理函数（resolve,reject），只要函数没报错，实例状态一定是 fullfilled，数据都是当前 then 的 resolve,reject 的返回值
		
		如果 promise 实例链上的最后一个实例最终是 reject 状态，那么就会报错，因为上一层没有处理，报错信息中会包含实例的数据
*/ 


//第一个 Promise 实例 ————————————————————————————————————————
const PROMIES = new Promise((resolve,reject)=>{
	setTimeout(()=>{
		resolve('啦啦啦')
		// console.log(1);
	},2000)
})


PROMIES.then( //🌟🌟 then 方法内传入的函数都是异步函数
	/*🌟then 方法也会返回一个 Promise 实例,返回的 Promise 实例的 [[PromiseState]] 都会变成 fullfilled !!!*/
	()=>{
		//也可以不传这个方法,用一个 undefined 来顶着, 不传的话就是上面那个 Promise 的 reslove('啦啦啦')的值, 状态也跟上面的 Promise 一样
		//resolve() 执行后才会被放入任务队列中
		//可以叫作 handleResolve(), 🌟 是下一步真正要做的代码
		// console.log(2);
	},
	()=>{	
		//reject() 执行后才会被放入任务队列中
		//可以叫作 handleReject(), 是用于处理 reject 的错误
	}
)


//🔥 Promise 实例链 ————————————————————————————————————————
//可以用一个变量去接收 .then() 方法返回的 Promise 实例
const P2 = PROMIES.then(
	//👇都是根据前一个实例的状态来决定执行 resolve() 还是 reject()
	()=>{return 666},
	()=>{} 
)


//还可以继续往下链式调用
P3 = P2.then(
	//...
)

console.log(P3)

