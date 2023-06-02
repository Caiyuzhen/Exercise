// 访问器属性 Get \ Set

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
object.defineProperties(obj, { //获取跟设置 obj 的属性
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