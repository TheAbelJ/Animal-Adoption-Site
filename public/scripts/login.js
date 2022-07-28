const returnButton = document.querySelector('#return');

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

const urlSlashIndex = indexOfNth(window.location.href,'/',3);
let newUrlBeginning = window.location.href.slice(0, urlSlashIndex);
let newUrl;
returnButton.addEventListener('click',function(e){
    console.log('working')
    newUrl = newUrlBeginning.concat('/home');
    window.location.href = newUrl;
})