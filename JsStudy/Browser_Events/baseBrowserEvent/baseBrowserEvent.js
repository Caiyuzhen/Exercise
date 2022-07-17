/*
	resize 事件
		绑在 window 对象上,当窗口改变超过 1px 时就会触发


	load 事件
		可以绑在 window 或者 img 对象上,在整个页面（包含外部资源、图片、JS 文件、CSS 文件）都加载完毕后就会触发


	DOMContentLoaded 事件
		绑在 window 上, 只要 DOM 树出来后就会立即触发，会比 load 快


	readystatechange 事件
		绑定在 document 上, 只要文档状态发生变化就会触发
			readyState 有三个状态属性：
				loading  	正在加载中，还没有 DOM 树
				interactive 加载了一部分 DOM，可以交互
				complete	加载完成，可以正常使用


	contextmenu 事件
		绑在 document 上或者是自定义【元素】都行, 比如可以控制原生右键菜单栏显示与否,阻止之后可以显示为自己定义的菜单栏
		里边有 event 属性，可以获取
		可以冒泡, 可以通过事件委托机制, 绑定在其他元素上, 比如绑定在父元素上


	beforeunload 事件
		绑在 window 上, 当用户离开页面时就会触发, 可以阻止用户离开页面


	hashchange 事件
		绑在 window 上, URL 散列值（url 地址 # 后面的值发生变化后就会触发）
			可以获得 newUrl \ oldUrl


	pageshow 事件
		绑在 window 上, 事件目标是 document，会在 load 事件后触发, event 中包含一个 persisted 属性, 表示是否是从缓存中加载的页面 （true or false）


	pagehide 事件
		绑在 window 上, 事件目标是 document, 会在页面卸载后，在 unload 事件之前触发, event 中包含一个 persisted 属性, 表示页面在卸载之后会保存在缓存中（true or false）
		注册了 onunload 事件处理程序的页面会自动的排除在往返的缓存之外
*/




//🌟 resize 事件 ————————————————————————————————————————————————————————————————————
const BOX = document.querySelector('.box')
const CONTAINER = document.querySelector('.container')

//让元素跟随浏览器窗口发生变化
// window.addEventListener('resize', function(e){
// 	//根据浏览器的宽度设置元素的宽度
// 	BOX.style.height = innerHeight / 10 + 'px'  //innerHeight 表示浏览器窗口的高度
// 	BOX.style.width = innerWidth / 10 + 'px'	//innerWidth 表示浏览器窗口的宽度
	
// 	//把盒子的长宽值嵌入到页面中
// 	console.log(BOX.style.height,BOX.style.width)
// 	BOX.innerHTML = `高度(${BOX.style.height},宽度(${BOX.style.width})`
// })





//🌟 load 事件 ————————————————————————————————————————————————————————————————————
	window.addEventListener('load',(e)=>{
		console.log('页面加载完毕')
	})

	//用 Js 来创建 HTML 元素, 内存中已经创建好了, 只是显不显示到 DOM 树上
	let image = new Image()
	image.src = 'https://images.unsplash.com/photo-1656932850123-dbd64a854816?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1603&q=80'

	//图片元素的 onload 事件
	image.onload = function(){
		console.log('图片加载完毕')
	}

	//把图片添加到 container 上, 或者是 document.boay.appendChild
	CONTAINER.appendChild(image)



//🌟 DOMContentLoaded 事件 ———————————————————————————————————————————————————————
	window.addEventListener('DOMContentLoaded', function(e){
		// 比如上面的 resize 事件，可以用 DOMContentLoaded 事件来代替, 一加载网页就执行
		// 根据浏览器的宽度设置元素的宽度
	})



//🌟 readystatechange 事件 ———————————————————————————————————————————————————————
	document.addEventListener('readystatechange', function(e){
		console.log(document.readyState);
	})



//🌟 contextmenu 事件 ———————————————————————————————————————————————————————
	//绑定在 document 上
	document.addEventListener('contextmenu', function(e){
		e.preventDefault();
		//e 事件对象可以获得鼠标的位置信息, 所以可以让自己的菜单栏要出现的位置出现在鼠标点击的位置
	})

	//绑定在 CONTAINER 上
	BOX.addEventListener('contextmenu', function(e){
		alert('右键了');
	})



// //🌟 onunload 事件———————————————————————————————————————————————————————
// 	window.addEventListener('unload', function(e){
// 		alert('离开了页面')
// 		console.log(离开了页面);
// 	})


//🌟 beforeunload 事件 ———————————————————————————————————————————————————————
	window.addEventListener('beforeunload', function(e){
		console.log('确定离开吗');
		// e.returnValue = '确定离开吗';
	})


//🌟 hashchange 事件 ———————————————————————————————————————————————————————
	window.addEventListener('hashchange', function(e){
		console.log(location.hash);
	})