// === Drag and Drop
const columns = document.querySelectorAll(".tabela-task");

function dragDrop() {


  document.querySelectorAll(".task").forEach(task => {
    task.addEventListener("dragstart", e => {
      e.target.classList.add("dragging");
    });

    task.addEventListener("dragend", e => {
      e.target.classList.remove("dragging");
    });
  });

  columns.forEach(column => {
    column.addEventListener("dragover", e => {
      e.preventDefault();

      const dragging = document.querySelector(".dragging");
      if (!dragging) return;

      const afterElement = getNewPosition(column, e.clientY);

      if (!afterElement) {
        column.appendChild(dragging);
      } else {
        afterElement.insertAdjacentElement("afterend", dragging);
      }
    });
  });

}


function getNewPosition(column, posY) {
  const cards = column.querySelectorAll(".task:not(.dragging)");
  let result = null;

  for (const card of cards) {
    const box = card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;
    if (posY >= boxCenterY) result = card;
  }
  return result;
}

// ======= Kanban =======

let btn_Fechar = document.querySelector(".btn-fechar");
let add_Tabela = document.querySelector(".add-Tabela");
let lista_Tabelas = document.querySelector(".tabelas");
let inputTabelaNome = document.getElementById("nomeTabela");
var tabelasListadas = carregarTabela();
let idTabela = 0;

btn_Fechar.addEventListener("click", fecharTabela);

if (tabelasListadas.length > 0) {
  let idMaior = Math.max(...tabelasListadas.map(item => item.idTabela));
  idTabela = idMaior + 1;
}

function adicionarTabela() {
  inputTabelaNome.focus();
  add_Tabela.style.display = "";
  animateAbrirFechar(add_Tabela, 0, 1);
}

async function addTable() {
  let tabelaNova = inputTabelaNome.value;
  if(tabelaNova.trim() == ""){
    return;
  }
  const objTab = { tabelaNova, idTabela: idTabela++ };

  tabelasListadas.push(objTab);
  listarTabelas();
  armazenar();

  inputTabelaNome.value = "";
  await fecharTabela();
}

function listarTabelas() {
  lista_Tabelas.innerHTML = "";
  for (let i = 0; i < tabelasListadas.length; i++) {
    const listaTable = tabelasListadas[i];
    criarTabela(listaTable.idTabela, listaTable.tabelaNova);
  }
  armazenar();
}

function armazenar() {
  localStorage.setItem("tabela", JSON.stringify(tabelasListadas));
}

function criarTabela(idTabela, tabelaNova) {
  lista_Tabelas.innerHTML += `
    <div class="tabela">
      <div class="titulo-tabela" data-id="${idTabela}">
        <h4>${tabelaNova}
          <button id="removerTabela" onclick="removerTabela(${idTabela})">
            <img src="src/Trash 2.png" alt="Remover tabela">
          </button>
        </h4>
        <button id="addTask" onclick="divTask(${idTabela})">
          <img src="src/IconAdd.png" alt="">
        </button>
      </div>
      <div class="tabela-task"></div>
    </div>`;
}

function removerTabela(idRemover) {
  idRemover = Number(idRemover);
  tabelasListadas = tabelasListadas.filter(t => t.idTabela !== idRemover);
  listarTabelas();
}

function carregarTabela() {
  let array = localStorage.getItem("tabela");
  return array ? JSON.parse(array) : [];
}

listarTabelas();

async function fecharTabela() {
  await animateAbrirFechar(add_Tabela, 1, 0);
  add_Tabela.style.display = "none";
}

async function animateAbrirFechar(elemento, inicio, fim) {
  const animation = elemento.animate(
    [
      { transform: `scale(${inicio})`, opacity: inicio },
      { transform: `scale(${fim})`, opacity: fim }
    ],
    {
      duration: 500,
      easing: "ease",
      fill: "forwards"
    }
  );
  return animation.finished;
}

// ======= Tasks =======



let add_Task = document.querySelector(".add-Task");
let btnFecharTask = document.querySelector(".add-Task .btn-fechar");

let inputTaskNome = document.getElementById("nomeTask");
let inputTaskDescricao = document.getElementById("descricaoTask");
let inputTaskData = document.getElementById("data");

let tasksListadas = carregarTasks();
let idTask = tasksListadas.length > 0 ? Math.max(...tasksListadas.map(t => t.idTask)) + 1 : 0;
let tabelaAtual = null;

// Abre o modal para criar task em uma tabela específica
async function divTask(idTabelaClicada) {
  tabelaAtual = idTabelaClicada;
  add_Task.style.display = "";
  await animateAbrirFechar(add_Task, 0, 1);
}

// Fecha o modal
async function fecharTask() {
  await animateAbrirFechar(add_Task, 1, 0);
  add_Task.style.display = "none";
}

// Adiciona uma nova task
function addTask() {
  const formTabela = document.getElementById("formTabelas");
  const nome = inputTaskNome.value.trim();
  const descricao = inputTaskDescricao.value.trim();
  const data = inputTaskData.value;

  if (!nome) return alert("Preencha o nome da task.");

  const objTask = {
    idTask: idTask++,
    tabelaId: tabelaAtual,
    nome,
    descricao,
    data
  };

  tasksListadas.push(objTask);
  armazenarTasks();
  listarTasks();

  inputTaskNome.value = "";
  inputTaskDescricao.value = "";
  inputTaskData.value = "";

  fecharTask();
}

// Lista todas as tasks nas tabelas correspondentes
function listarTasks() {

  
  document.querySelectorAll(".tabela-task").forEach(div => div.innerHTML = "");

  tasksListadas.forEach(task => {
    const tabela = document.querySelector(`.titulo-tabela[data-id='${task.tabelaId}']`);
    if (tabela) {
      const tabelaDiv = tabela.nextElementSibling;
      tabelaDiv.innerHTML += `
        <div class="task" draggable="true" data-id="${task.idTask}">
          <h5>${task.nome}</h5>
          <small>${task.data}</small>
          <button class="removerTask" onclick="removerTask(${task.idTask})">
            <img src="src/Trash 2.png" alt="Remover task">
          </button>
        </div>
      `;
    }
  });

dragDrop();
}

// Remove uma task
function removerTask(id) {
  tasksListadas = tasksListadas.filter(task => task.idTask !== id);
  armazenarTasks();
  listarTasks();
}


// Inicializa a lista de tasks na tela
listarTasks();

btnFecharTask.addEventListener("click", fecharTask);


// ==== Side Bar


const aside_menu_lateral = document.getElementById( "aside-menu-lateral" );

const btn_menu_lateral = document.getElementById( "btn-menu-lateral" );
const btn_sair_menu = document.getElementById( "btn-sair-menu" );

btn_menu_lateral.addEventListener("click", () => {
    aside_menu_lateral.classList.remove( "fechado" );
});

btn_sair_menu.addEventListener("click", () => {
    aside_menu_lateral.classList.add( "fechado" );
});


