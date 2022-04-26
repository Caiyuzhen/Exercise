
const cardArr = [...document.querySelectorAll('.one-unit')]//获取卡片组并直接把它变成数组
const wallet = document.querySelector('.container')



//🍔🍔🍔功能一:实现点击切换+创建新 card ——————————————————————————————————————————
//🌟：注意为了节约内存空间，所以我们把函数写在外层,其他的都是利用引用来加函数🌟
//🌟通过 e.currentTarget 获取触发事件的元素

function handleClick(e){
    //判断下，如果点击的是添加按钮就不高亮
    if(e.currentTarget.className.includes('add-unit')){
    //判断方法二： e.target.classList.contains('add-unit')

        //创建 👇 这个结构的元素 （创建 DOM 树）
        // <div class="one-unit">
        //     <span class="currency">BLT</span>
        //     <div>
        //         <span class="num">66</span>
        //         <span class="symbol">%</span>
        //     </div>
        // </div>
        const rootDiv = document.createElement('div')
        //添加 class 类名
        rootDiv.classList.add('one-unit')
        
        const span = document.createElement('span')
        span.classList.add('currency')
        //添加文字
        span.innerHTML = "CNY"

        const div = document.createElement('div')

        //span1
        const spanInner1 = document.createElement('span')
        spanInner1.classList.add('num')
        //数值
        spanInner1.innerText = "00"

        //换行符
        const text = document.createTextNode('\n')

        //span2
        const spanInner2 = document.createElement('span')
        spanInner2.classList.add('symbol')
        spanInner2.innerText = "%"
        
        //添加为子元素
        div.appendChild(spanInner1)
        //在两个 span 之间添加一个换行符
        div.appendChild(text)
        div.appendChild(spanInner2)
        rootDiv.appendChild(span)
        rootDiv.appendChild(div)

        //创建后添加到元素的前面(需要父级来调用),前一个是需要添加的元素，后面是参考元素
        e.currentTarget.parentNode.insertBefore(rootDiv,e.currentTarget)

        //🌟🌟需要给创建后的元素也添加事件
        rootDiv.addEventListener('click',handleClick)

    } else {
        
    // ⚠️因为有新添加的节点,所以每次都需要重新获取数组 [...document.querySelectorAll('.one-unit')]
    //第一步：点击后，先删除高亮态，然后再加高亮态(注意，因为是对多个 card 的操作，所以是 forEach)
    [...document.querySelectorAll('.one-unit')].forEach(function(item){
        item.classList.remove('selected-unit')
    })


    //第二步：给点击的元素添加高亮态
    e.currentTarget.classList.add('selected-unit')
    console.log('e.currentTarget:',e.currentTarget,'\ne.traget:',e.target) // \n 为换行符

    }
}

//🌟用数组遍历的方式给每个元素都添加事件
cardArr.forEach((item) => {
    item.addEventListener('click', handleClick) //函数写在外层！
})









//🍔🍔🍔功能二:实现拖拽功能 ——————————————————————————————————————————
//mousedown   mouseup   mousemove
//clientX   clientY
//transform  translate(一开始是 0,0)
const moveBar = document.querySelector('.moveBar')
const mouseDownPos = { x: 0, y : 0 } //第 3-1 步: 记录鼠标的初始位置,一开始都是 0,0, 注意, 不是元素位置而是鼠标[点下]的位置
const basicPos = { x: 0, y: 0 } //第 3-2 步: 记录元素的初始位置,一开始都是 0,0, 注意, 不是鼠标位置而是元素位置, 🌟拖拽后就会改变!
let disX = 0, disY = 0 //第 3-3 步: 在最外层定义移动后元素的位置,让 mouseup 也能获取这个参数!

let isDown = false //🌟🌟 2-1 点击鼠标后才触发



//第 1-1 步: 鼠标按下
moveBar.addEventListener('mousedown',(e)=>{
    // console.log(e.clientX,e.clientY,'down')
    mouseDownPos.x = e.clientX  //第 2-4 步: 记录点下的 x 位置
    mouseDownPos.y = e.clientY  //第 2-5 步: 记录点下的 y 位置

    isDown = true //🌟🌟第 2-2 步: 表示按下后就可以拖拽了 
    console.log(mouseDownPos)
})



//第 1-2 步: 鼠标抬起
moveBar.addEventListener('mouseup',(e)=>{
    // console.log(e,'up')

    //第 2-3 步: 鼠标抬起后，把 isDown 置为 false 就不会跟着移动了
    isDown = false

    //3-4 🌟🌟🌟抬起后,改变元素的初始值, 把值变为改变后的值!!
    basicPos.x = disX
    basicPos.y = disY
})



//第 1-3 步: 鼠标移动(绑定给 body, 这样热区范围更大!)
document.body.addEventListener('mousemove',(e)=>{
    // console.log(e.clientX,e.clientY,'Up')


    if (isDown) { //2-4 先写一个判断框架
        
        //🌟🌟第 3-5 步: 表示基础值加上移动的距离 = 🌟实时获取并更新为最新的值
        disX = basicPos.x + e.clientX - mouseDownPos.x
        disY = basicPos.y + e.clientY - mouseDownPos.y

        //🌟🌟 第 3-6 步: 表示移动的距离, 减去原来的坐标, 取差值, 记得加单位: px, 🌟记录值的时候改写了,加上了初始值!!!!
        // e.currentTarget.style.transform = `translate(${e.clientX - mouseDownPos.x}px,${e.clientY - mouseDownPos.y}px)`
        
        //👇整个 [container元素] 都被拖拽的方式
        wallet.style.transform = `translate(${disX}px, ${disY}px)`
        
        //👇只有 [当前元素] 被拖拽的方式(如果是多个元素,就要单独判断 mousedown 是不是这个元素)
        // moveBar.style.transform = `translate(${disX}px, ${disY}px)`
    }
})









//🍔🍔🍔功能三:实现排序功能 ——————————————————————————————————————————
//同样的也是先添加点击跟抬起的事件


const blockDownPos = { x: 0, y : 0 } 
const blockTrans = { x: 0, y: 0 } 
let blockX = 0, blockY = 0  
// let blockDisX = 0, blockDisY = 0
let blockMovable = false

let target = null

//card 的间距
let gapWidth = 16
//元素大小
let blockWidth = 0

let currentPosIndex = 0  //记录放手后元素排到第几个
let targetIndex = 0  //记录用来判读元素属于第几个的位置



function handleDown(e) {  //按下
    blockMovable = true
    blockDownPos.x = e.clientX
    blockDownPos.y = e.clientY
    //👇👇🌟 获取排序的元素一: 点击这个元素后, 把这个元素变成 target 变量
    target = e.currentTarget
    target.style.transition = 'none' //不要让它一直的过渡
    target.style.zIndex = 10

    //现在上面声明 blockWidth 变量,再在按下后获取元素宽度
    blockWidth = target.getBoundingClientRect().width

    //判断被拖拽元素处于第几个,每次点下后都判断一下有多少元素,因为元素可以点击新增, 不能写死
    const all = document.querySelectorAll('.one-unit')
    const allArr = [...all]

    allAee.forEach((item,index)=>{
        if(item === e.currentTarget){
            targetIndex = index //元素的位置等于元素的索引
            currentPosIndex = index
        }
    })

}


function handleUp(e) {  //抬起
    blockMovable = false
}


//判断排序的移动范围
function changePos(newUnits,disX,eleWidth){ //gapWidth+blockWidth=moveWidth
    //👇一、判断被拖拽元素移动了几个单位 = 鼠标移动的范围 ÷ 元素(度+元素间距)
    const moveStep = parseInt(disX / eleWidth) //转化为整数
    // console.log(moveStep) 
    currentPosIndex = moveStep + targetIndex //放手的位置 = 移动了几个单位(因为往左移动是🌟-负数,所以加起来相当于减去多少!!🌟) + 当前元素位于第几个
    console.log(currentPosIndex)





    //👇👇二、判断其他元素需要排序到哪里的核心代码
    if( currentPosIndex > targetIndex ){
        const needMoveCount = currentPosIndex - targetIndex //排序位置 = 被拖移动了几个单位 - 被拖元素位于第几个

        for (let i = 1; i <= needMoveCount; i++){
            
        }
    }




}



function handleMove(e) {  //移动
    if(blockMovable) {
        blockX = blockTrans.x + e.clientX - blockDownPos.x //注意,不是 mouse, 是 blockDown
        blockY = blockTrans.y + e.clientY - blockDownPos.y
        //👇👇🌟 获取排序的元素二: 获取上面改变后的变量
        target.style.transform = `translate(${blockX}px,${blockY}px)`
        changePos([...document.querySelectorAll('.one-unit')], blockX , gapWidth+blockWidth)//判断移动范围的函数, 需要传入 [最新的排序信息]、[blockX]、[gapWidth+blockWidth] 三个参数
    }
}



cardArr.forEach((item)=> {
    item.addEventListener('mousedown', handleDown)
    item.addEventListener('mouseup', handleUp)
})

//绑定在 body 上, 如果通过 currentTarget 就是指向的 body
document.body.addEventListener('mousemove',handleMove)//把鼠标移动绑定给 body, 这样热区范围更大!