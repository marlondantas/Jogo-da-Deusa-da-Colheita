//Rota da home
//importando
const routes =  require('express').Router();
const interface = require('../controller/Interface.js');

//run -> interface
routes.get('/', interface.Get); //->Read

module.exports = routes; 