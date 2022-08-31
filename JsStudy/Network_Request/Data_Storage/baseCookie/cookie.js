/*
	Cookie
		What？
			基础概念
				一种保存在浏览器中的数据的方式，可以保存在本地，也可以保存在服务器上
				每个 cookie 都是独立的一个数据，其他的都是描述它的信息
				服务器存的 cookie 会自动的发送到我们所访问的网址上（通过请求头）
			访问范围
				和访问的网站的 Domain 的 path 强相关（需要保证域名是相同的）
					一级域名的 cookie 在二级域名页是访问得到的，反之就不行
					父路径下的 cookie ，子路径可以访问到，反之就不行
			有效期
				cookie 会过期，能在 Application 中看到
					没有设置时间的话默认是 Session，浏览器关掉后再打开就不会保存信息了
					类型
						expires 
						或者是
						max-age = 1000  

			尺寸限制
				每个 cookie 最多能保存 4kb = 4 X 1024 Byte
			

		Why?
			保持用户的状态，比如用户的登录状态或校验用户的身份信息（也可以用 KEY 的形式来校验）

		How？
			一般是通过响应头来设置的(服务器通过请求头中的 cookie 字段发送给客户端【or浏览器】)
				set-cookie

						设置为子域的 cookie 
				path=/abc

			➕ 增加 cookie
				document.cookie="XXX=XXX"

			➖ 删除 cookie
				把 max-age 设置为 0 或者负数

			🧽 修改 cookie【相当于重新设置一下】
				document.cookie="XXX=XXX"
					
			让子域都能访问
				domain=site.com

			设置为只能通过 https 传输
				secure

			鉴定发送方的网址是不是真正的网址而非钓鱼网址, 防止 XSRF 攻击
				samesite = strict
				samesite = lax (默认)

			只能用 http 访问 cookie，无法用 js 访问
				httpOnly
*/

let date = new Date(Date.now() + 86400e3)//一天的时间的有效期
date = date.toUTCString() //转化成字符串
// cookie 有效期写法一
// document.cookie = "user=jimmy; age=18; expires=" + date

//cookie 有效期写法二
document.cookie = "user=jimmy; age=18; max-age=" + 24*60*60 


//设置为子域的 cookie
document.cookie = "user=jimmy; age=18; max-age=" + 24*60*60 + ";path=/abc"


//设置为子域的 cookie 【path=/abc】 + 设置让让任何一个子域都可访问到它 【domain=site.com】
//【secure】 表明让该 cookie 只能通过 https 传输
document.cookie = "user=jimmy; age=18; domain=site.com; secure; max-age=" + 24*60*60 + ";path=/abc"


//鉴定发送方的网址是不是真正的网址而非钓鱼网址, 防止 XSRF 攻击
// samesite = strict
// samesite = lax

//只能用 http 访问 cookie，无法用 js 访问
//httpOnly


console.log(document.cookie)