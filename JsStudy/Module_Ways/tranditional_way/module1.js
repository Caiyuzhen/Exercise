function abc(){
	console.log('lalal');
}


//报错，因为模块 1 先加载，模块 2 后加载，模块 2 中的 def 函数还没有加载，所以报错
// def()


//🔥使用 jQuery 的方式获取 DOM 节点
const content = $("#content")
console.log(content);


//🔥使用 jQuery 的链式调用的方法
$("H2").addClass("content").click((e)=>{
	// console.log(e.currentTarget)
	e.currentTarget.style.color = "red"
})


/*🔥使用 lodash 的函数
	本质上也是
	const _ = {
		defaults(){

		},
		setABC(){

		}
	}
*/
const res = _.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 })
console.log(res)





