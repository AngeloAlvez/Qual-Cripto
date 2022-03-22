let criptoName = '';
let finalCoinName = '';

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function getPrice(quantas, moedaEntrada, moedaSaida, callback) {
    httpGetAsync(`https://api.coingecko.com/api/v3/simple/price?ids=${moedaEntrada}&vs_currencies=${moedaSaida}`, response => {
        callback(response[moedaEntrada][moedaSaida] * quantas)
    })
}
// Exemplo da API \/ \/
//https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl

//pega a seleção do input e transforma no ID necessário pra consumir a API
function nameTransform(option, optionFinal) {
    switch (option) {
        case 'BTC': criptoName = 'bitcoin'; break;
        case 'ETH': criptoName = 'ethereum'; break;
        case 'PVU': criptoName = 'plant-vs-undead-token'; break;
        default: console.log("algo deu errado");
    }
    switch (optionFinal) {
        case 'BRL': finalCoinName = 'brl'; break;
        case 'USD': finalCoinName = 'usd'; break;
        case 'EUR': finalCoinName = 'eur'; break;
        default: console.log("algo deu errado");
    }
}
//formata o resultado final e o mostra na tela
function FinalFormat(price) {
    Math.floor(price)
    document.getElementById('resultado').innerHTML = price.toLocaleString('pt-br', {style: 'currency', maximumFractionDigits:10,  currency: finalCoinName});
}

function ativarBotao() {
    var select = document.getElementById('cripto');
    var option = select.options[select.selectedIndex].value;
    var selectFinal = document.getElementById('moeda-tradicional');
    var optionFinal = selectFinal.children[selectFinal.selectedIndex].value;
    nameTransform(option, optionFinal);
    var valorDigitado = document.querySelector('#valorEmCripto').value
    getPrice(valorDigitado, criptoName, finalCoinName, price => {
        FinalFormat(price)
    })

}

