import { login, updateUserAccount } from "../../modules/services/authService.js";

let accessToken = null;

window.addEventListener('load', async () => {
    await validateCredentials();

    document.getElementById("activeBtn").addEventListener('click', async () => {
        await active();
    });
});

async function validateCredentials() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get("user");
    const password = urlParams.get("pass");
    const token = urlParams.get("token");

    if (token) {
        accessToken = token;
    } else {
        const result = await login(username, password);
        if (!result) {
            window.location.href = "/login";
        } else {
            accessToken = result.access_token;
        }
    }
}

async function active() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById('cfpassword').value;

    if (password === confirmPassword) {
        const res = await updateUserAccount(accessToken, { password, isActive: true });
        if (res) {
            window.location.href = '/login';
        } else {
            alert("Erreur");
        }
    } else {
        alert("Les mots de passe doivent correspondres !");
    }
}

