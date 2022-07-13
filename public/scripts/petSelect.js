species=['dog','cat']

petSelector = document.querySelector('#petSelect')
formTitle = document.querySelector('#formTitle')
form = document.querySelector('#petForm')
defaultSelect = document.querySelector('#defaultSelect')

/* send get request to server with query parameter of selected pet */
const changeURL = function () {
    for(let i of species){
        if (this.value===i) {
            url=`http://localhost:3000/pet/new?petType=${i}`
            window.location = url
        }
    }
}

petSelector.addEventListener('change', changeURL)

pet = formTitle.innerText.split(' ').pop()                  //get last word of pet title(sent by server)
if(pet!=='pet'){
    defaultSelect.classList.toggle('hidden')                //hide empty field if select pet type has a value
    petSelector.value=pet
}
if(petSelector.value)
    form.classList.toggle('hidden')                         //unhides main form
