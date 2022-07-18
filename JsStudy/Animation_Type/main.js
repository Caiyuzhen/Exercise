/* 
	Animation 类
		Element.animate(),
			将返回一个 Animation 的实例
			 	🌟调用 pause() 来停止初始化的动画
				🌟调用 play() 来开始动画
				🌟调用 playState来判断状态
				🌟调用cancel()来取消动画
					里边包含几个重要值
						idle        当前动画事件无法解析
						pending     动画将一直等到某些等待中的任务完成才会执行
						running     动画正在运行
						paused      动画已经中止
						finished   动画达到某一临界点
					

		相当于css keyframe 帧动画的 js 版本


		几种添加动画的方式：
			方式一：添加 transform 属性
			方式二：添加包含 kf 动画的类
			方式三：JS 添加 animate() 动画
*/

const BOX = document.querySelector('.box');


//要传入两个数据，一个是数组, 里边包含很多对象, 类似帧动画的写法
const BOX_ANMI = BOX.animate([
	{
		transform: 'translateX(0px)',
	},
	{
		transform: 'translateX(200px)',
	}
],2000) //第二个参数是动画的持续时间


BOX_ANMI.pause() //一开始先暂停动画

BOX.addEventListener('click',()=>{
	// BOX_ANMI.play() //点击元素之后再播放动画
	// console.log(BOX_ANMI.playState)
	
	//🔥🔥点击元素时, 判断是不是暂停的状态, 是的话就让它开始运动, 否则就让它停下来
	if(BOX_ANMI.playState === 'paused'){ 
		BOX_ANMI.play()
	}else{
		BOX_ANMI.pause()
	}
})