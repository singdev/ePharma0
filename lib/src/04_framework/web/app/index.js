const express = require("express");

const routes = require('./routes');

module.exports = (app) => {
    
    app.use(express.static(__dirname + '/public'));
    
    app.set('view engine', 'pug');
    app.set('views', __dirname + '/views');
    
    routes(app);
}