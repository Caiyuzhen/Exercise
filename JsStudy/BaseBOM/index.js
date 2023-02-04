// 🌟全局属性
// window.devicePixelRatio 输出屏幕的像素比



// 🌟预置方法
// const result = confirm('确定要删除吗？') //🌟用来判断用户是否点击了确定按钮
// console.log(result) // true or false

// const result2 = prompt('请输入你的名字') //🌟用来获取用户输入的内容
// console.log(result2) // 用户输入的内容

console.log(window.location.hostname);
console.log(window.location.href);
console.log(window.location.pathname);
console.log(window.location.port);
console.log(window.location.origin);


/**
 * 🌟快速改变网址的方法
 * 
 * 
 1. window.location = ''

 2. location.href = 'http://www.google.com' // 会刷新页面然后直接跳转到那个网站

 3. location.assign('')

 4. location.replace('')  //不会进入历史记录

 */


//  location.assign('http://www.google.com/#b5') //🔥可以直接切换到有锚链接的页面位置
location.assign('http://127.0.0.1:8080/JsStudy/BaseBOM/index.html#b5')



// 🌟路由参数
location.search // 获取 页面 中所携带的参数
console.log(location.search);



// 🌟历史记录
console.log(history.length);



// 🌟记录历史滚动位置
history.scrollRestoration = 'manual' 



// 🌟页面跳转
// history.back() // 返回上一页

// history.forward() // 前进一页

// history.go(-2) // 返回两页 () 可以自定义返回的页数


// 🌟 Router 路由背后就是用了这些原理
/*

	State 数据可以设置 500k ~ 1M 以内

	pushState  加入数据

	replace  会刷新页面

	replaceState  不会刷新页面 (只是管理数据) (需要服务器有对应的文件)

	popstate 事件

	hashchange 事件, hash 变化的时候触发

*/ 
history.pushState( 
	{a: 111}, //数据
	null, //历史遗留，可不填
	// 'abc' // 第三个参数回改变当前页面的地址
)// 修改当前页面的历史数据
console.log(history.state)// 当前页面的历史数据


history.replaceState({a: 456}, null)
console.log(history.state)// 替换当前页面的历史数据


window.addEventListener('popstate', (e) => {
	console.log(e) //能够获取到所有页面的【堆栈数据】, 前一页后一页分别存储了什么数据
})


window.addEventListener('hashchange', (e) => {
	console.log(e) // url 的 hash 事件被改变时会触发
})




//🌟 Navigator
console.log(navigator.userAgent) //用户设备信息 🌟
console.log(navigator.platform) //用户操作系统
console.log(navigator.language) //用户语言
console.log(navigator.onLine) //用户是否联网
console.log(navigator.cookieEnabled) //用户是否开启了 cookie
console.log(navigator.geolocation) //用户地理位置
console.log(navigator.javaEnabled()) //用户是否开启了 java
console.log(navigator.mimeTypes) //用户支持的文件类型
console.log(navigator.plugins) //用户支持的插件
console.log(navigator.serviceWorker) //用户是否开启了 serviceWorker
console.log(navigator.vibrate) //用户是否开启了 振动
console.log(navigator.permissions) //用户是否开启了 权限
console.log(navigator.hardwareConcurrency) //用户的 cpu 核心数
console.log(navigator.maxTouchPoints) //用户的最大触摸点数
console.log(navigator.mediaDevices) //用户的媒体设备
console.log(navigator.connection) //用户的网络连接
console.log(navigator.credentials) //用户的凭证
console.log(navigator.doNotTrack) //用户的追踪
console.log(navigator.getBattery()) //用户的电池
console.log(navigator.getGamepads()) //用户的游戏手柄
console.log(navigator.getInstalledRelatedApps()) //用户的相关应用
console.log(navigator.storage) //用户的存储
console.log(navigator.usb) //用户的 usb 设备
console.log(navigator.userAgentData) //用户的用户代理数据
console.log(navigator.webkitTemporaryStorage) //用户的 webkit 临时存储



//🌟 Screen
console.log(screen.width);
console.log(screen.height);
console.log(screen.availWidth); //除去任务栏后的宽度
console.log(screen.availHeight); //除去任务栏后的高度
console.log(screen.colorDepth); //颜色深度
console.log(screen.pixelDepth); //像素深度
console.log(screen.orientation); //屏幕方向
console.log(screen.orientation.angle); //屏幕方向角度
console.log(screen.orientation.type); //屏幕方向类型
console.log(screen.orientation.lock('landscape-primary')); //锁定屏幕方向
console.log(screen.orientation.unlock()); //解锁屏幕方向
console.log(screen.orientation.onchange); //屏幕方向改变时触发的事件
console.log(screen.orientation.addEventListener('change', () => {})); //监听屏幕方向改变事件
console.log(screen.orientation.removeEventListener('change', () => {})); //移除屏幕方向改变事件
console.log(screen.orientation.type); //屏幕方向类型
console.log(screen.orientation.angle); //屏幕方向角度
console.log(screen.orientation.lock('landscape-primary')); //锁定屏幕方向
console.log(screen.orientation.unlock()); //解锁屏幕方向
console.log(screen.orientation.onchange); //屏幕方向改变时触发的事件
