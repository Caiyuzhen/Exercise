

let isPinned = false
const h2 = document.querySelector('.title')


// 👀建立监听滚动事件
const observerFn = new IntersectionObserver(([e]) => { //判断 sticky 什么时候会被触, [e] 是一个数组, 表示获取 array 中的第一个数组

	isPinned = (e.intersectionRatio < 1)
	e.target.classList.toggle('pinned', (e.intersectionRatio < 1)) /*测试, 触发 sticky 时文字变颜色*/
	console.log(e.intersectionRatio)
}, { threshold: [1]})   //🚀🚀 1 表示 相交 100% 的时候触发 


//👂开始监听滚动事件
observerFn.observe(h2) 




// 👋改变文字大小的事件
document.addEventListener('scroll', (e) => {
	if(isPinned)  {
		let html = document.documentElement
		let height = parseInt(getComputedStyle(h2).getPropertyValue('height')) + parseInt(getComputedStyle(h2).getPropertyValue('margin-bottom'))
		let marginTop = parseInt(getComputedStyle(h2).getPropertyValue('margin-top'))
		let scrolled = (html.scrollTop - marginTop) / height
		console.log(scrolled) //🚀🚀🚀完全遮挡文字后就是 1

		h2.style.setProperty('--sCale', (1 - scrolled)) //🚀🚀🚀设置为 --sCale 的 CSS 变量！！！ 1 - scrolled 表示 1 - 1 = 0, 也就是完全遮挡文字后, 文字大小为 0!!
	}
})