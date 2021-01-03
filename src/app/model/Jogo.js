//classe principal do jogo, código autoral
const dataNow = require("./../../../model/Datanow.js"); //--> Recupera a data formatada
const randomInt = require("./../../../model/RandomInt");//--> Gerador de números aleatórios 

const Status_enum = require('./enum/jogoDificuldade_enum.js');
const Opcoes_enum = require('./enum/opcaoJogador_enum.js');

class Jogo{
    constructor(_hash,_dificuldade = Status_enum.FACIL){
        this.Hash = _hash;

        this.Num_antigo = 0;
        this.Num_atual = 0;

        this.Dificuldade = _dificuldade;

        this.Classe = "Jogo";
        this.Data_movimentacao = dataNow.getDataNOW();
    }

    async gerarNumero(){
        var max, min = 0;

        switch (this.Dificuldade) {
            case Status_enum.FACIL:
                min = 0;
                max = 10;
                break;
            case Status_enum.NORMAL:
                min = 0;
                max = 100;
                break;
            case Status_enum.DIFICIL:
                min = 0;
                max = 500;
                break;
            case Status_enum.DEUSA:
                min = 0;
                max = 1000;
                break;
            default:
                //log erro!
                break;
        }
        this.Num_atual = await randomInt.getRandomInt(min,max);
    }

    verificarOpcao(_opcaoJogador){
        var _resultadoJogo;
        if(this.Num_atual > this.Num_antigo){
            //Maior
            _resultadoJogo = Opcoes_enum.MAIOR;
        }
        else if(this.Num_atual < this.Num_antigo){
            //Menor
            _resultadoJogo = Opcoes_enum.MENOR;
        }
        else{
            //Igual
            _resultadoJogo = Opcoes_enum.IGUAL;
        }

        if(_resultadoJogo === _opcaoJogador || _resultadoJogo === Opcoes_enum.IGUAL){
            //Continua...
            console.log('Ganhou!!!');
        } else{
            console.log('Perdeu!!!');
            //Perdeu...
        }
    }

    getHash(){
        return this.Hash;
    }
    setHash(_hash){
        this.Hash = _hash;
    }

    setDificuldade(_dificuldade){
        this.Dificuldade = _dificuldade;
    }
    getDificuldade(){
        return this.Dificuldade;
    }

    setNum_antigo(_num_antigo){
        this.Num_antigo = _num_antigo;
    }
    getNum_antigo(){
        return this.Num_antigo;
    }

    setNum_atual(_Num_atual){
        this.Num_atual = _Num_atual;
    }
    getNum_atual(){
        return this.Num_atual;
    }


    toJSON(){
        return{
            Data_movimentacao:this.Data_movimentacao,
            Classe:this.Classe,
            Num_antigo: this.Num_antigo,
            Num_atual: this.Num_atual,
            Hash:this.Hash
        }
    }

    toString(){
        return this.Classe;
    }

}

module.exports = Jogo;
