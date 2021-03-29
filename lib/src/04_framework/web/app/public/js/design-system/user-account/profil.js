import { RoleManagement } from '../../modules/model/RoleManagement.js';
import { formatDateTime } from '../../modules/other/util.js';
import { getContact, getOtherContact, updateContact, updateProfil } from '../../modules/services/contactService.js';

window.addEventListener('load', async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("contact");
    const contact = await getOtherContact(id);
    displayProfil(contact);
    displayContact(contact);
    displayUserAccount(contact);
    
    const myContact = await getContact();
    const roleManagment = new RoleManagement(myContact.role, myContact);
    roleManagment.profilIHMSpecification(contact.profil);
    
    const createBtn = document.getElementById('updateBtn');
    createBtn.addEventListener('click', async () => {
        await modify(contact);
    });
    
    document.getElementById('switch-update').addEventListener('change', async (e) => {
        const value = e.target.checked;
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            if(input.id != 'switch-update'){
                input.disabled = !value;
            }
        });
        createBtn.disabled = !value;
        if(value){
            document.getElementById("file-data").classList.remove("hidden")
        } else {
            document.getElementById("file-data").classList.add("hidden")
        }
    });
    
    document.getElementById("cv").addEventListener('change', async (e) => {
        const v = await updateProfil(myContact.profil._id, null, e.target.files[0]);
        if(v){
            window.location.reload();
        }
    });
    
    if(myContact.profil.cvURL){
        document.getElementById("cv-download").href = myContact.profil.cvURL;
    } else {
        document.getElementById("cv-download").classList.add("hidden");
    }
});

function displayProfil(contact) {
    document.getElementById('nom').value = contact.profil.nom;
    document.getElementById('prenom').value = contact.profil.prenom;
    document.getElementById('email').value = contact.profil.email;
    document.getElementById('telephone1').value = contact.profil.telephone1;
    document.getElementById('telephone2').value = contact.profil.telephone2;
    document.getElementById('date_naissance').value = new Date(contact.profil.date_naissance).toISOString().split("T")[0];
    document.getElementById('lieu_naissance').value = contact.profil.lieu_naissance;
    document.getElementById('nationalite').value = contact.profil.nationalite;
    document.getElementById('ville').value = contact.profil.ville;
    
    const options = document.querySelectorAll('#role option');
    options.forEach(o => {
        if(o.value == contact.profil.role){
            o.selected = true;
        }
    })
}

function displayContact(contact) {
    document.getElementById('head-role').innerHTML = contact.profil.role;
    document.getElementById('enterprise').innerHTML = '@' + contact.enterprise.nom;
    document.getElementById('poste').value = contact.poste;
    document.getElementById('fullname').innerHTML = contact.profil.nom + ' ' + contact.profil.prenom;
}

function displayUserAccount(contact) {
    document.getElementById("username").innerHTML = contact.userAccount.username;
    document.getElementById("last-connection").innerHTML = 'Derniere connection le ' + formatDateTime(contact.userAccount.lastConnection);
    document.getElementById("last-activity").innerHTML = 'Derniere activite le ' + formatDateTime(contact.userAccount.lastActivity);
    document.getElementById("is-active").innerHTML = contact.userAccount.isActive ? 'Active' : 'Inactive';
}

async function modify(contact){
    await modifyProfil(contact);
    await modifyContact(contact);
    window.location.reload();
}

async function modifyProfil(contact) {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const telephone1 = document.getElementById('telephone1').value;
    const telephone2 = document.getElementById('telephone2').value;
    const date_naissance = document.getElementById('date_naissance').value;
    const lieu_naissance = document.getElementById('lieu_naissance').value;
    const nationalite = document.getElementById('nationalite').value;
    const ville = document.getElementById('ville').value;
    const role = document.getElementById('role').value;
    const profil = await updateProfil(contact.profil._id, {
        nom, prenom, email, telephone1, telephone2, date_naissance, lieu_naissance, nationalite, ville, role
    });
}

async function modifyContact(contact){
    const poste = document.getElementById('poste').value;
    await updateContact(contact._id, {
        poste
    });
}
