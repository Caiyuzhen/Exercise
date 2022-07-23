/* 
	HTTP Verbs
		常用
			Get     //获取 		(安全性)、(幂等性【发送多次请求等同于一次】)、(可缓存)
			Post    //创建 		(可缓存)
			Put     //替换 		(幂等性【发送多次请求等同于一次】)
			Delete  //删除 		(幂等性【发送多次请求等同于一次】)
			Patch   //修改属性   (可缓存)
		其他
			Head     //跟 Get 类型，但是响应中没有 body
			Connect  //与服务器建立隧道
			Options  //获取服务器允许的 HTTP Verbs
			Trace    //调试信息

*/