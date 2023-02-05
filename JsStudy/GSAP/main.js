import { gsap } from './src/index.js' //引入核心库
import xx from './src/PixiPlugin.js' //引入插件

console.log(gsap);
console.log(xx);

/*
	gsap 核心能力
		Tween  补间动画(缓动动画)
		Timeline  时间轴（类似👆的加强版, 可以做不同阶段的动画）


		gsap.to      //运动到哪里

		gsap.from    //从哪里运动过来

		gsap.fromTo  //从什么过渡到什么

		gsap.set    //硬切换

 */


// const circle = document.querySelector('.circle')


//👇👇 执行 Tween 对象的实例

//运动到哪里
gsap.to('.circle', { // 获取 css 标签
	x: 300,
	duration: 0.5,
	delay: 0.5, //🔥需要设置延迟, 不然立即执行的话, 会卡顿一下！
	color: 'rgba(198, 255, 76)',
	fontSize: 24,
	rotation: 720,
	opacity: 0.8,
	scale: 2,
	ease: 'bounce',
})


//从哪里运动过来
gsap.from('.square',{
	x: 300,
	duration: 0.5,
	delay: 0.5,
})


//从什么过渡到什么
gsap.fromTo('.triangle',
	{
		x: 100,
		duration: 0.5,
		delay: 0.5
	},
	{
		x: 700,
		duration: 0.5,
		delay: 0.5,
		borderBottom: '100px solid rgba(246, 176, 47)',
	},
)


// ⚡️⚡️多个元素依次执行的动画(⚡️需要先选中一组标签！) stagger
gsap.to('.eleAll', {
	duration: 0.5, 
	opacity: 0, 
	x: 100, 
	stagger: 0.1,
	ease: "back.in"
})




//👇👇 执行 Timeline 对象的实例 (会依次的去执行)
const tl = gsap.timeline()

tl.to(
	'.eleA', {
		x: 300,
		duration: 0.3,
		delay: 0.5,
		ease: 'power2.inOut'
	}
)

tl.to(
	'.eleB', {
		x: 300,
		duration: 0.3,
		ease: 'power2.inOut'
	}
)

tl.to(
	'.eleC', {
		x: 300,
		duration: 0.3,
		ease: 'power2.inOut'
	}
)