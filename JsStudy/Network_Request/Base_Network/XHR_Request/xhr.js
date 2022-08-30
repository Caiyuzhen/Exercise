/*
	xhr.open()
		发起请求前的预备动作，可以传入三个参数，open(method, url, async)
			如果是访问跨域名的网站的话，就需要加上完整的 【https协议】跟【域名】
				method  请求方法(一定要大写！)
					比如 "GET"、"POST"、"PUT"、"DELETE"、"HEAD"、"OPTIONS"、"TRACE"、"CONNECT"
						"GET" 方法可以提交数据
						    比如"http://xxxxxx.com/getdata?name=123"
				url     请求地址
				async   是否异步，默认为true, 99% 的情况都是异步

	xhr.addEventListener
		请求响应后的事件（建议都在 open 执行前绑定, 绑定后才去用 open 发送请求）
			load  
			progress   
			error

	xhr.response
		拿到响应回来的结果

	xhr.responseType = 'json'
		把响应回来的数据处理成 json 格式
			""     			默认为字符串格式
			"text" 			字符串格式
			"arraybuffer" 	ArrayBuffer 格式
			"document"     XML document 格式
			"blob"         Blob 格式 (二进制数据)
			"json"   	   JSON 格式 (二进制数据)

	xhr.send()
		发送具体的请求
*/ 



//实例化一个XMLHttpRequest对象
const xhr = new XMLHttpRequest()


xhr.addEventListener('load', ()=>{ //有 e 事件对象
	console.log(xhr.response) //取得响应回来的数据
	// 后续的数据处理, 比如放在 DOM 上
})


xhr.addEventListener('progress',(e)=>{ //有 e 事件对象
	/*
	e 事件对象内有三个属性（可以用来计算数据加载进度）
	lengthComputable   判断返回的数据长度是否可以计算
	loaded 			   (已加载数量)已经返回的数据量的长度
	total 			   (数据总数)总共需要加载的长度
	*/
	if(e.lengthComputable){//🔥可以计算数据加载的进度!!
		const ratio = e.loaded / e.total
		//显示加载进度
		console.log(ratio)
	}
})


xhr.responseType = 'json' //把返回的{字符串}处理成{对象}或[数组]的格式


xhr.open('GET', 'https://console-mock.apipost.cn/app/mock/project/255e267b-f993-409b-9fda-c4d9fa7e40e2/test') 


//发送请求
xhr.send()




