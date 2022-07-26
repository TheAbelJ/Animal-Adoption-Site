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


