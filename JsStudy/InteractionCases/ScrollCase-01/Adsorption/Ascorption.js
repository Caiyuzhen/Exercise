const translateNum = document.querySelector("#translate-num")
const initTranslateNum = document.querySelector("#init-num")
const translateYChange = document.querySelector('#translate-change')
const boxScrollY = document.querySelector("#scroll-box-num")


const refer = document.querySelector(".refer")

const scrollNum = document.querySelector("#scroll-num")
const translateEleInfo = document.querySelector(".scroll-target")


const transform = getComputedStyle(translateEleInfo).transform //获得元素的所有信息
const matrix = new DOMMatrixReadOnly(transform)
const baseTranslateY = matrix.m42 //获得【滚动关系看板】元素的基础值 translateY, m41 是 X  m42 是 Y





// 🌟 第二项：设置元素内 初始translateY 的数据
initTranslateNum.innerText = baseTranslateY

const translateY = baseTranslateY + scrollY

// let preScrollY = 0//🍎获取滚动的差值


// 🌟 第一项：设置元素内 【当前总 translateY】的初始化数据
translateNum.innerText = translateY

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


    //🪐设置元素滚动的值
    const translateY = (baseTranslateY + scrollY*0.85).toFixed(1) //最终的 Y 值 = 基础值+滚动值，然后把数字转化为字符串

    //🪐让元素进行滚动
    translateEleInfo.style.transform = `translateY(${translateY}px)`

    //🌟 第一项：实时改变【滚动关系看板】元素内 【当前 translateY 】的数据
    translateNum.innerText = translateY
    //🌟 第三项：实时改变【滚动关系看板】元素内 【改变值 translateY 】的数据
    translateYChange.innerText = (translateY - baseTranslateY).toFixed(1)//保留小数点后 1 位



})