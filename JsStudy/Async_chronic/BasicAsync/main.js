/*

	异步代码的种类
		⏲️ 定时器

		🌍 DOM 事件处理函数

		👀 交叉观察器 (元素产生交集才会调用)
			IntersectionObserver

		⚙️ 从服务器获取数据
			Promise
				then()

*/ 


//伪代码
function getDataFromUrl(url, data, callback){
	const randomDelay = Math.random().toFixed(3) * 1000; //1秒后执行回调

	setTimeout(()=>{
		callback()
	},randomDelay) //多久之后执行回调
}


//执行上面的方法
//发送请求的地址、给服务器的数据、用参数获取回调函数的数据
getDataFromUrl('http://abcdefg','123321',(resData)=>{
	console.log(resData)
})




//执行上面的方法
/*如果要连续获取多组数据，比如先获取密码，再获取用户信息等等
	需要嵌套发送请求才能同步执行，不然异步的话先后顺序会乱
	但也有问题，会产生回调地狱 callback hell
*/
getDataFromUrl('http://aaa','user_psw',(resData)=>{ 
	console.log('receive aaa')
		getDataFromUrl('http://bbb','user_name',(resData)=>{ 
			console.log('receive bbb')
			getDataFromUrl('http://ccc','user_name',(resData)=>{ 
				console.log('receive ccc')
			})
		})
})