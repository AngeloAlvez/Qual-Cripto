let valorBitcoin = 193695.26;
let valorPVU = 0.27;
let valorETH = 13767.61

// let valorDolar = ;
// let valorEuro = ;
// let valorReal = ;
function ativarBotao(){
    let valorDigitado = document.querySelector('#valorEmCripto')
    document.getElementById('resultado').innerHTML = parseFloat(valorDigitado.value*valorETH).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ;
   
}    