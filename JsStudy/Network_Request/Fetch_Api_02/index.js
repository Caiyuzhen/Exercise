const divEle = document.querySelector('div');
const inputEle = document.querySelector('input');
const buttonEle = document.querySelector('button');

//点击发送请求获取数据并传回页面(只能获取 id 1 或 2)
//http://jsonplaceholder.typicode.com/#:~:text=Run%20this%20code%20here%2C%20in%20a%20console%20or%20from%20any%20site%3A


//调用 api
function getData(value){
	//🌟🌟一般的写法，不判断是否成功
	// fetch(`https://jsonplaceholder.typicode.com/todos/${value}`)
	// 	.then((response)=>{
	// 		return response.json()//🔥转为 json 数据
	// 	})
	// 	.then((response)=>{//取出转为 json 的数据
	// 		const data = (divEle.innerHTML = response.title)
	// 	})
	//🌟🌟完整的写法，判断数据的获取是否成功
	return new Promise((resolve,reject)=>{
		fetch(`https://jsonplaceholder.typicode.com/todos/${value}`)
			.then((response)=>{
				return response.json()
			})
			.then((response)=>{
				const data = (divEle.innerHTML = response.title)
				resolve(data)
			})
	})
}

//测试下不同请求 id 情况下的数据
// getDate(1)
// getDate(2)


//点击按钮后，获取输入框内的文字
buttonEle.addEventListener('click',(e)=>{
	const value = inputEle.value //🔥🔥获取输入框内的数字，然后下一步传入给 getData()
	// getDate(value) //一般的写法
	getData(value).then((value) => { //完善的写法
		console.log(value) //可以打印出数据
	})
})