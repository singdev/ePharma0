const mongoose = require("mongoose");

module.exports = () => {
    
    const local = 'mongodb://localhost:27017/dbname1';    
    const URL = process.env.MONGO_URL || local;
    
    mongoose.connect(URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    
    mongoose.connection.on("error", () => {
        console.log("MongoDB KO");
    });
    
    mongoose.connection.on("open", () => {
        console.log("MongoDB OK");
    });
}