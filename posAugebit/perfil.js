var mediaStream;

const downloadLink = document.createElement('a');
downloadLink.textContent = 'Clique aqui para baixar a foto  ';
document.body.appendChild(downloadLink);
downloadLink.style.display = 'block';
downloadLink.style.margin = '30px';
downloadLink.style.textAlign = 'center';

function abrirCamera() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function (stream) {
        mediaStream = stream;
        const areaVideo = document.getElementById('camera');
        areaVideo.srcObject = stream;
    })
    .catch(function (error) {
        console.error('Erro ao acessar a câmera:', error);
    });
}

function tirarFoto() {
    const areaVideo = document.getElementById('camera');
    const canvas = document.createElement('canvas');
    canvas.width = areaVideo.videoWidth;
    canvas.height = areaVideo.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(areaVideo, 0, 0, canvas.width, canvas.height);
    
    // Convertendo a imagem para o formato base64
    const imagedataURL = canvas.toDataURL();
    console.log(imagedataURL)
    // Armazenando a imagem no background da div
    const fotoDiv = document.getElementById('foto');
    fotoDiv.style.backgroundImage = `url(${imagedataURL})`;
    
    // Armazenando o link da imagem no localStorage
    localStorage.setItem('imagemDataURL', imagedataURL);
    
    // Atualizando os atributos do link para download
    downloadLink.href = imagedataURL;
    downloadLink.download = 'foto.png'; 
}

function apagarFoto() {
    // Removendo a imagem do localStorage
    localStorage.removeItem('imagemDataURL');
    
    // Removendo a imagem do background da div e trocando para "foto.png"
    const fotoDiv = document.getElementById('foto');
    fotoDiv.style.backgroundImage = 'url("img/foto.png")';
    
    // Atualizando os atributos do link para download (removendo o link)
    downloadLink.removeAttribute('href');
    downloadLink.removeAttribute('download');
}

function fechar() {
    navigator.mediaDevices.getUserMedia({ video: false });
    const areaVideo = document.getElementById('camera');
    areaVideo.srcObject = null;
    mediaStream = null;
}

// Função para verificar se há uma imagem armazenada no localStorage
function verificarImagemLocalStorage() {
    const imagemArmazenada = localStorage.getItem('imagemDataURL');
    const usuario = JSON.parse(localStorage.getItem('usuarioAtivo'))
    if(usuario.emailData){
        const email = document.getElementById('email')
        email.innerHTML = usuario.emailData
    }
    if (usuario.nomeData) {
        const nomeInput = document.getElementById('nome')
        nomeInput.value = usuario.nomeData
    }
    if (imagemArmazenada) {
        const fotoDiv = document.getElementById('foto');
        fotoDiv.style.backgroundImage = `url(${imagemArmazenada})`;
        // Atualizando os atributos do link para download ao carregar a imagem armazenada
        downloadLink.href = imagemArmazenada;
        downloadLink.download = 'foto.png';
    }else{
        const fotoDiv = document.getElementById('foto');
        fotoDiv.style.backgroundImage = 'url("img/foto.png")';
        
        // Atualizando os atributos do link para download (removendo o link)
        downloadLink.removeAttribute('href');
        downloadLink.removeAttribute('download');
    }
}
function aplicarFoto(){
    window.location.href = 'index.html'
    let nomeEditado = document.getElementById('nome').value
    localStorage.setItem('nomeData', nomeEditado)
    const usuario = JSON.parse(localStorage.getItem('usuarioAtivo'))
    usuario.nomeData = nomeEditado
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
testeprojeto = JSON.parse(localStorage.getItem('projeto1'))
console.log(testeprojeto)

// Chamar a função de verificação quando a página é carregada
verificarImagemLocalStorage();
