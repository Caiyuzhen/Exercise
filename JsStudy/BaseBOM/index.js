// window.devicePixelRatio 输出屏幕的像素比

// const result = confirm('确定要删除吗？') //🌟用来判断用户是否点击了确定按钮
// console.log(result) // true or false

// const result2 = prompt('请输入你的名字') //🌟用来获取用户输入的内容
// console.log(result2) // 用户输入的内容

console.log(window.location.hostname);
console.log(window.location.href);
console.log(window.location.pathname);
console.log(window.location.port);
console.log(window.location.origin);


/**
 * 快速改变网址的方法
 * 
 * 
 1. window.location = ''

 2. location.href = 'http://www.google.com' // 会刷新页面然后直接跳转到那个网站

 3. location.assign('')

 4. location.replace('')  //不会进入历史记录

 */


//  location.assign('http://www.google.com/#b5') //🔥可以直接切换到有锚链接的页面位置
location.assign('http://127.0.0.1:8080/JsStudy/BaseBOM/index.html#b5')

location.search // 获取 页面 中所携带的参数
console.log(location.search);