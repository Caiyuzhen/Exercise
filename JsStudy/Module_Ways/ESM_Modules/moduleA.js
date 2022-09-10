/*
	🧈 export 导出方式
			
		What?
			可以导出多个, 比如导出函数、变量、类等

			导出时可以重命名，比如 export { sayHi ad hello }

		How?
			方式一（命名导出）：在标识符前面加个 export 关键字, 🌟记得一定要有标识符的名称
			方式二（默认导出）：在最底部合并导出 export { XXX, XX , XXX}
*/ 



//单个导出
export function getData(){
	console.log('lalal')
}

export class ABC {
}

export const dd = 1000

export const member = {a:123, b:456}

export const person = ['Jimmy', 'Tom', 'Jack']




//合并导出
const aaa = 123

const bbb = {}

export {
	aaa as aaaData,
	bbb
}
