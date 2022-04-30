//被点击的元素没有子元素，所以可以用事件委托机制，给父元素绑定事件
//offsetLeft 可以获得元素相对于父元素的距离
const navBar = document.querySelector('.nav-bar')
const bgWhite = document.querySelector('.title-bg')
//👇转化为数组
const titlesArr = [...document.querySelectorAll('.title')]


const imgsArr = [...document.querySelectorAll('.img-box')]


//👇色块元素的基础距离
const baseX = 20
const baseY = 10


navBar.addEventListener('click', (e) => {
    if(e.target.classList.contains('title')){ //判断一下点击的是 tab 标题 才会切换，避免说点到 tab 间隙也会切换

        //👇改变色块元素的位置 console.log(e.target.offsetLeft)//e.target -> 事件委托来获取点击的元素
        bgWhite.style.transform = `translate(${baseX + e.target.offsetLeft}px, ${baseY}px)` //🌟🌟初始距离 + 点击后增加的距离


        //👇改变标题颜色
        titlesArr.forEach(item => { //一、先把所有的标题都改为灰色
            item.classList.remove('title-selected')
        })
       e.target.classList.add('title-selected')//二、把选中的标题改为黑色
       

        //👇👇改变图片,需要对比类名！先取得类名再来对比！
        const weatherName = e.target.className.split(' ')[1].split('-')[0] //🌟🌟分解出元素的所有类名
        // console.log(weatherName) //title cloudy-title title-selected
        // console.log(weatherName.split(' ')) //['title', 'cloudy-title', 'title-selected']
        // console.log(weatherName.split(' ')[1]) //cloudy-title  👈相当于取第二个
        // console.log(weatherName.split(' ')[1].split('-')) // ['cloudy', 'title'] 👈相当于从把 - 前后分割为两个单词！
        // console.log(weatherName.split(' ')[1].split('-')[0]) // cloudy

        imgsArr.forEach((item) => { 
            // console.log(item.className.includes(weatherName))//可以看出哪一个元素包含了被点击的类名
            if(item.className.includes(weatherName)){
                // setTimeout(()=>{
                //     item.classList.add('img-selected')
                //     item.style.transform = `translate(0px,0px)`           
                // })
                item.classList.add('img-selected')
                item.style.transform = `translate(0px,0px)`  

            }else{
                item.classList.remove('img-selected') 
                item.style.transform = `translate(0px,80px)`
            }
        })
        
    }
})