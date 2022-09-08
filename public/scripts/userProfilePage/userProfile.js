edit = document.querySelector('#edit')
save = document.querySelector('#save')
const backButton = document.querySelector('#backButton');
const deleteButton = document.querySelector('#deleteButton');
const deleteForm = document.querySelector('#deleteForm');
formInputs = document.querySelectorAll('.form-control');
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

backButton.addEventListener('click',function(e){
    window.location.pathname = '/home'
    
})

deleteButton.addEventListener('click',function(e){
    if(window.confirm("Are you sure you want to delete your account?")){
        deleteForm.submit();
    }
})