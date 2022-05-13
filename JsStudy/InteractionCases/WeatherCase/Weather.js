const sunIcon = document.querySelector('.icon-cloudy-sun');
const cloudyIconBox = document.querySelector('.icon-box-cloudy');
const cloudyIconBigCloud = document.querySelector('.icon-cloudy-big-cloud')
const cloudyIconSmallCloud = document.querySelector('.icon-cloudy-small-cloud')


//设置两个锁！用来判断鼠标是不是移出去了，移出去了的话就不要执行云朵的动画
let cloudyIconBigLock = false
let cloudyIconSmallLock = false




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
    
    setTimeout(()=>{ //🍔三： （最后加回动画！）
        e.target.style.transition = `transform 1.65s ease-in-out` 

    })
})




//🌟🌟动画运行时，让两个云朵不能移动！
cloudyIconBigCloud.addEventListener('animationiteration',(e)=>{ //🌟🌟🌟很关键，animationiteration 表示在动画执行的过程中云朵都会动
    if(cloudyIconBigLock){ 
        // e.target 是利用子元素的冒泡来获取元素(指向的是谁🌟触发了这个事件流-目标元素)
        //e.currentTarget 是获取真实被绑定事件的元素
        e.currentTarget.classList.remove('icon-cloudy-big-cloud-ani')
    } 
     
})

cloudyIconBigCloud.addEventListener('animationiteration',(e)=>{ //🌟🌟🌟很关键，animationiteration 表示在动画执行的过程中云朵都会动

    if(cloudyIconSmallLock){
        e.currentTarget.classList.remove('icon-cloudy-small-cloud-ani')
    }
     
})



//🌞 鼠标移入第二个 icon ————————————————————————————————————————————————


const IconSunnyBox = document.querySelector('.icon-box-sunny')
const sunnySmallIcon = document.querySelector('.smaller')
const sunnyBigIcon = document.querySelector('.bigger')


let smallerLock = false
let biggerLock = false



//太阳飞入+飞走
IconSunnyBox.addEventListener('mouseenter', (e) =>{

    if(!smallerLock && !biggerLock){ //必须得下面两个都执行完重置了才会执行这个动画！！

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
            
        }else if(index === 0){  //🌟上面两个雨滴慢一点
            item.style.transitionDelay = '0.1s'
            item.classList.add('raining-ani')

        }else if(index === 2){ //🌟上面两个雨滴慢一点
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

