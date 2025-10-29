//  VARIÁVEIS

// ******* Variáveis do Cadastro

let inputEmail = document.getElementById("email");
let inputUser = document.getElementById("username");
let inputPassword = document.getElementById("password");
let inputRepeat_Password = document.getElementById("repeat-password");

const mensagemSucesso = document.querySelector(".mensagem-sucesso");
const btnFecharMensagem = document.querySelector(".mensagem-sucesso .btn-fechar");

// ****** Variáveis do Login
const btn_Register = document.getElementById("btn-register");
const btnLogin = document.getElementById("btn-login");
let usernameInputLogin = document.getElementById("username-login");
let passwordInputLogin = document.getElementById("password-login");

// Var dos Perfis
const perfis = JSON.parse(localStorage.getItem("perfis")) || [];

//  Cadastro
const btn_Cadastrar = document.getElementById("btn-cadastrar");

if (btn_Cadastrar){
btn_Cadastrar.addEventListener("click", (e) => {
    e.preventDefault(); 

    let email = inputEmail.value.trim();
    let user = inputUser.value.trim();
    let password = inputPassword.value.trim();
    let repeat = inputRepeat_Password.value.trim();

//    TESTES por ordem: campos vazios, senhas diferentes e usuário já cadastrado
    if (!email || !user || !password || !repeat) {
        document.querySelector(".mensagem-incompleta").style.display = "block";
        return;
    } else {
        document.querySelector(".mensagem-incompleta").style.display = "none";
    }

    
    if (password !== repeat) {
        document.querySelector(".senha-inexiste").style.display = "block";
        return;
    } else {
        document.querySelector(".senha-inexiste").style.display = "none";
    }

    
    const usuarioExistente = perfis.some((p) => p.email === email || p.user === user);
    if (usuarioExistente) {
        const usuarioExiste = document.querySelector(".existente");
        usuarioExiste.style.display = "block";
        return;
    } else {
        document.querySelector(".existente").style.display = "none";
    }

    // Deu certo:
    perfis.push({ email, user, password });
    localStorage.setItem("perfis", JSON.stringify(perfis));

    mensagemSucesso.style.display = "flex";

    window.userCreated=true;
    nextMission()

    btnFecharMensagem.addEventListener("click", () => {
        mensagemSucesso.style.display = "none";
        window.location.href = "login.html";
    });
});
};


//  Login

if (btnLogin){
btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    let userLogin = usernameInputLogin.value;
    let senhaLogin = passwordInputLogin.value;

    

    const usuarioValido = perfis.find(
        (p) => (p.user === userLogin) && (p.password === senhaLogin)
    );
    console.log("OKAY")

    if (usuarioValido) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
        window.location.href = "main.html";
        window.userLogged = true;
        nextMission();

    }else{
        const erro = document.querySelector(".mensagem-erro");
        erro.style.color = "red";

    }

});
}

