/* 
	服务器访问的安全性
	
		密钥
			公钥 => 其他人可拥有
			私钥 => 自己拥有
		签名
			如何生成签名
				1.选择加密算法, 比如 SHA-256、HMAC、REA 等。
				2.将待签名的数据（入文本、文件、请求参数等）和密钥进行输入, 使用加密算法得到加密后的字符串（即签名）。
				3.将生成后的签名附加到原始数据上, 一起附带发送给接收方。

			如何验证签名:
				1.接收方收到数据和签名后, 使用相同的算法和密钥（例如【🔥公钥】或共享密钥）对原始数据进行计算, 得到一个新的签名。 => 注意, 接收方是用公钥跟加密算法来生成新的签名
				2.比较新的签名和接收到的签名是否相同, 如果相同, 则说明数据没有被篡改, 如果不同, 则说明数据被篡改过或者伪造。


		公钥结合私钥 => 非对称加密 🔐
			私钥 + 要传输的数据 + 特定算法 = 得出加密的字符串（签名）
			公钥 + 接收到的数据 + 相同算法 = 得出加密的字符串（签名）
		
*/

const jwt = require('jsonwebtoken'); // npm install jsonwebtoken
const fs = require('fs');


// 生成 RSA 密钥对
const { privateKey, publicKey } =  // 产生 privateKey 私钥 跟 publicKey 公钥
crypto.generateKeyRairSync('rsa', {
	modulesLength: 2048,
});

// 创建 JWT
const payloda = { user: 'john.doe' };
const token = jwt.sign(payload, privateKey, {
	algorithm: 'RS256',
});

console.log('JWT 密钥:', token);

// 验证 JWT
jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
	if(err) {
		console.log('验证失败');
	} else {
		console.log('验证成功', decoded);
	}
});