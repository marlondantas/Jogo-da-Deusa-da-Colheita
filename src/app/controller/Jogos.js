//require ->
const path = require("path");
const user = require("./../model/User.js");
const game = require("./../model/Jogo.js");
const { urlencoded } = require("body-parser");

var _response = {};
var _resposeStatus = 200;
const Conn = global.conn;

async function New(req, res) {
    //jogo/:Sistema/New
    var _sistema = req.params.Sistema;
    var _operacao = arguments.callee.name;

    var _response = {};
    try {
        var User = new user();
        var Game = new game();

        Game.setNum_atual(await Game.gerarNumero())
        
        User.setGame(Game);
        User.setHash(await User.write(Conn));

        console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' Hash '+  User.getHash());
        // Logger.log('Movimentos',_sistema,_operacao,_user,req.params, _response);
        
        _response = {User: User.toJSON()};
        
        res.status(_resposeStatus).json(_response);

    } catch (erroe) {
        console.error('Não foi possivel criar o registro' + erroe);

        _response = {error:erroe};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(500).json(_response);
    }
}

async function New_dificuldade(req, res) {
    //jogo/:Sistema/New/:Dificuldade
    var _sistema = req.params.Sistema;
    var _operacao = arguments.callee.name;

    var _dificuldade = req.params.Dificuldade;

    try {
        var User = new user();
        var Game = new game(_dificuldade);

        Game.setNum_atual(await Game.gerarNumero())
        
        User.setGame(Game);
        User.setHash(await User.write(Conn));

        console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' Hash '+  User.getHash());
        // Logger.log('Movimentos',_sistema,_operacao,_user,req.params, _response);
        
        _response = {User: User.toJSON()};
        
        res.status(_resposeStatus).json(_response);

    } catch (erroe) {
        console.error('Não foi possivel criar o registro' + erroe);

        _response = {error:erroe};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(500).json(_response);
    }
}

async function Get(req, res) {
    //jogo/:Sistema/:User
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;
    try {
        //Busca os dados no banco.
        var User = await new user(_user,Conn);
        await User.read(Conn);
        
        //--console.log(await User.Game.numeroNovo());
        
        //Retorna o status o ultimo jogo e o numero
        _response = {User:User};

        // Logger.log('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(_resposeStatus).json(_response);
        console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' Hash '+  User.getHash());
    } catch (error) {
        console.error('Não foi possivel criar o registro' + error);
        
        _response = {error:error};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(500).json({error:error});
    }
}

//descontinuado
async function Get_menor(req, res) {
    //jogo/:Sistema/:User/Menor
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;
    try {
        var _opcaoJogador = 'MENOR';

        var User = new user(_user);
        await User.read(Conn);
        
        //TODO verifica se o jogo ainda é valido...
        if(User.Game.Status === 'Fim de jogo'){
            _resposeStatus = '406';
            _response = {'Erro':'O jogo já foi finalizado'};
            console.log('O jogo já foi finalizado' + error);

        }else{

        await User.Game.numeroNovo();
        
        var saida = await User.Game.verificarOpcao(_opcaoJogador);
        if (saida){
            await User.aumentarPontos();
        }

        //Update
        await User.update(Conn);
        
        _response = {User:User};
        }
    } catch (error) {
        console.error('Não foi possivel criar o registro ' + error);
        _resposeStatus = '500';
        var _response =await {error:error};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
    }
    finally{
        res.status(_resposeStatus).json(_response);
    }
    console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' _user '+ _user);
}
//descontinuado
async function Get_maior(req, res) {
    //jogo/:Sistema/:User/Maior
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;
    try {
        var _opcaoJogador = 'MAIOR';

        var User = new user(_user);
        await User.read(Conn);
        
        //TODO verifica se o jogo ainda é valido...

        await User.Game.numeroNovo();
        
        var saida = await User.Game.verificarOpcao(_opcaoJogador);
        if (saida){
            await User.aumentarPontos();
        }

        //Update
        await User.update(Conn);
        
        _response = {User:User};
        res.status(_resposeStatus).json(_response);

    } catch (error) {
        console.error('Não foi possivel criar o registro ' + error);

        var _response = await {error:error};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(500).json({error:error});
    }

    console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' _user '+ _user);

}

async function Get_opcao(req, res) {
    //jogo/:Sistema/:User/:Opcao
    console.log("-> Get_opcao");
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;
    try {
        var _opcaoJogador = req.params.Opcao;
        _opcaoJogador = _opcaoJogador.toUpperCase();

        var User = new user(_user);
        await User.read(Conn);
        
        //TODO verifica se o jogo ainda é valido...
        if(User.Game.Status === 'Fim de jogo'){
            _resposeStatus = '406';
            _response = {'Erro':'O jogo já foi finalizado'};
            console.log('O jogo já foi finalizado');

        }else{

            await User.Game.numeroNovo();
            
            var saida = await User.Game.verificarOpcao(_opcaoJogador);
            if (saida){
                await User.aumentarPontos();
            }

            //Update
            await User.update(Conn);
            _response = {User:User};
        }
    } catch (error) {
        console.error('Não foi possivel criar o registro ' + error);
        _resposeStatus = '500';
        var _response = await {error:error};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
    }
    finally{
        res.status(_resposeStatus).json(_response);
    }

    console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' _user '+ _user);
}

async function Post(req, res) {
    //jogo/:Sistema/:User
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;
    try {
        //TODO Log informativo do sistema.
        var User = new user(_user);
        await User.read(Conn);
        
        var nomePost = req.body.nome;

        await User.setNome(nomePost);

        //Update
        await User.update(Conn);
        
        _response = {User:User};
        res.status(_resposeStatus).json(_response);

    } catch (error) {
        console.error('Não foi possivel criar o registro ' + error);

        var _response =await {error:error};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(500).json({error:error});
    }

    console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' _user '+ _user);
}

module.exports = {New, Get, Get_menor, Get_maior, Get_opcao, Post, New_dificuldade};