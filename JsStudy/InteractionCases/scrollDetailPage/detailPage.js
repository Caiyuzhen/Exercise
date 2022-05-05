const stackArr = [...document.querySelectorAll(".stack-container")]


const deltaBaseY = 50 //因为每一层 Stack 都相差 50px

const targetY = 600 //从 600 px 开始变化

const delatTotalY = 0 //滚动的总值


function stackLayerMove(layer,index,targetY) { 
    if(scrollY <= (targetY - deltaBaseY * index)) { //如果滚动的值小于当前层的值

    }
 }

window.addEventListener("scroll",(e)=>{
    stackArr.forEach((item,index)=>{ //给 stack 数组都添加移动的方法
        stackLayerMove(item,index,targetY)
    })
})