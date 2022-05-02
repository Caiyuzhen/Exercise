const allPartsArr = [...document.querySelectorAll('.content')]
const dotsArr = [...document.querySelectorAll('.dot')]


let partIndex = 0 //用来判断是第几页

//防止连续滚动连续触发事件
let timeId = 0 //👈这个逻辑是，一开始 timeId = 0，然后让 timeId = setTimeout 函数， 然后相隔 200s 就去 clear 这个函数

let deltaYCount = 0 //滚动的力道总和





window.addEventListener('wheel',(e)=>{


    deltaYCount += e.deltaY //🌟滚动的幅度

    clearTimeout(timeId) //🌟每次滚动都重置一下定时器

        timeId = setTimeout(()=>{
     
            if(!(deltaYCount > 1000 || deltaYCount < -1000)){ //🌟滚动的幅度在区间内，就停止触发滚动事件
                return
            }

            if(deltaYCount > 0){//🌟🌟往下滚动
                if(partIndex < allPartsArr.length - 1){//当前第几页跟总的页数做比较,判断是否到底了
                    partIndex++
                    allPartsArr.forEach(item => {
                        item.classList.remove('show-layer') //先把所有的都页面给隐藏
                    })
                    allPartsArr[partIndex].classList.add('show-layer') //再把当前的页面一张张显示出来
                    allPartsArr[partIndex].classList.remove('away-layer')

                }
            }


            dotsArr.forEach((item,index)=>{  //改变小圆点的样式
                if (index === deltaYCount) {
                    item.classList.add('.dot-selected')
                }else{
                    item.classList.remove('.dot-selected')
                }
            })
       
         },300)

})