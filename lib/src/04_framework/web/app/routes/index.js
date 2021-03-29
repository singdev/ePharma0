const login = require("./login");
const home = require("./home");

module.exports = (app) => {
    
    app.use('/home', home);
    app.use('/login', login);
  
    app.get("/", (req, res) => {
        res.redirect("login");
    });
    
    app.get("/hello", (req, res) => {
        res.send("Hello World");
    });
}