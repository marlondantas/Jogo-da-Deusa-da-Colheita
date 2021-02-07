//https://stackoverflow.com/questions/48969495/in-javascript-how-do-i-should-i-use-async-await-with-xmlhttprequest
async function makeRequest(method, url, body = {}) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open(method, url);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                //console.log(xhr.response);
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(body);
    });
}
//end :by Thắng Trần Xuân

//http requets
async function iniciarJogo(_dificuldade) {
    //alert("Iniciando jogo na dificuldade: "+_dificuldade);
    
    var _servico = 'jogo/'
    var _sistema = 'Web/'
    var _operacao = 'New/'

    var urlEnvio = Host + _servico + _sistema + _operacao+_dificuldade;//TODO colocar dificuldade depois...

    //TODO try
    // xhr.open('GET',urlEnvio);

    // await xhr.send();

    // xhr.onload = function() {
    //     //console.log(xhr.response.USER.Pontos);
    //     let responseObj = xhr.response;
    //     hash = xhr.response.USER.Hash;
    //     updateFeed(responseObj );
    // };
    
    let result = await makeRequest("GET", urlEnvio);
    updateHash(result.User.Hash);
    updateFeed(result);
    //TODO  analise de erro...
    
    displayJogo();
}
async function enviarOpcao(_opcao) {
    //alert("Iniciando jogo na dificuldade: "+_dificuldade);
    if(hash === '' || _opcao === ''){
        console.log(_opcao+hash);
        alert("Jogo não foi corretamente iniciado!");
        return false;
    }

    var _servico = 'jogo/';
    var _sistema = 'Web/';

    //_opcao = 1 -> Maior 
    //_opcao = 0 -> Menor
    var _operacao = 'Maior';
    if(_opcao === 0){
        _operacao = 'Menor';
    }
    
    var _hash = hash+"/";

    var urlEnvio = Host+_servico+_sistema+_hash+_operacao;//TODO colocar dificuldade depois...

    //TODO try

    let result = await makeRequest("GET", urlEnvio);

    //console.log(result.User.Jogo.Status);
    verificarResultado(result.User.Jogo.Status);
    updateFeed(result);

    //TODO  analise de erro...
    

}
async function enviarNome() {

    var _bodyEnviar =JSON.stringify({
        "nome":nome
      });


    var _servico = 'jogo/'
    var _sistema = 'Web/'
    var _hash = hash;

    var urlEnvio = Host + _servico + _sistema + _hash;//TODO colocar dificuldade depois...
    
    let result = await makeRequest("POST", urlEnvio, _bodyEnviar);
    updateFeed(result);
   
}
async function verificarJogador(_Hash) {
    var _servico = 'jogo/';
    var _sistema = 'Web/';
    var _jogador = _Hash;

    urlEnvio = Host+_servico+_sistema+_jogador;//TODO colocar dificuldade depois...

    //TODO try
    let result = await makeRequest("GET", urlEnvio);

    updateHash(result.USER.Hash);
    updateFeed(result);

    //TODO  analise de erro...
}
async function verificarRanking() {
    alert("trabalhando nisso...");
}

//Efeitos
function verificarResultado(_status) {
    if(_status === 'Em jogo'){
        onVitoria();
    }else if(_status === 'Fim de jogo'){
        onDerrota();
    }
}

function onDerrota() {
    Elements.div_lbl_der.style.display = "initial";
    Elements.div_lbl_vit.style.display = "none";
}
function onVitoria() {
    Elements.div_lbl_der.style.display = "none";
    Elements.div_lbl_vit.style.display = "initial";
}

function displayJogo() {
    Elements.div_config.style.display = "none";
    Elements.div_jogo.style.display = "initial";
}
function displayConfiguracao() {
    Elements.div_jogo.style.display = "none";
    Elements.div_config.style.display = "initial";

    Elements.div_lbl_vit.style.display = "none";
    Elements.div_lbl_der.style.display = "none";
}

function updateFeed(_jogo) {

    Elements.lbl_jogo_numero.innerText = _jogo.User.Jogo.Num_atual;
    Elements.lbl_pontos_valor.innerText = _jogo.User.Pontos;
    Elements.lbl_status_men.innerText = _jogo.User.Jogo.Status;
    
    var node = Elements.tbl_hist;
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    
    var rowCount = Elements.tbl_hist.rows.length;
    // for (var i = 1; i < rowCount; i++) {
    //     Elements.tbl_hist.deleteRow(tableHeaderRowCount);
    // }

    for (var prop in _jogo.User.Jogo.Historioco) {
        //console.log("obj." + prop + " = " + _jogo.User.Jogo.Historioco[prop]);
        var row = Elements.tbl_hist.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        // Add some text to the new cells:
        cell1.innerHTML = prop;
        cell2.innerHTML = _jogo.User.Jogo.Historioco[prop];
    }

    return true;
}
function updateHash(_hash) {
    hash = _hash;
}
function updateNome() {
    nome = Elements.txt_enviar_nome.value;
    //console.log(nome);
    enviarNome();
    limparJogo();
}   
function limparJogo() {
    window.location.reload();
}


//main.js
var hash = '';
var nome = '';
let Host = new URL(window.location.href);

var Elements = {
    'lbl_pontos_valor':document.getElementById('lbl_pontos_valor'),
    'lbl_jogo_numero':document.getElementById('lbl_jogo_numero'),
    'lbl_status_men':document.getElementById('lbl_status_men'),
    'txt_enviar_nome':document.getElementById('txt_enviar_nome'),
    'div_jogo':document.getElementById('div_jogo'),
    'div_config':document.getElementById('div_config'),
    'div_lbl_der':document.getElementById('div_lbl_der'),
    'div_lbl_vit':document.getElementById('div_lbl_vit'),
    'tbl_hist':document.getElementById('tbl_hist')
}

window.onload = displayConfiguracao;