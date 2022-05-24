//蒙层
const coverLayer = document.querySelector('.cover-layer')

const imgArr = [...document.querySelectorAll('img')]
// img.addEventListener('click',()=>{
//         coverLayer.style.backgroundColor = `'transparent' rgba(0,0,0,0.5)`
// })


//遍历图片数组，然后给遍历出来的图片都加上点击事件
imgArr.forEach((item,index)=> {

    if (index < imgArr.length){

        //🔥🔥 点击【图片数组】的每一项，都会触发事件
        item.addEventListener('click',(e)=>{

            coverLayer.style.backgroundColor = 'rgba(0,0,0,0.5)' //出现蒙层



            //🔥🔥🔥 原来的 img 相对于浏览器的位置信息 -> getBoundingClientRect() 方法
            const posInfo = e.currentTarget.getBoundingClientRect()



            //🔥🔥🔥 让图片居中显示(本质是先复制一份图片，再去放大) 🌟 因为事件绑定在 item 上，item 又是遍历出来的，所以用 e.currentTarget / e.target 就都没问题！！
            const cloneImg = e.currentTarget.cloneNode(true) //true 是深克隆，false 是浅克隆

            //🔥🔥 让元素的位置和之前的位置对等(刚好重叠在一块！！）
            cloneImg.style.position = 'absolute'
            cloneImg.style.top = posInfo.top + 'px'
            cloneImg.style.left = posInfo.left + 'px'


            //🚀🚀 添加到蒙层的子级里边！！
            coverLayer.appendChild(cloneImg)


            setTimeout(()=>{
                cloneImg.style.width = `600px`
                cloneImg.style.height = `600px`
            })


        })
    }
})




