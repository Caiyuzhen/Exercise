const translateNum = document.querySelector("#translate-num")
const initTranslateNum = document.querySelector("#init-num")
const translateYChange = document.querySelector('#translate-change')
const boxScrollY = document.querySelector("#scroll-box-num")


const refer = document.querySelector(".refer")

const scrollNum = document.querySelector("#scroll-num")
const translateEle = document.querySelector(".scroll-target")


const transform = getComputedStyle(translateEle).transform //获得元素的所有信息
const matrix = new DOMMatrixReadOnly(transform)
const baseTranslateY = matrix.m42 //获得【滚动关系看板】元素的基础值 translateY, m41 是 X  m42 是 Y





// 🌟 第二项：设置元素内 初始translateY 的数据
initTranslateNum.innerText = baseTranslateY //=基础值

const translateY = baseTranslateY + scrollY //=总值

// let preScrollY = 0//🍎获取滚动的差值


// 🌟 第一项：设置元素内 【当前总 translateY】的初始化数据
translateNum.innerText = translateY //-100px

// 🌟 第三项：元素内 【改变值 translateY】 的初始化数据
translateYChange.innerText = baseTranslateY - translateY 





window.addEventListener('scroll',(e)=>{
    //🌟 第四项：实时改变页面左上角【文档已滚动距离】的滚动数据
    scrollNum.innerText = scrollY.toFixed(1)

    //🌟 第四项：实时改变【滚动关系看板】元素内【页面滚动】的数据
    boxScrollY.innerText = scrollY.toFixed(1)


    // const deltaScrollY = scrollY - preScrollY //🍎滚动的差值
    // eleTranslateY + deltaScrollY //🍎元素的 translateY + 滚动的差值
    // preScrollY = scrollY //🍎记录上一次的滚动值


//——————————————————————————————————————————————————————————————————————————————————————————————————————————

    //🪐设置元素滚动的滚动值(相等的话则不滚动)
    const translateY = (baseTranslateY + scrollY).toFixed(1) //最终的 Y 值 = 基础值+滚动值，然后把数字转化为字符串
    
    
// // 🚀🚀🚀案例一：让元素到一定阶段就跟着文档一起滚动
    // if(scrollY >= 300){ //大于 300 就跟着滚动

    //     //👇👇👇让值比较稳定,不然有时候直接滚过头然后再暂停的话，会出现一个小小的偏差,因为触发有间隔
    //     translateEle.style.transform = `translateY(${baseTranslateY +300}px)` //最终停止的值为【基础值】+ 300px

        
            //     //🌟 第一项：实时改变【滚动关系看板】元素内 【当前 translateY 】的数据
            //     translateNum.innerText = baseTranslateY + 300

    
    // }else{ //小于 300 就停止, 相当于是小于 300 的时候就一直动，看起来就 【🌟相对静止】
                

    //     translateEle.style.transform = `translateY(${translateY}px)`

            //     //🌟 第一项：实时改变【滚动关系看板】元素内 【当前 translateY 】的数据
            //     translateNum.innerText = translateY

            //     //🌟 第三项：实时改变【滚动关系看板】元素内 【改变值 translateY 】的数据
            //     translateYChange.innerText = (translateY - baseTranslateY).toFixed(1)//保留小数点后 1 位
    // }



//——————————————————————————————————————————————————————————————————————————————————————————————————————————


// // 🚀🚀🚀案例二：让元素先滚动然后到一定阶段再暂停(吸顶)
    if(scrollY >= 200){ //大于 200 就停止,相当于大于 200 的时候就一直在往下动，看起来就 【🌟相对静止】

        const deltaScrollY = scrollY - 200 //滚动多少
        translateEle.style.transform = `translateY(${ baseTranslateY + deltaScrollY }px)` //如何动 = 【基础值】+【差值】，让元素一直在往下动而不是跟随文档滚动

    //🌟 第一项：实时改变【滚动关系看板】元素内 【当前 translateY 】的数据
        translateNum.innerText = baseTranslateY + deltaScrollY

    //🌟 第三项：实时改变【滚动关系看板】元素内 【改变值 translateY 】的数据
        translateYChange.innerText = (deltaScrollY).toFixed(1)//保留小数点后 1 位
    }

})







//——————————————————————————————————————————————————————————————————————————————————————————————————————————


// //🚀文字元素滚动的效果(默认一直移动)
// const moveText = document.querySelector('.moving-text')

// let deltaXMove = 2 //文字差值
// let textXMoveTransX = 0 //文字的位置

//     setInterval(()=>{
//         textXMoveTransX += deltaXMove  //每次都让文字元素移动一下
//         moveText.style.transform = `translateX(${textXMoveTransX}px)`
//     },20)



//——————————————————————————————————————————————————————————————————————————————————————————————————————————



//🚀🚀文字元素滚动的效果(随着鼠标滚动一直加快)
const moveText = document.querySelector('.moving-text')

let deltaXMove = 1 //文字差值
let textXMoveTransX = 0 //文字的滚动值
let preScrollY = 0 //🌟🌟上一次滚动的位置（用于计算滚动的差值）
let timeId = 0 //🍎用来还原差值，不滚动时让速度慢下来



window.addEventListener('scroll',(e)=>{
    deltaXMove = scrollY - preScrollY //🌟🌟滚动的差值(, 把上一次滚动的距离存起来，然后用下一次的减去上一次的就是差值)
    preScrollY = scrollY


    clearTimeout(timeId) //清除定时器,🍎用来还原差值，不滚动时让速度慢下来
    timeId = setTimeout(()=>{ //每个多久执行一次
        deltaXMove = 1//🍎用来还原差值，超过 1s 不滚动的话让速度慢下来
    },100)

})

//一般的写法
// setInterval(()=>{ //每个多久执行一次
//     textXMoveTransX += deltaXMove  //🌟🌟每次都让文字元素移动一下, 就会变成连续滚动的样子
//     moveText.style.transform = `translateX(-${textXMoveTransX}px)`
// },20)

//更好的写法 ， requestAnimationFrame(fn) 每次页面刷新的时候(根据屏幕刷新率），都会执行， 会比 setInterval 更精准
let frameTimeId = 0

function textMoving() { 
    textXMoveTransX += deltaXMove
    moveText.style.transform = `translateX(-${textXMoveTransX}px)`
    frameTimeId = requestAnimationFrame(textMoving)//🌟🌟注意，里边也需要加上整个方法！！,这里每次获取的都是新的 frameTimeId
    // console.log(textXMoveTransX)
}

requestAnimationFrame(textMoving)

//👇取消 requestAnimationFrame(textMoving) 的方法
// cancelAnimationFrame(frameTimeId)





//——————————————————————————————————————————————————————————————————————————————————————————————————————————



//🚀🚀元素在一个区间内变透明的效果

window.addEventListener('scroll',(e)=>{
    if(scrollY >= 200 && scrollY < 300){

        const deltaY = scrollY - 200  //🌟🌟🌟滚动的差值(0~100)
        const opacity = 1 - deltaY / 200 //🌟🌟🌟相当于把滚动的范围转化为透明度的范围！！
        //👇把两组数字转化为相同的单位，比如同时 - 1， 同时除 200
        //1-0.5     0-0.5
        //0-100     0-100  / 200 = 0-0.5 
        translateEle.style.opacity = opacity
    }else if (scrollY <200) {
        translateEle.style.opacity = 1 //到底
    }else{ //>300的情况
        translateEle.style.opacity = 0.5 //到顶
    }

})