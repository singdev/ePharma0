const UserAccount = require("../oauth2/persist/mongodb/model/UserAccount");

module.exports = async (req, res, next) => {
    try {
        const data = {
            lastConnection: new Date()
        }
        await UserAccount.findOneAndUpdate({ username: req.body.username }, data);
    } catch (err) {
        console.log("Oups une erreur occur");
        console.log(err);
    }
    next();
}