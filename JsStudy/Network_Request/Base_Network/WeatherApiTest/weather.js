const dateBody = document.querySelector('.date')
const lifeBody = document.querySelector('.life')


const xhr = new XMLHttpRequest()

xhr.addEventListener('load', ()=>{
	let dateData = ''//用来接收数据
	let lifeData = ''//用来接收数据
	if(xhr.status >= 200 && xhr.status < 400){
		// console.log(xhr.response.daily[0])
		dateData = xhr.response.daily[0].date
		lifeData = xhr.response.daily[0].level
		dateBody.innerHTML = dateData
		lifeBody.innerHTML = lifeData
	}else{
		alert('请求失败')
	}
})

xhr.responseType = 'json'

xhr.open(
	'GET', 
	'https://devapi.qweather.com/v7/indices/1d?type=1,2&location=101010100&key=44b0cfde74eb45948aea53820390123b'
	)

xhr.send()
