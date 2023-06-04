/* 
	What?
		可迭代对象就是具备【迭代器】的对象
		迭代器包括很多、数组、类数组上都是没有 return 方法的

		迭代过程
			第一步: 调用对象的 Symbol.iterator 				 		=>   迭代器 工厂函数
			第二步: 调用 Symbol.iterator 方法返回的迭代器对象(多个)    =>   迭代器  对象
			第三步: 调用迭代器对象上的 next 方法       		   		  =>   返回结果对象 
															   				IteratorResult {value: any, done: boolean}
*/

const arr = ['a', 'b', 'c', 'd', 'e']
const iter = arr[Symbol.iterator]()
console.log(iter.next()) //value: 1, done: false  => 每次都会执行 next()
console.log(iter.next()) //value: 1, done: false  => 每次都会执行 next()
console.log(iter.next()) //value: 1, done: false  => 每次都会执行 next()
console.log(iter.next()) //value: 1, done: false  => 每次都会执行 next()
console.log(iter.next()) //value: 1, done: false  => 每次都会执行 next()
console.log(iter.next()) //value: undefined, done: true  => 每次都会执行 next()



// 迭代器可以被提起【终止】或【结束】
const [a,b] = arr //解构赋值出来了 2 个值, 所以迭代器被提前终止了
console.log(a,b)



// 用 break 提前结束迭代
const arr2 = [1,2,3,4,5]
const iter2 = arr2[Symbol.iterator]()

for(let i of iter2) {
	console.log(i)
	if(i > 2) {
		console.log('提前结束迭代器')
		break 
	}
}

for(let i of iter2) { //🔥 for...of 迭代器对象才会继续迭代, 如果是 for...of 【⚡️数组】的话就不会继续迭代了, 而是会产生新的迭代器对象
	console.log(i)
}



// 给普通的对象创造一个迭代器
const testObj = {}

testObj[Symbol.iterator] = function() {
	let i = 0
	return {
		next: function() { //函数作为返回值
			return {
				value: i++, //在 i = 0 之后才 ++
				done: i > 10 //Symbol.iterator 的 done 为 true 时, 迭代器就会终止
			}
		}
	}
}