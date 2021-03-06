//ð§© ç¬¬ä¸é¨å
const sunIcon = document.querySelector('.icon-cloudy-sun');
const cloudyIconBox = document.querySelector('.icon-box-cloudy');
const cloudyIconBigCloud = document.querySelector('.icon-cloudy-big-cloud')
const cloudyIconSmallCloud = document.querySelector('.icon-cloudy-small-cloud')


//è®¾ç½®ä¸¤ä¸ªéï¼ç¨æ¥å¤æ­é¼ æ æ¯ä¸æ¯ç§»åºå»äºï¼ç§»åºå»äºçè¯å°±ä¸è¦æ§è¡äºæµçå¨ç»
let cloudyIconBigLock = false
let cloudyIconSmallLock = false



//ð§© ç¬¬äºé¨å
const part2 = document.querySelector('.part2')

//ð é¼ æ ç§»å¥ç¬¬ä¸ä¸ª icon ââââââââââââââââââââââââââââââââââââââââââââââââ
cloudyIconBox.addEventListener('mouseenter',()=>{

    //å¤ªé³æè½¬
    sunIcon.classList.add('sun-rotate')

    cloudyIconBigLock = false
    cloudyIconSmallLock = false

    //ä¸¤æµäºæ¢æ¢ç§»å¨
    cloudyIconBigCloud.classList.add('icon-cloudy-big-cloud-ani')
    cloudyIconSmallCloud.classList.add('icon-cloudy-small-cloud-ani')
})



cloudyIconBox.addEventListener('mouseleave',()=>{
    //é¼ æ ç§»å¼æ¶,è®©ä¸¤ä¸ªéåä¸º true
    cloudyIconBigLock = true
    cloudyIconSmallLock = true
})




//ððå¨ç»å®æåï¼è¿åä¸ºæåçå½¢æï¼
sunIcon.addEventListener('transitionend',(e)=>{ //ðððæè½¬å¨ç»å®æåï¼éç½®æ°æ®ï¼ï¼
    
    // //éç½®å¤ªé³ç§»å¨ææ
    e.currentTarget.style.transition = 'none' //ðä¸ï¼ ï¼åç§»é¤å¨ç»ï¼
    e.currentTarget.classList.remove('sun-rotate') //ðäºï¼ï¼åç§»å¨ç§»å¨çå±æ§ï¼
    
    setTimeout(()=>{ //ðä¸ï¼ï¼æåå¼æ­¥å åå¨ç»ï¼ï¼
        e.target.style.transition = `transform 1.65s ease-in-out` 
    })
})




//ðé¼ æ ç§»èµ°æ¶ï¼è®©ä¸¤ä¸ªäºæµä¸è¦å»ç§»å¨ï¼
cloudyIconBigCloud.addEventListener('animationiteration',(e)=>{ //ðððå¾å³é®ï¼animationiteration è¡¨ç¤ºå¨å¨ç»æ§è¡çè¿ç¨ä¸­äºæµé½ä¼å¨

    if(cloudyIconBigLock){ //mouseleave å°±éä½äº
        // e.target æ¯å©ç¨å­åç´ çåæ³¡æ¥è·ååç´ (æåçæ¯è°ðè§¦åäºè¿ä¸ªäºä»¶æµ-ç®æ åç´ )
        //e.currentTarget æ¯è·åçå®è¢«ç»å®äºä»¶çåç´ 
        e.currentTarget.classList.remove('icon-cloudy-big-cloud-ani')
    }   
})

cloudyIconBigCloud.addEventListener('animationiteration',(e)=>{ //ðððå¾å³é®ï¼animationiteration è¡¨ç¤ºå¨å¨ç»æ§è¡çè¿ç¨ä¸­äºæµé½ä¼å¨

    if(cloudyIconSmallLock){ //mouseleave å°±éä½äº
        e.currentTarget.classList.remove('icon-cloudy-small-cloud-ani')
    }   
})




//ð é¼ æ ç§»å¥ç¬¬äºä¸ª icon ââââââââââââââââââââââââââââââââââââââââââââââââ

const IconSunnyBox = document.querySelector('.icon-box-sunny')
const sunnySmallIcon = document.querySelector('.smaller')
const sunnyBigIcon = document.querySelector('.bigger')


let smallerLock = false
let biggerLock = false


//å¤ªé³ç§»å¨çææ
IconSunnyBox.addEventListener('mouseenter', (e) =>{

    if(!smallerLock && !biggerLock){ //å¿é¡»å¾ä¸é¢ä¸¤ä¸ªé½ãæ§è¡å® transitionend çéç½®ãäºæä¼æ§è¡è¿ä¸ªå¨ç»ï¼ï¼

    smallerLock = true
    biggerLock = true

    sunnySmallIcon.classList.add('fly-out')
    sunnyBigIcon.classList.add('fly-in')

    } 
})




//ððå¨ç»å®æåï¼è¿åä¸ºæåçå½¢æï¼
sunnyBigIcon.addEventListener('transitionend',(e)=>{ 

    biggerLock = false

    e.currentTarget.style.transition = 'none' //ðä¸ï¼åä¸è¦å¨ç»ï¼ï¼ä¸å è¿ä¸ªå¤ªé³å°±ä¼è¿æ¸¡çé£åå»ï¼ï¼ï¼å äºåå°± 0 ç§å°±é£åå»äºï¼ï¼
    e.currentTarget.classList.remove('fly-in')//ðäºï¼åç§»é¤é£å¥çææï¼

    const target = e.currentTarget
    setTimeout(()=>{ //ðä¸ï¼æåå åå¨ç»ææï¼ï¼ï¼
        target.style.transition = 'transform 1.5s ease-in-out'
    })


})


sunnySmallIcon.addEventListener('transitionend',(e)=>{   //å¤ªé³é£èµ°åï¼éç½®å½ä½ï¼ï¼

    smallerLock = false

    e.currentTarget.style.transition = 'none' //ðä¸ï¼åä¸è¦å¨ç»ï¼ï¼ä¸å è¿ä¸ªå¤ªé³å°±ä¼è¿æ¸¡çé£åå»ï¼ï¼ï¼å äºåå°± 0 ç§å°±é£åå»äºï¼ï¼
    e.currentTarget.classList.remove('fly-out')//ðäºï¼åç§»é¤é£å¥çææï¼

    const target = e.currentTarget
    setTimeout(()=>{ //ðä¸ï¼æåå åå¨ç»ææï¼ï¼ï¼
        target.style.transition = 'transform 1.5s ease-in-out'
    })

})




//ð é¼ æ ç§»å¥ç¬¬ä¸ä¸ª icon ââââââââââââââââââââââââââââââââââââââââââââââââ

const RainyBox = document.querySelector('.icon-box-rainy')
const RainyCloud = document.querySelector('.icon-rainy-cloud')
const RainDotArr = [...document.querySelectorAll('.rain')]
const fakeRainyCloud = document.querySelector('.fake-rainy-cloud')
const fakeRain = document.querySelector('.fake-rainy-rain')
let rainLock = false

//ä¸ï¼ððé¼ æ ç§»å¥
RainyBox.addEventListener('mouseenter', (e) =>{

    //ðéååºé¨æ»´ï¼æ·»å å¨ç»

    if(rainLock){ //å¦æä¸º true ç´æ¥è¿åï¼ä¸é¢çä»£ç å°±ä¸ä¼æ§è¡äº
        return
    }

    rainLock = true //é¿åéå¤æ§è¡

    RainDotArr.forEach((item, index) =>{
        if(index > 4){ //ððæé¤æåçé¨ç¹
            return
        }
        if(index === 1 || index === 3 || index === 4){

            item.style.transitionDelay = index*0.05 + 's'
            item.classList.add('raining-ani')
            
        }else if(index === 0){  //ðä¸é¢ä¸¤ä¸ªé¨æ»´æ¢ä¸ç¹ / 1
            item.style.transitionDelay = '0.1s'
            item.classList.add('raining-ani')

        }else if(index === 2){ //ðä¸é¢ä¸¤ä¸ªé¨æ»´æ¢ä¸ç¹ / 2
            item.style.transitionDelay = '0.2s'
            item.classList.add('raining-ani')
        }
        
    })
  
    RainyCloud.classList.add('away-cloud')
    fakeRainyCloud.classList.add('fake-cloud-in')
    fakeRain.classList.add('fake-rain-in')

})

//äºï¼ððç§»å¥çå¨ç»ç»ææ¶ï¼è¦ç»å®âåäºâçå¨ç»ç»æåçé£ä¸æ¶å»ï¼ï¼ï¼
fakeRainyCloud.addEventListener('transitionend', (e) =>{
    rainLock = false

    RainyCloud.style.transition = 'none'
    RainyCloud.classList.remove('away-cloud')
    fakeRainyCloud.style.transition = 'none'
    fakeRainyCloud.classList.remove('fake-cloud-in')
    fakeRain.style.transition = 'none'
    fakeRain.classList.remove('fake-rain-in')

    RainDotArr.forEach((item, index) =>{
        if(index > 4){ //ððæé¤æåçé¨ç¹
            return
        }
        if(index === 1 || index === 3 || index === 4 || index === 2 || index === 0){
            item.style.transition = 'none'
            item.classList.remove('raining-ani')
            
        }
    })

    //ä¸ï¼ðéç½®é¨æ»´çå¨ç»ï¼ï¼å¾å³é®ï¼
    setTimeout(()=>{
 
        fakeRainyCloud.style.transition = 'transform 1s 1.2s ease-in-out'
        RainyCloud.style.transition = 'transform 1.2s ease-in-out'
        fakeRain.style.transition = 'transform 1s 1.2s ease-in-out'
        //ðð é¨æ»´ä¹å åè¿ä¸ªå¨ç»ï¼ï¼
        RainDotArr.forEach((item,index)=>{
            if( index > 4){ //åçé¨ç¹ä¸ç¨å¤çï¼å ä¸ºä¸é¢é½æé¤äº
                return
            }
            item.style.transition = 'transform 0.6s ease-in-out'
        })
    })
})




//ð§© ç¬¬ä¸é¨å

//åºé¨ä¸æ icon ä¾æ¬¡åºç°çææ

const part3Title = document.querySelector('.icons-title')
const iconsGroup = document.querySelector('.icons-group')
const picArr = [...document.querySelectorAll('.pic-icon')]



// 3: cb å½æ°(ä¸ç»ç»åºç°)
function callback(entries){ //entriesæ¯ä¸ªæ°ç»

    entries.forEach(item => {// åéåç¸äº¤æ¯ä¾ï¼ï¼
        if(item.intersectionRatio){ //ððð true å¤æ­æ¯å¦æ¯å¾ç¸äº¤çæ¹åææ§è¡ï¼ï¼å ä¸ºä¸éè¦éå¤ï¼ï¼
            if(item.target.className.includes('title')){//å¤æ­æ¯å¦ä¸º part3Title
                item.target.classList.remove('static-icon-init') //ðððç§»é¤æé»è®¤çéèç¶æï¼å°±ç¸å½äºåºç°äº
            }else if(item.target.className.includes('part4')){
                item.target.classList.remove('part4-init')
            }else{

                const children = [...item.target.children] //ðè¡¨ç¤ºãè¢«ç»å®è§å¯å¨çåç´ ãçå­åç´  (åå«ç¬¬äºé¨åè·ç¬¬ä¸é¨å)
                children.forEach((child,index) => {

                    // ç¬¬äºé¨åç icon
                    if(child.className.includes('ani-icon-init')){

                        child.classList.remove('ani-icon-init')
                        //ðð å¾å³é®ï¼è®©æ¯ä¸ªåç´ ä¾æ¬¡åºç°ï¼ï¼
                        child.style.transitionDelay = index * 0.1 + 's'

                    // ç¬¬ä¸é¨åç icon
                    }else if(child.className.includes('pic-icon')){

                        child.classList.remove('static-icon-init')
                        //ðð å¾å³é®ï¼è®©æ¯ä¸ªåç´ ä¾æ¬¡åºç°ï¼ï¼
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

// 1ï¼åå»ºè§å¯å¨å®ä¾ï¼å¾æ¾å¨ä¸é¢ï¼ï¼
const obEle = new IntersectionObserver(callback,options)


// 2: è§å¯åç´ (ç¨çåä¸ä¸ªè§å¯å¨)
obEle.observe(iconsGroup.firstElementChild) //ðçå¬æ´ç»åç´ çå­åç´ ï¼å ä¸ºä¼å¨æåå»º
obEle.observe(part3Title)
obEle.observe(part2)





//å¨æå»æ¹éåå»ºææå©ä½åç´ ððð
// ðåè®¾ç½®ä¸ä¸ªç©ºçè¡ï¼ç¨æ¥æ¿æ¥æ°åå»ºçåç´ 
let lineDiv = null

for(let i = 6; i < 26; i++){//ä»ç¬¬å­ä¸ªå¼å§åå»º

    if(i % 5 === 1){  //ðð åä½è¿ç®ï¼å½ i é¤ä»¥ 5 ä½ 1 ï¼æ¯å¦ 6 / 5 ä½ä¸ 1, é£ä¹å°±æ¯å°äºç¬¬äºè¡ï¼æä»¥éè¦åå»ºä¸ä¸ª divLine æ¥æ¿è½½éååºæ¥çåç´ ,æ¯ 5 ä¸ªå°±å ä¸ä¸ªç¶çº§
        //ä¸ðï¼ åå»ºåç´ ç»
        lineDiv = document.createElement('div')
        lineDiv.classList.add('icons-line') //æ°åç´ å ä¸ä¸æ ·çç±»å
        //ææ°åå»ºçè¿ä¸è¡å å¥ååç line Group å
        iconsGroup.appendChild(lineDiv)
        
        //è§å¯æ°åå»ºçè¿ä¸è¡
        obEle.observe(lineDiv)
    }

    //äºðï¼åå»ºæ°çåç´ ï¼æ¾å°ç»å
    let div = document.createElement('div')
    div.classList.add('pic-icon','static-icon-init') //æ°åç´ å ä¸ä¸æ ·çç±»å
    div.style.backgroundImage = `url('./src/Icon${i}.png')`
    lineDiv.appendChild(div) //æ°å»ºä¸ä¸ªå°±æ¾å¥ä¸æ¹

}



//ð æåä¸é¨å
const part4 = document.querySelector('.part4')

// è§å¯åç´ (ç¨çåä¸ä¸ªè§å¯å¨)
obEle.observe(part4)

const sun = document.querySelector('.title-sun')

//è·åå¤ªé³çåºç¡ä½ç½®
const baseSunTranslateX = getComputedStyle(sun).transform
const matrix = new DOMMatrixReadOnly(baseSunTranslateX)
const baseTransX = matrix.m41 //-32px

//åæ³ä¸ï¼
// let targetY = 2000         //å¼å§çå¬çè·ç¦»
// let changeSpan = 300        //ååçèå´
// // let deltaTotalY         //è®°å½æ»å¨çå·®å¼
// // let baseTransX          //å¤ªé³çåå§ x ä½ç½®
// let sunFinalTransX = 0      //è®°å½å¤ªé³æç»çæ»å¨å¼

// function TransX(targetY,targetDOM){

//     let deltaTotalY = scrollY - targetY   //å·®å¼
//     let sunFinalTransX = (-(1 - deltaTotalY / changeSpan)*2.8) * baseTransX

//     if(scrollY >= targetY){  
//         targetDOM.style.transform = `translateX(${sunFinalTransX}px)` 
//     }
// }

// window.addEventListener('scroll',(e)=>{
//     console.log(scrollY)
//     TransX(targetY,sun)
// })


// åæ³äºï¼
// maxScrollHeight          ðè·å scroll Y è½æ»å¨çæå¤§é«åº¦ï¼2300pxï¼
// deltaY                   è®°å½æ»å¨çå·®å¼
// target                   ðçå¬å¼,å ä¸ºå·²ç»ç®åºäº ãðscrollY çæå¤§å¼ãï¼æä»¥åååå»èå´å¼ï¼æ¯å¦200ï¼çè¯å°±æ¯ ãðtarget ç®æ çå¬ä½ç½®ã
// sunFinalTransX           è®°å½å¤ªé³æç»ç X ä½ç½®

const maxScrollHeight = document.documentElement.scrollHeight - window.innerHeight

window.addEventListener('scroll',(e)=>{    
    
    let sunFinalTransX = baseTransX//ä¸å¼å§çè¯ï¼å¤ªé³çæç»ä½ç½® = åå§ä½ç½®ä¸º -32px
    let target = maxScrollHeight - 180 //ððçå¬å¼ç­äº ãScroll æå¤§å¼ã - ãèå´å¼ãï¼ï¼ï¼ç¸å½äºä» target è¿ä¸ªç¹å¼å§ è®¡ç® scroll è¶åºå®ä¹åçå¼ï¼ï¼


    if(scrollY >= maxScrollHeight - 180){    //ðð å¨å³å°å°è¾¾åºé¨ç 200px èå´åå¼å§çå¬ååäºå¤å°ï¼å¹¶ä¸è¿è¡ç¸åºçå¤ªé³æ¨ªåæ»å¨äº¤äº

        let deltaY = scrollY - target  //æ¬è´¨é½æ¯ãå·®å¼ã = ãæ»å¨å¼ã-ãçå¬å¼ã

        sunFinalTransX = baseTransX + deltaY   //è®°å½å¤ªé³æç»çæ»å¨å¼ = åºç¡å¼ + å·®å¼
        
        sun.style.transform = `translateX(${sunFinalTransX}px)`
        // console.log('sun çæç»ä½ç½®' + sunFinalTransX);
    }
})

//ååè§å¾
//30 - 120   0 - 90    0 - 90  åç´  X
//0 - 300    0 - 300   0 - 90  å¼å§çå¬çèå´(ç¸å½äº target ä¹åçæ»å¨å¼)
//å·¦ä¸
//      å³ä¸
//å³ä¸åå·¦ä¸ä¸º X0.3 å + 30
//å·¦ä¸åå³ä¸ä¸º (- 30) å Ã· 0.3