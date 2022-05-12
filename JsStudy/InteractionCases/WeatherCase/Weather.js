const sunIcon = document.querySelector('.icon-cloudy-sun');
const cloudyIconBox = document.querySelector('.icon-box-cloudy');
const cloudyIconBigCloud = document.querySelector('.icon-cloudy-big-cloud')
const cloudyIconSmallCloud = document.querySelector('.icon-cloudy-small-cloud')


//设置两个锁！用来判断鼠标是不是移出去了，移出去了的话就不要执行云朵的动画
let cloudyIconBigLock = false
let cloudyIconSmallLock = false




//鼠标移入第一个 icon
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



// ————————————————————————————————————————————————————————————————————


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







