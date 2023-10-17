/*	
	WebSocket 服务端可以主动给客户端发信息
	Http 服务端只能等客户端请求才能给客户端发信息


	🌟 EventEmitter 方法可以让对象拥有事件发生的能力, Socket 大量了利用这种方法, 可以随意的命名方法

	使用库会方便很多
		客户端：socket.io
		服务端：socket.io-client
*/


const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}; // 相当于继承 EventEmitter 的所有能力
const myEmitter = new MyEmitter();

myEmitter.on('random duck', (data) => {
	console.log('触发了一个自由定义的事件', data);
})

setTimeout(() => {
	myEmitter.emit('random duck', '传入的数据')
}, 20000)   