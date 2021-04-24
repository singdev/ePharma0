const express = require("express");


module.exports = (app) => {
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

  router.get("/search-by/account", app.oauth.authorise(), async (req, res, next) => {
    await profilController.getProfilByAccount(req, res);
  });

  return router
};