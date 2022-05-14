// 因为比如每个卡片的功能是一样的，所以最好用类定义的方式
class InputBar{
    constructor(){
        //👇实例都会有下面这个 inputEle 属性,用这些属性来获取元素！！类似 const / let ！！
        this.inputEle = document.querySelector('input')//这里获取 # 的话就不用.了
        this.inputBtnBox = document.querySelector('.input-buttons')
    }

    //原型方法
    init(){
        //获得上面 inputEle 的引用
        this.inputEle.addEventListener('focus',(e)=>{ //箭头函数的 this 是在创建的时候就绑定了自身的实例【inputEle】，所以要经常用到 this 的话可以用箭头函数
            // this.inputEle.style.width = '20rem' // js 添加样式
            this.inputEle.classList.add('input-focus')//CSS 添加样式
            this.inputBtnBox.style.opacity = 1
            
        })
        this.inputEle.addEventListener('blur',(e)=>{
            this.inputEle.classList.remove('input-focus')
            this.inputBtnBox.style.opacity = 0
        })
    }
}

const inputBarInstance = new InputBar() //new 一个实例
inputBarInstance.init() //🌟🌟调用原型方法,如果是放在 constructor(){} 内去定义的话，就不用用 .init 来调用了，new 的时候直接就有了