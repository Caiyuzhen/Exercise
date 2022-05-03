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
                if(partIndex < allPartsArr.length - 1){//当前第几页跟总的页数做比较,判断是否到底了, 🌟 因为到底是 4-1 = 3 个索引位

                    partIndex++
                    console.log(partIndex)

                    allPartsArr.forEach(item => {
                        item.classList.remove('show-layer') //先把所有的都页面给隐藏
                    })


                    allPartsArr[partIndex].classList.add('show-layer') //🍎🍎 再把当前的新页面（因为++了）一张张显示出来
                    allPartsArr[partIndex].classList.remove('away-layer') //🍎🍎 移除往下位移的样式的话，页面就会往上移动！

                }

            }else{//🌟🌟往上滚动
                if(partIndex > 0){

                    allPartsArr[partIndex].classList.add('show-layer') //🍎🍎 移到 10 级
                    allPartsArr[partIndex].classList.add('away-layer') //🍎🍎 添加移动的效果，让页面往下移动

                    partIndex--
                    console.log(partIndex)

                    allPartsArr[partIndex].classList.add('second-layer') //（不过其实不写也可以）把之前那张的层级调低一级, 但还是比其他的高， 因为要把往下翻的那张给准备好

                }
            }

            dotsArr.forEach((item,index)=>{  //改变小圆点的样式
                if (index === partIndex) {
                    item.classList.add('dot-selected')
                }else{
                    item.classList.remove('dot-selected')
                }
            })
                        
            deltaYCount = 0

         },300)

})