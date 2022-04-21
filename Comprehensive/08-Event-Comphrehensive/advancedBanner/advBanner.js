const moveBar = document.querySelector('.img-box-move')
const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')
const lines = document.querySelectorAll('.line')

const linesArr = [...lines]


let countIndex = 0


function arrowHandle(e){
    const isLeft = e.currentTarget.classList.contains('left-arrow')
    if (isLeft) {
        //点击的是左箭头

    } else {
        //那么点击的就是右箭头
        if(countIndex===0) {//👇切换回第一张,就可以有动画
            moveBar.style.transition = 'transform 0.5s ease-in-out'
        }
        countIndex++
        moveBar.style.transform = `translate(-${countIndex * 1024}px)`
    }
    console.log(countIndex)
    
}


leftArrow.addEventListener('click',arrowHandle)
rightArrow.addEventListener('click',arrowHandle)



