const canvasSaveToPic = document.getElementById("canvas-saveToPic")
canvasSaveToPic.width = 800
canvasSaveToPic.height = 600
canvasSaveToPic.style.border = "3px solid black"
canvasSaveToPic.style.borderRadius = "16px"
const ctx = canvasSaveToPic.getContext("2d")




ctx.beginPath() //🔥注意, 要创建路径组, 不然会把之前的内容全部擦除, 擦除只能擦掉在画板上的图形！
ctx.moveTo(200 + 20, 200) //200+20, 200
ctx.arc(200, 200, 20, 0, Math.PI * 2)
ctx.fill()


//会返回一组图片数据 （base 64）, 可以设置到 <img> 元素的 src 上
const img = document.getElementById("img")

const data = canvasSaveToPic.toDataURL('image/png') //🔥 获取 canvas 上的图片数据
img.src = data
console.log(data)