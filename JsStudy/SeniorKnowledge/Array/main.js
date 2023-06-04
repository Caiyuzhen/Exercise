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
			五、可以用【扩展运算符】或【Array.from】转成数组

		How?
			⚡️可以用 for...of 来遍历 => 底层调用的是 entries() 方法

			🔥 get() 、 set() 、 has() 、 delete() 、 clear() 、 size、 forEach 方法

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
			一、弱引用中的对象没有被【强引用】时, 垃圾回收机制就会处理这个对象, 弱引用的【键】只能是 Object 或者继承自 Object 的类型
			二、⚡️ 不是可迭代对象!! 没有 forEach!!!

		How?
			get()、has()、set()、delete()
*/


let obj3 = {}
const wm = new WeakMap([[obj3, 1]])
console.log(wm)

obj3 = null //当 obj3 被销毁后, WeakMap 也会销毁
console.log(wm)



console.log('Set ——————')

/* 
	Set 集合  ————————————————————————————————————————————————————————————————————————————————————————————————
		What?
			一、Set 定义的对象【🌟不能用索引位】的方式来访问, 🔥 可以用 for...of 来遍历, 但
			二、是一种无序的集合
			三、如果有重复数据, 会自动的把重复的数据给消除掉！🌟 Set 的数据有唯一性!!
			四、可以用【扩展运算符】或【Array.from】转成数组

		How?
			add()、size()、delete()	、has()、clear()

*/

const s = new Set([1, 2, 3, 'hey', 'hello', {}, [22, 88]]) //Set 定义的对象【🌟不能用索引位】的方式来访问, 看起来像索引位, 实际上不是
console.log(s)


// 添加数据
s.add(9999)


// 取出数据
for(let i of s) {
	console.log(i)
}


// 判断是否有哪个数据(因为 Set 定义的数据是唯一的)
console.log(s.has(9999)) //true


console.log([...s])




/* 
	WeakSet 弱集合  ————————————————————————————————————————————————————————————————————————————————————————————————
		What?
			一、必须是对象
			二、不是可迭代对象

		How?
			add()、has()、delete()
*/




/*
	ArrayBuffer 数据缓冲区 ————————————————————————————————————————————————————————————————————————————————————————————————
		What?
			一、向系统申请一段内存空间
			二、🌟 只用来存储数字类型的数据 🌟
					纯整数 Int 开头
					浮点数 Float 开头
					有符号无符号(有负数无负数)
			三、每种数据类型都有规定的范围 
				=> 比如 :
					Int8Array()  ->  数据范围是 -128 ~ 127
					Float32Array()  ->  数据范围是 0 ~ 4294967295
					Unit8Array()  ->  数据范围是  0 ~ 255 (🌈用来存颜色数据很合适！！)

		How?
			拥有绝大部分普通数组的方法
				比如 
					forEach
					通过索引位存取值
					...


	TypeArray(是一个抽象类) 、 DataView -> 定型数组 ————————————————————————————————————————————————————————————————————————————————————————————————
		What?
			一、类似 TS, 数组中的数据类型是确定的
			二、操作 ArrayBuffer 取出来的数据


		Why?
			因为提前知道了类型, 所以处理效率会大大提升


	字节序
		What？
			一、字节序是指数据在内存中的存储顺序
			二、大端字节序：数据的高位字节存储在内存的低地址中，而数据的低位字节存储在内存的高地址中
			三、小端字节序：数据的高位字节存储在内存的高地址中，而数据的低位字节存储在内存的低地址中
			四、JS 采用小端字节序

*/

const buffer = new ArrayBuffer(10) //从内存中取 10 个字节来用 (1 字节 = 8 比特, 最小的使用单位为字节)
const aaaa = new Int8Array(buffer) // Int8Array 是 TypeArray 的子类, Int8 表示 8 个比特作为一组数据, 所以是 10 个位置


const bbb = new Int16Array(10) // Int16 表示每个位置可以放 2 字节, 所以总的是 20 个位置


aaaa[0] = 100 //给第一个索引位存入 100 这个数据
console.log(aaaa)


// 访问每个数据位占用多少字节
console.log(Int16Array.BYTES_PER_ELEMENT) //2



console.log('————————————类数组')



/*
	类数组 ————————————————————————————————————————————————————————————————————————————————————————————————
		What?
			满足条件:
				一、对象具有 length 属性
				二、可以通过索引位来访问数据

			常见类数组
				arguments
				NodeList 
				HTMLCollection
				TypeArray
				String 对象
				Map  weakMap  Set  weakSet
				Promise.all()
				Promise.race()

			🌟 类数组没有大部分数组有的方法, 主要是看类数组自己类型上有没有定义对应的方法
					NodeList 自己类型上有定义 forEach 方法

			🚀 类数组转化为数组的方法 
				 方法一、扩展运算符
				 方法二、Array.from()

				 	转成数组后可以用 for...of 来迭代 (能用扩展运算符的都可以用 for...of )
			
					💥 不是所有类数组都能转化为数组, 能转化为数组的对象上有 Symbol.iterator 迭代器
*/


//类数组例子
const obj5 = {}
obj5.length = 1
obj5[0] = 100


// 字符串也是类数组, 因为可以通过索引位来获取数据
const str = 'abcdefg'
console.log(str[6])


// 类数组转化为数组
const element = document.querySelectorAll('h1')
const allEle = [...element]
for(let ele of allEle) {
	console.log(ele)
}



