/*
	xhr.addEventListener
		👀请求响应后的事件（建议在 open 执行前绑定, 绑定后才去用 open 发送请求）
			load    
				load 只要请求完成了都会触发, 所以需要判断一下状态码!!
			progress 
				e 事件对象内有三个属性（可以用来计算数据加载进度）
					lengthComputable   判断返回的数据长度是否可以计算
					loaded 			   (已加载数量)已经返回的数据量的长度
					total 			   (数据总数)总共需要加载的长度  
			error


	xhr.response
		🗂拿到响应回来的结果


	xhr.responseType = 'json'
		📦把响应回来的数据处理成 json 格式
			""     			默认为字符串格式
			"text" 			字符串格式
			"arraybuffer" 	ArrayBuffer 格式
			"document"     XML document 格式
			"blob"         Blob 格式 (二进制数据)
			"json"   	   JSON 格式 (二进制数据)

			
	xhr.open()
		👋发起请求前的预备动作，可以传入三个参数，open(method, url, async)
			如果是访问跨域名的网站的话，就需要加上完整的 【https协议】跟【域名】
				method  请求方法(一定要大写！)
					比如 "GET"、"POST"、"PUT"、"DELETE"、"HEAD"、"OPTIONS"、"TRACE"、"CONNECT"
						"GET" 方法可以提交数据,在 ？后面添加 【键值对】
						    比如提交单个数据 "http://xxxxxx.com/getdata?name=123"
							比如提交多个数据 "http://xxxxxx.com/getdata?name=123&age=18&class=kk"
				url     请求地址
				async   是否异步，默认为true, 99% 的情况都是异步


	xhr.send()
		✈️发送具体的请求
*/ 



//实例化一个XMLHttpRequest对象
const xhr = new XMLHttpRequest()



//load 只要请求完成了都会触发, 所以需要判断一下状态码!!
xhr.addEventListener('load', ()=>{ //也有 e 事件对象
	if(xhr.statusText >= 200 && xhr.statusText < 400){ //🔥判断状态码的区间
		console.log(xhr.response) //取得响应回来的数据
		//请求成功的后续处理, 比如放在 DOM 上等等
	}else{
		console.log('请求失败')
	}
})

// //另一种写法
// xhr.onload = function(){
// 	alert(`Loaded ${xhr.status} ${xhr.response}`)
// }




//报错情况
xhr.addEventListener('error', ()=>{ //也有 e 事件对象
	console.log("出错了")//获取报错信息
})



xhr.addEventListener('progress',(e)=>{ //有 e 事件对象
	if(e.lengthComputable){//🔥可以计算数据加载的进度!!
		const ratio = e.loaded / e.total
		//显示加载进度
		console.log(ratio)
	}
})



xhr.responseType = 'json' //🔥🔥把返回的{字符串}处理成{对象}或[数组]的格式



//⚡️可以自定义 URl 类, 然后携带参数发送请求(很少用)
let url = new URL("https://xxx.com/getdata")
url.searchParams.set('name', 'jimmy')
url.searchParams.set('age', 23)//可以设置多个数据
console.log(url);
//⚡️另一种方式就是直接在 URL 后边携带参数，比如"https://xxx.com/getdata?name=123&age=18"



xhr.open('GET',url)//结合自定义 URl 来发送请求写法
xhr.open(
	'GET', 
	'https://console-mock.apipost.cn/app/mock/project/255e267b-f993-409b-9fda-c4d9fa7e40e2/test',
	'async'
) 


//发送请求
xhr.send()




//————————————————————————————————————————————————————————————————
//对于包含特殊字符的请求, 需要做一层转译, 比如包含了 http, // 等
const result = encodeURIComponent("data=http:abc://ahha//")


//手动解码数据
// decodeURIComponent()

//以前判断状态码的方法
xhr.onreadystatechange = function(){
	console.log(xhr.readyState);
	//0 初始状态
	//1 open 被调用
	//2 接收到请求头
	//3 为接收数据中，每接收到一次就打印一次 3
	//4 为接收完数据，请求完成
}