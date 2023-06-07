/*
	正则表达式
		What?
			用来匹配文字的规则

		How?
			基本写法: 两边为斜杠, 中间为字符
				/字符/   ->  匹配 字符
				/字符/i  ->  忽略大小写来匹配字符

			修饰符:
				i  ->  忽略大小写, 只会返回第一个匹配到的结果 ->  ignore
				g  ->  全局匹配(全部匹配), 匹配到下一个结果后继续匹配下一个  ->  global
				m  ->  多行匹配, 在多行文本内匹配每行的开头跟结尾  ->  multiple
				s  ->  让点 (.) 匹配任何字符, 包括换行符 
				u  ->  启动 Unicode  匹配模式  ->  unicode
				y  ->  粘性匹配, 从目标字符串指定位置开始匹配 

			数量不定匹配:
				{m,}  ->  至少出现 m 次
				{m}  ->  等价于 {m,m} 表示出现 m 次
				?  ->  等价于 {0,1} 表示出现或不出现
				+  ->  等价于 {1,} 表示至少出现 1 次
				*  ->  等价于 {0,} 表示出现任意次数, 有可能不出现

				惰性匹配:
					{m,n}?  ->  表示这个字符至少出现 m 次, 最多出现 n 次, 但尽可能少重复
					{m,}?  ->  表示这个字符至少出现 m 次, 但尽可能少重复
					??  ->   表示这个字符出现 0 次或 1 次, 但尽可能少重复
					+?  ->  表示这个字符出现 1 次或多次, 但尽可能少重复
					*  ->  表示这个字符出现 0 次或多次, 但尽可能少重复

				贪婪匹配:
					{m,n}  ->  表示这个字符至少出现 m 次, 最多出现 n 次
					{m,}  ->  表示这个字符至少出现 m 次
					{m}  ->  表示这个字符出现 m 次
					?  ->  表示这个字符出现 0 次或 1 次
					+  ->  表示这个字符出现 1 次或多次
					*  ->  表示这个字符出现 0 次或多次

			字符不定匹配:
				/1[oajs31o8]/g  ->  匹配到 1 跟 [oajs31o8] 这堆字符内的任意一个 【跟 1 的组合】！！
				
			范围表示法 [0-9]  [a-z]  [A-Z]
				连续的字符的简写方式
					[12345abcdefg] => 等价于 [1-5a-g]

					🔥 如果想在一个范围内内取值, \ 表示转义符
						[a\-z] 或 [-az] 或 [az-]

			❌ 排除写法
				[^abc]  ->  排除 abc 字符

			⚡️ 匹配字符组的方法 (👇大写表示排除) ⚡️都是匹配一个字符！
					\d  	->  匹配 [0-9] 的一位数字  , d  为 digit
					🚀\D  	->   [^0-9]  表示除了数字外的任意字符
					\w  	->   [0-9a-zA-Z_]  ,	 表示数字、大小写字母和下划线  , w 为 word
					\W 		->   [^0-9a-zA-X_] ,    表示排除掉单词跟字符
					\s   	->   [ \t\v\n\r\f] ,    表示空白符号, 包括空格、水平制表符、垂直制表符、换行符、回车符、换页符
					\S      ->  表示  [^ \t\v\n\r\f] ,  表示非空白符
					. 		->	表示 [^\n\r\u2028\u2029] 通配符,  表示几乎任意字符, 换行符、回车符、行&段分隔符除外 (👈如果加了 s, 那么 . 点也能匹配这些字符)

			🚀 匹配任意字符（⚡️都是匹配一个字符！）
				[\d\D]
				[\w\W]
				[\s\S]
				[^]

			🚗位置匹配
				^  ->  匹配开头
				$  ->  匹配结尾

			分组:
				圆括号 ()
					圆括号是分组, 方括号是选一个


				配合正则表达式的方法
					✏️String 字符串方法
						match()  ->  匹配某个字符
						split()  ->  删除匹配到的字符, 并返回拆分后的数组
						search()  ->  搜索匹配到的字符(有多个就返回第 1 个), 并返回索引
						replace()
					
					RegExp
						正则表达式自己的类型
							用法
								const reg = new RegExp(/\d/, 'g') //规则 + 修饰符
							⚡️被正则对象身上的属性
								lastIndex
							类型身上的方法
								exec()  有 g 也只是每次都匹配一次, 但是能记录匹配到哪里了
								test()  表示是否匹配到了, 返回 true 或 false
			
*/

const reg = /a/




//🚀 用字符串的 match 方法结合正则表达式来匹配文字, 🌟 g 表示匹配【所有】
const str = 'heyHHCode'
const reg2 = /h/ig
const res = str.match(reg2)
console.log(res) //res[0] => h



// 👇数量不定匹配
// 贪婪匹配 -> 能匹配多就不匹配少  =>  比如 22 即复合 2 也符合 22, 此时就匹配 22
const str2 = '298398224767222'
const reg3 = /2{1,3}/g //一个 2 两个 2 三个 2
const res2 = str2.match(reg3)
console.log(res2) // 2, 22, 222



// 懒惰匹配 -> 能匹配少就不匹配多  =>  比如 22 即符合 2 也符合 22, 此时就匹配 22
const str3 = '298398224767222'
const reg4 = /2{1,3}?/g //一个 2 两个 2 三个 2
const res3 = str3.match(reg4)
console.log(res3) // 2, 2, 2, 2, 2, 2


// 连带空字符串一起匹配
const str4 = 'heyHHCode'
const reg5 = /h?/g //因为 ？ 表示
const res4 = str4.match(reg5)
console.log(res4) // h, "", "", "", "", "", "", ""


// 👇字符不定匹配
const str5 = '1akhkljas18ie821024'
const reg6 = /1[oajs31o8]/g  //1a  18
const res5 = str5.match(reg6)
console.log(res5) // 1a



// 排除某几个字符
const str6 = '1akhkljas18ie821024'
const reg7 = /[^hk8]/g  
const res6 = str6.match(reg7)
console.log('排除 hk8 后:', res6) 



// 只取出数字
const str7 = '1akhkljas18ie821024'
const reg8 = /\d/g  
const res7 = str7.match(reg8)
console.log('排除单词只要数字:', res7) 



// 匹配  任意数字 & 2 的组合形式
const str8 = '1akhkljas18ie82102499299992'
const reg9 = /\d2/g   // 匹配到数字然后跟 2 组合起来
const res8 = str8.match(reg9)
console.log('任意数字 & 2 的组合形式:', res8)  //82  02  92  92




// 匹配  任意数字 & 2 的组合形式 贪婪匹配
const str9 = '1akhkljas18ie82102499299992'
const reg10 = /\d{1,3}2/g   // 至少匹配到 1~3 个【数字】 然后跟 2 组合1起来
const res9 = str9.match(reg10)
console.log('贪婪匹配任意数字 & 2 的组合形式:', res9) //82  102  4992  992



// 分组
const str10 = '1akh123kljas18ie82102499291239992'
const reg11 = /(123)+/g  //表示 123 这组数据, 并且至少有 1 组
const res10 = str10.match(reg11)
console.log('匹配 123 这组数据, 并且至少有 1 组:', res10) 








// ⚡️正则表达式跟【🚀字符串方法】的结合 split、 search、 replace ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
const str000 = 'hello_Amy'
const reg000 = /_/ //匹配到 0 处
console.log('分割方法结合正则:', str000.split(reg000)) //🚀 split 方法, 传入正则表达式, 会【把匹配到的字符去掉】, 然后返回一个数组



// 替换某个字符 replace 方法的入门用法
const str111 = 'There is a dog in the house'
const reg111 = /dog/i //匹配到 dog , i 表示忽略大小写
console.log('把狗换成猫:', str111.replace(reg111, 'cat')) //传入正则, 传入要替换的字符



//🌟🌟 替换时间格式 replace 方法的经典用法, () 包括起来的才能被 $ 给识别到
let regex333 = /(\d{4})-(\d{2})-(\d{2})/ //🚀🚀 {4} 表示出现 4 次, {2} 表示出现 2 次, 以此类推  =>  2018  04  28
let str333 = '2018-04-28'
let res333 = str333.replace(regex333, "$2/$3/$1") //🚀🚀 $ 美元符号是 replace 的特殊方法 => $2 表示获取上边 regex333 内的第 2 个分组 () 的内容, $3 表示获取上边 regex333 内的第 3 个分组 () 的内容, 以此类推
console.log(res333)







//  RegExp 类 身上的方法 ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// test() 方法 => 是否匹配到了, 匹配到了则返回 true, 否则返回 false
const str99 = 'table football'
const regex99 = new RegExp('foo*', 'g')
const globalRegex = new RegExp('foo*')

console.log(regex99.test(str99)) // 🚀传入字符串  ->  true
console.log(globalRegex.test(str99)) // 🚀传入字符串  ->  true


// exec() 方法、lastIndex 属性
const regex66 = /hello/g //定义一个正则表达式, 匹配 hello
const str66 = 'hello world, hello world'

let match //👇会找出两个 hello, 并且记录在哪里找到, 从哪里开始找 !!
while((match = regex66.exec(str66)) !== null) { // regex66.exec 执行正则表达式
	console.log(match)
	console.log(`找到了 ${match[0]} 在 ${match.index} 位置`)
	console.log(`下一次匹配从 ${regex66.lastIndex} 开始`) 
}

