const contentBox = document.querySelector('.content-box')
const dotArr = [...document.querySelectorAll('.dot')]

let currentIndex = 0
//防止连续滚动连续触发事件
let timeId = 0
let deltaTotal = 0



window.addEventListener('wheel',(e)=>{
    

    deltaTotal+= e.deltaY
    clearTimeout(timeId)

    if(deltaTotal > 1000 || deltaTotal < -1000){
                                
        timeId = setTimeout(()=>{
            if(e.deltaY > 0){
                if(!(currentIndex === contentBox.childElementCount-1)){ //到底
                    currentIndex++
                }  
            }else {
                if(currentIndex !== 0){ //到顶
                    currentIndex--
                }
            }      


            contentBox.style.transform = `translateX(-${currentIndex * 100}vw)`
            deltaTotal = 0

            dotArr.forEach((item,index)=>{
                if(index === currentIndex){
                    item.classList.add('dot-selected')
                }else{
                    item.classList.remove('dot-selected')
                }
            })

            console.log(currentIndex)
        },300)

    }





})


