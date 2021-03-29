import { login, persistAccessToken } from '../../modules/services/authService.js';

window.addEventListener('load', async () => {
    document.getElementById("loginBtn").addEventListener('click', async () => {
        await onLogin();        
    });
})

async function onLogin(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const res = await login(username, password);
    if(res){
        const access_token = res.access_token;
        persistAccessToken(access_token);
        window.location.href = "/";
    } else {
        alert("Identifiants invalide !");
    }
}