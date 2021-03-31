const express = require("express");

const router = express.Router();

const ProfilModel = require("../../db/mongodb/model/Profil");
const ProfilController = require("../../../03_adapter/controller/profilController");

const profilController = new ProfilController(ProfilModel);

router.post("/", async (req, res, next) => {
  await profilController.createProfil(req, res);
});

router.put("/:id", async (req, res, next) => {
  await profilController.updateProfil(req, res);
});

router.get("/:id", async (req, res, next) => {
  await profilController.getProfil(req, res);
});

router.get("/:accountId", async (req, res, next) => {
  await profilController.getProfilByAccount(req, res);
});

module.exports = router;