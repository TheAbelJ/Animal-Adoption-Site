const navslide= () =>{
    const navbar = document.querySelector('#navbar')
    const burger=document.querySelector('.burger');
    const nav=document.querySelector('.nav-links');
    const navLinks=document.querySelectorAll('.nav-links  li');
    const initialHiddenNavElements = document.querySelectorAll('.hideNavElement');

    initialHiddenNavElements.forEach(element =>{
        if(element.classList.contains('hideNavElement'))
            element.classList.add('hidden');
    })
    
    function toggleBurger(){
        nav.classList.toggle('nav-active');      /* toggle nav */
        navLinks.forEach((link,index)=>{        /* Links animation */
            if(link.style.animation){
                link.style.animation='';
            }
            else{
                link.style.animation=`navLinkFade 0.3s ease forwards 0.3s`
            }
        }) ;
        nav.classList.add('navTransition');
        burger.classList.toggle('toggle');            
    }
    
    burger.addEventListener('click',toggleBurger);
    const navChange = window.matchMedia('(min-width: 769px)'); //navTransition add navbar transition when burger clicked. removed when window is resized
    const unHideNav = window.matchMedia('(max-width: 768px)');   //unhide some(register,login,profile,logout) navElements in mobile view
    const navList = document.querySelectorAll('.navHideableElements');
    function handleScreenChange(e) {
        if (e.matches) {
            nav.classList.remove('navTransition');
        }
      }
    function unHideNavElements(e){
        if(e.matches){
            navList.forEach(navListElement =>{
                navListElement.classList.remove('hidden');
            })
        }
    }
    function hideNavElements(e){
        if(e.matches){
            navList.forEach(navListElement =>{
                navListElement.classList.add('hidden');
            })
        }
    }
    hideNavElements(navChange);                                 //for hiding of register/login etc. when page is loaded first time(js media query doesnt fire then)
    navChange.addEventListener('change',handleScreenChange);
    navChange.addEventListener('change',hideNavElements);
    unHideNav.addEventListener('change',unHideNavElements);

    document.addEventListener('click',function(event){
        const isClickedInsideNavbar = navbar.contains(event.target);
        const isMobileViewWidth = window.innerWidth < 769;
        const isBurgerToggled = burger.classList.contains('toggle');
        if(!isClickedInsideNavbar && isMobileViewWidth && isBurgerToggled){
            toggleBurger();
        }
    })
}
export default navslide;