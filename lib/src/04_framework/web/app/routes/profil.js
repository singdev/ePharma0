const express = require('express');

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("design-system/profil/index.pug", { title: "Mon app - Mon profil"});
});

module.exports = router;