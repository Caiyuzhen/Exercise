/*
	跨域情况
		同源策略（浏览器自身的策略，会阻止不同源请求的响应）
	  		协议、域名、端口有一个不同就是不同源，三者均相同这个网址才同源

		不受同源策略影响的元素
			<img>		//图片
			<video>		//视频
			<object>	//嵌入的插件
			link        //引入的 css link
			src         //引入的脚本地址
			@font-face  //引入的字体
			<iframe> 	//通过 iframe 嵌入的任何资源

	跨域如何访问
		CORS 
		    What?
				跨源资源分享协议
			Why?
				让不同源的地址可以访问信息
			How?
				增加了特定的头部信息, * 表示接受任意类型的域名请求
					Access-Control-Allow-Origin: *

					Access-Control-Allow-Credentials: true
					Access-Control-Allow-Headers: Content-Type
					Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
					Access-Control-Allow-Origin: https://www.xxx.cn
*/


//创建一个script元素
let Scr = document.createElement('script');

//声明类型
Scr.type='text/javascript';

//添加src属性，引入跨域访问的url
Scr.src='url';

//在页面中添加新创建的script元素
document.getElementsByTagName('body')[0].appendChild(Scr)






const AAData = {
    app_id: "cli_123456789",
    app_secret: "v333666999"
}

const jsonData2 = JSON.stringify(AAData)

async function getData(){
    try{
        const res = await fetch('https//www.xxx.com',
            {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: jsonData2,
            }
        )
        const data = await res.json()

    }catch(err){
        console.log(err);
    }
}

getData()


 