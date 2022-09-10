/*
	ESM 模块化
		传统的方式直接 script 引入即可，ESM 的方式需要 import 导入才可以使用
		📮导入方式：
			what?
				🌟大前提：需要在 script 标签内加上 type="module"
				导入时可以重命名，比如 import { getData as getData2 } from "./moduleA.js", 可以解决标识符重名的问题
				模块都是被包裹在自身的局部作用域内, 所以不会污染全局作用域
				🌟模块化的文件，顶层作用域为 undefined
			How？
				方式一: 单个导入，比如 import { getData } from "./moduleA.js"
				方式二: 合并导入, 比如 import * as moduleA from "./moduleA.js", 然后再通过 moduleA.getData() 来调用

		⚙️动态加载模块（按需加载
			How? 比如在点击按钮的时候才加载模块		
*/

const addModuleBtn = document.querySelector('.addModuleBtn')
const addConfetti = document.querySelector('.addConfettiBtn')
const addConfetti2 = document.querySelector('.addConfettiBtn2')


import { getData } from "./moduleA.js"
import * as moduleA from "./moduleA.js"
import * as moduleB from "./moduleB.js"
import sayHi from "./moduleB.js" //默认导出的话，不需要添加花括号
import {aaaData} from './moduleA.js'



//调用导入的单个模块方法 
getData()
console.log(aaaData);


//调用导入的合并模块方法
moduleA.getData() //所有东西都在一个 moduleA 对象身上, 通过链式调用的方式来使用
console.log(moduleA.aaa)



//调用默认导入的模块方法
// console.log(moduleB.default) //默认 default 导出的匿名函数
sayHi() //默认导出的函数



//🔥🔥动态加载 module
addModuleBtn.addEventListener('click',()=>{
	import("./moduleC.js").then((moduleC) => { 
		console.log(moduleC)
		moduleC.createApp()
		//...
	})
})



//🔥🔥引入云端包的方式

//🎉🎉加载后直接撒花
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
confetti();



//🎉🎉 点击按钮后进行撒花
addConfetti.addEventListener('click',()=>{
	import ('https://cdn.skypack.dev/canvas-confetti').then(
		confetti()
	)
})



//🎉🎉 调用两头撒花的效果
const jsConfetti = new JSConfetti()
// jsConfetti.addConfetti()

addConfetti2.addEventListener('click',()=>{
	jsConfetti.addConfetti()
})


