const addrElements = document.querySelectorAll('.location');

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
    alert("Kindly give location access to get accurate position");
    navigator.geolocation.getCurrentPosition(obtained,rejected,{enableHighAccuracy: true, maximumAge:0, timeout:10000});
    addrElements.forEach(addrElement =>{
        addrElement.removeEventListener('click',locationChange);
    })
}

addrElements.forEach( addrElement => {
    addrElement.addEventListener('click',locationChange);
})

