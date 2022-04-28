
const cardArr = [...document.querySelectorAll('.one-unit')]//获取卡片组并直接把它变成数组
const wallet = document.querySelector('.container')



//🍔🍔🍔功能一:实现点击切换+创建新 card ——————————————————————————————————————————
//🌟：注意为了节约内存空间，所以我们把函数写在外层,其他的都是利用引用来加函数🌟
//🌟通过 e.currentTarget 获取触发事件的元素

function handleClick(e){

    if(!clickable){//🍎🍎 , ! 为[取反操作符],如果 clickable = false, 整体就是 true
        return //上面为 true 的话, 就 return ,就不会执行下面的代码
    }

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

   

        //🚀给新添加的元素添加上下面的拖拽方法!
        rootDiv.addEventListener('click',handleClick)
        rootDiv.addEventListener('mousedown',handleDown)
        rootDiv.addEventListener('transitionend',handleTransitionEnd)

      

        //创建后添加到元素的前面(需要父级来调用),前一个是需要添加的元素，后面是参考元素
        e.currentTarget.parentNode.insertBefore(rootDiv,e.currentTarget)

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



//👈 第 1-1 步: 鼠标按下
moveBar.addEventListener('mousedown',(e)=>{
    // console.log(e.clientX,e.clientY,'down')
    mouseDownPos.x = e.clientX  //第 2-4 步: 记录点下的 x 位置
    mouseDownPos.y = e.clientY  //第 2-5 步: 记录点下的 y 位置

    isDown = true //🌟🌟第 2-2 步: 表示按下后就可以拖拽了 
    console.log(mouseDownPos)
})



//👋 第 1-2 步: 鼠标抬起
moveBar.addEventListener('mouseup',(e)=>{
    // console.log(e,'up')

    //第 2-3 步: 鼠标抬起后，把 isDown 置为 false 就不会跟着移动了
    isDown = false

    //3-4 🌟🌟🌟抬起后,改变元素的初始值, 把值变为改变后的值!!
    basicPos.x = disX
    basicPos.y = disY
})



//🚗 第 1-3 步: 鼠标移动(绑定给 body, 这样热区范围更大!)
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

let currentPosIndex = 0  //记录放手后元素应该在哪 (走几格,🌟小于为右,大于为左!)
let targetIndex = 0  //记录用来判断元素目前第几个的位置(按下时需要拖拽元素的位置)
let moveStep = 0 //记录拖拽的步数


//🍎下面两个变量都是避免直接点击直接变色的
let clickable = true //避免拖拽后 card 直接高亮,用变量来阻止鼠标事件, 在 handleBlockDwon()那里改变变量
let clickTimeId = 0

function handleDown(e) {  //按下

if(!e.currentTarget.classList.contains('add-unit')){//点下的如果包含了添加单位的 class,就不执行下面的代码

    clickTimeId = setTimeout(()=>{ //🍎🍎点下后超过 200ms 后判断为非点击事件 , 因为一般点击事件都是点一下就抬起手
        clickable = false
    },200)


    blockMovable = true
    blockDownPos.x = e.clientX
    blockDownPos.y = e.clientY
    //👇👇🌟 获取排序的元素一: 点击这个元素后, 把这个元素变成 target 变量
    target = e.currentTarget
    target.style.transition = 'none' //不要让它一直的过渡
    target.style.zIndex = 20

    //先在上面声明 blockWidth 变量,再在按下后获取元素宽度
    blockWidth = target.getBoundingClientRect().width

    //判断被拖拽元素处于第几个,每次点下后都判断一下有多少元素,因为元素可以点击新增, 不能写死
    const all = document.querySelectorAll('.one-unit')
    const allArr = [...all]

    allArr.forEach((item,index)=>{
        if(item === e.currentTarget){
            targetIndex = index //元素的位置等于元素的索引(按下时需要拖拽元素的位置)
            currentPosIndex = index
        }
    })
    }
}


function handleUp(e) {  //抬起 (抬起后, 被拖拽的元素就放到对应的位置)

    if(!e.currentTarget.classList.contains('add-unit')){//点下的如果包含了添加单位的 class,就不执行下面的代码
        
        clearTimeout(clickTimeId)//🍎🍎点击后马上抬起的话, 就判断为点击事件, 所以要清除定时器

        setTimeout(()=>{ //等同步代码执行完后才变为 true, 相当于下一次执行的时候就是 true 了
            clickable = true //🍎🍎判断为不是 add 按钮后,要让 clickable = true
        })


        blockMovable = false
    
        const newUnits = document.querySelectorAll('.one-unit') //重新获取最新的位置
        if( moveStep < 0 - targetIndex ){//🌟比如向左 moveStep 拖了 -10 个 < (0 - 3 = - 3)
            moveStep = - targetIndex  //🌟[逻辑是元素移到底相当于 = 自己的索引位]那么就让 moveStep = 元素的索引位
        } else if ( moveStep > newUnits.length - targetIndex - 2 ) { //🌟比如如果向右拖了 10 个 > (( 4 - 2 -2 )=0)
            moveStep = newUnits.length - targetIndex - 2  //🌟[逻辑是排除掉 Add+ 跟元素本身] moveStep = 整组元素的数量 - 当前元素的索引位 - 2  (🌟思考的过程是,先用整组元素看移动到最后要花几步,用两组数据对比一下就知道了)
        }
    
        target.style.transition = 'all .3s ease-in-out' //因为下面改为了 none ,所以放手后加回来
        target.style.zIndex = 'auto' //因为下面改为了 20 ,所以放手后加回来( auto 为默认,0 也可以 )
        target.style.transform = `translateX(${moveStep * (blockWidth + gapWidth)}px)`//🌟🌟改变的位置 = 步数(移动了多个位) * (元素宽度 + 间距宽度)
    
    }

    //🍊拖拽结束后鼠标抬起时要把数据还原一下!!因为一开始是 0 (相对的)
    moveStep = 0
}



//判断排序的移动范围(超过多少就去改变位置)
function changePos(newUnits,disX,moveWidth){ //gapWidth+blockWidth=moveWidth
    //👇一、判断被拖拽元素移动了几个单位 = 鼠标移动的范围 ÷ 元素(度+元素间距)
    moveStep = parseInt(disX / moveWidth) //转化为整数
    // console.log(moveStep) 
    currentPosIndex = moveStep + targetIndex //🌟🌟放手后应该在的位置(走几格,🌟小于为右,大于为左!) = 移动了几个单位(因为往左移动是🌟-负数,所以加起来相当于减去多少!!🌟) + 当前元素位于第几个
    console.log(currentPosIndex)




    //👇👇四、判断如果元素拖回了原来的位置, 那么就把其他元素变回原位
    for( let i = 0; i < newUnits.length; i++){ //🌟 i 相当于元素的索引位, 遍历所有元素, 如果遍历的过程中发现 i 等于 targetIndex (当前拖拽元素的索引位置) ,那么 i 这个元素就变回 0 的位置
        if( i !== targetIndex ){ //当前元素的索引位
            newUnits[i].style.transform = `translateX(0px)`//这里符合条件后, 下面就不会再改了
        }
    } 


    //👇👇二、判断右边第几个元素需要排序到哪里的核心代码
    if( currentPosIndex > targetIndex ){ //应该在哪(走几格,🌟小于为右,大于为左!) > 当前拖拽元素的位置(按下时需要拖拽元素的位置)
        const needMoveCount = currentPosIndex - targetIndex //排序位置(走几格) = 应该在哪 - 目前在哪 (比如: 应该在哪是第二个,目前在第一个,那么就是走了一格)


        for (let i = 1; i <= needMoveCount; i++){ //🌟 i 相当于元素的索引位, 每次都去遍历,然后🌟「遍历出来的元素去计算它的的索引位」,然后进行移动
            if( targetIndex + i !== newUnits.length - 1 ){//为了规避最后一个元素, 比如 1+3=4,4!=5-1,所以不是最后一个元素
                newUnits[targetIndex + i] ? (newUnits[targetIndex + i].style.transform = `translateX(-${moveWidth}px)`) : ""//因为有可能有空元素,所以要判断是否有元素(例如拖了-10个元素,但是只有-9个元素,所以有空元素), 没有空元素就用 [移动几个] 去进行移动
            }
        }
    } //👇👇三、判断左边第几个元素需要排序到哪里的核心代码
    else if( currentPosIndex < targetIndex ) {
        const needMoveCount = targetIndex - currentPosIndex //排序位置(走几格) = 应该在哪 - 目前在哪 (比如: 应该在哪是第二个,目前在第一个,那么就是走了一格)

        for (let i = 1; i <= needMoveCount; i++){
                newUnits[targetIndex - i] ? (newUnits[targetIndex - i].style.transform = `translateX(${moveWidth}px)`) : ""//判断是否是空元素
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




//五、移动结束后的操作
function handleTransitionEnd(e){ //清除旧数据, 改为新的排序数据
    if(target === e.currentTarget){ //🌟只有当当前触发的元素是正在拖拽的元素,下面的代码才会执行!
        if(currentPosIndex !== targetIndex){ //放手后元素的索引位 != 当前位置
            const all = document.querySelectorAll('.one-unit') //重新获取最新的元素

            //🌟🌟下面都是判断的是元素的索引位!
            if(currentPosIndex < 0){  //🌟 修正如果超出左边非常多的情况: 放手后元素的索引位 < 0 ,那元素就是放在最前面的索引位, 
                currentPosIndex = 0  //元素放在第一个(最左)
            } else if (currentPosIndex > all.length - 2) {  //🌟 修正如果超出右边非常多的情况
                currentPosIndex = all.length - 2  //放在最后(右)一个
            }


            if (currentPosIndex < targetIndex) { //放手后元素的索引位 < 当前位置 (左放边[上面已经排除了超出左边很多的情况])
                target.parentNode.insertBefore(target, all[currentPosIndex]) //放在[🌟🌟🌟当前位置被占用的元素(还没拖拽前!)]的前面
            } else {
                target.parentNode.insertBefore(target,all[currentPosIndex + 1])//同理也是放在[🌟🌟🌟当前位置被占用的元素(还没拖拽前!)]的前面
            }
 

            //🌟🌟 排序后, 会重新渲染, 所以要清除旧的位置数据, 因为上面已经 insertBefore 改了位置数据了, 所以要初始化一下(恢复默认状态)
            const allArr = [...all]
            allArr.forEach((item) => {
                item.style.transition = 'none'
                item.style.transform = 'translate(0px)'
            })

            //等上面的同步函数执行完后,异步去恢复为有过度属性的状态
            setTimeout(() => {
                allArr.forEach((item)=>{
                    item.style.transition = 'transform 0.2s ease-in-out'
                })
            })



        }
    }
}




cardArr.forEach((item)=> {
    item.addEventListener('mousedown', handleDown)
    item.addEventListener('mouseup', handleUp)
    item.addEventListener('transitionend', handleTransitionEnd)
})

//绑定在 body 上, 如果通过 currentTarget 就是指向的 body
document.body.addEventListener('mousemove',handleMove)//把鼠标移动绑定给 body, 这样热区范围更大!