import { getAccessToken } from "../../modules/services/authService.js";
import { fetchProfil } from "../../modules/services/profilService.js";

window.addEventListener("load", async () => {
  console.log("profil");
  const token = await getAccessToken();
  console.log(token);
  const profil = await loadProfil(token);
  displayProfil(profil);
})

async function loadProfil(token){
  const profil = await fetchProfil(token);
  return profil;
}

async function displayProfil(profil){
  document.getElementById("nom").innerHTML = profil.nom;
  document.getElementById("prenom").innerHTML = profil.prenom;
  document.getElementById("telephone").innerHTML = profil.telephone;
  document.getElementById("email").innerHTML = profil.email;
  
  
}