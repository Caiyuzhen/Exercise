const card = document.querySelector('.one-unit');


card.addEventListener('click', function(e){
    e.target.classList.add('selected-unit')
})