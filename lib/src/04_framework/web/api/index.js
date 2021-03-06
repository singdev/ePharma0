const secure = require("./secure");
const oauth2 = require("./oauth2");
const init = require("./init");


module.exports = (app) => {

    init();
    secure(app);
    oauth2(app);

    const profil = require("./profil")(app);
    
    app.use("/profil", profil);
    
    app.get('/api/protected', (req, res) => {
        res.send(`Hello ${req.credentials.name}`);
    });
}