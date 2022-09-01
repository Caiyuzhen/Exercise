const model = document.querySelector('.model')


// model.addEventListener('mousemove',()=>{
// 	model.style.transition = `0.15s ease-in-out`;
// })


model.addEventListener('mousedown',function(e){
	// 鼠标按下的坐标 - 盒子距离左侧的坐标 = 鼠标按下的点距离盒子左侧的距离
	let mouseInBox_X = e.pageX - model.offsetLeft
	let mouseInBox_Y = e.pageY - model.offsetTop

	// 🔥🔥鼠标按下（注意，要在按下的事件内去绑定移动事件）
	document.addEventListener('mousemove',move)

	function move(e){
		model.style.left = e.pageX - mouseInBox_X + 'px'
		model.style.top = e.pageY - mouseInBox_Y + 'px'
	}

	// 🔥🔥鼠标松开，然后移除 move 事件!（注意，要在按下的事件内去绑定移动事件）
	document.addEventListener('mouseup',function(){
		document.removeEventListener('mousemove',move)
	})
})

