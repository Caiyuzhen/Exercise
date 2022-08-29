// 按钮点击后的一系列样式
// 获取按钮+输入框

const btn = document.querySelector("button");
const input = document.querySelector("input");
// 倒计时秒数
let second = 3;
// 点击按钮
btn.addEventListener('click',function() {
    // 获取到输入框内的值
    const val = input.value;
    // 输入框不能为空
    if (val.trim() !== ""){
        // 清除输入框的值
        input.value = "";
        this.className = "btn_active";
        this.innerHTML = `${second} s`;
        // 开启倒计时定时器
        const timer = setInterval(()=> {
            second--;
            // 当秒数为 0 则恢复
            this.innerHTML = `${second} s`;
        }, 1000);
    }
});
