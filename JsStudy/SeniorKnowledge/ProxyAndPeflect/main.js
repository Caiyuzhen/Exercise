/*
	🌟🌟 代理
		What?
			给目标对象添加额外的功能, 但是不改变目标对象的结构
			如果第二个参数传入的是空对象 {}, 那么代理对象跟目标对象都是同步的

		How?
			🌟 代理捕获器
				get
				set  => 👈可以设置 4 个参数, 必须返回布尔值  => 🚀set 方法在给【代理】设置属性值时会触发捕获器
				has  => 👈可以设置 2 个参数  => 🚀【代理】上是否存在某个【属性名】 => 有个【不变式】的规则（比如被代理的对象上的某个属性是不可被修改的, 那么则会返回 true)
				defineProperty
				getOwnPropertyDescriptor
				deleteProperty
				ownKeys
				getPrototypeOf
				setPrototypeOf
				isExtensible
				preventExtensible
				apply
				construct

		Why?
			🔥🔥 场景 
					🔥 比如用代理拦截一下, 【检查】某些传入的参数是否满足要求
					🔥 比如用来做【对象虚拟化】, 实现懒加载、远程调用等功能
					🔥 比如 AOP （面向切片编程）, 实现用代理来动态修改某个对象的行为, 比如日志记录、性能监控等等
					🔥 比如用来【缓存】某些数据, 避免重复计算, 实现记忆函数
					🔥 拦截 JS 对某些对象的【访问】或【修改】

*/ 


const obj = {
	name: 'zen',
	age: 18
}


// 设置代理
const proxyObj = new Proxy(obj, { //👈目标对象
	// 设置 set 捕获器
	set(target, key, value) { //target 是 obj, key 是 name, value 是 zen
		console.log('set 方法被触发', key,'修改为:', value)
		target[key] = value
		// return true // 需要返回布尔值(🌟 方式一, 直接返回)
		return Reflect.set(...arguments) // 需要返回布尔值(🌟 方式二, 用反射的方式返回), arguments 会获取当前函数执行后的所有参数
	},

	// 设置 delete 捕获器
	deleteProperty(target, property) {
		console.log('delete 方法被触发', '删除了:', property)
		delete target[property]
	},

	// 设置 has 捕获器
	has(target, key) {
		console.log('has 方法被触发', '检查的属性:', key)
		// return key in target
	}
})


// 🚀set 方法在给【🌟代理对象】设置属性值时会触发捕获器
proxyObj.name = 'ken'

// 🚀deleteProperty 方法在给【🌟代理对象】删除属性时会触发捕获器
delete proxyObj.name

// 🚀代理的 has 方法
console.log('name' in proxyObj) // false


// console.log(proxyObj.name) 






/*
	🌟🌟 反射
		What？
			跟代理的捕获器的名字、数量、参数都是一一对应的
			会有【🌟额外的返回值】
		
		Wht？
			用于取值, 并且能够有返回值
	
*/

const obj2 = {
	name: 'Jimmy',
	age: 26
}


const res = Reflect.get(obj2, 'age') //等价于 obj2.age 
console.log(res) // 26


const res2 = Reflect.set(obj2, 'age', 20)
console.log(res2) //👈 返回布尔值 true