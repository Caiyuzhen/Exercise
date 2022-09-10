const LottieAnmi = document.querySelector("#Lottie")
const Btn = document.querySelector("#button")
// console.log(Lottie)

/*
	 可以添加 Lottie 定义事件 
	 	https://docs.lottiefiles.com/lottie-player/components/lottie-player/events

		load
		error
		ready 为数据加载完成后触发
		play
		pause
		stop
		freeze
		loop
		complete
		frame	
*/



// 🔥 点击触发动画的按钮
let isPlay = false

Btn.addEventListener("click", () => {

	if(!isPlay){
		LottieAnmi.play()
		isPlay = true
		Btn.innerHTML = "点我暂停动画"
		// console.log(isPlay)
	}
	else{
		LottieAnmi.pause()
		isPlay = false
		Btn.innerHTML = "点我开启动画"
		// console.log(isPlay)
	}

})

// 🔥 Lottie 对象身上的事件
LottieAnmi.addEventListener('ready',()=>{
	LottieAnmi.resize() //自适应当前正在播放的设备尺寸
	LottieAnmi.setDirection(-1) //设置播放的方向，-1 为反向播放
	// LottieAnmi.play()//播放
	LottieAnmi.setLooping(true) //设置是否循环播放
	LottieAnmi.setSpeed(0.75) //设置播放速度
	// LottieAnmi.seek('50%') //设置从第几帧开始播放
	// LottieAnmi.pause()//暂停
	LottieAnmi.stop()//停止
	// LottieAnmi.snapshot()//快照
	// LottieAnmi.toggleLooping()//切换循环播放
	// LottieAnmi.play()//切换为播放模式
})