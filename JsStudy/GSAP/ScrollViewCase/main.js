import { gsap } from '../src/index.js' //引入核心库
import { ScrollTrigger } from '../src/ScrollTrigger.js' //引入插件


// 🔥🔥🔥注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger)


// ⚡️⚡️把元素放入一个【数组】
const sections = gsap.utils.toArray('.block')



// 🔥🔥内容移动的宽度 = 内容总宽度(要移动的子元素) - 可视容器宽度(父元素)
let allMoveContentWidth = 0
let containerWidth = 0

sections.forEach(item => {
	allMoveContentWidth += item.getBoundingClientRect().width //🔥🔥获取元素长宽高信息
	// allWidth += item.offsetWidth //🔥🔥获取元素长宽高信息
})
// console.log(allWidth) //4200px


containerWidth = document.querySelector('.scrollContent').offsetWidth
console.log(containerWidth)  //动态的（可视区域的宽度）




// 传入类名
gsap.to('.scrollContent', {
	x: -allMoveContentWidth + containerWidth, //🔥🔥内容移动的宽度 = 内容总宽度(要移动的子元素) - 可视容器宽度(父元素)
	easw: 'none',
	scrollTrigger: { //🍺🍺🍺 核心！！！

	}
})