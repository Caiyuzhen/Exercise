//直接把它变成数组
const cardArr = [...document.querySelectorAll('.one-unit')]



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

        //span2
        const spanInner2 = document.createElement('span')
        spanInner2.classList.add('symbol')
        spanInner2.innerText = "%"
        
        //添加为子元素
        div.appendChild(spanInner1)
        div.appendChild(spanInner2)
        rootDiv.appendChild(span)
        rootDiv.appendChild(div)

        //创建后添加到元素的前面(需要父级来调用),前一个是需要添加的元素，后面是参考元素
        e.currentTarget.parentNode.insertBefore(rootDiv,e.currentTarget)

    } else {
        
        
    //第一步：点击后，先删除高亮态，然后再加高亮态(注意，因为是对多个 card 的操作，所以是 forEach)
    cardArr.forEach(function(item){
        item.classList.remove('selected-unit')
    })


    //第二步：给点击的元素添加高亮态
    e.currentTarget.classList.add('selected-unit')
    console.log('e.currentTarget:',e.currentTarget,'\ne.traget:',e.target) // \n 为换行符

    }
}

//用数组遍历的方式给每个元素都添加事件
cardArr.forEach((item) => {
    item.addEventListener('click', handleClick) //函数写在外层！
}) 