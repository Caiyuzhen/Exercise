const stackLayersArr = [...document.querySelectorAll(".stack-layer")]

const deltaBaseY = 50 //因为每一层 Stack 都相差 50px

const targetY = 600 //🌟🌟自定义一个目标值, 滚动距离 < 600px 才触发元素的移动 > 600px 就不移动了

const deltaYTotal = 0 //滚动的总值





//🍎 触发滚动事件 ————————————————————————————————————
window.addEventListener("scroll",(e)=>{

    //执行🍎滚动折叠功能
    stackLayersArr.forEach((item,index)=>{ //给 stack 数组都添加移动的方法
        stackLayerMove(item,index,targetY) //滚动时就执行这个函数
    })

    //执行🍎改变颜色功能
    changeOpacity(startColorChangeY,300,blueTag)


    //🍎 执行改变文字滚动速度功能
    settingSpeed()
})





//🍎 stack 滚动折叠功能 ——————————————————————————————
function stackLayerMove(layer,index,targetY) { 
    if(scrollY <= (targetY - deltaBaseY * index)) { //🌟🌟🌟🌟什么时候动? 如果滚动的值小于 (600 - 当前层的值), deltaBaseY * index 相当于每一个 layer的 基础 translateY 的值! 因为 CSS 那些写的这里是个依次 + 50px 的过程🌟
       layer.style.transform = `translateY(${scrollY + deltaBaseY * index}px)` //🌟🌟🌟🌟动到多少?
    //    console.log(scrollY)
    }else{
        if(scrollY > targetY){
            layer.style.transform = `translateY(${targetY}px)` //🌟🌟🌟🌟如何停? 目标是 < 600px 才触发, 到达 600 后, 让所有元素的相对位置都是 600 看起来就会跟文档一起滚动了
        }
        // console.log(scrollY)
    }
 }



//🍎 改变贴纸颜色 ——————————————————————————————————
const blueTag = document.querySelector('.blue-tag')
const startColorChangeY = 600 //🌟🌟自定义一个贴纸开始改变的目标值
const changeSpan = 300

function changeOpacity(startColorChangeY,changeSpan,targetTag){//changeSpan 为区间, 自己传参数, targetTag 为目标想要改变颜色的标签
    if(scrollY > startColorChangeY) {  //判断 scrollY > 600 , 600 为已经滚动过的值

        let deltaY = scrollY - startColorChangeY //🌟🌟文档滚动超过 600px 后继续向下滚动的差值, (差值 = scrollY - 600), 600 为已经滚动过的值
           
        if(deltaY < changeSpan){ //判断差值：如果滚动的差值在 < 300px 区间, 就让它的颜色开始改变 ,相当于变化值位于 0 ~ 300 之间

            let opacity = (1 - deltaY / changeSpan).toFixed(1) //🌟🌟changeSpan = 300, 所以相当于 (1 - deltaY / 300)
            //透明度:     1 ~ 0       0 ~ 1
            //滚动差值:   0 ~ 300     0~ 300
            targetTag.style.opacity = opacity 
            // console.log(-(targetTag.style.opacity))

        }else{ //判断差值：如果滚动的差值没有 > 300 ， 
            
            targetTag.style.opacity = 0
            // console.log(targetTag.style.opacity)
        }
    }
}




//🍎 改变文字滚动速度 ——————————————————————————————————
const textBox = document.querySelector('.text-box')
const movingText = document.querySelector('.moving-text')
//👇 让文字内容够长
for(let i = 0; i < 200; i++){ //(let i = 0; i < 20; i++)
    const newText = movingText.cloneNode(true)
    textBox.appendChild(newText)
  }



//👇 文字自己能够动起来
let textXMoveTransX = 0 //文字的最终的滚动值
let deltaXMove = 1 //固定的移动值,每次只 移动 1px, 然后再加上差值就是固定移动更远的距离(不过超过 1s 就会慢下来)
let scrollDistance = 0 //记录文档每次滚动产生的差值(这一次对比上一次)
let preScrollY = 0 //记录(上一次)滚动到的值

let resetTimeId = 0 //记录要重置的 timeId


let setTimeId = setInterval(() => { //让文字先能自己移动(基础差值为 1px), 每隔多久执行一次
    textXMoveTransX += deltaXMove //加上基础差值,让元素滚动起来
    textBox.style.transform = `translateX(-${textXMoveTransX}px)`
},10)



//👇 改变文字速度的具体方法
function settingSpeed(){


    scrollDistance = window.scrollY - preScrollY //记录记录文档每次滚动产生的[差值] => [目前滚动到的值] - [上一次的值]
    deltaXMove = Math.abs(scrollDistance) > 1 ? Math.abs(scrollDistance) : 1  //🌟🌟🌟 把差值给到固定的移动值, 判断 [差值] 是否 > 1, > 1 的话就让 [差值] = 移动值, 并且永远为 [正数], 这样就不会反着走了

    preScrollY = window.scrollY //把上一次的滚动值存起来(🌟注意写的位置!是要存给以后用,所以要写在滚动的差值后面)

    console.log(deltaXMove);

    clearTimeout(resetTimeId) //不滚动的话,就清除定时器

    resetTimeId = setTimeout(() => { //每隔 1 s 就让速度慢下来
        deltaXMove = 1 //鼠标不动的话, 那就每隔 1 s 就让速度慢下来
    },100)
    
}








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