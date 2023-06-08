/**
 * @param {number} a - 这是第一个参数, 需要传入数字
 * @param {number} b - 这是第二个参数, 需要传入数字
 * @returns {number} - 返回 a + b 的值
 * @author - Zen
 */


function sum(a, b) {
	return a + b;
}

sum(1, 2)




// 如果写 JS 库, 需要注意闭包问题
let name = '这是一个很好的方法' 
function abc() {}

export default {
	test() {
		console.log(name) //导出后, name 形成一个闭包, 避免用户直接访问到 name
		abc() //导出后, abc() 形成一个闭包, 避免用户直接访问到 abc()
	},
	age:  20,
}


export class Abc {
	constructor() {
		this.name = 'Z6'
		this._name = 'Zen' //下划线表示内部属性, 不建议外部用户调用
	}

	_test() {
		console.log(this.name)
	}
}