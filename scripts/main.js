// Dados da tabela

let id = 1;
let id_tarefa = 1;
let indexColunaAtual = null;

const colunas = [];

const tabela = document.querySelector('.tabelas');
const addBtnCol = document.querySelector('#btnTabela');
const tituloInput = document.querySelector('#nomeTabela');
const corInput = document.querySelector('#corTabela');
const tarefasModal = document.querySelector('.add-Tabela');
const btnFechar = document.querySelector('.btn-fechar');

const formTabelas = document.querySelector('#formTabelas');

// Modal
function alternarModal(modal) {
  modal.classList.toggle("oculto");
};

formTabelas.addEventListener('submit', function (evento) {
  evento.preventDefault();

  if (!formTabelas.checkValidity()) {
    formTabelas.reportValidity(); // <--- corrigido!
    return;
  }

  const item = {
    id_coluna: id++,
    nome: tituloInput.value,
    cor: corInput.value,
    tarefas: []
  };

  colunas.push(item);
  tituloInput.value = "";

  alternarModal(document.querySelector('.add-Tabela'));
  atualizarTabela();
});

// Coluna

function abrirModalCriarColuna() {
  alternarModal(document.querySelector('.add-Tabela'));

  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  corInput.value = randomColor;
}

function removerColuna(id_col) {
  colunas.splice(id_col, 1);
  atualizarTabela();
}

function atualizarTabela() {
  tabela.innerHTML = '';
  for (let posicao = 0; posicao < colunas.length; posicao++) {
    const item = colunas[posicao];
    const textoCor = corEscura(item.cor) ? '#ffffff' : '#000000';
    const corLixeira = corEscura(item.cor) ? 'Trash 2.png' : 'Trash2_escura.png  '
    tabela.innerHTML += `
      <div class="coluna-tabela" data-cor="${item.cor}">
              <div class="info-tabela">
                  <h1 title="${item.nome}">${item.nome}</h1>
                  <span>
                    <a href="javascript:removerColuna(${posicao})"><img src="src/Trash 2.png" alt="Remover Tabela"></a>
                    <a href="javascript:abrirModalTarefa(${posicao})"><img src="src/IconAdd.png"></a>

                  </span>
              </div>

              <ul class="grade-tabelas" id="coluna-${posicao}" ondragover="allowDrop(event)" ondrop="dropTarefa(event, ${posicao})">
            </ul>
            </div>
    `;

    const ulTarefas = document.querySelector(`#coluna-${posicao}`);
    item.tarefas.forEach(tarefa => {
      ulTarefas.innerHTML += `
        <li class="tarefa" draggable="true" ondragstart="dragTarefa(event, ${posicao}, ${tarefa.id_tarefa})" style="background-color: ${item.cor};">
          <div class="info-tarefa">
            <h1 style="color: ${textoCor};">${tarefa.nome}</h1>
            <span class="data-tarefa" style="color: ${textoCor};">[ ${tarefa.data} ]</span>
            <a href="javascript:removerTarefa(${posicao}, ${tarefa.id_tarefa})"><img src="src/${corLixeira}" alt="Remover task"></a>
          </div>
          <div class="descricao-tarefa">
            <p style="color: ${textoCor};">${tarefa.descricao}</p>
          </div>
        </li>
      `;
    });
  }

  if (colunas.length >= 2) {
    const todasTarefas = colunas.flatMap(col => col.tarefas);

    // só continua se houver pelo menos uma tarefa
    if (todasTarefas.length > 0) {
      const tarefasUltima = colunas[colunas.length - 1].tarefas;

      if (tarefasUltima.length === todasTarefas.length) {
        console.log("✅ Quest do Kanban concluída!");
        window.usedKanban = true;
      } else {
        window.usedKanban = false;
      }
    } else {
      window.usedKanban = false;
    }
  }

}

// Tarefas

function abrirModalTarefa(indexColuna) {
  indexColunaAtual = indexColuna;
  alternarModal(document.querySelector('.add-Task'))
}

const formTarefas = document.querySelector('#formTarefas')
const nomeTarefa = document.querySelector('#nomeTask');
const descricaoTarefa = document.querySelector('#descricaoTask');
const dataTarefa = document.querySelector('#data');

function adicionarTarefa() {
  if (indexColunaAtual === null) {
    console.error("Nenhuma coluna selecionada para adicionar tarefa!");
    return;
  }

  let dataSelecionada = dataTarefa.value;
  if (!dataSelecionada) {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    dataSelecionada = `${ano}-${mes}-${dia}`;
  }

  const dataFormatada = new Date(dataSelecionada).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

  const novaTarefa = {
    id_tarefa: id_tarefa++,
    nome: nomeTarefa.value,
    descricao: descricaoTarefa.value,
    data: dataFormatada
  };

  colunas[indexColunaAtual].tarefas.push(novaTarefa);

  // limpar campos
  nomeTarefa.value = "";
  descricaoTarefa.value = "";
  dataTarefa.value = "";

  alternarModal(document.querySelector('.add-Task')); // fecha o modal
  atualizarTabela();
}

function removerTarefa(indexColuna, id_tarefa) {
  const ulTarefas = document.querySelector(`#coluna-${indexColuna}`);
  const liTarefa = Array.from(ulTarefas.children).find(li => li.querySelector('a').getAttribute('href').includes(id_tarefa));

  if (liTarefa) {
    liTarefa.classList.add('puff');


    liTarefa.addEventListener('animationend', () => {
      colunas[indexColuna].tarefas = colunas[indexColuna].tarefas.filter(t => t.id_tarefa !== id_tarefa);
      atualizarTabela();
    });
  }
}



// função para definir a cor da letra da tarefa de acordo com a coluna que se está
function corEscura(hex) {

  hex = hex.replace('#', '');


  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b);

  return luminancia < 128;
}

// Arrastar Tarefas

let tarefaEmArrasto = null;
let colunaOrigem = null;

function dragTarefa(event, indexColuna, idTarefa) {
  tarefaEmArrasto = idTarefa;
  colunaOrigem = indexColuna;
  event.dataTransfer.effectAllowed = "move"
}

function allowDrop(event) {
  event.preventDefault();
}

function dropTarefa(event, indexColunaDestino) {
  event.preventDefault();

  if (tarefaEmArrasto === null || colunaOrigem === null) {
    return;
  }

  const tarefa = colunas[colunaOrigem].tarefas.find(t => t.id_tarefa === tarefaEmArrasto);

  if (!tarefa) return;

  colunas[colunaOrigem].tarefas = colunas[colunaOrigem].tarefas.filter(t => t.id_tarefa !== tarefaEmArrasto);

  colunas[indexColunaDestino].tarefas.push(tarefa);

  tarefaEmArrasto = null;
  colunaOrigem = null;

  atualizarTabela();
}

atualizarTabela();