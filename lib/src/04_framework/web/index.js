const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require('http');


const webapi = require("./api");
const webapp = require("./app");

const realTimeServer = require("./realtime/server");

module.exports = () => {
    const app = express();
    const server = http.createServer(app);
    
    app.use(cors());
    app.use(bodyParser.json({ limit: '1000Mb'}));
    app.use(bodyParser.urlencoded({ extended: true }));
    
    webapp(app);
    webapi(app);
    realTimeServer(server);
    
    const port = process.env.PORT || 3000;
    
    server.listen(port, () => console.log("App listening at " + port));
}