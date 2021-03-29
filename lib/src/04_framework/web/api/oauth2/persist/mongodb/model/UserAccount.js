const mongoose = require("mongoose");

module.exports = mongoose.model("UserAccount", mongoose.Schema({
    username: { type: String, require: true, unique: true },
    user_password: { type: String },
    lastConnection: { type: Date },
    lastActivity: { type: Date },
    isActive: { type: Boolean, default: false },
    create_at: { type: Date, default: Date.now }
}));