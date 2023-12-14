const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const usuarioLogin = document.getElementById('usuarioLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(usuario)
    if (usuario && usuario.emailCadastro === usuarioLogin && usuario.senhaCadastro === senhaLogin || usuario && usuario.cpfCadastro === usuarioLogin && usuario.senhaCadastro === senhaLogin) {
      alert('Login realizado com sucesso!');
      form.reset();
      location.href = '../../posAugebit/index.html';
    } else {
      alert('Usuario ou senha incorretos.');
    }
    
  });