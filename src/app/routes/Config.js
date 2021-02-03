 //Rota da home
//importando
const routes =  require('express').Router();
const config = require('../controller/Config.js');

//run -> configure
routes.post('/config', config.Post); //->Read

module.exports = routes; 