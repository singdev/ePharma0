const UserAccount = require("../oauth2/persist/mongodb/model/UserAccount");
const crypto = require("crypto");
const sendEmail = require("../../../../../modules/email");
const activeAccount = require("../../../../01_enterprise/rules/emails/activate_account");

const generator = require('generate-password');

const password = generator.generate({
    length: 32,
    numbers: true
});

console.log(password);

const userAccount = {
    username: "norpheehounkponou@gmail.com",
    user_password:  crypto.createHash("sha256").update(password).digest("hex")
}

async function hasRoot() {
    try {
        const user = await UserAccount.findOne({ username: userAccount.username });
        return user !== null;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function createRoot() {
    try {
        const root = new UserAccount(userAccount);
        return await root.save();
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function createFirstContact() {
    const accountData = await createRoot();
    sendEmail(activeAccount("http://localhost:3000/login/active?user=" + userAccount.username + "&pass=" + password), accountData.username);
}

module.exports = async () => {
    const created = await hasRoot();
    if(!created){
        try {
            const contact = await createFirstContact();
            console.log("Root created");
        } catch(err){
            console.log(err);
        }
    } else {
        console.log("Root already exist");
    }
}
