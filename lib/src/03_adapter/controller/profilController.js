const CreateProfil = require("../../02_application/use_case/CreateProfil");
const UpdateProfil = require("../../02_application/use_case/UpdateProfil");
const GetProfil = require("../../02_application/use_case/GetProfil");
const GetProfilByAccountProfil = require("../../02_application/use_case/GetProfilByAccount");

const ProfilMongoDBRepository = require("../presentation/ProfilMongoDBRepository");

const syncData = require("../../04_framework/web/realtime/client");

module.exports = class {
  constructor(ProfilModel){
    this.profilRepository = new ProfilMongoDBRepository(ProfilModel);
  }
  
  async createProfil(req, res){
    const profil = await CreateProfil(req.body, this.profilRepository);
    if(profil){
      res.send(profil);
    } else {
      res.sendStatus(400);
    }
  }
  
  async updateProfil(req, res){
    const profil = await UpdateProfil(req.params.id, req.body, this.profilRepository);
    if(profil){
      syncData("http://localhost:3000", "Bonjour");
      res.send(profil);
    } else {
      res.sendStatus(400);
    }
  }
  
  async getProfil(req, res){
    const profil = await GetProfil(req.params.id, this.profilRepository);
    if(profil){
      res.send(profil);
    } else {
      res.sendStatus(400);
    }
  }
  
  async getProfilByAccount(req, res){
    const profil = await GetProfilByAccountProfil(req.user.id, this.profilRepository);
    if(profil){
      res.send(profil);
    } else {
      res.sendStatus(400);
    }
  }
}