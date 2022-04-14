let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');

// 点击关闭按钮[折叠]与[展开]侧边栏(要填入与 css 一样的类名，fa-times 为默认的 icon)
menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    header.classList.remove('active');
}

// 鼠标跟随
let cursor1 = document.querySelector('.cursor-1');
let cursor2 = document.querySelector('.cursor-2');

window.onmousemove = (e) =>{
    cursor1.style.top = e.pageY + 'px';
    cursor1.style.left = e.pageX + 'px';
    cursor2.style.top = e.pageY + 'px';
    cursor2.style.left = e.pageX + 'px';
}

// 这里(鼠标聚焦跟失焦效果，‘a'为主导航中的 a 标签)
let links = document.querySelectorAll(`a`).forEach(links =>{
    // onmouseenter 是对 DOM 的深层监听，缺点是影响性能
    links.onmouseenter = () =>{
        cursor1.classList.add(`active`)
        cursor2.classList.add(`active`)
    } 

    links.onmouseleave = () =>{
        cursor1.classList.remove(`active`)
        cursor2.classList.remove(`active`)
    } 
})