import { getAccessToken, hasAccessToken, removeAccessToken } from '../modules/services/authService.js';

window.addEventListener('load', async () => {
    if(hasAccessToken() && window.location.href.includes('login')){
        window.location.href = '/home';
    }
    if(!hasAccessToken() && !window.location.href.includes('login')){
        window.location.href = '/login';
    } 
    if(hasAccessToken() && !window.location.href.includes('login')){
        dropdown();
        sidebar();
    } 
});


function sidebar(contact){
    document.getElementById("sidebar-hello").addEventListener('click', () => {
        window.location.href = '/home/hello';
    });
}

function topbar(){
    document.getElementById("topbar-logo").addEventListener('click', () => {
        hideSideNav();
    });
    document.getElementById("topbar-menu-icon").addEventListener('click', () => {
        showSideNav();
    });
}

function dropdown(contact){
    document.getElementById("dropdown-deconnexion").addEventListener('click', () => {
        removeAccessToken();
        window.location.reload();
    });
    document.getElementById("dropdown-password").addEventListener('click', () => {
        const token = getAccessToken();
        removeAccessToken();
        window.location.href = "/login/active?token=" + token;
    });
}

function showSideNav(){
    document.querySelector(".topbar").classList.add("topbar-show-menu");
    document.querySelector(".side-bar").classList.add("show-side-bar");
}

function hideSideNav(){
    document.querySelector(".topbar").classList.remove("topbar-show-menu");
    document.querySelector(".side-bar").classList.remove("show-side-bar");
}

function loadIHMByRole(contact){
    const roleManagment = new RoleManagement(contact.profil.role);
    roleManagment.loadIHM();
}