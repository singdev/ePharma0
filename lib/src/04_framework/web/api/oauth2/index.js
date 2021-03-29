const express = require("express");
const oauthserver = require('node-oauth2-server');
const UserModel = require("./persist/mongodb/model/UserAccount");
const TokenModel = require("./persist/mongodb/model/AccessToken");
const User = require("./db/UserDB")(UserModel);
const Token = require("./db/TokenDB")(TokenModel);
const oautService = require("./auth/tokenService")(User, Token);
const authenticator = require("./auth/authenticator")(User);

module.exports = (app) => {
    const oauth = oauthserver({
        model: oautService,
        grants: ['password'],
        debug: true
    });
    app.oauth = oauth;
    const routes = require("./auth/routes")(
        express.Router(),
        app,
        authenticator
    );
    app.use("/auth", routes);
    app.use(app.oauth.errorHandler());
}

