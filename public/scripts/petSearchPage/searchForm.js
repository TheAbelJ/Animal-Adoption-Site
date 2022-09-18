const offCanvasForm = document.querySelector('#offcanvasform');
const offCanvasX = document.querySelector('#off-canvas-x');
const offCanvasButton = document.querySelector('#offCanvasButton');

const offCanvasDisable = window.matchMedia('(min-width: 769px)');   //make off canvas non toggleable and fixed to left side of screen
const offCanvasEnable = window.matchMedia('(max-width: 768px)');

function disableCanvas(e) {
    if (e.matches) {
        offCanvasX.click();
        offCanvasForm.classList.remove('offcanvas');
        offCanvasForm.classList.remove('offcanvas-start');
        offCanvasX.classList.add('hidden');
        offCanvasButton.classList.add('hidden');
        setTimeout(() => offCanvasForm.style.visibility = "visible", 305);
        
    }
  }
function enableCanvas(e){
    if(e.matches){
        offCanvasForm.classList.add('offcanvas');
        offCanvasForm.classList.add('offcanvas-start');
        offCanvasX.classList.remove('hidden');
        offCanvasButton.classList.remove('hidden');
        offCanvasForm.style.visibility = "hidden";
    }
}               
offCanvasDisable.addEventListener('change',disableCanvas);
offCanvasEnable.addEventListener('change',enableCanvas);

if(window.innerWidth < 769){
    offCanvasForm.classList.add('offcanvas');
    offCanvasForm.classList.add('offcanvas-start');
    offCanvasX.classList.remove('hidden');
    offCanvasButton.classList.remove('hidden');
}
