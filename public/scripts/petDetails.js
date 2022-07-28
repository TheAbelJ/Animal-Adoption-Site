const returnToSearchButton = document.querySelector('#returnToSearchButton');
returnToSearchButton.addEventListener('click',function(e){
    history.back();
})
