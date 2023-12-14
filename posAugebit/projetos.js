const articleProjetos = document.getElementById('projetos')
const fotoDiv = document.getElementById('fotoPerfil');

articleProjetos.addEventListener('dragover', function (e) {
    e.preventDefault();
    const projetos = document.querySelectorAll('.projeto');
    
    // Adicionando uma classe para destacar a div durante o drag
    for (const p of projetos) {
        p.classList.remove('hovered');
    }

    const mouseY = e.clientY;

    for (const p of projetos) {
        const retangulo = p.getBoundingClientRect();
        const centroY = retangulo.top + retangulo.height / 2;

        if (mouseY < centroY) {
            p.classList.add('hovered');
            break;
        }
    }
});

articleProjetos.addEventListener('dragleave', function () {
    const projetos = document.querySelectorAll('.projeto');
    
    // Removendo a classe quando o mouse deixa a área
    for (const p of projetos) {
        p.classList.remove('hovered');
    }
});

// Adicionando um ouvinte de evento para o evento "drop" no elemento de projetos
articleProjetos.addEventListener('drop', function (e) {
    e.preventDefault();
    const projetos = document.querySelectorAll('.projeto');
    
    // Removendo a classe ao soltar
    for (const p of projetos) {
        p.classList.remove('hovered');
    }

    // Obtendo o ID do projeto que está sendo arrastado
    const projetoID = e.dataTransfer.getData('text/plain');

    // Encontrando o elemento do projeto com base no ID
    const projeto = document.getElementById(projetoID);

    // Obtendo a posição do mouse no momento do soltar
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Obtendo uma lista de todos os projetos

    // Encontrando o projeto antes do qual o projeto arrastado será inserido
    let projetoAlvo = null;
    for (const p of projetos) {
        const retangulo = p.getBoundingClientRect();
        const centroY = retangulo.top + retangulo.height / 2;

        // Inserir antes do projeto se o mouse estiver acima do centro do projeto
        if (mouseY < centroY) {
            projetoAlvo = p;
            break;
        }
    }

    // Inserindo o projeto na posição correta
    if (projetoAlvo) {
        articleProjetos.insertBefore(projeto, projetoAlvo);
    } else {
        articleProjetos.appendChild(projeto);
    }
});
fotoDiv.addEventListener('click', () => {
    window.location.href = 'perfil.html'
})
function verificarImagemLocalStorage() {
    const imagemArmazenada = localStorage.getItem('imagemDataURL');
    if (imagemArmazenada) {
        fotoDiv.style.backgroundImage = `url(${imagemArmazenada})`;
        // Atualizando os atributos do link para download ao carregar a imagem armazenada
    }else{
        fotoDiv.style.backgroundImage = 'url("img/foto.png")';
        
        // Atualizando os atributos do link para download (removendo o link)
    }
}
function averiguarProjetos(){
    articleProjetos.innerHTML = ''
    for (let i = 0; i < 6; i++){
        let infosProjeto = JSON.parse(localStorage.getItem(`projeto${i+1}Data`))
        // console.log(infosProjeto)
        const projeto = document.createElement('div')
        projeto.classList.add('projeto')
        projeto.id = `projeto${i+1}`
        const titulos = document.createElement('div')
        titulos.classList.add('titulos')
        projeto.appendChild(titulos)
        const img = document.createElement('div')
        const h3Titulo = document.createElement('h3')
        const h4Sub = document.createElement('h4')
        img.classList.add('img')
        h3Titulo.classList.add('titulo')
        h4Sub.classList.add('sub')
        titulos.appendChild(img)
        titulos.appendChild(h3Titulo)
        titulos.appendChild(h4Sub)
        articleProjetos.appendChild(projeto)
        projeto.setAttribute('data-projeto', `projeto${i+1}`)
        projeto.setAttribute('data-status', 'livre')
        projeto.classList.remove('selecionada')
        projeto.setAttribute('draggable', true);  // Adicionando a capacidade de arrastar
        projeto.addEventListener('dragstart', function (e) {
            // Configurando os dados que serão transferidos durante o arrastar
            e.dataTransfer.setData('text/plain', projeto.id);
        });
        if (infosProjeto){
            // console.log('tem')
            img.style.display = 'none'
            h3Titulo.style.display = 'block'
            h4Sub.style.display = 'block'
            h3Titulo.innerHTML = infosProjeto.nome
            h4Sub.innerHTML = `Professor ${infosProjeto.mentor}`
            projeto.addEventListener('mouseover', () => {
                projeto.style.cursor = 'pointer'
            })
            projeto.addEventListener('click', () => mostrarProjetoDiv(i+1, infosProjeto.nome, infosProjeto.mentor, infosProjeto.desc, infosProjeto.diaInicio));
        }else{
            img.style.display = 'block'
            h3Titulo.style.display = 'none'
            h4Sub.style.display = 'none'
            img.style.backgroundImage = 'url(img/addImagem.png)'
            img .style.height = '60px'
            img.style.width = '60px'
            img.style.backgroundRepeat = 'no-repeat'
            // projeto.style.backgroundColor = '#9A99FF'
            projeto.classList.add('semNada')
            projeto.addEventListener('mouseover', () => {
                projeto.style.cursor = 'pointer'
            })
            projeto.addEventListener('click', () => criarProjetoDiv(i+1));
            
            
        }
        
    }
}


function criarProjetoDiv(projetoNum){
    
    localStorage.setItem('nData', projetoNum    )

    const divCriacao = document.getElementById('projetosInfos')
    divCriacao.innerHTML = `<form class="criarProjeto">
    <div class="inputFoto">
    <div class="inputs">
    <div class="inputDiv">
    <label for="nome">Nome do projeto:</label>
    <input id="nomeProjetoInput" name="nome" type="text">
    </div>
    <div class="inputDiv">
    <label for="desc">Descrição do projeto:</label>
    <textarea name="desc" id="descricaoProjetoInput" cols="30" rows="10"></textarea>
    </div>
    <div class="inputDiv">
    <label for="mentor">Escolher mentor</label>
    <select name="mentor" id="mentorProjetoInput">
    <option value="Marcos">Marcos</option>
    <option value="Pedro">Pedro</option>
    <option value="Victor">Victor</option>
    <option value="Brendon">Brendon</option>
    <option value="Joao">Joao</option>
    <option value="Juliana">Juliana</option>
    <option value="Francisco">Francisco</option>
    </select>
    </div>
    </div>
    <div class="forma">
    <img src="img/Group 6 (2).png" alt="">
    </div>
    </div>
    <button id="botaoEnviarFormularioCriacao">
    Enviar
    <div class="arrow-wrapper">
    <div class="arrow"></div>
    
    </div>
    </button>
    </form>`
    
    // console.log(projetoNum)
    const BotaoEnviar = document.getElementById('botaoEnviarFormularioCriacao')
    BotaoEnviar.addEventListener('click', () => enviarInfosCriadas(projetoNum))
    selecaoProjeto()
}


function mostrarProjetoDiv(n, titulo, mentor, desc, data){
    localStorage.setItem('nData', n)


    const divCriacao = document.getElementById('projetosInfos') 

    if(titulo == 'snake' && mentor == 'Joao'){
        divCriacao.innerHTML = `<div class="geralDentro">
        <div id="jogo">
            <canvas id="espaco" width="600" height="600"></canvas>
            <div>
                <div id="pontos"> Pontuação: 0 </div>
                <div class="desenvolvimento">
                    <button type="button" id="botaoApagar" class="buttono">
                    <div class="button-top">Concluir Projeto</div>
                    <div class="button-bottom"></div>
                    <div class="button-base"></div>
                    </button>
                </div>
            </div>
        </div>
        </div>`


        const botaoApagar = document.getElementById('botaoApagar')
        botaoApagar.addEventListener('click', () => apagarProjeto(n))
        selecaoProjeto()
        carregarJoguinho()
    }else{
        divCriacao.innerHTML = `<div class="geralDentro">
        <div class="infosChave">
        <div class="titulosData">
        <div class="titulos">
        <h2 class="titulo">${titulo}</h2>
        <h3 class="sub">${mentor}</h3>
        </div>
        <p class="dataInicio">${data}</p>
        </div>
        <div class="texto">
        <p class="texto">${desc}</p>
        </div>
        </div>
        <div class="desenvolvimento">
        Aguardando o relatório do professor...
        <button type="button" id="botaoApagar" class="buttono">
        <div class="button-top">Concluir Projeto</div>
        <div class="button-bottom"></div>
        <div class="button-base"></div>
        </button>
        </div>
        </div>`
        
        const botaoApagar = document.getElementById('botaoApagar')
        botaoApagar.addEventListener('click', () => apagarProjeto(n))
        selecaoProjeto()
    }
    
    
    
}

function apagarProjeto(n){
    console.log('oi')
    console.log(`projeto${n}`)
    localStorage.removeItem(`projeto${n}Data`)
    console.log(JSON.parse(localStorage.getItem(`projeto${n}Data`)))
    averiguarProjetos()
    location.reload()
    const usuario = JSON.parse(localStorage.getItem('usuarioAtivo'))
    usuario.projetosCompletos++
    const novasInfos = {
        nomeData:usuario.nomeData,
        cpfData:usuario.cpfData,
        emailData:usuario.emailData,
        telefoneData:usuario.telefoneData,
        senhaData:usuario.senhaData,
        projetosCompletos: usuario.projetosCompletos,
        mentorMaisProcurado: usuario.mentorMaisProcurado,
        dataDeEntrada: usuario.dataDeEntrada
    }
    localStorage.setItem('usuarioAtivo', JSON.stringify(novasInfos) )
    
}

function enviarInfosCriadas(n){
    let escolhaDeMentores = JSON.parse(localStorage.getItem('escolhaDeMentores'))
    
    if(escolhaDeMentores == null){
        escolhaDeMentores = {
            Marcos:0,
            Pedro:0,
            Victor:0,
            Brendon:0,
            Joao:0,
            Juliana:0,
            Francisco:0
        }
    }
    console.log(escolhaDeMentores)
    
    
    const dataAtual = new Date();
    
    // Obter dia, mês e ano
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Lembre-se de que os meses começam do zero (janeiro é 0)
    const ano = String(dataAtual.getFullYear()).slice(-2); // Obter os últimos dois dígitos do ano
    
    // Formatar como 00/00/00
    const dataFormatada = `${dia}/${mes}/${ano}`;
    let nomeDoProjeto = document.getElementById('nomeProjetoInput').value
    let descDoProjeto = document.getElementById('descricaoProjetoInput').value
    let mentorDoProjeto = document.getElementById('mentorProjetoInput').value
    let projetoArray ={
        nome: nomeDoProjeto,
        desc: descDoProjeto,
        mentor: mentorDoProjeto,
        diaInicio: dataFormatada
    }
    if (mentorDoProjeto == 'Marcos'){
        escolhaDeMentores.Marcos++
    }
    if (mentorDoProjeto == 'Pedro'){
        escolhaDeMentores.Pedro++
    }
    if (mentorDoProjeto == 'Victor'){
        escolhaDeMentores.Victor++
    }
    if (mentorDoProjeto == 'Brendon'){
        escolhaDeMentores.Brendon++
    }
    if (mentorDoProjeto == 'Joao'){
        escolhaDeMentores.Joao++
    }
    if (mentorDoProjeto == 'Juliana'){
        escolhaDeMentores.Juliana++
    }
    if (mentorDoProjeto == 'Francisco'){
        escolhaDeMentores.Francisco++
    }
    escolhaDeMentores = {
        Marcos:escolhaDeMentores.Marcos,
        Pedro:escolhaDeMentores.Pedro,
        Victor:escolhaDeMentores.Victor,
        Brendon:escolhaDeMentores.Brendon,
        Joao:escolhaDeMentores.Joao,
        Juliana:escolhaDeMentores.Juliana,
        Francisco:escolhaDeMentores.Francisco
    }
    
    localStorage.setItem('escolhaDeMentores', JSON.stringify(escolhaDeMentores))
    const usuario = JSON.parse(localStorage.getItem('usuarioAtivo'))
    
    usuario.mentorMaisProcurado = encontrarMaiorValor(escolhaDeMentores)
    
    const novasInfos = {
        nomeData:usuario.nomeData,
        cpfData:usuario.cpfData,
        emailData:usuario.emailData,
        telefoneData:usuario.telefoneData,
        senhaData:usuario.senhaData,
        projetosCompletos: usuario.projetosCompletos,
        mentorMaisProcurado: usuario.mentorMaisProcurado,
        dataDeEntrada: usuario.dataDeEntrada
    }
    localStorage.setItem('usuarioAtivo', JSON.stringify(novasInfos) )

    console.log(`projeto${n}`)
    localStorage.setItem(`projeto${n}Data`, JSON.stringify(projetoArray))
    averiguarProjetos()

}

function encontrarMaiorValor(objeto) {
  // Inicializa variáveis para armazenar o nome da variável e o maior valor encontrado
  let nomeVariavelMaiorValor = null;
  let maiorValor = -Infinity;

  // Percorre as propriedades do objeto
  for (let chave in objeto) {
    // Verifica se a propriedade é própria do objeto (não herdada)
    if (objeto.hasOwnProperty(chave)) {
      // Verifica se o valor associado à propriedade é maior que o valor atual
      if (objeto[chave] > maiorValor) {
        // Atualiza o nome da variável e o maior valor encontrado
        nomeVariavelMaiorValor = chave;
        maiorValor = objeto[chave];
      }
    }
  }

  // Retorna o nome da variável com o maior valor
  return nomeVariavelMaiorValor;
  }

function selecaoProjeto(){


    let nAtual = localStorage.getItem('nData')
    averiguarProjetos()
    divSelecionada = document.getElementById(`projeto${nAtual}`)
    divSelecionada.classList.add('selecionada')


}


function carregarJoguinho(){
    var stage = document.getElementById("espaco");
    var ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush)


    setInterval(jogo, 95); //define intervalo para uma função ser chamada no jogo varias vezes (a cada 60 milisegundos)


    const vel = 1; //velocidade = quantas casas a cobrinha vai andar quando chamar a função jogo

    var vx = vy = 0;
    var px = 10; //onde se inicia no eixo x (posição da cobra)
    var py = 15; // onde se inicia no eixo y
    var tm = 30; //tamanho da maçã
    var qm = 20; //quantas maçãs podem caber
    var mx = my = 15; //posição inicial da maçã
    var pontuacao = 0;


    var trail = [];
    tail = 5;//tamanho da cauda

    function jogo() {
        px += vx; //posição onde a cobra ja está + a velocidade que ela tem, ou seja pra onde ela esta se movimentando
        py += vy;
        if (px < -1) {
            alert("[GAME OVER] Você TROMBOU na parede!\nSua pontuação: " + pontuacao);
            // alert("[GAME OVER] Você TROMBOU na parede!\nSua pontuação: " + pontuacao);
           window.location.href = "index.html";
        }//se a cobra ta vindo para esquerda e acaba encostando na borda, o jogo acaba
        if (px > qm) {
            alert("[GAME OVER] Você TROMBOU na parede!\nSua pontuação: " + pontuacao);
            window.location.href = "index.html";
        }
        if (py < -1) {
            alert("[GAME OVER] Você TROMBOU na parede!\nSua pontuação: " + pontuacao);
            window.location.href = "index.html";
        }
        if (py > qm) {
            alert("[GAME OVER] Você TROMBOU na parede!\nSua pontuação: " + pontuacao);
           window.location.href = "index.html";
        }// faz a cobra não sair da borda



        ctx.fillStyle = "#1e1e2b";//cor do tabuleiro
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "red";//cor da maçã
        ctx.fillRect(mx * tm, my * tm, tm, tm)//coloca a maçã na posição definida(posição vezes o tamanho e bla bla bla...)

        ctx.fillStyle = "#4747D9"//cor da cobrinha
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tm, trail[i].y * tm, tm, tm);
            if (trail[i].x == px && trail[i].y == py) {
                vx = vy=0;
                tail = 5;
            } //pega a posição do rastro e assim pinta a cobra (calcula a posição e tamanho da cobra para que dessa forma colorir o espaço do rastro da própria, assim dando a impressão de que a cobra aumentou de tamanho)

        }

        //movimento da cobra:

        trail.push({ x: px, y: py })
        while (trail.length > tail) {
            trail.shift(); //tira o primeiro elemento que está no array se for maior que a nossa cauda
        }

        if (mx==px && my==py) {
            tail++; //adiciona mais um elemento na cauda
            mx = Math.floor(Math.random() *qm); //posiciona a maçã em outro local do tabuleiro
            my = Math.floor(Math.random() *qm);
            let qp = 0;
            pontuacao++;
            atualizarPontuacao(); // chama uma função para atualizar a exibição da pontuação
           
            
        }

        function atualizarPontuacao() {
            var pontuacaoElemento = document.getElementById("pontos"); 
            pontuacaoElemento.textContent = "Pontuação: " + pontuacao;
        }


    }

    //Programação das teclas que vão movimentar a cobrinha(com b)
    function keyPush(event) {
        switch (event.keyCode) {
            case 37: //Seta da esquerda
                vx = -vel; //mexe pra esquerda
                vy = 0;
                break;
            case 38: //Seta de cima
                vx = 0;
                vy = -vel; //mexe de baixo pra cima (ent vai ir pra cima)
                break;
            case 39: //Seta da direita
                vx = vel; // mexe pra direita
                vy = 0;
                break;
            case 40: //Seta de BAIXO
                vx = 0;
                vy = vel; //mexe de baixo pra cima
                break;
            default:

                break;
        }
    }
    
}

window.onload = () =>{
    let nAtual = localStorage.getItem('nData')
    let infosProjeto = JSON.parse(localStorage.getItem(`projeto${nAtual}Data`))
    if(infosProjeto){
        mostrarProjetoDiv(nAtual, infosProjeto.nome, infosProjeto.mentor, infosProjeto.desc, infosProjeto.diaInicio)
    }else{
        criarProjetoDiv(nAtual)
    }
    selecaoProjeto()
}

averiguarProjetos()
verificarImagemLocalStorage()
