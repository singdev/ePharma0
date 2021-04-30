const mongoose = require("mongoose");

module.exports = mongoose.model("Profil", mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  telephone: String,
  pid: String,
  account: { type: mongoose.Types.ObjectId, ref: "UserAccount"}
}));