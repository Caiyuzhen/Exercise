// 获取所有卡片, 并且给每个点击的卡片添加 active 类
const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
	card.addEventListener('click', function(e) {

		//🔥【核心】计算每张卡片距离顶部多少, 然后把这个要移动的距离值给到卡片的 css
		let cardScrollToTop = this.offsetTop
		// console.log(cardScrollToTop); //每张卡片相对于顶部的距离

		//🔥🔥【核心】 把计算回来的值变量给到 css, 设置一个 css --变量, 然后再设置给 translate 的属性!!!  translateY(var(--cardScrollToTop))
		this.style.setProperty('--cardScrollToTop', cardScrollToTop * -1 + 'px')
		this.classList.toggle('active');/*⚡️⚡️ toggle 更简单！点击后添加, 再点击就去除！*/


		// ⚡️【核心】 避免展开卡片后还能滚动 body 导致穿帮, 判断 card 是否有 active 这个类
		if (this.classList.contains('active')) {
			document.body.style.overflow = 'hidden'; //禁止最外层的 body 滚动, 避免穿帮
		} else {
			document.body.style.overflow = 'auto'; //允许最外层的 body 滚动
		}
	})
})


