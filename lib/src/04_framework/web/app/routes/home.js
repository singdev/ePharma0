const express = require('express');

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("design-system/home/index.pug", { title: "Mon app - Home"});
});

router.get("/hello", (req, res, next) => {
  res.render("design-system/home/hello.pug", { title: "Mon app - Hello"});
});


module.exports = router;