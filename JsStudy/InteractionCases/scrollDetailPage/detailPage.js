const stackLayersArr = [...document.querySelectorAll(".stack-layer")]


const deltaBaseY = 50 //因为每一层 Stack 都相差 50px

const targetY = 600 //🌟🌟自定义一个目标值, 滚动距离 < 600px 才触发元素的移动 > 600px 就不移动了

const deltaYTotal = 0 //滚动的总值



window.addEventListener("scroll",(e)=>{

    //执行🍎滚动折叠功能
    stackLayersArr.forEach((item,index)=>{ //给 stack 数组都添加移动的方法
        stackLayerMove(item,index,targetY) //滚动时就执行这个函数
    })

    //执行🍎改变颜色功能
    changeOpacity(startColorChangeY,300,blueTag)
})



//🍎 stack 滚动折叠功能
function stackLayerMove(layer,index,targetY) { 
    if(scrollY <= (targetY - deltaBaseY * index)) { //🌟🌟🌟🌟什么时候动? 如果滚动的值小于 (600 - 当前层的值), deltaBaseY * index 相当于每一个 layer的 基础 translateY 的值! 因为 CSS 那些写的这里是个依次 + 50px 的过程🌟
       layer.style.transform = `translateY(${deltaBaseY * index + scrollY}px)` //🌟🌟🌟🌟动到多少?
    //    console.log(scrollY)
    }else{
        if(scrollY > targetY){
            layer.style.transform = `translateY(${targetY}px)` //🌟🌟🌟🌟如何停? 目标是 < 600px 才触发, 到达 600 后, 让所有元素的相对位置都是 600 看起来就会跟文档一起滚动了
        }
        console.log(scrollY)
    }
 }



//🍎 改变贴纸颜色
const blueTag = document.querySelector('.blue-tag')
const startColorChangeY = 600 //🌟🌟自定义一个贴纸开始改变的目标值
const changeSpan = 300

function changeOpacity(startColorChangeY,changeSpan,targetTag){//changeSpan 为区间, 自己传参数, targetTag 为目标想要改变颜色的标签
    if(scrollY > startColorChangeY){  //scrollY > 600 , 600 为已经滚动过的值

        const deltaY = scrollY - startColorChangeY //获得超过 600px 后继续滚动的差值, (差值 = scrollY - 600), 600 为已经滚动过的值
        if(deltaY > changeSpan){ //如果滚动的差值大于 300px, 就让它的颜色开始改变 ,相当于变化值位于 0 ~ 300 之间
            //透明度:     1 ~ 0       0 ~ 1
            //滚动差值:   0 ~ 300     0~ 300
            opacity = (1 - deltaY / changeSpan).toFixed(2) //changeSpan = 300, 所以相当于 (1 - deltaY / 300)
        }
}}










// // 可以在一定scroll 区间内 实现元素的透明度改变
// // changeOpacity( startColorChangeY,300, blueTag)
// function changeOpacity(startY,changeSpan,target,reverse){
//     if(scrollY  > startY ){ //scrollY > 600
//       const deltaY = scrollY - startY //差值 = X - 600, 600 为已经滚动过的值
      
//       if(deltaY < changeSpan){ //如果滚动超过 600 后, 继续滚动的差值小于 300
//         opacity = (1 -  deltaY / changeSpan).toFixed(2)
       
//       }else{
//         opacity = 0
//       }
      
//     }else{
//       opacity = 1
//     }
//     if(reverse){
//       target.style.opacity = 1 - opacity
//     }else{
//       target.style.opacity = opacity
//     }
    
//   }