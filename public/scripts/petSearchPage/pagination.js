const pageItemNumbers = document.querySelectorAll('.page-item-numbers');
const paginationOffset = document.querySelector('#paginationOffset2');
const currentPage = parseInt(paginationOffset.value)+1;
const goToPreviousPage = document.querySelector('#goToPreviousPage');
const goToNextPage = document.querySelector('#goToNextPage');
const totalPageCount = document.querySelector('#totalPageCount').value;



//hide empty pages
pageItemNumbers.forEach(pageItem=>{
    if(parseInt(pageItem.innerText) > totalPageCount ){
        pageItem.classList.add('hidden');
    }
})

//previous pagination button navigation
if(currentPage===1){
    goToPreviousPage.classList.add('disabled');
}
else{
    goToPreviousPage.addEventListener('click',()=>{
        paginationOffset.value = (currentPage-2).toString();
        searchButton2.click();
    })
}

//next page pagination button navigation
if(currentPage===parseInt(totalPageCount) || parseInt(totalPageCount)===0){
    goToNextPage.classList.add('disabled');
}
else{
    goToNextPage.addEventListener('click',()=>{
        paginationOffset.value = (currentPage).toString();
        //paginationOffset.setAttribute('value','1');
        console.log(paginationOffset.value)
        searchButton2.click();
    })
}

//To indicate currently active page
pageItemNumbers.forEach(pageItem =>{
    if(parseInt(pageItem.innerText) === ((parseInt(paginationOffset.value))+1) ){
        pageItem.classList.add('active');
    }
        
})

//to navigate to selected page
pageItemNumbers.forEach(pageItem=>{
    pageItem.addEventListener('click',(e)=>{
        newPageOffsetValue = (parseInt(e.currentTarget.innerText)-1).toString();
        paginationOffset.value = newPageOffsetValue;
        searchButton2.click();
    })
})

