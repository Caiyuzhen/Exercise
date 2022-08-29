//ajax 请求是一种局部请求的思想，而不是一个 api


//🍎🍎方法一：利用原生 XML HTTP 方法 实现 ajax 请求
function ajax(url) {
	const xhr = new XMLHttpRequest()
	xhr.open('get', url, false)
	xhr.onreadystatechange = function(){//🔥回调函数
		//接收一个异步回调函数
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				console.log('🍎请求成功', xhr.response) //response 是后端返回的数据
			}
		}
	}
	xhr.send(null)
}

//调用请求函数
// ajax('http://httpbin.org/get')
// ajax('http://smallpig.site/api/category/getCategory')










//🍊🍊方法二：利用原生 Fetch（基于 Promise）ES6 方法发送网络请求Fetch 是一个 api
function ajaxFetch(url) {
	fetch(url).then(res => res.json() //处理成 json 数据
	).then(data => {
		console.log('🍊请求成功', data) //打印上面处理完的数据
			//遍历 json 数据
			// data.map(item => {
			//...
			// })
			// document.getElementById('content').innerHTML = data
	}).catch(err => console.log(err))
}

// ajaxFetch('http://smallpig.site/api/category/getCategory')








//🍐🍐方法三：使用 async  await  结合  Fetch 发送请求
async function ajaxFetchData(url) {
	//异步等待返回 response
	const response = await fetch(url)  //一：获取 api 数据，赋值给 response
	.then(res => res.json())  		  //二：将数据转化为 json 格式
	.then(data => {       			  //三：获得 json 数据
		
		let content = ''			 //四：定义一个接收数据的【变量】
		data.forEach((item) => {   	 //五：遍历 json 数据内的 title ，然后展示在页面上
			content += `<li>${item.title}</li>`	  //六：给每项内容都塞入 li 数据
			// context.appendChild(document.createTextNode(item.title))
		})
		document.getElementById('content').innerHTML = content  //把【变量】数据塞回页面
	})
	.catch(err => console.log(err))

}

// ajaxFetchData('https://jsonplaceholder.typicode.com/posts')
// 👇添加一个按钮，点击后获取数据！！！
const button1 = document.getElementById('button1')
button1.addEventListener('click', function(){
	ajaxFetchData('https://jsonplaceholder.typicode.com/posts')
})





//🍓🍓方法四：使用 async  await  结合  Fetch 发送携带参数的请求
/*
	fetch(url,{
		method: 'POST',  //请求类型
		headers: {
			'Content-Type': 'application/json' //数据格式
		},
		body: JSON.stringify  //请求体数据类型
	})
 */
/*
	👇案例
		接口地址:http://ajax-base-api-t.itheima.net/api.addbook
		请求方法:POST
		请求体参数
			bookname
			author
			publisher
*/
async function addBookData(){
	//🔥obj 是 JS 能识别的对象，但是 Json 不能识别，所以要通过 stringify() 转为 Json 能够的数据!
	let obj = {
		bookname: 'Pinocho',
		author: 'Carlo Collodi',
		publisher: 'Gryffindor',
	}

	let res = await fetch('http://ajax-base-api-t.itheima.net/api/addbook',{
		method: 'post',
		headers:{
			'Content-type': 'application/json'
		},
		//🔥obj 是 JS 能识别的对象，但是 Json 不能识别，所以要通过 stringify() 转为 Json 能够的数据!
		body: JSON.stringify(obj) //序列化 Obj 对象, 转成 Json 对象让后端识别
	})

	let jsonData = await res.json() //将 res 这个 data 转成 json 格式的结果数据
	console.log(jsonData);
}

addBookData()







//🍉🍉方法五： 封装 Fetch 方法
async function http(obj) {
	//解构赋值, 取出 obj 对象中的参数
	let {url, method, params, data} = obj
	// console.log(url, method, params, data);

	if(params){
		//👇如果有 params, params 需要转换成 key=value&key=value 的形式来拼接到 url 上
		let str = new URLSearchParams(params).toString()//固定的拼接写法
		url += '?' + str  //在 url 后边拼接 ？ 和 params 参数
	}
	// console.log(url);

	let res //最终接收 res 结果

	if(data){
		//👇如果有 data
		res = await fetch(url, {
			method: method,
			headers:{
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data)
		})
	} else {
		//👇如果没 data
		res = await fetch(url)
	}

	return res.json()
}


async function fn1() {
	let result = await http({
		method: 'get',
		url: 'http://ajax-base-api-t.itheima.net/api/getbooks',
		params:{
			id:2,
		}
	})
	console.log(result);
}

fn1()



