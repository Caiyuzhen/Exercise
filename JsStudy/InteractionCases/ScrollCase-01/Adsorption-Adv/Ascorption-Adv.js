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