const login = require("./login");
const home = require("./home");
const profil = require("./profil");

module.exports = (app) => {
    
    app.use('/home', home);
    app.use('/profil', profil);
    app.use('/login', login);
  
    app.get("/", (req, res) => {
        res.redirect("login");
    });
    
    app.get("/hello", (req, res) => {
        res.send("Hello World");
    });
}