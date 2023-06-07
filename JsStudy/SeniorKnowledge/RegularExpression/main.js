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
					{m,n}?  ->  匹配前一个元素至少 m 次, 最多 n 次,  但尽可能少重复
					{m,}?  ->  匹配前一个元素至少 m 次, 但尽可能少重复
					??  ->   匹配前一个元素 0 次或 1 次，但尽量匹配 0 次, 但尽可能少重复
					+?  ->  匹配前一个元素 1 次或多次，但尽量匹配最少次数, 但尽可能少重复
					*  ->  匹配前一个元素 0 次或多次，可以重复任意次数，包括 0 次

				贪婪匹配:
					{m,n}  ->  重复 m 到~n 次
					{m,}  ->  重复 m 次或更多次
					{m}  ->  重复 m 次
					?  ->  重复 0 次或 1 次
					+  ->  重复 1 次或更多次
					*  ->  重复任意次, 有可能不出现

			字符不定匹配:
				/1[oajs31o8]/g  ->  匹配到 1 跟 [oajs31o8] 这堆字符内的任意一个 【跟 1 的组合】！！
				
			范围表示法 [0-9]  [a-z]  [A-Z]
				连续的字符的简写方式
					[12345abcdefg] => 等价于 [1-5a-g]

					🔥 如果想在一个范围内内取值, \ 表示转义符
						[a\-z] 或 [-az] 或 [az-]

			❌ 排除写法
				[^abc]  ->  排除 abc 字符

			⚡️ 匹配字符组的方法
					\d  	->  匹配 [0-9] 的一位数字  , d  为 digit
					🚀\D  	->   [^0-9]  表示除了数字外的任意字符
					\w  	->   [0-9a-zA-Z_]  ,	 表示数字、大小写字母和下划线  , w 为 word
					\W 		->   [^0-9a-zA-X_] ,    表示排除掉单词跟字符
					\s   	->   [ \t\v\n\r\f] ,    表示空白符号, 包括空格、水平制表符、垂直制表符、换行符、回车符、换页符
					\S      ->  表示  [^ \t\v\n\r\f] ,  表示非空白符
					. 		->	表示 [^\n\r\u2028\u2029] 通配符,  表示几乎任意字符, 换行符、回车符、行&段分隔符除外

			🚀 匹配任意字符:
				[\d\D]
				[\w\W]
				[\s\S]
				[^]

			分组:
				圆括号 ()
					圆括号是分组, 方括号是选一个
			
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
const reg9 = /\d2/g  
const res8 = str8.match(reg9)
console.log('任意数字 & 2 的组合形式:', res8) 




// 匹配  任意数字 & 2 的组合形式 贪婪匹配
const str9 = '1akhkljas18ie82102499299992'
const reg10 = /\d{1,3}2/g  
const res9 = str9.match(reg10)
console.log('贪婪匹配任意数字 & 2 的组合形式:', res9) 



// 分组
const str10 = '1akh123kljas18ie82102499291239992'
const reg11 = /(123)+/g  
const res10 = str10.match(reg11)
console.log('匹配 123 这组数据, 并且至少有 1 组:', res10) 

