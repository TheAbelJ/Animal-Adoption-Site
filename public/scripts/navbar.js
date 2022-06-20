const navslide= () =>{
    const burger=document.querySelector('.burger');
    const nav=document.querySelector('.nav-links');
    const navLinks=document.querySelectorAll('.nav-links  li');
    
    burger.addEventListener('click',()=>{
        
        nav.classList.toggle('nav-active');      /* toggle nav */

        navLinks.forEach((link,index)=>{        /* Links animation */
            if(link.style.animation){
                link.style.animation='';
            }
            else{
                link.style.animation=`navLinkFade 0.3s ease forwards ${index/7+0.2}s`
            }
        }) ;
        
        burger.classList.toggle('toggle');

        nav.classList.add('navTransition');      /* to prevent initial slide of navbar to left on loading page */
    });
    
}
export default navslide;