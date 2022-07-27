const searchButton = document.querySelector('#searchButton');
const searchButton2 = document.querySelector('#searchButton2');
const selectedSpecies = document.querySelector('#selectedSpecies');
const distance = document.querySelector('#distance');
const hiddenDistance = document.querySelector('#hiddenDistance');
const resetPureBredButton = document.querySelector('#resetPureBred');
const hiddenRadioSelect = document.querySelector('#hiddenRadioSelect')
const PureBredRadio = document.querySelectorAll('.pureBred');

const triggerSearch = function(){
    searchButton.click();
}

const populateHiddenDistance = function(e){
    hiddenDistance.value = e.currentTarget.value;
    searchButton2.click();
}

selectedSpecies.addEventListener('change',triggerSearch);
distance.addEventListener('change',populateHiddenDistance);



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
        const locationResponse = await fetch(`http://ip-api.com/json/${ipAddress.ip}`)
        const ipLocation = await locationResponse.json();
        const latitude  = ipLocation.lat
        const longitude = ipLocation.lon;
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
            const pureBredTrue = document.querySelector('#pureBredTrue');
            pureBredTrue.checked = 'true';
        }
        else{
            const pureBredFalse = document.querySelector('#pureBredFalse');
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

//redirect to home after clicking on home text
const home  = document.querySelector('.home-text');
home.addEventListener('click',() => {
    const urlSlashIndex = indexOfNth(window.location.href,'/',3);
    let newUrl = window.location.href.slice(0, urlSlashIndex);
    newUrl = newUrl.concat('/home');
    window.location.href = newUrl;
});

//redirect on clicking on pet card
const petCards = document.querySelectorAll('.pet-card');
const goToPet = function(e){
    const urlSlashIndex = indexOfNth(window.location.href,'/',3);
    let newUrl = window.location.href.slice(0, urlSlashIndex);
    window.location.href = `${newUrl}/pet/details/${e.currentTarget.id}`
}
petCards.forEach(petCard => petCard.addEventListener('click',goToPet));
