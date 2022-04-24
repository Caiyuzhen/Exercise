//直接把它变成数组
const cardArr = [...document.querySelectorAll('.one-unit')]


//🍔🍔🍔功能一:点击切换+创建新 card
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


//🍔🍔🍔功能二:拖拽功能
//mousedown   mouseup   mousemove
//clientX   clientY
//transform  translate  一开始都是 0,0
const moveBar = document.querySelector('.moveBar')
const mouseDoenPos = {x:0, y:0} //记录元素的位置
let isDown = false //🌟🌟点击鼠标后才触发


//鼠标按下
moveBar.addEventListener('mousedown',(e)=>{
    // console.log(e.clientX,e.clientY,'down')
    mouseDoenPos.x = e.clientX  //记录点下的 x 位置
    mouseDoenPos.y = e.clientY  //记录点下的 y 位置

    isDown = true //🌟🌟表示按下后就可以拖拽了 

    console.log(mouseDoenPos)
})


//鼠标抬起
moveBar.addEventListener('mouseup',(e)=>{
    // console.log(e,'up')
    
    //鼠标抬起后，把 isDown 置为 false 就不会跟着移动了
    isDown = false
})

//鼠标移动
moveBar.addEventListener('mousemove',(e)=>{
    // console.log(e.clientX,e.clientY,'Up')
    if (isDown) {
        //🌟🌟 减去原来的坐标,取差值, 记得加单位: px
        e.currentTarget.style.transform = `translate(${e.clientX - mouseDoenPos.x}px,${e.clientY - mouseDoenPos.y}px)`
    }
})