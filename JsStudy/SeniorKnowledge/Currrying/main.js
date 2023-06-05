/*
	高阶函数
		What？
			能够接收一个或多个函数【作为参数】, 并且 ｜ 或者 能够【返回一个新的函数】
			
			常见的高阶函数有 map、filter、reduce 等



	柯里化 Currying
		What？
			【接收多个函数】然后转化为【接收单一参数（第一个参数）】然后【返回一个新函数】, 这个新函数【接收余下的参数】并返回结果

		Why?
			比如生成日志, 每一天的时间是【固定】的, 因此可以固定【时间】这个参数, 不用每次都传入多个参数
 */


// 柯里化函数例子
function curryFn(f) {
	return function(a) { //👈 第一步产生的函数, a = 22, 产生闭包
		return function(b) { //👈 第二步产生的函数, b = 44, 产生闭包
			return f(a, b) // 👈 f => 就是 sumFn 函数
		}
	}
}

// 柯里化函数用法
function sumFn(a, b) {
	return a + b
}

let curriedSum = curryFn(sumFn)
curriedSum(22)(44) // 👈相当于把返回的函数再次调用


// 🚀 函数柯里化的意义 —— 可以【固定第一个参数】, 比如固定为 33, 不用每次都传入 33 
const fun1 = curryFn(33)
const result = fun1(99) //比如希望结果为 33+99,
const result2 = fun1(66) //比如希望结果为 33+66
const result3 = fun1(88) //比如希望结果为 33+88




// 🚀高阶柯里化, 可以判断哪些参数需要ke li hua柯里化 ————————————————————————————————————————————————————————————————————————
function seniorCurry(func) {
	return function curried(...args) {
		if(args.length >= func.length) {
			return func.apply(this, args) //👈🔥相当于执行了这个函数!!
		} else {
			return function(...args2) {
				return curried.apply(this, args.concat(args2)) //👈🔥柯里化后的处理
			}
		}
	}
}

function sumFn2(a, b, c) {
	return a + b + c
}

let curriedSum2 = seniorCurry(sumFn2)

alert( curriedSum2(1, 2, 3) ) //6, 仍然可以被正常使用
alert( curriedSum2(2)(2, 3) ) //6, 对第一个参数进行柯里化
alert( curriedSum2(2)(2)(3) ) //6, 全部参数都被柯里化