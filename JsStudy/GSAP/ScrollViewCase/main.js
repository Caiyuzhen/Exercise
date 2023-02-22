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
// console.log(containerWidth)  //动态的（可视区域的宽度）




// 🌟🌟🌟核心滚动效果 ————————————————————————————————————————————————————————————————————
gsap.to('.scrollContent', {
	x: - allMoveContentWidth + containerWidth, //🔥🔥内容移动的宽度 = 内容总宽度(要移动的子元素) - 可视容器宽度(父元素)
	ease: 'none',
	scrollTrigger: { //🍺🍺🍺 核心！！！
		trigger:'.scrollContent', //🔥🔥🔥从哪个元素开始联动(默认起始点就是这个元素) 
		pin:  true, // 🔥把元素定住！ 
		scrub: 1, //🔥🔥摩擦力 
		end: () => "+=" + (allMoveContentWidth - containerWidth), // 🔥🔥可以添加【字符串】【数字】跟【🔥函数】！！这里是为了让（滚动条更短）一些（滚动距离更长）【+= 表示从起始点开始加等于需要移动的距离】
		// onLeave: () => { /* 🔥结束滚动的事件 */
		// 	console.log('已经离开了元素(结束滚动）')
		// },
		// onEnterBack: () => { /* 🔥滚动回去的事件 */
		// 	console.log('向回滚动了')
		// }
	}
})	



// 🌟🌟🌟核心滚动效果（底部滚动到一定位置来触发事件）——————————————————————————————————————————
const cbTrigger = ScrollTrigger.create({
	trigger: 'body',
	// end: 'bottom bottom', //🔥🔥当 【body 元素的底部】触碰到【视窗】的底部
	/*🔥🔥当 【body 元素的底部】碰到【视窗 本身 + 200px】的位置 */
	end: 'bottom ' + `${innerHeight + 200}px`,  
	onLeave: () => {
		console.log('到达最底部了')
		document.body.style.backgroundColor = '#000000' 
	},
	onEnterBack: () => {
		console.log('向回滚动了')
		document.body.style.backgroundColor = 'white' 
	}
})