/* 	
	🌟🌟一个模块化的方法, 可以自定义传入【元素】:
		传入一个元素 id, 点击后这个元素就会被放大

*/

export function changeBigger(eleId) {
	const ele = document.getElementById(eleId)
	ele.style.transformOrigin = `left` //改变变化中心点

	let bigger = 0
	let scaleRatio = 1
	
	ele.addEventListener('mousedown',()=>{
		bigger = setInterval(() =>{
			scaleRatio++
			ele.style.transform = `scale(${scaleRatio})`
			// console.log('变大');
			console.log(`${scaleRatio}`);
		},300)
	})

	ele.addEventListener('mouseup',()=>{
		ele.style.transform = `scale(1)`
		clearInterval(bigger)
	})
	


}