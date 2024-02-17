//NAVIGATION ELEMENTS
const navLinks = document.querySelectorAll(".nav-link");
const windowPathName = window.location.pathname;

export function activeState(){
  navLinks.forEach(e => {
    const navLinkPathName = new URL(e.href).pathname;
    if(windowPathName === navLinkPathName){
        e.classList.add('active');
    }
  });
}