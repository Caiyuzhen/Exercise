const moveBar = document.querySelector('.img-box-move')
const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')


const lines = document.querySelectorAll('.line')
const linesArr = [...lines]


let countIndex = 0


function arrowHandle(e){


    const isLeft = e.currentTarget.classList.contains('left-arrow')//返回 true / false

    if (isLeft) {


    } else {
        //点了右箭头
        countIndex++
        moveBar.style.transform = `translate(-${countIndex * 1024}px)`
    }


    
    // moveBar.style.transform = `translate(-${countIndex * 1024}px)`
    
}



leftArrow.addEventListener('click',arrowHandle)
rightArrow.addEventListener('click',arrowHandle)