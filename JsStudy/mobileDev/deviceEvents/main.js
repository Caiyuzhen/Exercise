/*
	deviceorientation   手机转向事件
		有价值的属性
			alpha 0~360 浮点数，表示围绕 z 轴旋转时，y 轴的转动度数
			beta -180~180 浮点数，表示围绕 x 轴旋转时，z 轴的转动度数
			gamma -90~90 浮点数，表示围绕 y 轴旋转时，z 轴的转动度数
			


	devicemotion  		手机加速度移动事件(摇一摇)
		有价值的属性
			acceleration   		x,y,z 各个维度的加速度信息，不考虑重力的情况
			accelerationIncludingGravity x,y,z 		各个维度的加速度信息，考虑重力的情况
			interval   			表示从设备获取数据的间隔时间，单位为毫秒
			rotationRate  		包含 alpha,beta,gamma ，表示设备的旋转度数，包含👆上面的三个属性



	orientationchange   手机方向改变事件(判断横竖屏)  --可能会废弃
		有价值的属性
			event.target.screen.orientation.angle  
				- 屏幕信息,旋转 90度、270度
			event.target.screen.orientation.type 
				- 屏幕类型
					portrait-primary 	 手机向上竖屏
					portrait-secondary   手机向下竖屏
					landscape-primary 	 手机向左横屏
					landscape-secondary  手机向右横屏
*/ 



//案例代码

//deviceorientation   手机转动事件 ————————————————————————————————————————————————————————————————
	//注意，IOS 需要 https 协议, 而且还需要授权

	//方式一：
		// window.ondeviceorientation = (e)=>{
		// 	console.log(e)
		//   }

	//方式二：
		window.addEventListener('deviceorientation',(e)=>{
			console.log(e)
			console.log('转动了')
		},true)



//devicemotion  手机加速度移动事件 ——————————————————————————————————————————————————————————————————
	// function handleMotionEvent(event) {
	//     var x = event.accelerationIncludingGravity.x;
	//     var y = event.accelerationIncludingGravity.y;
	//     var z = event.accelerationIncludingGravity.z;
	//     console.log(x, y, z);
	// }

	// window.addEventListener("devicemotion", handleMotionEvent, true);

	// function handleMotionEvent(event) {
	// 	document.getElementById('show').innerHTML = '摇动中'
	//   }
	
	//   if (window.DeviceMotionEvent) {
	// 	window.addEventListener("devicemotion", handleMotionEvent, false);
	//   } else {
	// 	alert("该浏览器不支持摇一摇功能");
	// }




//orientationchange  手机方向改变事件(判断横竖屏)  —————————————————————————————————————————
	//🌟旧的方式  --可能会废弃
		//方式一
			// window.addEventListener('orientationchange',(event)=>{
			// 	console.log('方向改变了' + event.target.screen.orientation.angle)
			// })

		//方式二
			// window.onorientationchange = (event)=>{
			// 	console.log(
			// 		event.target.screen.orientation.angle 
			// 		+'方向改变了' 
			// 		+  screen.orientation.type)
			// }

	//🌟新的方式
		//方式一
			// screen.orientation.addEventListener('change',(event)=>{
			// 	console.log(
			// 		screen.orientation.angle 
			// 		+'方向改变了' 
			// 		+  screen.orientation.type)
			// })

		//方式二
			// screen.orientation.onchange = (event)=>{
			// 	console.log(
			// 		event,
			// 		event.currentTarget.angle,
			// 		event.currentTarget.type
			// 	)
			// }