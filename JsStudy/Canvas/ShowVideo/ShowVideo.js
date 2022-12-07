const VideoCanvas = document.getElementById("video-canvas")
const video = document.getElementById("video")
VideoCanvas.width = 900
VideoCanvas.height = 600
VideoCanvas.style.border = "3px solid black"
VideoCanvas.style.borderRadius = "12px"
const ctx = VideoCanvas.getContext("2d")

// 获取视频的宽度和高度
const videoEle = {
	w: video.offsetWidth,
	h: video.offsetHeight
}

console.log(videoEle);





video.addEventListener('loadeddata', function(){
	// 每隔 30s 画一次视频
	setInterval(function() {
		ctx.drawImage(video, 0, 0, videoEle.w, videoEle.h);
	}, 30);
})

