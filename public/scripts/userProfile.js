edit = document.querySelector('#edit')
save = document.querySelector('#save')
formInputs = document.querySelectorAll('.form-control')
const defaultValues = [];
for (let i=0, l=formInputs.length; i < l; i++){         //Store default values
    defaultValues[i] = formInputs[i].value
}
const editForm = function(){
   if(this.textContent==='Edit'){
    this.textContent='Cancel'
   }
   else{
    this.textContent='Edit'
    for (let i=0, l=formInputs.length; i < l; i++){
        formInputs[i].value = defaultValues[i]
    }
   }
    save.classList.toggle('hidden')
    for (let i=0, l=formInputs.length; i < l; i++){
        formInputs[i].disabled = formInputs[i].disabled? false: true;
    }
}

edit.addEventListener('click',editForm)