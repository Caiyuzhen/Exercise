import {Picker02} from './pickone.js'


//传入人数数组
const people = [
	"Jimmy",
	"Kim",
	"Allen",
	"Lily",
	"Amy",
	"Hank",
	"Adam",
	"Hilda",
	"Lynn",
	"Olga",
	"Zara",
	"Yuri"
]


//传入人名单，元素
//🔥通过 init 调用 class 实例身上的静态方法！！
const picker = Picker02.init(people,'showArea')
