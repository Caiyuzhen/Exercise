// 访问器属性 Get \ Set ————————————————————————————————————————————————————————————————————————————————————————————————

// 写法一:
const obj = {
	_name: 'Tom',
	age: 18,

	get name() {
		return this._name
	},

	set name(value) {
		if( typeof value === 'string' ) {
			this._name = value
		} else {
			new Error('value must be string')
		}
	}
}



// 写法二:
Object.defineProperties(obj, { //获取跟设置 obj 的属性
	'_code': {
		value: 100,
	},
	'code': {
		get () {
			return this._code
		},
		set (value) {
			this._code = value
		}
	}
})


// 类里边也可以定义访问器属性
class XX {
	constructor(name) {
		this.name = name
	}

	_name = 100

	get name() {
		return this._name
	}

	set name(value) {
		this._name = value
	}

	static get name() {
		return this._name
	}

	static set name(value) {
		this._name = value
	}
}



// 🌟 不建议用 for-in 、 Object.keys() 去循环【对象】, 因为不同的浏览器循环出来的顺序是不固定的
// 🌟 Object.getOwnPropertyNames() 、 Object.getOwnPropertySymbols() 、 Object.assign() 这几个方法循环出来的枚举顺序是确定的


// 可枚举 !== 可遍历 (可枚举是指能否通过 for-in、Object.keys() 循环出来) (可遍历是指能否通过 ... 扩展运算符或者 Array.from() 转换成数组) 



/*
	Symbol ————————————————————————————————————————————————————————————————————————————————————————————————
		What?
			用来做对象的属性名 （🌟用 Symbol 做属性名有唯一性）
		
		Why?
			避免属性名冲突
			用来创建内置方法
*/

let zen = Symbol()
let abc = Symbol('personName') //'abc' 有描述的 Symbol, personName 为描述

const obj2 = {
	[zen]: '小白',
	[abc]: '你好',
	[Symbol('cat')]: '饭团'
}


console.log(obj2[zen])


const symbolArr = Object.getOwnPropertySymbols(obj2) //获取对象的所有 Symbol 的引用
console.log(symbolArr)
console.log(obj2[symbolArr[2]]) // 从所有 Symbol 内取值



// 🔥🔥 Symbol.for() 、Symbol.keyFor()  在全局内注册共用 Symbol 属性
const aaa = Symbol.for('personName')  //相当于在全局内去找被标记为 personName 的 Symbol, 如果没有就是创建一个新的 personName 的 Symbol
console.log(aaa)




/*
	Map 数据结构 ————————————————————————————————————————————————————————————————————————————————————————————————
		What?
			Map weakMap  (映射)
			Set weakSet

		🚀 与普通对象相比, 特点是 🚀:
			一、任意数据类型都可以做 【键】的一种数据结构
			二、内置了一系列方法比如 set、get、has、delete、clear、size、forEach 等等
				普通对象需要通过 🌟 Object.keys(obj), 但是 Map 就只需要 🌟 obj.keys()
			三、提供了多种遍历方法比如 keys、values、entries、forEach 等等
			四、与对象不同, Map 会保留插入的顺序, 因此可以方便的实现【队列】等数据结构

		How?
			⚡️可以用 for...of 来遍历 => 底层调用的是 entries() 方法

			🔥 get() 、 set() 、 has() 、 delete() 、 clear() 、 size、 forEach 方法

			可以用【扩展运算符】或【Array.from】转成数组
*/


const m = new Map([  //必须传入一个可迭代对象, 比如数组
	['name', 88],
	[NaN, 200],
	[{}, 12],
	[()=>{}, [1,3,4]]
])

console.log(m)
console.log(m.size) //类似数组的 length


for(let i of m) { //获得所有的键值对 [键, 值]
	console.log(i)
}

console.log(m.keys())// 获得所有的键 name, naN, {}, ()=>{}


console.log(m.get(NaN)) // 🔥🔥获得某个键的值 => 需要【用 get() 方法!!】 而不是像对象一样用 m[NaN] ❌

m.set('name', 998) //🔥🔥 传入 键名 + 值
console.log(m.get('name')) //打印出来的是新的值

console.log('____')

// forEach 方法
m.forEach((value, key, map) => { //🔥先 value !!
	console.log(key, value)
})


// 转成数组
const newArr = [...m] // ['name', 998], [NaN, 200], [{}, 12],  [()=>{}, [1,2,3]]
console.log(newArr)



/* 
	WeakMap 弱引用  ————————————————————————————————————————————————————————————————————————————————————————————————
		What?
			弱引用中的对象没有被【强引用】时, 垃圾回收机制就会处理这个对象

*/


let obj3 = {}
const wm = new WeakMap([[obj3, 1]])
console.log(wm)

obj3 = null //当 obj3 被销毁后, WeakMap 也会销毁
console.log(wm)