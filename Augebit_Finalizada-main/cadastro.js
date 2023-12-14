
const form = document.getElementById('form');

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const nomeCadastro = document.getElementById('nomeCadastro').value;
    const cpfCadastro = document.getElementById('cpfCadastro').value;
    const emailCadastro = document.getElementById('emailCadastro').value;
    const telefoneCadastro = document.getElementById('telefoneCadastro').value;
    const senhaCadastro = document.getElementById('senhaCadastro').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if(validarCPF(cpfCadastro)){
        if(senhaCadastro === confirmarSenha){
            localStorage.clear()
            const usuario = {nomeCadastro:nomeCadastro, cpfCadastro:cpfCadastro, emailCadastro:emailCadastro, telefoneCadastro:telefoneCadastro, senhaCadastro:senhaCadastro}
            localStorage.setItem('usuario', JSON.stringify(usuario))
            alert("Seja bem vindo!")

            const dataAtual = new Date();

            // Obter dia, mês e ano
            const dia = String(dataAtual.getDate()).padStart(2, '0');
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Lembre-se de que os meses começam do zero (janeiro é 0)
            const ano = String(dataAtual.getFullYear()).slice(-2); // Obter os últimos dois dígitos do ano
        
            // Formatar como 00/00/00
            const dataFormatada = `${dia}/${mes}/${ano}`;

            let usuarioAtual = {
                nomeData:nomeCadastro,
                cpfData:cpfCadastro,
                emailData:emailCadastro,
                telefoneData:telefoneCadastro,
                senhaData:senhaCadastro,
                projetosCompletos: 0,
                mentorMaisProcurado: '',
                dataDeEntrada: dataFormatada
            }

            localStorage.setItem('usuarioAtivo', JSON.stringify(usuarioAtual))


            window.location.href = 'login.html'
        }else{
            alert('duas senhas diferentes')
        }
    }else{
        console.log('nao')
        alert('cpf invalido')
    }
    
})

document.querySelectorAll('.PE').forEach(btn => {
    btn.addEventListener('click', function() {
        const tipo = this.getAttribute('data-tipo');
        Escolher(tipo);
    });
});

function Escolher(tipo) {
    fetch(`cadastro_${tipo}.json`)
        .then(resposta => resposta.json())
        .then(texto => {
            document.getElementById('nome').innerHTML = texto.nome;
            document.getElementById('cpf').innerHTML = texto.cpf;

            document.querySelectorAll('.PE').forEach(btn => btn.classList.remove('ativo'));

            document.querySelector(`.PE[data-tipo="${tipo}"]`).classList.add('ativo');
        })
        .catch(error => console.error('Erro buscando textos:', error));
}

function validarCPF(cpf) {
    // Remover caracteres não numéricos do CPF
    cpf = cpf.replace(/\D/g, '');

    // Verificar se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verificar se todos os dígitos são iguais, o que é inválido
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Calcular e verificar o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = (resto === 10 || resto === 11) ? 0 : resto;

    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Calcular e verificar o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = (resto === 10 || resto === 11) ? 0 : resto;

    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
        return false;
    }

    // Se chegou até aqui, o CPF é válido
    return true;
}



document.addEventListener('DOMContentLoaded', function () {
    var senhaInput = document.getElementById('senhaCadastro');
    var mostrarSenhaSpan = document.getElementById('mostrarSenha');
  
    mostrarSenhaSpan.addEventListener('click', function () {
      // Altera o tipo de input para "text" quando o span é clicado
      senhaInput.type = (senhaInput.type === 'password') ? 'text' : 'password';
  
      // Adiciona/remova a classe 'mostrando' ao span
      mostrarSenhaSpan.classList.toggle('mostrando');
    });
  });