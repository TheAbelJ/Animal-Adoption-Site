//Section for buttons to redirect to their pages

const indexOfNth = (string, char, nth, fromIndex = 0) => {
    const indexChar = string.indexOf(char, fromIndex);
    if (indexChar === -1)
      return -1; 
    else if (nth === 1)
      return indexChar;
    else
      return indexOfNth(string, char, nth - 1, indexChar + 1);
}

const logo = document.querySelector('.logobar');
const loginButton = document.querySelector('#loginButton');
const registerButton = document.querySelector('#registerButton');
const userPets = document.querySelector('#userPets');
const navRegister = document.querySelector('#navRegister');
const navLogin = document.querySelector('#navLogin');
const navProfile = document.querySelector('#navProfile');
const navLogout = document.querySelector('#navLogout');

const urlSlashIndex = indexOfNth(window.location.href,'/',3);
let newUrlBeginning = window.location.href.slice(0, urlSlashIndex);
let newUrl;

loginButton.addEventListener('click',function(e){
    if(e.currentTarget.innerText==='Login')
        newUrl = newUrlBeginning.concat('/user/login');
    else
        newUrl = newUrlBeginning.concat('/user/logout');
    window.location.href = newUrl;
    
})

registerButton.addEventListener('click',function(e){
    if(e.currentTarget.innerText==='Register')
        newUrl = newUrlBeginning.concat('/user/register');
    else
        newUrl = newUrlBeginning.concat('/user/profile');
    window.location.href = newUrl;
})

userPets.addEventListener('click',function(){
    newUrl = newUrlBeginning.concat('/user/pets');
    window.location.href = newUrl;
})

navRegister.addEventListener('click',function(){
    newUrl = newUrlBeginning.concat('/user/register');
    window.location.href = newUrl;
})

navLogin.addEventListener('click',function(){
    newUrl = newUrlBeginning.concat('/user/login');
    window.location.href = newUrl;
})

navLogout.addEventListener('click',function(){
    console.log('test')
    newUrl = newUrlBeginning.concat('/user/logout');
    window.location.href = newUrl;
})

navProfile.addEventListener('click',function(){
    console.log('test')
    newUrl = newUrlBeginning.concat('/user/profile');
    window.location.href = newUrl;
})

logo.addEventListener('click',()=>{
    window.location.href = newUrlBeginning;
    
})


const searchPaneTitles = document.querySelectorAll('.searchpanetitle');
const searchPaneElements = document.querySelectorAll('.searchpaneelement');
//disable low opacity cat and dog search panes in case of touch screen
window.addEventListener('touchstart', function() {
    searchPaneTitles.forEach(searchPaneTitle=>{
        searchPaneTitle.classList.toggle('makesearchtextwhite');
    })
    searchPaneElements.forEach(searchPaneElement=>{
        searchPaneElement.classList.toggle('removebeforeelement');
    })
},{once : true});