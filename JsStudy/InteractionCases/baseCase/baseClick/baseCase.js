const h1 = document.querySelector('.p');
console.log(h1)
h1.addEventListener('click',function(e) {
    console.log('点到我了')
})

console.log('onclick' in document)
console.log('onclick' in window)

//e.traget 永远是真正点击到的元素
//e.currentTarget 是函数绑定的元素


//🌟🌟🌟需要传多个参数的方法
//多套一层
const h2 = document.querySelector('.p2')
const aaa = 111
const bbb = 222
h2.addEventListener('click',(e)=>{
    test(e,aaa,bbb)
})
//这个才是具体的函数
function test(e,x,y){
    console.log(bbb)
}

//🌟🌟🌟不多套一层也行,变量可以写在函数内👇
h2.addEventListener('click',(e,aaa,bbb)=>{
    const aa = 1
    const bb = 2
    console.log(bb)
})