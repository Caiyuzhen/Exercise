// REFERENCES : https://javascript.ruanyifeng.com/nodejs/express.html#toc5
var express = require('express');
var app = express();
var router = express.Router();


// 读取静态网页
app.use(express.static(__dirname + '/public')); // 处理静态资源的路径 => 把写好的前端网站放这里就可以生成网页了




//use 使用中间件, 在数据正式发给用户之前, 对数据进行处理
app.use(function(req, res, next) { // next 参数, 表示接受其他中间件的调用
	console.log(req.method, req.url);
	// 处理中间件内的参数
	// ...
	next(); // next(), 表示将 req、res 数据传递给下一个中间件, 不设置 next() 就会结束
})
app.use(function(req, res) { // next 参数, 表示接受其他中间件的调用
	res.writeHead(200, {'Content-Type': 'application/json'});
	// res.end(JSON.stringify({name:"Jimmy",age:40})); // 比如用中间件添加数据
})

 



// // 路由
// router.get('/about', (req, res) => { //静态网页模板
//     res.sendFile(__dirname + '/public/about.html');
// });



// Api
app.get('/customer', function(req, res) {
	var body = '👋 你好!'
	res.setHeader('Content-Type', 'text/plain');
	res.send(body);
	// res.end();
})

app.get('/api', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.send({name:"Jimmy",age:40});
});


// 重定向
app.get('/abc', (req, res) => {
	res.redirect("/customer");
	res.redirect("http://www.google.com");
	res.redirect(301, "http://www.google.com");
})


// 挂载路由
app.use(router);


// app.listen(8080);
// 启动服务器
const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})
