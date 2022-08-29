/*
	在 JS 内创建 JSON 对象
		需要用 '' 单引号或 `` 反撇号包裹
	
	把 JSON 这种纯字符串的数据转化成 js 能识别的对象
		🌟 JSON.parse(data)
			第一个参数
				 将服务器返回的 data 数据解析为 JS 能识别的格式
			
			还能传第二个参数
				同下


		🌟 JSON.stringify(obj) 
			第一个参数
			 	将对象转化成 JSON 字符串的格式
			 	⚠️注意：此方法会过滤掉【函数】、跟【undefined】的属性

			还能传第二个参数
				🌟 如果第二个参数是数组 [], 则会过滤掉数组中的元素
						比如 JSON.parse(data, ["name", "age"])
								只解析 name 和 age 属性，其他属性都会被过滤掉
						比如 JSON.stringify(obj, ["name", "age"])
								只转化 name 和 age 属性，其他属性都会被过滤掉

				🌟 如果第二个参数是函数, 函数会自动传入 key，value, 然后在回调函数内依次输出值
						在传函数的情况下第一个 key 是 '' 空字符串
								比如 JSON.stringify(obj, (key, value) =>{
									console.log(key, value);
								})
								然后会在回调函数内自动依次输出 obj + obj 内的【值】
								🔥 很神奇：同时也可以修改值 if '' 才输出每个值， else 就是修改每个值！！

				🌟 第三个参数
						传数据, 让返回的 JSON 数据可以缩进, 更易读
*/ 



//Json 数据解析（parse） ——————————————————————————————————————————————————————————————————————————

	//创建 Json 数据
	const jsonData = `{
		"name": "KIM",
		"age": "20",
		"male": false
	}`

	console.log(jsonData)



	const res = JSON.parse(jsonData)
	console.log(res);


	console.log("1——————————————————————————————————————-");


	//传入第二个参数, 可以是个函数
	const result01 = JSON.parse(jsonData, (key, value)=>{
		if(key === ''){
			return value
		}else{
			return '修改了'
		}
	})

	console.log(result01);



	console.log("2——————————————————————————————————————-");


//转化为 JSON 数据 (stringify) ——————————————————————————————————————————————————————————————————————————
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
		}`,
		abc: undefined,//这个属性使用  JSON.stringify 方法的话会被过滤掉！
	}

	const res2 = JSON.stringify(obj)
	console.log(res2)



	console.log("3——————————————————————————————————————-");




	//🌟 第二个参数传入数组 [], 则会过滤掉其他数据，只保留数组中的数据
	const res3 = JSON.stringify(obj, ["name"])
	console.log('过滤后的结果:',res3)


	console.log("4——————————————————————————————————————-");



	const obj4 = {
		name: 'KIM',
		age: '20',
		male: true,
	}

	//🌟 如果第二个参数是函数, 函数会自动传入 key，value, 然后在回调函数内依次输出值
	const res4 = JSON.stringify(obj4, (key, value) => {//第一个 key 是 '' 空字符串
		console.log('输出 res 4 的结果:', value); //如果没有这个的话，就会走 else, 要先执行一遍 value 相关的数据才会依次打印出里边的数据
		if(key === ''){ 
			return value 
		}else{
			return 'ABC'   //如果走到这一步，就是修改 obj4 内的值
		}
	}, 2)//🔥🔥自定义缩进距离！


	console.log(res4) //修改 res4 的值为 ABC



	console.log("5——————————————————————————————————————-");



	//🌟 或者是修改掉里边的值！！
	const res5 = JSON.stringify(obj4, (key, value) => {//第一个 key 是 '' 空字符串

		if(key === ''){
			return {  //修改值
				aa: '111',
				bb: '222',
			}  
		}else{
			return value  //如果走到这一步，就是修改 obj4 内的值
		}
	}, 2) //🔥🔥自定义缩进距离！


	console.log(res5)  //修改 res5 的值为 aa:"111",bb:"222"




	console.log("6——————————————————————————————————————-");


	const obj6 = {
		name: 'KIM',
		age: '20',
		male: true,
	}


	//🌟 或者是根据条件修改掉里边的值！！
	const res6 = JSON.stringify(obj6, (key, value) => {//第一个 key 是 '' 空字符串

		if(key === ''){
			return value
		}else if(key === 'age'){
			return 30   //相当于把年龄改成 30, 如果这个值是 undefined, 则会单独过滤掉这个值！！
		}
	}, 2) //🔥🔥自定义缩进距离！


	console.log(res6)  //只返回 age: "30"




	console.log("7——————————————————————————————————————-");


	const obj7 = {
		name: 'KIM',
		age: '20',
		male: true,
	}


	//🌟 或者是根据条件只改某个值并且一并返回！！
	const res7 = JSON.stringify(obj7, (key, value) => {//第一个 key 是 '' 空字符串

		if(key === ''){
			return value
		}else if(key === 'age'){
			return 30   //相当于把年龄改成 30
		}else{
			return value //🔥改了值后再返回所有数据
		}
	}, 14)  //🔥🔥自定义缩进距离！

	console.log(res7)  //只返回 age: "30"



	


//会使用第二个参数的场景
//比如接收到一个日期, 被转化成字符串了, 然后要转化成为日期实例对象以便用 Date() 的原型方法
const abc = {
	releaseData: new Date(2028, 12, 24),
	zzz: 123,
}
let jsonText = JSON.stringify( abc )

console.log(jsonText);



const efg = JSON.parse(jsonText, (k,v)=>
	k === 'releaseData' ? new Date(v) : v
)

console.log(efg);





