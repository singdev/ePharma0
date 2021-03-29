let User;

module.exports = function (injectedUserDB) {
    User = injectedUserDB;
    
    return {
        register: register,
        getUser: getUser,
        isValidUser: isValidUser,
        getAllUser: getAllUser,
        deleteUser: deleteUser,
        getUserById: getUserById,
        updateUser: updateUser
    }
}

const crypto = require("crypto");

function register(username, password, cbFunc) {
    var shaPass = crypto.createHash("sha256").update(password).digest("hex");
    let user = new User({username, user_password: shaPass });
    user.save((err, user) => {
        console.log(err);
        cbFunc({ err, user});
    });
}

function getUser(username, password, cbFunc) {
    var shaPass = crypto.createHash("sha256").update(password).digest("hex");
    User.findOne({ username, user_password: shaPass }, cbFunc)
}

async function getAllUser(){
    return await User.find({});
}

async function getUserById(id){
    return await User.findOne({_id: id});
}

async function updateUser(id, data){
    return await User.findByIdAndUpdate(id, data);
}

async function deleteUser(id){
    return await User.findByIdAndDelete(id);
}

function isValidUser(username, cbFunc) {
    User.findOne({ username }, (err, user) => {
        console.log(err);
        cbFunc(err, user == null); 
    });
}