/*

一、原型方法
	Catch 方法
		Promise.prototype.catch
			1.🌟语法糖,相当于调用 then(null,onRejected), 比如不想传入第一个 handle resolve 就可以这么写
			2.只传一个【函数参数】, 相当于 handleRejected() 函数, 可以【获取父实例】的数据
			3.🌟跟 then 一样, 执行的时机就是【父实例】变为 rejected  的状态
			4.🌟也会返回一个新的 Promise 实例
		

	Finally 方法
		Promise.prototype.finally
			1.🌟语法糖, 一般用于处理异步操作的结束状态，清理代码
			2.只传一个【函数参数】，函数内没有参数，不需要行参
			3.🌟不管父实例是 fullfilled 还是 rejected, 【不管父实例是什么状态】，最终都会执行这个函数
			4.父实例的【进度状态】跟【数据】都会⚡️【原样后传】
			5.函数中【return 返回的数据】不会改变实例的数据
			6.🌟也会返回一个新的 Promise 实例



二、静态方法(类似 class 中 static 定义的)
	Promise.resolve(x) 
		1.直接产生一个 fullfilled 的状态
		2.可以传入一个参数，这个参数就是这个 Promise 的【返回数据】

	Promise.reject(x)
		1.直接产生一个 rejected 的状态
		2.可以传入一个参数，这个参数就是这个 Promise 的【返回数据】





	Promise.all()
		1.🔥要传入一个可迭代对象，比如【数组】，数组里边都是 Promise 实例！
		2.执行后会返回一个【新的 Promise 实例】，这个实例的【状态】和【数据】都是根据【数组】中 Promise 的实例们的【状态】来决定的
			2-1.⚡️如果数组内【所有 Promise 都是 fullfilled】，那么这个【新的 Promise 实例】的状态也是 fullfilled，数据也是【所有 Promise 实例组成的数组】
			2-2.如果其中【有一个是 rejected】，那么这个【新的 Promise 实例】的状态也是 rejected，数据就是【那个被 reject 的 Promise 实例的数据】，如果有多个被 rejected 则取第一个被 rejected 的数据

	Promise.race()
		1.🔥要传入一个可迭代对象，比如【数组】，数组里边都是 Promise 实例！
		2.执行后会返回一个【新的 Promise 实例】，这个实例的【状态】和【数据】都是根据【数组】中 Promise 的实例们的【状态】来决定的
			2-1.看第一个变状态的是谁，无论变为 fullfilled 还是 rejected, 只要有一个 Promise 的状态变了，就变为这个 Promise 的【状态】跟【数据】,其他的都会被静默处理
			
	Promise.any()
		1.🔥要传入一个可迭代对象，比如【数组】，数组里边都是 Promise 实例！
		2.执行后会返回一个【新的 Promise 实例】，这个实例的【状态】和【数据】都是根据【数组】中 Promise 的实例们的【状态】来决定的
			2-1.只要【有一个】是 fullfilled 状态，那么这个【新的 Promise 实例】的状态就是 fullfilled, 数据也是那个 fullfilled 的 Promise 的数据
			2-2.如果【所有】的实例都是 reject 状态，那么返回的这个【新的 Promise 实例】的状态就会变成 rejected，数据是【所有 rejected 实例数据组成的数组】

*/ 


//—————————————————————————————————————————————————————————————





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




//resolve 方法
console.log(Promise.resolve('123'))

//reject() 方法
console.log((Promise.reject('456'))
	.catch((err)=>{console.log(err);}))


//all 方法, 返回的 [[PromiseResult]] 是一个数组数据
const P = Promise.all([Promise.resolve('123'),Promise.resolve('456')])
console.log(P);


//all 方法实际场景
const P2 = Promise.all([
	new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve('123')
		},3000)
	}),
	Promise.resolve('456')
])
console.log(P2);


//any 方法
const P3 = Promise.any([
	new Promise((resolve,reject)=>{
		setTimeout(()=>{
			reject('123')
		},3000)
	}),
	Promise.reject('456')
])
console.log(P3); //errors: (2) ['123', '456']