/*
	What?
		fetch 方法会返回一个 Promise 对象
		
	Why?
		相比 XMLHttpRequest
			缺点是没法检测到上传进度
			优点则是逻辑更清晰

	How?
	    请求方法
			直接 fetch
			通过 async await 结合 fetch
			通过 try catch 获取错误信息

		读取返回数据的方法
			response.json() //获取 json 对象
			response.text() //获取文本字符串，比如 HTML 文件
			response.formData() //获取表单对象

		克隆返回的 response 数据
			res.clone()

		提交数据, 写在 body 内，比如
			body: data
			或
			body: new FormData(form)

	Fetch Api 的完整参数
	{
		method: GET,
		headers: {"Content-Type": "application/json; charset=UTF-8"},
		body: data,					//放入 json 数据
		referrer: "about: client",  //设置请求标头，可以为空（即不发送标头）
		referrerPolicy: "no-referrer-when=downgrade",   //制定 referrer 的规则
		mode: "cors", 				 //是否允许跨域请求
		credentials: "same-origin",  //是否发送 cookie，same-origin 为同源就发送 cookie, 跨域要发送的话需要设置为 include
		cache: "default",   	 	//如何处理缓存
		redirect: "follow",			//指定 http 跳转的处理方法（比如重定向到另外一个服务区来找数据）
		integrity: "sha256-abcd", 	//指定哈希值，用于检查响应回的数据有没有这个预先设置的哈希值
		keepalive: false,    		//页面卸载时还会持续保持后台的数据连接
		signal: undefined,			//用于取消 fetch() 请求
	}
*/ 


const obj = {
	a: 'jimmy',
	b: 18,
}

const jsonData = JSON.stringify(obj) //⚡️⚡️把对象转成 json 格式的数据，然后再传入下面的请求体当中


// //🚀🚀方法一：用 then 来处理返回的数据（比较麻烦，一般不这么写）
const result = fetch('https://console-mock.apipost.cn/app/mock/project/255e267b-f993-409b-9fda-c4d9fa7e40e2/profile',
	{
		method: "POST",
		headers:{
			'Content-Type': 'application/json; charset=utf-8'//utf-8 表示数据字符集的格式
		},
		body: jsonData, //附带的 json 数据, 放到【请求体】当中
		params:{  //传入【查询参数】
			// id: xxx,
		}
	}
).then((res)=>{
	if(res.ok){
		//🔥获取状态码， res.ok 可以判断是否为 ok 的状态
		console.log(res.status, res.statusText, res.ok) 
		return res.json()
	}
}).then((data)=>{
	console.log(data)
	console.log(data.profile)
}).catch((err)=>{
	console.log(err)
})




//🚀🚀方法二：用 async await 来处理返回的数据
async function getAnimationData(){
	//🔥🔥🔥await 会等到 Promise 实例的 resolve 变成 fullfilled 时再去解析 Promise 所携带的数据
	const res = await fetch('https://console-mock.apipost.cn/app/mock/project/255e267b-f993-409b-9fda-c4d9fa7e40e2/profile',
		{
			method: "POST",
		}
	)
	const data = await res.json()
	console.log(data.profile)
}

getAnimationData()




//🚀🚀如果需要获取请求出错的情况
async function getData(){
	try{
		const res = await fetch('https://console-mock.apipost.cn/app/mock/project/255e267b-f993-409b-9fda-c4d9fa7e40e2/profile',
			{
				method: "POST",
			}
		)
		const data = await res.json()
		console.log(data.profile);
	}catch(err){
		console.log(err);
	}
}

getData()








