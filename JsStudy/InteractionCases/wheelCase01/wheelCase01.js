const contentBox = document.querySelector('.content-box')
const dotsArr = [...document.querySelectorAll('.dot')]


let currentIndex = 0

//防止连续滚动连续触发事件
let timeId = 0 //👈这个逻辑是，一开始 timeId = 0，然后让 timeId = setTimeout 函数， 然后相隔 200s 就去 clear 这个函数

let deltaTotal = 0 //滚动的力道总和





window.addEventListener('wheel',(e)=>{


    deltaTotal+= e.deltaY //🌟滚动的幅度
    clearTimeout(timeId) //🌟每次滚动都重置一下定时器
    

    if(deltaTotal > 1000 || deltaTotal < -1000){ //🌟滚动的幅度大于 1000 或者小于 -1000，就触发滚动事件
    


        timeId = setTimeout(()=>{
            console.log(currentIndex) //🌟看一下滚动的页面对应的计数器
     


            if(e.deltaY > 0){//如果滚动的方向 > 0 ，那么就是往下滚动
                if(!(currentIndex === contentBox.childElementCount-1)){//如果不是滑到底(3)，就每次滚动都让 currentIndex++
                    currentIndex++  ///计数器每次都加 1
                }
            }else{ //如果滚动的方向 < 0 ，那么就是往下滚动
                if(currentIndex !== 0){//如果不是滑到顶，就每次滚动都让 currentIndex--
                    currentIndex--  ///计数器每次都减 1
                }
            }
     


            console.log(currentIndex) //🌟看一下滚动的页面对应的计数器
            // console.log(deltaTotal)//🌟看一下滚动的幅度有多大

            contentBox.style.transform = `translateY(-${currentIndex * 100}vh)` // 前提是先把 css 的高度设置为 100vh, 这样每次滑动就都是整个屏幕的高度
            deltaTotal = 0 //复原滚动的幅度


            dotsArr.forEach((item,index)=>{  //改变小圆点的样式
                if (index === currentIndex) {
                    item.classList.add('.dot-selected')
                }else{
                    item.classList.remove('.dot-selected')
                }
            })
       
         },300)
    }
})