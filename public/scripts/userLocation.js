//Gets user location in both register and profile(edit) pages

const addrElements = document.querySelectorAll('.location');
const editButton = document.querySelector('#edit')

const obtained = function(position){
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const formLat = document.querySelector('#latitude');
    const formLong = document.querySelector('#longitude');
    formLat.value = latitude;
    formLong.value = longitude;
}

const rejected = function(){
    console.log("location access denied");
}

const locationChange = function(){
    console.log('testing')
    if(window.confirm("Use current device location to store location details?")){
        navigator.geolocation.getCurrentPosition(obtained,rejected,{enableHighAccuracy: true, maximumAge:0, timeout:30000});
    } 
    addrElements.forEach(addrElement =>{
        addrElement.removeEventListener('input',locationChange);
    })
}

const toggleLocationChange = function(){
    if (this.textContent === 'Cancel'){
        addrElements.forEach( addrElement => {
            addrElement.addEventListener('input',locationChange);
        })
    }
}

addrElements.forEach( addrElement => {
    addrElement.addEventListener('input',locationChange);
})

editButton.addEventListener('click',toggleLocationChange);

