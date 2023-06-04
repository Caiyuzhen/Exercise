/*
	生成器
		What?
			🔥 内部有个特别的【关键字】 => yield
			🔥 执行生成器函数后会产生一个 【生成器对象】 =>  可以理解为产生一个生成器函数的【控制器对象】
			🔥 生成器函数执行后并不会让内部的函数执行, 只会产生一个【生成器对象】👆
			🔥 【生成器对象】有两个状态 => suspended、closed 

		Why?
			接 （接收数据）
			给 （把数据给到执行结果)
			停  (继续)

		How?
			在函数前面添加一个✳️ 星号
			箭头函数不能定义为生成器函数！
			🚀 返回的【控制器对象】上有个 next() 方法，每次调用后会执行到下一个 yield 的位置！
*/ 


// 👇不同函数定义成生成器函数的写法（箭头函数不能定义为生成器函数！）
function * generatorFn() {
	console.log('停在第 1 个 yield 这里')
	yield 1 //暂停到这里, 把 1 给到 value



	console.log('停在第 2 个 yield 这里')
	const Num = yield 2 // 接收数据, 由 next(998) 传入



	console.log(Num)
	console.log(Num, '停在第 3 个 yield 这里')
	yield 3



	// 接收第四次传入的数据
	const Num2 = yield 4
	console.log(Num2, '停在第 4 个 yield 这里')


	yield


	return 1080
}

let generatorFn2 = function * () {}

let foo = {
	* generatorFn3 () {}
}

class Foo {
	* generatorFn4 () {}
}

class Bar {
	static * generatorFn5 () {}
}




// 🔥 执行生成器函数后会产生一个 【生成器对象】 =>  可以理解为产生一个生成器函数的【控制器对象】, 同样的也是会有 value 跟 done
const generator = generatorFn()
console.log(generator) //[[GeneratorState]] : "suspended"


generator.next()  //每次执行后, 继续到下一个 yield 的位置, 注意 第一次执行时是没有 yield 的


generator.next()  //每次执行后, 继续到下一个 yield 的位置


generator.next(998)  //每次执行后, 继续到下一个 yield 的位置, 传入参数, 只有第一个参数才会被接收


generator.next() //每次执行后, 继续到下一个 yield 的位置


generator.next(44) //每次执行后, 继续到下一个 



console.log(generator.next())  //value 4





/*
	🚀【生成器函数】结合【迭代器函数】————————————————————————————————————————————————————————————————————————

		What?
			生成器函数本身是可迭代对象, 所以可以【结合迭代器函数】使用

		How？
			一般用法
			委托式用法
				yield 后边用 * 跟一个可迭代对象
			递归式用法
*/ 

// 例子一 - 一般用法
function * generatorFn3 () {
	yield 1
	yield 2
	yield 3
}

const g2 = generatorFn3()

for(let i of g2) { // 本质上调用的是生成器返回对象的 next()
	console.log(i)
}



const obj99 = {}
obj99[Symbol.iterator] = function * () {
	yield 1
	yield 2
	yield 3
}

for(let i of obj99) { // 因为【iterator 迭代器】本质上会产生一个【迭代器对象】, 这个对象回去执行 next() 方法, 所以会把 value 迭代出来
	console.log(i)
}



console.log('____')



// 例子二 - 委托式用法
function * generatorFn666 () {
	yield * [1, 2, 3, 4, 5] //🚀🚀在生成器内的 yield 后边用 * 定义一个【可迭代对象】, 相当于会委托来迭代这个对象
}

let obj666 = generatorFn666()

for(let i of obj666) { 
	console.log(i)
}




console.log('____')




// 例子三 - 递归式用法
function * fibonacci(n, current = 0, next = 1) {
	if(n === 0) {
		return current
	}

	yield current
	yield * fibonacci(n - 1, next, current + next) //每次都会产生一个生成器对象
}

// 生成斐波那契数列前 10 个数
for(let value of fibonacci(10)) {
	console.log(value)
}

