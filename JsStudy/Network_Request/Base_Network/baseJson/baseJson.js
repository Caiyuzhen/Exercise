/*
	在 JS 内创建 JSON 对象
		需要用 '' 单引号或 `` 反撇号包裹
	
	把 JSON 这种纯字符串的数据转化成 js 能识别的对象
		parse 解析
		stringify 将对象转化成 JSON 字符串(会过滤掉函数!)

*/ 

//创建 Json 数据
const jsonData = `{
	"name": "KIM",
	"age": "20",
	"male": false
}`

console.log(jsonData)




//Json 数据解析
const res = JSON.parse(jsonData)
console.log(res);



//数据转化
//🔥obj 是 JS 能识别的对象，但是 Json 不能识别，所以要通过 stringify() 转为 Json 能够的数据!
//⚠️注意，要转为 Json 数据的话，不能转化函数，除非把函数写成字符串的形式
const obj = {
	name: 'KIM',
	age: '20',
	male: false,
	// smile(){
	// 	alert('😄')
	// }
	smile:`function(){
		console.log("😄")
	}`
}

const res2 = JSON.stringify(obj)
console.log(res2);





