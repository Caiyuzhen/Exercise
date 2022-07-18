/*
	Promise
		🌟 传入 Promise 内的 ()=>{} 回调函数是🌟同步执行的!!!
		🌟 Promise 的回调函数内的 resolve、reject 函数是🌟异步执行的!!!
			比如
				new Promise((resolve,reject)=>{console.log(2)})
					console.log 是同步执行的！！！


		Promise 实例的重要属性!!
			🌟[[PromiseState]] 表示 Promise 的状态, 状态只能改变一次！！从 pending 到 resolved 或到 rejected
				pending 	待定状态
				fullfilled  成功&解决状态  ———————— resolve()执行
				rejected 	失败&拒绝状态  ————————	reject()执行

			🌟[[PromiseResult]] 表示值
				resolve() 实例中传入的值
				reject() 实例中传入的值

*/ 


/*	
	实例化
		一定要传入一个函数, 函数要设置两个参数,
		注意 resolve,reject 顺序是有要求的
		resolve、reject 都是函数🌟 且可以传值, 跟 Promise 相互绑定
*/


//定义发送请求的方法
function getDataFormUrl(url, data, callback){
	const ramdomDelay = Math.round().toFixed(3) * 1000
	setTimeout(()=>{
		callback()
	},ramdomDelay)
}


//执行上面的方法
const PROMISE_TEST = new Promise((resolve,reject)=>{ 
	getDataFormUrl('http://localhost:8080','abc',(resdata)=>{
		console.log(resdata);
		// resolve()
		reject('拒绝了')
	})
})

console.log(PROMISE_TEST);

