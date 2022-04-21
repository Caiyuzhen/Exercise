const moveBar = document.querySelector('.img-box-move')
const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')
//获取小横线并转化为数组,然后利用数组的能力
const lines = document.querySelectorAll('.line')
const linesArr = [...lines]


let countIndex = 0

//思路:最前跟最后一张处理一下

function arrowHandle(e){
    const isLeft = e.currentTarget.classList.contains('left-arrow')
    if (isLeft) {//点击的是左箭头

        

        if (countIndex === 0) {



            moveBar.style.transition = 'none'
            moveBar.style.transform = `translate(-${linesArr.length * 1024}px)`//🌟🌟因为线条的总数就是第六张!!比写死更灵活!!



            //🌟🌟变成异步代码!!避免覆盖掉上面的 transform 代码
            setTimeout(() => {
                moveBar.style.transition = 'transform 0.5s ease-in-out'
                moveBar.style.transform = `translate(-${(linesArr.length-1) * 1024}px)`
            },0)
     
            countIndex = 3 //跳去第 3 张然后往下就正常切了



        }else {
            //如果不是左边第一张,那么久正常执行
            countIndex--//点完后再--
            moveBar.style.transform = `translate(-${countIndex * 1024}px)`
        }


    } else {
    //如果不是左边,那么点击的就是右箭头,正常切换
        if(countIndex === 0) {//切换回第一张,就可以有动画
            moveBar.style.transition = 'transform 0.5s ease-in-out'
        }

        countIndex++
        moveBar.style.transform = `translate(-${countIndex * 1024}px)`
    }
    console.log(countIndex)



//切换小横线______________________
linesArr.forEach((item,index)=>{
    if(index === countIndex){
      item.classList.add('line-index')
    }else{
      item.classList.remove('line-index')
    }
  })


//最后一张的情况
  if(countIndex === linesArr.length){
    linesArr[0].classList.add('line-index')
  }
  
//_________________________________
}



leftArrow.addEventListener('click',arrowHandle)
rightArrow.addEventListener('click',arrowHandle)



// 🌟🌟这个事件让元素直接切换到右边的尽头
moveBar.addEventListener('transitionend', function(e){
    if(countIndex === 4){
        //如果点到头了, 就不要过渡效果,直接切换到第一张
        // html 要加多一张第一张来循环!!!! 
        e.target.style.transition = 'none'
        e.target.style.transform = 'translate(0px)'
        // //因为切成第一张了, 所以是 0 
        countIndex = 0
    }
})
