import { getAccessToken } from "../../modules/services/authService.js";
import { fetchProfil, updateMyProfil } from "../../modules/services/profilService.js";

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
  document.getElementById("nom").value = profil.nom;
  document.getElementById("prenom").value = profil.prenom;
  document.getElementById("telephone").value = profil.telephone;
  document.getElementById("email").value = profil.email;
  
  document.getElementById("apply-update").addEventListener("click", async () => {
    await applyModification(profil);
  });
}

async function applyModification(profil){
  const token = await getAccessToken();
  updateProfil(token, profil);
}

async function updateProfil(token, profil){
  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const telephone = document.getElementById("telephone").value;
  const email = document.getElementById("email").value;
  
  const res = await updateMyProfil(token, profil._id, {
    nom, prenom, telephone, email
  });
  
  if(res){
    alert("Mise a jour effectue");
  } else {
    alert("Erreur lors de la mise a jour");
  }
}