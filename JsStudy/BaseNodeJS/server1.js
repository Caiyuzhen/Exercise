console.log('well');
console.log(global); //Node.JS 环境的全局变量为 global


//Node.JS 特有的定时器
setImmediate(() => {
	console.log('尽快执行 Immediate');
})


process.nextTick(() => {
	console.log('尽快执行 Tick');
})


//输出路径
console.log(
	__dirname,  // 不包含当前文件的绝对路径
	filename // 文件的绝对路径
);


// 访问进程的环境变量, 可以设置后端的调试
console.log(process.env);


function a() {
	console.log('Common.js 的到处方式');
}

module.export  = {
	a
}