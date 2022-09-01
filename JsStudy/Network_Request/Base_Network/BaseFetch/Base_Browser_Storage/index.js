/*

	除了 cookie 还有三种存储方式, 存储量有 5MB，比 cookie 大很多
		sessionStorage    存在当前的会话窗口（tab），关闭页面就没了
			setItem('key', value)
			getItem('key')
			removeItem('key')
			clear()   			 //请求所有域名下的数据

		localStorage    存在硬盘，存储量有 5MB，除非手动删除否则一直在，跨页面的话同源即可访问
			setItem('key', value)
			getItem('key')
			removeItem('key')
			clear()   			 //请求所有域名下的数据

		IndexedDB     浏览器提供的数据库，存储量巨大，基本没上限
			场景，比如 figma 就用到了 indexedDB 的能力，因为数据量巨大

*/

const inputBar = document.querySelector('.inputBar')
const inputButton = document.querySelector('.inputButton')
const getButton = document.querySelector('.getButton')
// console.log(inputButton)

inputButton.addEventListener('click', ()=>{
	const text = inputBar.value	
	sessionStorage.setItem('name', text) //存储临时会话数据
	// console.log(text);
})

getButton.addEventListener('click', ()=>{
	let dataNode = document.createElement('dataNode')
	const dataText = sessionStorage.getItem('name')
	dataNode.innerHTML = dataText
	// console.log(dataText);
	document.getElementsByTagName('body')[0].appendChild(dataNode)
})

