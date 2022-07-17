/* 
	Animation 类
		Element.animate(),
			将返回一个 Animation 的实例
			 	🌟调用 pause() 来停止初始化的动画
				🌟调用 play() 来开始动画
				🌟调用 playState() 来判断状态

		相当于css keyframe 帧动画的 js 版本


		过往的方式：
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
	BOX_ANMI.play() //点击元素之后再播放动画
})