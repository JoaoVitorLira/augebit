var senhaCadastro = document.getElementById('senhaCadastro');
var poderRequisito = document.getElementById('poderRequisito');
var textoPoder = document.getElementById('textoPoder');
var mostrarSenha = document.getElementById('mostrarSenha');
var medidorPoder = document.getElementById('medidorPoder');

//executar função ao digitar a senha
senhaCadastro.addEventListener('input', function (){
    var senha = senhaCadastro.value;
    var Poder = verificarPoder(senha);

    // Cores baseadas na força da senha (vermelho, amarelo, verde)
    var cor = Poder < 50 ? 'red' :  Poder < 80 ? ' yellow' : 'green';

    // Transições CSS
    
    medidorPoder.style.width = Poder + '%';
    medidorPoder.style.backgroundColor = cor;

    // Atualiza o texto
    textoPoder.innerText = 'Força da Senha : ' + Poder + '%';

    // Atualiza os indicadores de requisitos
    atualizar(senha);
});

//MostrarSenha
mostrando.addEventListener('click', function(){
    senhaCadastro.type = senhaCadastro.type === 'password' ? 'text' : 'password';
});

mostrarSenha.addEventListener('click', function(){
    senhaCadastro.type = senhaCadastro.type === 'password' ? 'text' : 'password';
});


// Função para calcular a força da senha 
function verificarPoder(senha) {
    var comprimentoMinimo = 10;
    var possuiMinuscula = /[a-z]/.test(senha);
    var possuiMaiuscula = /[A-Z]/.test(senha);
    var possuiNumeros = /\d/.test(senha);
    var possuiSimbolo = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(senha);
    
    // Pontos com base nas regras
    var Poder = 0;

    if (senha.length >= comprimentoMinimo) {
        Poder += 25;
    }

    if (possuiMinuscula) {
        Poder += 25;
    } 

    if (possuiMaiuscula) {
        Poder += 25;
    }

    if (possuiNumeros) {
        Poder += 25;
    } 

    if (possuiSimbolo) {
        Poder += 25;
    }

    return Math.min(100, Poder);

}

// Função para atualizar indicadores de requisitos
function atualizar(senha) {
    verificarPoder(senha);
}