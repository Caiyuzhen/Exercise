// 获取需要移动的背景那一层
const moveBar = document.querySelector('.img-box-move')
const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')
// console.log(rightArrow)

//判断点击的是哪一个箭头

//写法一(判断是否包含左箭头)
function arrowHandle(e){
//区分点到的是哪一个元素(🌟🌟注意,用 svg 的话因为元素很小,所以最好用 currentTarget,(这个指向的是谁🌟绑定了🌟这个事件流))
//👇👇classList 返回类名,contains 判断是否包含某个类名
    const isLeft = e.currentTarget.classList.contains('left-arrow')//返回 true / false

    if (isLeft) {
        //点了左箭头
        console.log('点了左箭头')

    } else {
            //点了右箭头
            console.log('点了右箭头')
            moveBar.style.transform = 'translate(-1024px)'
    }
}


//写法二(判断点的是谁)
// function arrowHandle(e){
//     if(e.target.className === 'left-arrow'){
//         moveBar.style.transform = 'translate(1024px)'
//     }else if(e.target.className === 'right-arrow'){
//         moveBar.style.transform = 'translate(-1024px)'
//     }else{
//         return
//     }
// }


//🌟🌟给两个箭头添加同一个事件处理函数
leftArrow.addEventListener('click',arrowHandle)
rightArrow.addEventListener('click',arrowHandle)