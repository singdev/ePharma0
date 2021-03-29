const crypto = require("crypto");
const activateAccountHTML = require("../../../../../01_enterprise/rules/emails/activate_account");
const sendEmail = require("../../../../../../modules/email");

let userDB;

module.exports = (injectedUserDB) => {
    userDB = injectedUserDB;

    return {
        registerUser: registerUser,
        login: login,
        updateUserData: updateUserData,
        updateUser: updateUser,
        deleteUser: deleteUser,
        resend: resend
    };
};

async function updateUserData(req, res) {
    if (req.body.password) {
        var shaPass = crypto.createHash("sha256").update(req.body.password).digest("hex");
        req.body.user_password = shaPass;
    }
    try {
        const result = await userDB.updateUser(req.user.id, req.body);
        if (result) {
            res.send(result);
        } else {
            res.send({ "error": true, "message": "La mise a jour ne s'est pas effectue !" });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

async function deleteUser(req, res) {
    try {
        const result = await userDB.deleteUser(req.params.id);
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

async function updateUser(req, res) {
    console.log(req.body);
    if (req.body.password) {
        var shaPass = crypto.createHash("sha256").update(req.body.password).digest("hex");
        req.body.user_password = shaPass;
    }
    console.log(req.body);
    try {
        const result = await userDB.updateUser(req.params.id, req.body);
        if (result) {
            res.send(result);
        } else {
            res.send({ "error": true, "message": "La mise a jour ne s'est pas effectue !" });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

const url = process.env.HOST || 'http://localhost:3000';

async function resend(req, res) {
    try {
        sendEmail(activateAccountHTML(req.body.link), req.body.dst);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

function registerUser(req, res) {
    userDB.isValidUser(req.body.username, (error, isValidUser) => {
        if (error || !isValidUser) {
            const message = error
                ? "Something went wrong!"
                : "This user already exists!";

            sendResponse(res, message, error);
            return;
        }
        const password = req.body.password;
        userDB.register(req.body.username, req.body.password, (response) => {
            if (response.err == null) {
                //sendEmail
                const userAccount = { username: req.body.username, password };
                const content = activateAccountHTML(url + "/login/active?user=" + userAccount.username + "&pass=" + userAccount.password);
                sendEmail(content, userAccount.username);
                res.send(response.user)
            } else {
                sendResponse(
                    res,
                    response.err == null ? "Success!!" : "Something went wrong!",
                    response.err
                );
            }

        });
    });
}

function login(query, res) {
    console.log("After authentification");
}

function sendResponse(res, message, error) {
    res.status(error !== undefined ? 400 : 200).json({
        message: message,
        error: error,
    });
}