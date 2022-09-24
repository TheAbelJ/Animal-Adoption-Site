const searchButton = document.querySelector('#searchButton3');
const searchButton2 = document.querySelector('#searchButton2');
const selectedSpecies = document.querySelector('#selectedSpecies');
const distance = document.querySelector('#distance');
const hiddenDistance = document.querySelector('#hiddenDistance');
const resetPureBredButton = document.querySelector('#resetPureBred');
const resetSearchFormButton = document.querySelector('#resetSearchFormButton');
const hiddenRadioSelect = document.querySelector('#hiddenRadioSelect')
const distanceSelect = document.querySelectorAll('.distance-select');
const speciesSelect = document.querySelectorAll('.species-select');

//Search Form input elements
const petSearchForm = document.querySelector('#petSearchForm');
const primaryBreed = document.querySelector('#primaryBreed');
const secondaryBreed = document.querySelector('#secondaryBreed');
const PureBredRadio = document.querySelectorAll('.pureBred');
const pureBredTrue = document.querySelector('#pureBredTrue');
const pureBredFalse = document.querySelector('#pureBredFalse');
const radioButtons = document.querySelectorAll('.radio-check')
const minAge = document.querySelector('#minAge');
const maxAge = document.querySelector('#maxAge');
const maxWeight = document.querySelector('#maxWeight');
const minWeight = document.querySelector('#minWeight');
const prevFormValues = document.querySelectorAll('.form-values-check');
const formValueChangeCheck = document.querySelector('#formValueChangeCheck');

//sets currently selected species with blue colour
speciesSelect.forEach(species =>{
    if(species.textContent.toLowerCase()===selectedSpecies.value){
        species.style.color = '#0d6efd';
    }
})

//sets currently selected distance with blue colour
distanceSelect.forEach(distanceSelectItem =>{
    let newDistance = distanceSelectItem.textContent
    if(newDistance === 'Anywhere')
        newDistance = '20000';
    if(newDistance === distance.value){
        distanceSelectItem.style.color = '#0d6efd';
    }
})

//selects new species, sets value of species in hidden form and submits it
speciesSelect.forEach(species =>{
    species.addEventListener('click',()=>{
        if(species.textContent.toLowerCase()!==selectedSpecies.value){
            selectedSpecies.value = species.textContent.toLowerCase();
            searchButton.click();
        }
    })
})

//selects new distance, sets value of species in  form and submits it. Another hidden form element takes previous value from server(possibly)
distanceSelect.forEach(distanceSelectItem =>{
    let newDistance = distanceSelectItem.textContent
    if(newDistance === 'Anywhere')
        newDistance = '20000';
    distanceSelectItem.addEventListener('click',()=>{
        if(newDistance !== distance.value){
            hiddenDistance.value = newDistance;
            searchButton2.click();
        }
    })
})


//get location
const obtained = function(position){
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const formLat = document.querySelectorAll('.latitude');
    const formLong = document.querySelectorAll('.longitude');
    formLat.forEach(lat => lat.value = latitude);
    formLong.forEach(long => long.value = longitude);
}

const rejected = async function(){
    try{
        const addressResponse = await fetch('https://api.ipify.org/?format=json');
        const ipAddress = await addressResponse.json();
        const locationResponse = await fetch(`https://ipwho.is/${ipAddress.ip}`)
        const ipLocation = await locationResponse.json();
        const latitude = ipLocation.latitude;
        const longitude = ipLocation.longitude;
        const formLat = document.querySelectorAll('.latitude');
        const formLong = document.querySelectorAll('.longitude');
        formLat.forEach(lat => lat.value = latitude);
        formLong.forEach(long => long.value = longitude);
    }
    catch(err){
        console.log(`API ERROR: ${err}`);
    }
}

const locationChange = function(){
    navigator.geolocation.getCurrentPosition(obtained,rejected,{enableHighAccuracy: true, maximumAge:0, timeout:30000});
}

const setPureBred = function(){
    if(hiddenRadioSelect.value){
        if(hiddenRadioSelect.value==='true'){
            pureBredTrue.checked = 'true';
        }
        else{
            pureBredFalse.checked = 'true';
        }
    }
}

locationChange();
setPureBred();

//reset the pureBred form fields values

const resetPureBred = function(){
    PureBredRadio.forEach(radio => radio.checked = false);
}

resetPureBredButton.addEventListener('click',resetPureBred);  

//function returns index of nth occurrence of character
const indexOfNth = (string, char, nth, fromIndex = 0) => {
    const indexChar = string.indexOf(char, fromIndex);
    if (indexChar === -1) {
      return -1;
    } else if (nth === 1) {
      return indexChar;
    } else {
      return indexOfNth(string, char, nth - 1, indexChar + 1);
    }
}

//redirect on clicking on pet card
const petCards = document.querySelectorAll('.pet-card');
const goToPet = function(e){
    const urlSlashIndex = indexOfNth(window.location.href,'/',3);
    let newUrl = window.location.href.slice(0, urlSlashIndex);
    window.location.href = `${newUrl}/pet/details/${e.currentTarget.id}`
}
petCards.forEach(petCard => petCard.addEventListener('click',goToPet));


//Check if the previous form values have changed and send it to the server
const prevPrimaryBreedValue = primaryBreed.value;
const prevSecondaryBreedValue = secondaryBreed.value;
const prevPureBredTrueValue = pureBredTrue.checked;
const prevPureBredFalseValue = pureBredFalse.checked;
const prevMinAgeValue = minAge.value;
const prevMaxAgeValue = maxAge.value;
const prevMinWeightValue = minWeight.value;
const prevMaxWeightValue = maxWeight.value;
let matchingValues = true;


prevFormValues.forEach(prevFormValue=>{
    prevFormValue.addEventListener('input',formValueCheck);
})

radioButtons.forEach(radioButton=>{
    radioButton.addEventListener('input',formValueCheck);
})

resetPureBredButton.addEventListener('click',formValueCheck)

function formValueCheck(){
    if( prevPrimaryBreedValue === primaryBreed.value &&
        prevSecondaryBreedValue === secondaryBreed.value &&
        prevPureBredTrueValue === pureBredTrue.checked &&
        prevPureBredFalseValue === pureBredFalse.checked &&
        prevMinAgeValue === minAge.value &&
        prevMaxAgeValue === maxAge.value &&
        prevMinWeightValue === minWeight.value &&
        prevMaxWeightValue === maxWeight.value)
    {
        matchingValues = true;
    }
    else{
        matchingValues = false;
    }
}

petSearchForm.addEventListener('submit',()=>{
    if(matchingValues)
        formValueChangeCheck.value = false
    else
        formValueChangeCheck.value = true
    
})

//Reset form button
const resetForm = function(){
    resetPureBredButton.click();
    prevFormValues.forEach((formElement)=>{
        formElement.value = '';
    })
}

resetSearchFormButton.addEventListener('click',resetForm); 