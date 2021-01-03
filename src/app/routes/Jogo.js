//Rota da home
//importando
const routes =  require('express').Router();
const game = require('../controller/jogos.js');

//run
routes.get('/jogo/:Sistema/New', game.New); //->Read

routes.get('/jogo/:Sistema/:User', game.Get); //->Read

routes.put('/jogo/:Sistema/:User/Maior', game.Put_maior); //->Update -> Maior
routes.put('/jogo/:Sistema/:User/Menor', game.Put_menor); //->Update -> Menor

routes.post('/jogo/:Sistema/:User', game.Post); //-> Create

module.exports = routes; 