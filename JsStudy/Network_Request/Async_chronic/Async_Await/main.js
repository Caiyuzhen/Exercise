/*

	async  
		1.可以让函数具有异步特征,需要配合 await 跟 Promise 来使用！！
		2.只要使用了 async 一定会返回一个 Promise 实例！！
		3.几种使用方式(都是在函数前面)：

			function async foo(){}

			let bar = async function() {}

			let bar = async () => {}

			class Qux {
				async abc(){}
			}

		

	await  
		1.回调函数内的 await 下方的代码才是异步执行的，await 上方都是同步的
		2.await 关键字一般后面要跟一个 Promise 实例
		3.await 会等 Promise 这个实例变成 【fullfilled 状态】之后， 就去解析出 Promise 的【数据】
		4.需要先有 async 函数才能使用 await, 注意！子函数不行，子函数得单独加 async!!
		5.函数中抛出任何值（无论是 error 还是 1）都会导致 Promise 的状态变为 rejected！！
		6.await 只要有产生 rejected 拒绝的状态那么 await 函数就不会继续执行了
		7.如果需要处理 rejected 那么一定要 return 出来，不然无法通过 catch 方法进行处理！
		8.await 后面可以不跟 Promise，比如跟一个【值】，但也会返回一个 Promise，这个 Promise 的状态是 resolved，并且返回的值是【这个值】！
		9.await 关键字期待 thenable 对象（有 then 方法的对象），Promise 都是 thenable 对象
		10.await 和一元操作符一样，可以单独使用，也可以在表达式中使用
		



*/

//使用方式 —————————————————————————————————————————————————————————————————————————————————
async function test(){
	console.log(2);
	//🌟🌟一种写法
	// await new Promise((resolve,reject)=>{
	// 	setTimeout(()=>{
	// 		console.log(4);
	// 	},3000)
	// })

	//🌟🌟另一种写法, await 会把 Promise 的【结果数据】给【解析】出来去【赋值】给 【result 变量】，await 右边往下都是【异步代码】
	const resultA = await new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(4);
		},2000)
	})
	console.log(resultA); //2s后

	const resultB = await new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(5);
		},2000)
	})

	console.log(resultB); //4s后

	async function test02(){  //子函数得单独加 async!!
		//const resultC = await...
		//...
	}
	// throw 1 //会导致 Promise 的状态变为 rejected
 	return 999 //async 返回的数据会变为 [[PromiseResult]] 的值！！！
}

test()

console.log(3);


//只要使用了 async 一定会返回一个 Promise 实例！！
const p = test()
console.log(p);//Promise



// 函数中有产生拒绝的 Promise 的情况 ——————————————————————————————————————————————
async function test2(){
	const resultC = await new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve('done');
		},1000)
	})
	return Promise.reject(666) //🔥reject 需要被 return 出来才能被 catch！
}
const P2 = test2()
P2.catch(()=>{}) //🔥只要 catch 了就不会报错
console.log(P2);



//不跟 Promise 的方式
let test3 = async() => {
	const resultD = await 999 // 赋值=号右边先执行
	console.log(resultD);
}
test3() //999




//一元操作符单独使用 await (不用变量接收的方式)
let test4 = async() => {
	await new Promise((resolve, reject) => { //一元操作符来使用 await
		//...
	})
}










//🔥🔥用 async await 方法配合 promise 来实现一种非阻塞的代码暂停执行（🌟🌟让某些函数一定时间后异步执行）
function sleep(delay){
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,delay) //🔥🔥🔥在 delay 多长时间后变成 fullfilled 状态
	})
}

async function foo(){
	const T0 = Date.now()
	await sleep(1500) //delay 是一个参数，会被传递给 setTimeout, 相当于等 delay 时间过了后 await 才开始解析
	console.log(Date.now() - T0)

	//为什么不直接用 setTimeout？ 
	//因为现在这种方法更灵活，比如可以在执行其他代码前再停个几秒钟👇
	await sleep(1000)
	console.log(Date.now() - T0)

	await sleep(3000)
	console.log(Date.now() - T0)
}


foo()
