function mostrarAlerta(msg) {
    const alerta = document.getElementById('meu-alert');
    const mensagem = document.getElementById('mensagem-alerta');
    mensagem.textContent = msg;
    alerta.style.display = 'block';

    setTimeout(() => {
        alerta.style.display = 'none';
    }, 3000);
    return
}

function fecharAlerta() {
    document.getElementById('meu-alert').style.display = 'none';
    return
}

function tarefas() {
    mostrarAlerta("Ops! Essa função decidiu tirar férias. 😎");
    return
}

function favoritos() {
    mostrarAlerta("Aguardando café do programador para funcionar ☕");
    return
}

function pesquisar() {
    mostrarAlerta("Erro 404: Funcionalidade ainda não inventada. 🚀");
    return
}

function pessoas() {
    mostrarAlerta("Ainda em construção! Mas não se preocupe, o site é seguro! 🔧");
    return
}

function filtro() {
    mostrarAlerta("Essa função está de TPM, volte mais tarde 😅");
    return
}

function ordenar() {
    mostrarAlerta("Em breve: algo incrível vai acontecer aqui… talvez. 🤔");
    return
}

