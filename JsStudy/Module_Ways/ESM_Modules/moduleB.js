/*
	默认导出的方式
		每个文件只能默认导出一次
		默认导出就不需要定义名称了，因为默认导出都会挂载到 default 上的
*/

//一般导出(又叫命名导出)
export function sayNo() {
	console.log('No!')
}




//默认导出（可以导出匿名函数）
// export default function () {
// 	console.log('Hello World!')
// }


export default function sayHi() {
	console.log('Hello World!')
}






