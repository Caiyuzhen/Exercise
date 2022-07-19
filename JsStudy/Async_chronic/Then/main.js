/*
	Then 方法
		每个 Promise 的实例都可以调用 then 方法
			Promise.prototype.then

		🌟可以传入两个参数（两个函数作为参数, 都是异步的函数！！）, 也可以不传
			第一个函数是 resolve() 执行后才会被放入任务队列中 --- 异步代码！
			第二个函数是 reject() 执行后才会被放入任务队列中 --- 异步代码！

		🌟then 方法也会返回一个 Promise 实例
			🔥then() 方法无论执行的是 handleResolve() 还是 handleReject() , 返回的 Promise 实例的 [[PromiseState]] 都会变成 fullfilled !!!
		
	总结
		⚡️如果当前 then 没有相应的处理函数（resolve,reject），那么【进度状态】和【结果数据】都会原样继承上一个 then 的【状态】和【数据】
		
		⚡️只要 then 【写了】相应的处理函数（resolve,reject），只要函数没报错, 实例的【进度状态】一定是 fullfilled, 数据都是当前 then 的 (resolve,reject) 的返回值
		
		⚡️如果 promise 实例链上的最后一个实例最终是 reject 状态, 那么整个代码就会报错, 因为上一层没有处理 reject 状态需要做什么, 报错信息中会包含实例的数据

		⚡️如果 then 内 return new 了一个 Promise, 那么这个 Promise 的【进度状态】跟【结果数据】会跟当前的 then 保持一致!!!
*/ 


//定义一个发送请求的方法 ————————————————————————————————————————
function getData(url, data, cb){
	const randomDelay = Math.random().toFixed(3) * 1000 //
	setTimeout(()=>{
		cb()
	},randomDelay)
}



//第一个 Promise 实例 ————————————————————————————————————————
const PROMIES = new Promise((resolve,reject)=>{
	//⚡️执行获取数据的方法
	getData('http://localhost:3000/api', 'abc', (data)=>{
		//⚡️在回调内执行 resolve 或 reject, 这时候 data 就变成 Promise 的结果值 [[PromiseResult]]
		resolve(data) //data 就是 PROMISE 的值
	})
	//⏰设置延迟时间的方法
	// setTimeout(()=>{
	// 	resolve(data)
	// },3000)
})


PROMIES.then( //🌟🌟 then 方法内传入的函数都是异步函数
	/*🌟then 方法也会返回一个 Promise 实例,返回的 Promise 实例的 [[PromiseState]] 都会变成 fullfilled !!!*/
	(res)=>{ //🔥🔥🔥这时候 res 就是上面的 data 的数据！！
		/*
		也可以不传这个方法,用一个 undefined 来顶着, 不传的话就是上面那个 Promise 的 resolve('啦啦啦')的值, 状态也跟上面的 Promise 一样
		resolve() 执行后才会被放入任务队列中
		可以叫作 handleResolve(), 🌟 是下一步真正要做的代码
		console.log(2)
		*/
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
	(res)=>{return 666},  //🌟🌟可以有参数, res 就是上一个 Promise 的返回值(一样的)！！
	(err)=>{} 		//🌟🌟可以有参数, err 就是上一个 Promise 的返回值(一样的)！！
)


//还可以继续往下链式调用
P3 = P2.then(
	//...
)

console.log(P3)




// 避免报错的情况
const P11 = new Promise((resolve,reject)=>{
	reject()
})
P11.then(
	(res)=>{},
	(err)=>{}//上面有 reject 的话，then 的第二个函数就一定要写！哪怕是空的函数！！一般最后一个都会加！
)




//✈️✈️✈️✈️✈️ 改写回调地狱的获取数据方式 ————————————————————————————————————————

const PROMISE_01 = new Promise((resolve,reject)=>{
	getData('https://api.com','info',(data)=>{ //方法就不重新定义了，上面已经定了
		resolve(data) //data 变为 PROMISE_01 的值
	})
})

const PROMISE_02 = PROMISE_01.then(
	(res)=>{//接收 resolve(data) 内的 data
		//如果要继续给下一个 then 传递数据, 需要 return 一个 new Promise 实例!!
		return new Promise((resolve,reject)=>{
			getData('https://api02.com','info_02',(data_02)=>{ 
				resolve(data_02) //这样才能传递给下个 then !
			})
		})

	}, 
	(err)=>{}
)

PROMISE_02.then(//不需要传递的话, 直接 then 就行了
	(res)=>{
		getData('https://api03.com','info_02',(data_03)=>{
		})
	},
	(err)=>{}
)

console.log(PROMISE_02);






// start
//1
// success




//🔥🔥🔥定义函数的话, 要执行后才会返回 Promise 实例, 才会开启 =>... 后面的同步代码！！
const fn = () => (new Promise((resolve,reject)=>{
	resolve('success')
}))
fn().then(
	res=>{console.log(res)}
)
