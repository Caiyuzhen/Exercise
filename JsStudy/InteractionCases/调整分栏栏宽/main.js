let startMouseX,   //记录鼠标按下那一刻, 鼠标的 X 轴
	startWidth //记录鼠标按下那一刻, 分栏的左侧的宽度

// 获取本地 localStorage 记录的宽度值
startWidth = localStorage.getItem('contentAWidth') || getContentAWidth() //有 localStorage 值则取值, 没有值则获取当前元素的宽度
console.log(startWidth)
document.querySelector('.contentA').style.width = startWidth + 'px'


const separator = document.querySelector('.separator')
separator.addEventListener('mousedown', startDrag)


// 鼠标按下
function startDrag(e) {
	startMouseX = e.clientX //获得鼠标按下那一刻, 鼠标的 X 轴的参数
	startWidth = getContentAWidth()// 获得鼠标按下那一刻, 分栏的左侧的宽度
		// parseInt(window.getComputedStyle(document.querySelector('.contentA')).width, 10) //🔥🔥 10 表示转为十进制的数字！ 不然这里会带 px 单位！！
	console.log(startWidth) //这里是带单位的, 所以要用 parseInt() 去掉单位

	// 🔥开始监听两个事件
	document.documentElement.addEventListener('mousemove', onDragging) //🔥documentElement 表示把鼠标移动事件加到 html 这一层！！所以在 html 任何一个位置都能监听的到
	document.documentElement.addEventListener('mouseup', stopDrag)
}



// 鼠标拖动的时候
function onDragging(e) {
	//计算新的宽度
	let newWidth = startWidth + e.clientX - startMouseX //🔥新宽度 = 当前鼠标位置 - 鼠标按下的位置
	document.querySelector('.contentA').style.width = newWidth + 'px' //
	console.log(newWidth)
}



// 鼠标松开
function stopDrag(e) {
	// ⚡️记录宽度数据到本地 localStorage
	localStorage.setItem('contentAWidth', getContentAWidth())

	// 🔥停止监听两个事件
	document.documentElement.removeEventListener('mousemove', onDragging)
	document.documentElement.removeEventListener('mouseup', stopDrag)
}


// 获得分栏左侧 contentA 的宽度
function getContentAWidth() { 
	return parseInt(window.getComputedStyle(document.querySelector('.contentA')).width, 10) //🔥🔥 10 表示转为十进制的数字！ 不然这里会带 px 单位！！
}