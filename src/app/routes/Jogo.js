//Rota da home
//importando
const routes =  require('express').Router();
const game = require('./../controller/Jogos.js');

//run -> Jogo
routes.get('/jogo/:Sistema/New', game.New); //->Read
routes.get('/jogo/:Sistema/New/:Dificuldade', game.New_dificuldade); //->Read

routes.get('/jogo/:Sistema/:User', game.Get); //->Read

routes.get('/jogo/:Sistema/:User/:Opcao', game.Get_opcao); //->Update -> Menor
routes.get('/jogo/:Sistema/:User/Maior', game.Get_maior); //->Update -> Maior
routes.get('/jogo/:Sistema/:User/Menor', game.Get_menor); //->Update -> Menor

routes.post('/jogo/:Sistema/:User', game.Post); //-> Create

module.exports = routes; 