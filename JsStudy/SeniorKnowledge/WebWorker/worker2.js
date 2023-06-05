console.log('我是一个 worker-2')


//🚀给主线程发送消息
self.postMessage('你好, 我是 worker-2')