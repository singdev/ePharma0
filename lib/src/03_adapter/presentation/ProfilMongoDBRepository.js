const ProfilRepository = require("../../02_application/repository/ProfilRepository");
const mongoose = require("mongoose");

module.exports = class extends ProfilRepository {
  
  
  /**
   * 
   * @param {mongoose.Model} ProfilModel 
   */
  constructor(ProfilModel){
    super();
    this.ProfilModel = ProfilModel;
  }
  
  async createProfil(info){
    const newProfil = new this.ProfilModel(info);
    return newProfil.save();
  }
  
  async updateProfil(id, info){
    return await this.ProfilModel.findByIdAndUpdate(id, info);
  }
  
  async getProfil(id){
    return this.ProfilModel.findOne({ _id: id}).populate("account").exec();
  }
  
  async getProfilByAccount(id){
    return this.ProfilModel.findOne({ account: id}).populate("account").exec();
  }
}