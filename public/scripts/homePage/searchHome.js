//For obtaining location and navigating to the search page

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
        const locationResponse = await fetch(`https://ipwho.is/${ipAddress.ip}`)
        const ipLocation = await locationResponse.json();
        const latitude  = ipLocation.latitude;
        const longitude = ipLocation.longitude;
        const formLat = document.querySelector('.latitude');
        const formLong = document.querySelector('.longitude');
        formLat.value = latitude;
        formLong.value = longitude;
        searchButton.click();
    }
    catch(err){ 
        console.log(`API ERROR IP LOCATION: ${err}`);
    }
}

const locationChange = function(event){
    clickedOnElement = event.currentTarget.textContent.toLowerCase().trim();
    if(clickedOnElement==='dog' || clickedOnElement ==='dogs')
        petSelect.value = 'dog';
    else if(clickedOnElement ==='cat' || clickedOnElement ==='cats')
        petSelect.value = 'cat';
    else
        return;
    
    navigator.geolocation.getCurrentPosition(obtained,rejected,{enableHighAccuracy: true, maximumAge:0, timeout:30000});
}

searchElements.forEach(searchElement=> searchElement.addEventListener('click',locationChange));