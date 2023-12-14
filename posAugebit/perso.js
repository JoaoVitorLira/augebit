const fotoDiv = document.getElementById('fotoPerfilDiv'),
    camadaEditarPerfil = document.getElementById('porCima')


fotoDiv.addEventListener('mouseenter', () => {
    camadaEditarPerfil.style.display = 'flex'
})
fotoDiv.addEventListener('mouseleave', () => {
    camadaEditarPerfil.style.display = 'none'
})
fotoDiv.addEventListener('click', () => {
    console.log('oi')
    window.location.href = 'perfil.html'
})
function verificarImagemLocalStorage() {
    const imagemArmazenada = localStorage.getItem('imagemDataURL');
    const usuario = JSON.parse(localStorage.getItem('usuarioAtivo'))
    const spanPC = document.getElementById('spanPC')
    const spanMMP = document.getElementById('spanMMP')
    const spanDEA = document.getElementById('spanDEA')
console.log(usuario)
    spanPC.innerHTML = usuario.projetosCompletos
    spanMMP.innerHTML = usuario.mentorMaisProcurado
    spanDEA.innerHTML = usuario.dataDeEntrada
    if(usuario.emailData){
        const email = document.getElementById('email')
        email.innerHTML = usuario.emailData
    }
    if (usuario.nomeData) {
        console.log('temnome')
        const nome = document.getElementById('nome')
        nome.innerHTML = usuario.nomeData
    }
    if (imagemArmazenada) {
        console.log('tem')
        const fotoPerfil = document.getElementById('fotoDePerfil');
        fotoPerfil.style.backgroundImage = `url(${imagemArmazenada})`;
        // Atualizando os atributos do link para download ao carregar a imagem armazenada
        // downloadLink.href = imagemArmazenada;
        // downloadLink.download = 'foto.png';
    }
}
verificarImagemLocalStorage()