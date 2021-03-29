const loginMiddleware = require("../../init/userAccountLoginMiddleware");

module.exports = (router, app, authenticator) => {
    router.post("/register", authenticator.registerUser);
    
    router.post("/login", loginMiddleware, app.oauth.grant(), authenticator.login);

    router.put("/user-account", app.oauth.authorise(), authenticator.updateUserData);
    
    router.put("/user-account/:id", app.oauth.authorise(), authenticator.updateUser);
    
    router.delete("/user-account/:id", app.oauth.authorise(), authenticator.deleteUser);
    
    router.post("/user-account/send", app.oauth.authorise(), authenticator.resend);
    
    router.get("/hello", app.oauth.authorise(), (req, res) => {
        res.send("Hello world");
    });
    
    return router;
};