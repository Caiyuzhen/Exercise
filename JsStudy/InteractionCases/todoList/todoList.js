//一、🚀🚀 用类定义的方式定义输入框的原型方法 ————————————————————————————————————————————————
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





//二、🚀🚀 创建卡片的原型方法，1.先获取  2.然后从 DOM 树上移出（内存中还有）  3.然后再在原型方法中进行深克隆 ——————————————————————
const templateCard = document.querySelector('.todo-card')//🚀🚀🚀很关键！下面所有的 this 都指向它！！
templateCard.remove() //移除卡片模版（内存中还有，下面会利用）


class ToDoCard {
    constructor(card) { //constructor 一般用来做元素的【属性设置】

        this.card = card.cloneNode(true) ////一、定义卡片的容器, 每次调用这个方法都会【深拷贝一个 Card 元素】, 谁调用就拷贝谁，因为这里用 templateCard 来调用，所以会拷贝 templateCard
        this.editBlock = this.card.querySelector('.edit-block')//🌟获取到编辑区域(在卡片 this.card. 内去 query 会更快)
        this.cardContainer = document.querySelector('.todo-Card-container') 
        this.fourIcons = this.card.querySelector('.four-icons').children //🌟🌟获取到四个图标的子级，然后在下面会把它转为数组
        this.doneIcon = this.card.querySelector('.icon-left-done-init')
        this.colorBoard = this.card.querySelector('.color-board')

        this.clickCount = 0 

        this.cardState = { //一：🍗 计时器，存储状态数据，用来判断是否要保持收藏图标,false 则表示没有点击过
            isFav: false
        }

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



        //鼠标移入卡片区域，图标出现
        this.card.addEventListener('mouseenter',(e)=>{
            
            //👈左边一个 icon
            this.doneIcon.classList.remove('icon-left-done-init')
            this.doneIcon.firstElementChild.classList.remove('svg-done-init') //第一个子级为 svg ！

            
            // 👉右边四个 icon
            const fourIconsArr = [...this.fourIcons] //🚀把四个 icon 转化为数组
            fourIconsArr.forEach(items=>{
                items.classList.remove('icon-init-right') //方法一：移除初始化的类名
                // items.style.opacity = 1  //方法二：改变初始化的类名
                items.firstElementChild.classList.remove('svg-init') //🚀利用 firstElementChild 来获取 svg ！！
            })
        })



        //鼠标移出卡片区域，所有图标消失
        this.card.addEventListener('mouseleave',(e)=>{


            //👈左边一个 icon
            this.doneIcon.classList.add('icon-left-done-init')
            this.doneIcon.firstElementChild.classList.add('svg-done-init') //第一个子级为 svg ！


            // 👉右边四个 icon
            const fourIconsArr = [...this.fourIcons] //🚀把四个 icon 转化为数组
            fourIconsArr.forEach((items,index)=>{


                //🦈 判断收藏 icon 是否被点击了 =>   this.cardState.isFav 表示【取反之后为 true】， index === 3 表示【是收藏 icon】
                if(this.cardState.isFav && index === 3){  
                    return
                }
                else{ 
                    items.classList.add('icon-init-right') //方法一：添加初始化的类名,相当于把四个 icon 移出去
                    // items.style.opacity = 1  //方法二：改变初始化的类名,相当于把四个 icon 移出去
                    items.firstElementChild.classList.add('svg-init') //🚀利用 firstElementChild 来获取 svg ！！
                }
            })


            //移出卡片后，色板也应该消失掉！
            setTimeout(()=>{
                this.colorBoard.classList.add('color-board-init')
            },400)

        })





        //点击色盘实现卡片的颜色变化（🌟给 color board 添加事件委托，让具体的 color 冒泡！）
        this.colorBoard.addEventListener('click',(e)=>{
            // console.log(e.target.className)//这时候不能用 currentTarget，因为 currentTarget 是事件的触发者，而不是被点击的元素！否所会一直是 colorBoard ！
            //🍎因为会点到 colorBoard，所以要判断一下！判断点击的是 color 的 span 而不是 colorBoard 的 div ！
            if(e.target.nodeName === 'SPAN'){ 
                // console.log(e.target.className) 
                const colorClass = e.target.className //🚀🚀获得具体点击的类名
                // console.log(colorClass)

                //🚀🚀思路：先取出第一个类名，再加上上面获得的类名，【整体作为一组新的类名】去【替代原来的类名】！！
                const basicClass = this.card.className.split(' ')[0] //🚀🚀先取出第一个类名，目的是为了下一步！！
                this.card.className = basicClass + ' ' + colorClass //🚀🚀 一：className 是替换类名的作用！！二：空格是为了隔开它们！！
            }
        })



        //点击 【颜色 icon】 出现色板的效果, 可以利用上面定义的的 fourIcons
        this.fourIcons[1].addEventListener('click',(e)=>{
          this.colorBoard.classList.toggle('color-board-init')  //🚀🚀 toggle 切换(开关）s的效果！🚀注意！在上边鼠标移出的方法里也应该加上让色板消失的逻辑！！
        })



        //点击收藏按钮把卡片固定住 (利用了计数器的原理)
        this.fourIcons[3].addEventListener('click',(e)=>{
            this.cardState.isFav = !this.cardState.isFav; //🚀🚀 取反！也类似开关，一开始是 true 的话点一下 就是 false
            e.currentTarget.children[0].children[1].style.fill = this.cardState.isFav ? '#FFC60A' : 'white'
            // console.log(e.currentTarget.children[0].children[1]) //box 的子级->svg 的子级->path
        })



        //长按进行卡片的删除
        this.fourIcons[0].addEventListener('click',(e)=>{
            
        })




    }

    appendCard(){ //用来定义具体的方法
        this.cardContainer.appendChild(this.card)
    }
}


//把卡片实例化
const card1 = new ToDoCard(templateCard)
const card2 = new ToDoCard(templateCard)
const card3 = new ToDoCard(templateCard)
