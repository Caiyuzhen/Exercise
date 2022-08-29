//抽离出来的原生 fetch 发送 http 请求方法


async function http(obj) {
	//解构赋值, 取出 obj 对象中的参数
	let {url, method, params, data} = obj

	if(params){
		let str = new URLSearchParams(params).toString()
		url += '?' + str  //在 url 后边拼接 ？ 和 params 参数
	}

	let res //最终接收 res 结果

	if(data){
		res = await fetch(url, {
			method: method,
			headers:{
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data)
		})
	} else {
		res = await fetch(url)
	}
	return res.json()
}

export default http