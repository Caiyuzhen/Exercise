// 🔥子线程内还可以创建子线程
console.log('我是一个 worker-1')

const worker2 = new Worker('./worker2.js')


//🚀给主线程发送消息
self.postMessage('你好, 我是 worker-1')


// 接受 worker2 发送来的消息（🔥注意 主子线程只是谁创建谁的关系）
worker2.addEventListener('message', (e) => { //监听子线程发送来的的消息
	// 打印子线程发送来的消息
	console.log('收到了:', e.data)
})


// ⚡️接收主线程发送来的消息
self.addEventListener('message', (e) => {
	console.log('子线程收到了:', e.data)
})