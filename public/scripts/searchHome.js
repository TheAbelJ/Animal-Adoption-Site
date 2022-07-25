const searchElements = document.querySelectorAll('.searchElements');
const  petSelect = document.querySelector('#petSelect');
const searchButton = document.querySelector('#searchButton');

const obtained = function(position){
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const formLat = document.querySelector('.latitude');
    const formLong = document.querySelector('.longitude');
    formLat.value = latitude;
    formLong.value = longitude;
    searchButton.click();
}

const rejected = async function(){
    try{
        const addressResponse = await fetch('https://api.ipify.org/?format=json');
        const ipAddress = await addressResponse.json();
        const locationResponse = await fetch(`http://ip-api.com/json/${ipAddress.ip}`)
        const ipLocation = await locationResponse.json();
        const latitude  = ipLocation.lat
        const longitude = ipLocation.lon;
        const formLat = document.querySelector('.latitude');
        const formLong = document.querySelector('.longitude');
        formLat.value = latitude;
        formLong.value = longitude;
        searchButton.click();
    }
    catch(err){
        console.log(`API ERROR: ${err}`);
    }
}

const locationChange = function(event){
    clickedOnElement = event.currentTarget.textContent.toLowerCase().trim();
    if(clickedOnElement==='dog')
        petSelect.value = clickedOnElement;
    else if(clickedOnElement ==='cat')
        petSelect.value = clickedOnElement;
    else
        return;
    
    console.log(petSelect.value);
    navigator.geolocation.getCurrentPosition(obtained,rejected,{enableHighAccuracy: true, maximumAge:0, timeout:30000});
}

searchElements.forEach(searchElement=> searchElement.addEventListener('click',locationChange));