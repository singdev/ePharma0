const express = require('express');

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("design-system/login/index.pug", { title: "Mon app - Connexion"});
});

router.get("/active", (req, res, next) => {
    res.render("design-system/login/activation.pug", { title: "Mon app - Activation"});
});

module.exports = router;