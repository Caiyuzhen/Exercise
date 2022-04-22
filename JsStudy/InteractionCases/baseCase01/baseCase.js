const h1 = document.querySelector('.p');
console.log(h1)
h1.addEventListener('click',function(e) {
    console.log('点到我了')
})

console.log('onclick' in document)
console.log('onclick' in window)

//e.traget 永远是真正点击到的元素
//e.currentTarget 是函数绑定的元素
