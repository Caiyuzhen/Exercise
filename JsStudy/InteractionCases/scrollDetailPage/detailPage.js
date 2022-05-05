const stackArr = [...document.querySelectorAll(".stack-container")]


const deltaBaseY = 50 //因为每一层 Stack 都相差 50px

const targetY = 600 //第最后一个图形的 Y 值, 往后都是 targetY - index * 50px

const delatTotalY = 0 //滚动的总值


const transform = getComputedStyle(stackArr[0]).transform
const matrix = new DOMMatrixReadOnly(stackArr[0])
const baseTranslateY = matrix.m42 



function stackLayerMove(layer,index,targetY) { 
    if(scrollY <= (targetY - deltaBaseY * index)) { //如果滚动的值小于当前层的值

    }
 }

window.addEventListener("scroll",(e)=>{
    stackArr.forEach((item,index)=>{ //给 stack 数组都添加移动的方法
        stackLayerMove(item,index,targetY)
    })
})