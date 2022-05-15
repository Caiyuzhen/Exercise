//一、🚀 用类定义的方式定义输入框的原型方法 ————————————————————————————————————————————————
class InputBar{
    constructor(){ //类似一个构造函数
        //👇实例都会有下面这个 inputEle 属性,用这些属性来获取元素！！类似 const / let ！！
        this.inputEle = document.querySelector('input')//这里获取 # 的话就不用.了
        this.inputBtnBox = document.querySelector('.input-buttons')

    }
    //原型方法
    init(){
        //获得上面 inputEle 的引用，上面已经获取了元素了，所以这里就不用再获取了
        //聚焦
        this.inputEle.addEventListener('focus',(e)=>{ //箭头函数的 this 是在创建的时候就绑定了自身的实例【inputEle】，所以要经常用到 this 的话可以用箭头函数
            // this.inputEle.style.width = '20rem' // js 添加样式
            this.inputEle.classList.add('input-focus')//CSS 添加样式
            this.inputBtnBox.style.opacity = 1      
        })
        //失焦
        this.inputEle.addEventListener('blur',(e)=>{
            this.inputEle.classList.remove('input-focus')
            this.inputBtnBox.style.opacity = 0
        })

    }
}

const inputBarInstance = new InputBar() //调用 new 一个实例
inputBarInstance.init() //🌟🌟调用实例的原型方法,注意！！🚀🚀 如果是放在 constructor(){} 内去定义的话，就不用用 .init 来调用了，new 的时候直接就有了 🚀🚀





//二、🚀 创建卡片的原型方法，1.先获取  2.然后从 DOM 树上移出（内存中还有）  3.然后再在原型方法中进行深克隆 ——————————————————————
const templateCard = document.querySelector('.todo-card')
templateCard.remove() //移除卡片模版（内存中还有，下面会利用）

class ToDoCard {
    constructor(card) { //constructor 一般用来做元素的属性设置

        this.card = card.cloneNode(true) ////一、定义卡片的容器, 每次调用这个方法都会【深拷贝一个 Card 元素】, 谁调用就拷贝谁，因为这里用 templateCard 来调用，所以会拷贝 templateCard
        this.editBlock = this.card.querySelector('.edit-block');//🌟获取到编辑区域(在卡片 this.card. 内去 query 会更快)
        this.cardContainer = document.querySelector('.todo-Card-container') 

        this.clickTimed = 0
        this.clickCount = 0

        this.init() //这里调用了 init 方法，所以创建函数的时候默认就会执行这个方法！！
    }
    init(){ //一般用来定义一些初始化的设置
        this.appendCard() //调用下面的方法
        
        
        //一：🦐 实现双击才能输入的事件(不想触发单击的事件)
        this.card.addEventListener('mousedown',(e)=>{
            e.preventDefault()//一、先阻止默认的单击进行编辑事件
            e.stopPropagation()//二、再阻止 card 内其他元素的冒泡，否则边距透过去下面的元素会让它继续被点击到, 🌟虽然阻止冒泡但是代码还是执行下去了！！


            clearTimeout(this.clickTimeId)//三、先重置定时器
            this.clickCount ++ //四、定时器+1

            if(this.clickCount === 2){
                this.editBlock.focus() //五、聚焦 (用focus()的方法的话，光标会跑回最前面，在 focus() 的函数内需要处理一下)
            }

            this.clickTimeId = setTimeout(()=>{ 
                this.clickCount = 0 //六、定时器重置，超过，100 毫秒就还原，因为双击一般不会超过 100 毫秒
            },200) 
        })

        //二：🦐 处理光标不聚焦在最后面的事件(html 内，光标是一个对象)
        this.editBlock.addEventListener('focus',(e)=>{
            const selection = getSelection()    //会返回一个对象，用来获取光标位置
            const range = selection.getRangeAt(0)   //设置最后的光标对象
            const textNode = this.editBlock.childNodes[0] //获取文本节点，因为文本节点只在元素的第一个子集！
            range.setStart(textNode,textNode.length)  //获取这个文本节点，再获取这个文本节点的长度
        })
    }
    appendCard(){ //用来定义具体的方法
        this.cardContainer.appendChild(this.card)
    }
}

const card1 = new ToDoCard(templateCard)
const card2 = new ToDoCard(templateCard)
const card3 = new ToDoCard(templateCard)
