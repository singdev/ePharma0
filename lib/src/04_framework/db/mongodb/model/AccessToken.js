const mongoose =require("mongoose");

module.exports = mongoose.model("AccessTokens", mongoose.Schema({
    access_token: { type: String, require: true },
    user_id: { type: String, require: true },
    create_at: { type: Date, default: Date.now }
}));