//异步请求函数
async function getData(){
	//开源 JSON 数据
	const response = await fetch('https://jsonplaceholder.typicode.com/posts')
	//转为 JSON 格式
	const posts = await response.json()
	// console.log(posts);


	//container -> ul -> li -> anchor

	//获取每一个 post 的容器
	const container = document.querySelector('#container')
	//创建 url 元素
	const ul = document.createElement('ul')


	//遍历并嵌入内容	
	posts.forEach(post => {
		//创建 li, 会有 100 个 div，
		//li 里边有 a，a 就是文章的标题
		const li = document.createElement('li')
		const anchor = document.createElement('a')
		const p = document.createElement('p')

		//从 api 内获取文章标题
		anchor.appendChild(document.createTextNode(post.title))
		anchor.setAttribute( //设置超链接，点击可以跳转
			'href',
			`https://jsonplaceholder.typicode.com/posts/${post.id}`
			)
		//从 api 内获取文章内容
		p.appendChild(document.createTextNode(post.body))

		li.appendChild(p)
		li.appendChild(anchor)
		ul.appendChild(li)
	})
	container.appendChild(ul)	
}

getData()