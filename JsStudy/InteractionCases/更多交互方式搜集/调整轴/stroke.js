const line = document.querySelector('.line')
const range = document.querySelector('.range')

range.addEventListener('input', handleSlider)

function handleSlider (e) {
  let value = e.target.value
  line.style.setProperty('--stroke-dashoffset', value)
  document.querySelector('.result').innerHTML = value
}