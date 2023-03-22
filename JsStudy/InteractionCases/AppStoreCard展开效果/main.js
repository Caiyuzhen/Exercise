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


		// 🔥【核心】计算正文需要滚动的高度 = 窗口总高度 - 卡片图片的高度
		let imgHeight = (this.querySelector('img').offsetHeight) * 480 / 420 //图片展开后的高度
		let titleHeight = (this.querySelector('h4').offsetHeight) * 480 / 420 //标题的高度
		let allHeight = window.innerHeight  //窗口总高
		let contentScrollHeight = (allHeight - imgHeight - titleHeight) / (480 / 420)//正文需要滚动的高度
		//为什么要处以 * 480 / 420 ? 因为正文的字体大小是 480 / 420, 所以要除以这个比例, 才能得到正文的高度
		// console.log(contentScrollHeight);
		this.querySelector('.content').style.height = contentScrollHeight + 'px'//把计算回来的高度给到 content


		
		// ⚡️【核心】 避免展开卡片后还能滚动 body 导致穿帮, 判断 card 是否有 active 这个类
		if (this.classList.contains('active')) {
			document.body.style.overflow = 'hidden'; //禁止最外层的 body 滚动, 避免穿帮
		} else {
			document.body.style.overflow = 'auto'; //允许最外层的 body 滚动
		}
	})
})


