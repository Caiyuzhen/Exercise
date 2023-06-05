/*
	AOP 编程

*/


Function.prototype.after = function (fn) { //相当于 method.after = function(fn) { ... }
	const self = this

	return function(...args) { //...args 表示 func() 👈这里传入的参数
		const result = self.apply(this, args) //this 表示绑定一下指向, args 表示 fn 的参数

		fn.apply(this, args) //这里表示下面的 method.after(...) 后边的函数
		return result
	}
}


Function.prototype.before = function (fn) { //相当于 method.after = function(fn) { ... }
	const self = this

	return function(...args) { //...args 表示 func() 👈这里传入的参数

		fn.apply(this, args) //这里表示下面的 method.after(...) 后边的函数 【🔥🔥🔥 fn 放前面了, 所以先执行 function(){console.log('333)} 】

		const result = self.apply(this, args) //this 表示绑定一下指向, args 表示 fn 的参数
		return result
	}
}



function method(x) { //👈参数实际上是传入到这里
	console.log('111')
	console.log(x) //222
}



const func = method.after(function() { // 调用 after 的话就是先执行 method 的函数, 然后再执行 after 的函数
	console.log('333') //最后执行 333
})


const func2 = method.before(function() { //调用 before 的话就是先执行 before 的函数, 然后再执行 method 的函数
	console.log('333') //最先执行 333
})



func('222')
console.log('————')
func2('222')