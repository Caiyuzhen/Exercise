const contentBox = document.querySelector('.content-box')
const dotArr = [...document.querySelectorAll('.dot')]

const content = document.querySelector('.content')//其中一页的尺寸变量


let deltaTotal = 0


//👇可以连续滚动的版本
window.addEventListener('wheel',(e)=>{
    

    //如果直接用 clientWidth 来判断整个滚动的盒子的话，因为 clientWidth 的都是显示正在页面内的元素宽度，溢出页面的不会获取到, 而 scrollWidth 才可以获取到包含溢出的部分

    //滚轮滚动的距离
    deltaTotal += e.deltaY

    //设置临界值
    if ( deltaTotal < 0 ) { //如果为负（往左）那么就不动
        deltaTotal = 0
    }else if (deltaTotal > content.clientWidth * 3) { //🌟🌟🌟判断是否大于整个容器盒子的宽度
        deltaTotal = content.clientWidth * 3 //🌟🌟🌟注意，滚动的是 - 去第一个的宽度！！这里就可以用 clientWidth 来判断要减去多少宽度的第一个页面！！
    }
    
    contentBox.style.transform = `translateX(-${deltaTotal}px)`

    //🌟🌟🌟看滑动到第几页
    console.log(parseInt(deltaTotal/content.clientWidth))

    //🌟🌟🌟点点指示器的变化
    dotArr.forEach((item,index)=>{
        if(index === (parseInt(deltaTotal/content.clientWidth))){
            item.classList.add('dot-selected')
        } else {
            item.classList.remove('dot-selected')
        }
    })

})


