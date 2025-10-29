// Armazenamento
function armazenarTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasksListadas));
}

// Carrega tasks do localStorage
function carregarTasks() {
  let array = localStorage.getItem("tasks");
  return array ? JSON.parse(array) : [];
}

// Inicializa a lista de tasks na tela
listarTasks();

btnFecharTask.addEventListener("click", fecharTask);
