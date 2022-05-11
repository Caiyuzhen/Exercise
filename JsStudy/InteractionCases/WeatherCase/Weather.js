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





//🌟🌟动画完成后，还原为最初的形态！
sunIcon.addEventListener('transitionend',(e)=>{ //🌟🌟🌟旋转动画完成后，重置数据！！
    
    //重置太阳移动效果
    e.currentTarget.style.transition = 'none'; //🌟🌟🌟让它不会一直动！！配合下面的重置一起使用！！
    e.currentTarget.classList.remove('sun-rotate')
    
    setTimeout(()=>{ //🌟🌟🌟，重置动画效果！动完后又能动！！
        e.target.style.transition = `transform 1.65s ease-in-out` 
    })

})




cloudyIconBox.addEventListener('mouseleave',()=>{
    //鼠标移开时,让两个锁变为 true
    cloudyIconBigLock = true
    cloudyIconSmallLock = true
})



//🌟🌟动画运行时，让两个锁
cloudyIconBigCloud.addEventListener('animationiteration',(e)=>{ //🌟🌟🌟很关键，animationiteration 表示在动画执行的过程中云朵都会动
    while(cloudyIconBigLock){ 
        // e.target 是利用子元素的冒泡来获取元素(指向的是谁🌟触发了这个事件流-目标元素)
        //e.currentTarget 是获取真实被绑定事件的元素
        e.currentTarget.classList.remove('icon-cloudy-big-cloud-ani')
    } 
    while(cloudyIconSmallLock){
        e.currentTarget.classList.remove('icon-cloudy-small-cloud-ani')
    }
     
})








