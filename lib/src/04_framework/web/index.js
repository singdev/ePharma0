const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const webapi = require("./api");
const webapp = require("./app");

module.exports = () => {
    const app = express();
    
    app.use(cors());
    app.use(bodyParser.json({ limit: '1000Mb'}));
    app.use(bodyParser.urlencoded({ extended: true }));
    
    webapp(app);
    webapi(app);
    
    const port = process.env.PORT || 3001;
    
    app.listen(port, () => console.log("App listening at " + port));
}