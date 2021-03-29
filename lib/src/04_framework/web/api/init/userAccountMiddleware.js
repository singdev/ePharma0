const UserAccount = require("../oauth2/persist/mongodb/model/UserAccount");

module.exports = async (req, res, next) => {
    if(req.user){
        try {
            const data = {
                lastActivity: new Date()
            }
            const userAccount = await UserAccount.findOne({ _id: req.user.id});
            if(userAccount && userAccount.isActive == false){
                res.sendStatus(401);
                return;
            }
            await UserAccount.findByIdAndUpdate(req.user.id, data);
        } catch(err){
            console.log(err);
        }
    }
    next();
}