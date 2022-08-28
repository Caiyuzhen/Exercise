import http from '/JsStudy/Async_chronic/1.XML_Fetch_Request/http/http.js';

//表格
let tableBody = document.querySelector('.tb-body')



//提交的表单面板
let formBody = document.querySelector('.form-body')






//💠💠渲染数据的方法
async function renderBook() {
	//🔥🔥一：先从服务器获取数据
	let result = await http({
		url: 'http://ajax-base-api-t.itheima.net/api/getbooks',
		method: 'get',
	})
	// console.log(result);

	//🔥🔥二：渲染请求出来的数据 (⚡️⚡️在渲染的时候，把 id 加到 button 身上！方便后续的删除操作！)
	let books = '' //用变量储存内容
	result.data.forEach(item => {  //每遍历出一项，就创建一个 tr，并且拼接出一个完整的字符串，放到模板字符串里面
		books += ` 
			<tr class="table-row-group">
				<td scope="row">${item.id}</td>
				<td>${item.bookname}</td>
				<td>${item.author}</td>
				<td>${item.publisher}</td>
				<td>
					<button type="button" class="btn btn-delete" data-id="${item.id}"}>删除</button>
				</td>
			</tr>
		`
		// console.log(books);

		//三：把拼接好的数据放到 tableBody (表格容器) 里面
		tableBody.innerHTML = books
	}) 
}

//进行渲染
renderBook() 





//💠💠添加数据的方法 
formBody.addEventListener('submit', async function(e) {
	e.preventDefault() //阻止表单默认的跳转行为

	//🔥🔥一：获取表单中的数据
	let bookName = document.getElementsByName('book-name')[0].value
	let bookAuthor = document.getElementsByName('book-author')[0].value
	let bookPublisher = document.getElementsByName('book-publisher')[0].value

	let formResult = {//定义好键值对, 键是后端规定好的!
		bookname: bookName,
		author: bookAuthor,
		publisher: bookPublisher,
	}


	//🔥🔥二：把表单数据提交给后台
	let res = await http({
		method: 'post',
		url:'http://ajax-base-api-t.itheima.net/api/addbook',
		data: formResult,//把表单中的数据进行提交
	})
	console.log(res);//从这个结果可以看出，502 为失败，201 为添加成功


	//🔥🔥三：如果提交成功，则重新渲染表单数据, 并且清空表【单面板输入框的内容】
	// console.log('提交成功');
	if(res.status === 201){
		renderBook()  	//重新渲染表单数据
		formBody.reset() //清空表单
	}else {
		alert(res.msg)
		formBody.reset() //清空表单
	}
})





//💠💠删除数据的方法 (用事件委托机制，给父元素绑定事件，利用事件冒泡机制来捕获删除事件！)
tableBody.addEventListener('click', async function(e) {
	//🔥🔥一：通过事件对象能够获取点击的对象 -> 删除按钮  ->  获取删除按钮身上绑定的列表 id

	// console.log(e.target.dataset)//获取按钮的自定义属性 -> id 值



	//🔥🔥二：获取删除按钮的标签名   ->  判断点击的对象并发送请求
	// console.log(e.target.tagName) 
	if(e.target.tagName === 'BUTTON') { //🔥判断如果是删除按钮, 就发送请求
		let res = await http({
			url:'http://ajax-base-api-t.itheima.net/api/delbook',
			method: 'delete',
			params:{  //要求传入【查询参数】, 查询参数是【params】，请求体是【data】！！参数是图书的 id
				id: e.target.dataset.id, //删除按钮身上绑定的列表 id
			} 
		})
		//🔥🔥三：如果提交成功，则重新渲染表单数据
		console.log(res)


		//🔥🔥三：如果删除成功，则重新渲染表单数据
		if(res.status === 200){
			renderBook()  //重新渲染表单数据
		}
	}
})