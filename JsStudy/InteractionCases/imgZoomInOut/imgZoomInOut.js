
const coverLayer = document.querySelector('.cover-layer')
const imgArr = [...document.querySelectorAll('img')] //获取一组图片


let baseImgCloneInfo = {}  //🌋🌋🌋 第 A 步：用于【记录克隆出来的元素】的信息(left、top、img)
let isShow = false //表示当前元素是否被克隆了，用来判断要不要移除克隆元素
let cloneImg = null //用来【承接克隆的元素】




//点击放大图片的基础事件
function handleClickImg(e) {

        isShow = true

    //🔥🔥 点击【图片数组】的每一项，都会触发事件

        //第一步：克隆一份图片
        //👇👇👇 获取【原来的 img 元素 】相对于浏览器的位置信息 -> getBoundingClientRect() 方法
        const elePosInfo = e.currentTarget.getBoundingClientRect()


        //🔥🔥🔥 让图片居中显示(本质是先复制一份图片，再去放大) 🌟 因为事件绑定在 item 上，item 又是遍历出来的，所以用 e.currentTarget / e.target 就都没问题！！
        cloneImg = e.currentTarget.cloneNode(true) //true 是深克隆，false 是浅克隆


        //🔥🔥🔥 让元素的位置和之前的位置对等(刚好重叠在一块！！）
        cloneImg.style.position = 'absolute'
        cloneImg.style.top = elePosInfo.top + 'px'
        cloneImg.style.left = elePosInfo.left + 'px'


        //🌋🌋🌋 第 B 步：存储 { } 的位置信息记录【克隆元素】的【初始位置信息】跟【深克隆出来的图片索引】！！跟下面其实是一样的，只是为了记录一下，可以公用
        baseImgCloneInfo.img = cloneImg
        baseImgCloneInfo.top =  elePosInfo.top
        baseImgCloneInfo.left =  elePosInfo.left


        //🚀🚀 把克隆出来的元素添加到蒙层的子级里边！！
        coverLayer.appendChild(cloneImg)





        //第二步：把图片放大并居中显示
        //定义浏览器到的【显示宽度】跟【高度】
        const screenWidth = window.innerWidth / 2
        const screenHeight = window.innerHeight / 2


        //🌟🌟🌟 点击后改变图片的大小
        setTimeout(()=>{
            cloneImg.style.width = `600px`
            cloneImg.style.height = `600px` //注意，元素不是等比的话，高度需要算一下

            //🌋🌋 让元素保持水平跟垂直居中的算法：浏览器视窗宽或高的 1/2 - 元素宽或高的 1/2 
            cloneImg.style.left = screenWidth - 300 + 'px'
            cloneImg.style.top = screenHeight - 300 + 'px'
        },10)


        coverLayer.style.backgroundColor = 'rgba(0,0,0,0.5)' //出现蒙层
        coverLayer.style.pointerEvents =  'auto' //🌟🌟🌟 还原让蒙层变为可点击状态
        document.body.style.overflow = 'hidden' //🔥蒙层状态下让背景不可滚动


        // console.log(baseImgCloneInfo.img);
}



//遍历图片数组，然后给遍历出来的图片都加上【点击事件跟对应的方法】
imgArr.forEach((item,index)=> {

    if (index < imgArr.length){

        item.addEventListener('click',handleClickImg) //👈👈👈 给每一项添加事件方法
       
    }
})









coverLayer.addEventListener('click',(e)=>{ //点击蒙层的时候，让它可以触发事件

    //🚀🚀🚀 要判断下，点击的是【遮罩层】，而不是【图片】
    if(e.target.classList.contains('cover-layer')){
        
        // console.log('ok')
        e.target.style.backgroundColor = 'rgba(0,0,0,0)' //隐藏蒙层
        coverLayer.style.pointerEvents =  'none' //让蒙层还原为不可点击状态


        //🌋🌋🌋 第 C步：还原【克隆图片】到最初的位置
        baseImgCloneInfo.img.style.width = '200px' //原来的宽是 200
        baseImgCloneInfo.img.style.height = '200px' //原来的高是 200
        baseImgCloneInfo.img.style.top = baseImgCloneInfo.top + 'px' //提上面 { } 对象中记录的【克隆元素】的【基础位置】
        baseImgCloneInfo.img.style.left = baseImgCloneInfo.left + 'px' //提上面 { } 对象中记录的【克隆元素】的【基础位置】

        // //写法一：销毁掉克隆出来的图片
        //     baseImgCloneInfo.img.remove()
        //     document.body.style.overflow = 'auto' //🔥让背景可以滚动
        // },350)
    


        // //写法二：销毁掉克隆出来的图片
        cloneImg.addEventListener('transitionend',(e)=>{//动画结束后
            
            if(isShow){
                cloneImg.remove()
                cloneImg = null
                isShow = false
                document.body.style.overflow = 'auto' //🔥让背景可以滚动

            }
        })
    }
})



