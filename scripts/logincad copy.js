//  SALVAR USUÁRIOS

let inputEmail = document.getElementById("email");
let inputUser = document.getElementById("username");
let inputPassword = document.getElementById("password");
let inputRepeat_Password = document.getElementById("repeat-password");

const mensagemSucesso = document.querySelector(".mensagem-sucesso");
const btnFecharMensagem = document.querySelector(".mensagem-sucesso .btn-fechar");


const perfis = JSON.parse(localStorage.getItem("perfis")) || [];

//  Cadastro

const btn_Cadastrar = document.getElementById("btn-cadastrar")

btn_Cadastrar.addEventListener("click", (e) => {


    let email = inputEmail.value.trim();
    let user = inputUser.value.trim();
    let password = inputPassword.value.trim();
    let repeat = inputRepeat_Password.value.trim();

    if (!email || !user || !password || !repeat) {
        const incompleto = document.querySelector(".mensagem-incompleta");
        incompleto.style.display = "block";
        return;
    } else{
        document.querySelector(".mensagem-incompleta").style.display = "none";

    }
    if (password !== repeat) {
        const incongruente = document.querySelector(".senha-inexiste");
        incongruente.style.display = "block";
        return;
    } else{
        document.querySelector(".senha-inexiste").style.display = "none";
    }

    // Limitar duplicada de usuários

    const usuarioExistente = perfis.some((p) => p.email === email || p.user === user);
    if (usuarioExistente) {
        const usuarioExiste = document.querySelector(".existente");
        usuarioExiste.style.display = "block";
        return;

    }else{
        document.querySelector(".existente");
        usuarioExiste.style.display = "none";
    }

    perfis.push({ email, user, password });
    localStorage.setItem("perfis", JSON.stringify(perfis));
    mensagemSucesso.style.display = "flex";

    btnFecharMensagem.addEventListener("click", () => {
        mensagemSucesso.style.display = "none";

        window.location.href = "index.html";
    });



})


