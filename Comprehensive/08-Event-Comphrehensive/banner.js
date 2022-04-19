// 获取需要移动的背景那一层
const moveBar = document.querySelector('.img-box-move')
const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')
const rightArrowUnclickable = document.querySelector('.arrow-unclick')
// console.log(rightArrow)

//🌟🌟🌟需要有个变量来承接现在到第几张图片了,不能写死移动的距离,可以用计数的方式来判断,初始值为第 0 张
let countIndex = 0



//判断点击的是哪一个箭头(判断是否包含左箭头)
function arrowHandle(e){
//区分点到的是哪一个元素(🌟🌟注意,用 svg 的话因为元素很小,所以最好用 currentTarget,(这个指向的是谁🌟绑定了🌟这个事件流))
//👇👇classList 返回类名,contains 判断是否包含某个类名
    const isLeft = e.currentTarget.classList.contains('left-arrow')//返回 true / false

    if (isLeft) {
        //点了左箭头,注意,这里要判断是否是第一张图片,如果是第一张图片,就不能再点了
        if (countIndex !== 0) {
            countIndex--
        }
    } else {
        //点了右箭头
        //🌟🌟🌟每次点击后,就让 countIndex 加 1, 但是需要加个上限,所以需要判断一下
        if (countIndex !== 3) {
            countIndex++ 
        }
    }
    //🌟🌟🌟每次点击后,就让 countIndex 乘以(一张图片)移动的距离
    //👇本来都写在 if 里边的,但是两个代码是一样的,所以可以都放出来
    moveBar.style.transform = `translate(-${countIndex * 1024}px)`
   
}


//写法二(判断点的是谁)
//if(e.target.className === 'left-arrow')
//else if(e.target.className === 'right-arrow')



//🌟🌟给两个箭头添加同一个事件处理函数
leftArrow.addEventListener('click',arrowHandle)
rightArrow.addEventListener('click',arrowHandle)