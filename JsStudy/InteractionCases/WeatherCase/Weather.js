//🧩 第一部分
const sunIcon = document.querySelector('.icon-cloudy-sun');
const cloudyIconBox = document.querySelector('.icon-box-cloudy');
const cloudyIconBigCloud = document.querySelector('.icon-cloudy-big-cloud')
const cloudyIconSmallCloud = document.querySelector('.icon-cloudy-small-cloud')


//设置两个锁！用来判断鼠标是不是移出去了，移出去了的话就不要执行云朵的动画
let cloudyIconBigLock = false
let cloudyIconSmallLock = false



//🧩 第二部分
const part2 = document.querySelector('.part2')

//🌞 鼠标移入第一个 icon ————————————————————————————————————————————————
cloudyIconBox.addEventListener('mouseenter',()=>{

    //太阳旋转
    sunIcon.classList.add('sun-rotate')

    cloudyIconBigLock = false
    cloudyIconSmallLock = false

    //两朵云慢慢移动
    cloudyIconBigCloud.classList.add('icon-cloudy-big-cloud-ani')
    cloudyIconSmallCloud.classList.add('icon-cloudy-small-cloud-ani')
})



cloudyIconBox.addEventListener('mouseleave',()=>{
    //鼠标移开时,让两个锁变为 true
    cloudyIconBigLock = true
    cloudyIconSmallLock = true
})




//🌟🌟动画完成后，还原为最初的形态！
sunIcon.addEventListener('transitionend',(e)=>{ //🌟🌟🌟旋转动画完成后，重置数据！！
    
    // //重置太阳移动效果
    e.currentTarget.style.transition = 'none' //🍔一： （先移除动画）
    e.currentTarget.classList.remove('sun-rotate') //🍔二：（再移动移动的属性）
    
    setTimeout(()=>{ //🍔三：（最后异步加回动画！）
        e.target.style.transition = `transform 1.65s ease-in-out` 
    })
})




//🌟鼠标移走时，让两个云朵不要去移动！
cloudyIconBigCloud.addEventListener('animationiteration',(e)=>{ //🌟🌟🌟很关键，animationiteration 表示在动画执行的过程中云朵都会动

    if(cloudyIconBigLock){ //mouseleave 就锁住了
        // e.target 是利用子元素的冒泡来获取元素(指向的是谁🌟触发了这个事件流-目标元素)
        //e.currentTarget 是获取真实被绑定事件的元素
        e.currentTarget.classList.remove('icon-cloudy-big-cloud-ani')
    }   
})

cloudyIconBigCloud.addEventListener('animationiteration',(e)=>{ //🌟🌟🌟很关键，animationiteration 表示在动画执行的过程中云朵都会动

    if(cloudyIconSmallLock){ //mouseleave 就锁住了
        e.currentTarget.classList.remove('icon-cloudy-small-cloud-ani')
    }   
})




//🌞 鼠标移入第二个 icon ————————————————————————————————————————————————

const IconSunnyBox = document.querySelector('.icon-box-sunny')
const sunnySmallIcon = document.querySelector('.smaller')
const sunnyBigIcon = document.querySelector('.bigger')


let smallerLock = false
let biggerLock = false


//太阳移动的效果
IconSunnyBox.addEventListener('mouseenter', (e) =>{

    if(!smallerLock && !biggerLock){ //必须得下面两个都【执行完 transitionend 的重置】了才会执行这个动画！！

    smallerLock = true
    biggerLock = true

    sunnySmallIcon.classList.add('fly-out')
    sunnyBigIcon.classList.add('fly-in')

    } 
})




//🌟🌟动画完成后，还原为最初的形态！
sunnyBigIcon.addEventListener('transitionend',(e)=>{ 

    biggerLock = false

    e.currentTarget.style.transition = 'none' //🍔一（先不要动画）：不加这个太阳就会过渡的飞回去！！！加了后就 0 秒就飞回去了！！
    e.currentTarget.classList.remove('fly-in')//🍔二（再移除飞入的效果）

    const target = e.currentTarget
    setTimeout(()=>{ //🍔三（最后加回动画效果！！）
        target.style.transition = 'transform 1.5s ease-in-out'
    })


})


sunnySmallIcon.addEventListener('transitionend',(e)=>{   //太阳飞走后，重置归位！！

    smallerLock = false

    e.currentTarget.style.transition = 'none' //🍔一（先不要动画）：不加这个太阳就会过渡的飞回去！！！加了后就 0 秒就飞回去了！！
    e.currentTarget.classList.remove('fly-out')//🍔二（再移除飞入的效果）

    const target = e.currentTarget
    setTimeout(()=>{ //🍔三（最后加回动画效果！！）
        target.style.transition = 'transform 1.5s ease-in-out'
    })

})




//🌞 鼠标移入第三个 icon ————————————————————————————————————————————————

const RainyBox = document.querySelector('.icon-box-rainy')
const RainyCloud = document.querySelector('.icon-rainy-cloud')
const RainDotArr = [...document.querySelectorAll('.rain')]
const fakeRainyCloud = document.querySelector('.fake-rainy-cloud')
const fakeRain = document.querySelector('.fake-rainy-rain')
let rainLock = false

//一：🌟🌟鼠标移入
RainyBox.addEventListener('mouseenter', (e) =>{

    //🌟遍历出雨滴，添加动画

    if(rainLock){ //如果为 true 直接返回，下面的代码就不会执行了
        return
    }

    rainLock = true //避免重复执行

    RainDotArr.forEach((item, index) =>{
        if(index > 4){ //🌟🌟排除掉假的雨点
            return
        }
        if(index === 1 || index === 3 || index === 4){

            item.style.transitionDelay = index*0.05 + 's'
            item.classList.add('raining-ani')
            
        }else if(index === 0){  //🌟上面两个雨滴慢一点 / 1
            item.style.transitionDelay = '0.1s'
            item.classList.add('raining-ani')

        }else if(index === 2){ //🌟上面两个雨滴慢一点 / 2
            item.style.transitionDelay = '0.2s'
            item.classList.add('raining-ani')
        }
        
    })
  
    RainyCloud.classList.add('away-cloud')
    fakeRainyCloud.classList.add('fake-cloud-in')
    fakeRain.classList.add('fake-rain-in')

})

//二：🌟🌟移入的动画结束时（要绑定‘假云’的动画结束后的那一时刻！！）
fakeRainyCloud.addEventListener('transitionend', (e) =>{
    rainLock = false

    RainyCloud.style.transition = 'none'
    RainyCloud.classList.remove('away-cloud')
    fakeRainyCloud.style.transition = 'none'
    fakeRainyCloud.classList.remove('fake-cloud-in')
    fakeRain.style.transition = 'none'
    fakeRain.classList.remove('fake-rain-in')

    RainDotArr.forEach((item, index) =>{
        if(index > 4){ //🌟🌟排除掉假的雨点
            return
        }
        if(index === 1 || index === 3 || index === 4 || index === 2 || index === 0){
            item.style.transition = 'none'
            item.classList.remove('raining-ani')
            
        }
    })

    //三：🌟重置雨滴的动画！！很关键！
    setTimeout(()=>{
 
        fakeRainyCloud.style.transition = 'transform 1s 1.2s ease-in-out'
        RainyCloud.style.transition = 'transform 1.2s ease-in-out'
        fakeRain.style.transition = 'transform 1s 1.2s ease-in-out'
        //🌟🌟 雨滴也加回这个动画！！
        RainDotArr.forEach((item,index)=>{
            if( index > 4){ //假的雨点不用处理，因为上面都排除了
                return
            }
            item.style.transition = 'transform 0.6s ease-in-out'
        })
    })
})




//🧩 第三部分

//底部一排 icon 依次出现的效果

const part3Title = document.querySelector('.icons-title')
const iconsGroup = document.querySelector('.icons-group')
const picArr = [...document.querySelectorAll('.pic-icon')]



// 3: cb 函数(一组组出现)
function callback(entries){ //entries是个数组

    entries.forEach(item => {// 先遍历相交比例！！
        if(item.intersectionRatio){ //🚀🚀🚀 true 判断是否是往相交的方向才执行！！因为不需要重复！！
            if(item.target.className.includes('title')){//判断是否为 part3Title
                item.target.classList.remove('static-icon-init') //🚀🚀🚀移除掉默认的隐藏状态，就相当于出现了
            }else if(item.target.className.includes('part4')){
                item.target.classList.remove('part4-init')
            }else{

                const children = [...item.target.children] //🌟表示【被绑定观察器的元素】的子元素 (包含第二部分跟第三部分)
                children.forEach((child,index) => {

                    // 第二部分的 icon
                    if(child.className.includes('ani-icon-init')){

                        child.classList.remove('ani-icon-init')
                        //👇🍎 很关键，让每个元素依次出现！！
                        child.style.transitionDelay = index * 0.1 + 's'

                    // 第三部分的 icon
                    }else if(child.className.includes('pic-icon')){

                        child.classList.remove('static-icon-init')
                        //👇🍎 很关键，让每个元素依次出现！！
                        child.style.transitionDelay = index * 0.2 + 's'
                    }
                })
                
            }
        }
    })

}

const options = {
    rootMargin:'0px',
    threshold:[0.5]
}

// 1：创建观察器实例（得放在下面！）
const obEle = new IntersectionObserver(callback,options)


// 2: 观察元素(用的同一个观察器)
obEle.observe(iconsGroup.firstElementChild) //🌟监听整组元素的子元素！因为会动态创建
obEle.observe(part3Title)
obEle.observe(part2)





//动态去批量创建所有剩余元素🌟🌟🚀
// 👇先设置一个空的行，用来承接新创建的元素
let lineDiv = null

for(let i = 6; i < 26; i++){//从第六个开始创建

    if(i % 5 === 1){  //🚀🚀 取余运算，当 i 除以 5 余 1 ，比如 6 / 5 余下 1, 那么就是到了第二行，所以需要创建一个 divLine 来承载遍历出来的元素,每 5 个就加一个父级
        //一🍎： 创建元素组
        lineDiv = document.createElement('div')
        lineDiv.classList.add('icons-line') //新元素加上一样的类名
        //把新创建的这一行加入原先的 line Group 内
        iconsGroup.appendChild(lineDiv)
        
        //观察新创建的这一行
        obEle.observe(lineDiv)
    }

    //二🍎：创建新的元素，放到组内
    let div = document.createElement('div')
    div.classList.add('pic-icon','static-icon-init') //新元素加上一样的类名
    div.style.backgroundImage = `url('./src/Icon${i}.png')`
    lineDiv.appendChild(div) //新建一个就放入一批

}



//💠最后一部分
const part4 = document.querySelector('.part4')

// 观察元素(用的同一个观察器)
obEle.observe(part4)

const sun = document.querySelector('.title-sun')

//获取太阳的基础位置
const baseSunTranslateX = getComputedStyle(sun).transform
const matrix = new DOMMatrixReadOnly(baseSunTranslateX)
const baseTransX = matrix.m41 //-32px

//写法一：
// let targetY = 2000         //开始监听的距离
// let changeSpan = 300        //变化的范围
// // let deltaTotalY         //记录滚动的差值
// // let baseTransX          //太阳的初始 x 位置
// let sunFinalTransX = 0      //记录太阳最终的滚动值

// function TransX(targetY,targetDOM){

//     let deltaTotalY = scrollY - targetY   //差值
//     let sunFinalTransX = (-(1 - deltaTotalY / changeSpan)*2.8) * baseTransX

//     if(scrollY >= targetY){  
//         targetDOM.style.transform = `translateX(${sunFinalTransX}px)` 
//     }
// }

// window.addEventListener('scroll',(e)=>{
//     console.log(scrollY)
//     TransX(targetY,sun)
// })


// 写法二：
// maxScrollHeight          🍎获取 scroll Y 能滚动的最大高度（2300px）
// deltaY                   记录滚动的差值
// target                   🍎监听值,因为已经算出了 【🍎scrollY 的最大值】，所以反向减去范围值（比如200）的话就是 【🍎target 目标监听位置】
// sunFinalTransX           记录太阳最终的 X 位置

const maxScrollHeight = document.documentElement.scrollHeight - window.innerHeight

window.addEventListener('scroll',(e)=>{    
    
    let sunFinalTransX = baseTransX//一开始的话，太阳的最终位置 = 初始位置为 -32px
    let target = maxScrollHeight - 180 //🍎🍎监听值等于 【Scroll 最大值】 - 【范围值】！！，相当于从 target 这个点开始 计算 scroll 超出它之后的值！！


    if(scrollY >= maxScrollHeight - 180){    //🌟🍎 在即将到达底部的 200px 范围内开始监听变化了多少！并且进行相应的太阳横向滚动交互

        let deltaY = scrollY - target  //本质都是【差值】 = 【滚动值】-【监听值】

        sunFinalTransX = baseTransX + deltaY   //记录太阳最终的滚动值 = 基础值 + 差值
        
        sun.style.transform = `translateX(${sunFinalTransX}px)`
        // console.log('sun 的最终位置' + sunFinalTransX);
    }
})

//变化规律
//30 - 120   0 - 90    0 - 90  元素 X
//0 - 300    0 - 300   0 - 90  开始监听的范围(相当于 target 之后的滚动值)
//左上
//      右下
//右下变左上为 X0.3 再 + 30
//左上变右下为 (- 30) 再 ÷ 0.3