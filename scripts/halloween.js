const openBtn = document.getElementById("openQuests");
const closeBtn = document.getElementById("toggleQuests");
const questText = document.getElementById("questText");
const nextButton = document.getElementById("nextQuest");

const sidebar = document.getElementById("questSidebar");
const toggleBtn = document.getElementById("openQuests");

closeBtn.addEventListener("click", () => sidebar.classList.remove("active"));

// Restaurar estado salvo
const sidebarState = localStorage.getItem("sidebarOpen");
if (sidebarState === "true") {
  sidebar.classList.add("active");
} else {
  sidebar.classList.remove("active");
}


toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");

  const isOpen = sidebar.classList.contains("active");
  localStorage.setItem("sidebarOpen", isOpen);
});

// --- Quests ---
const quests = [
  { id:1, text:'Crie uma conta. Lembre-se do usuário e senha.', check:()=>window.userCreated===true },
  { id:2, text:'Faça login no site. Espero que tenha lembrado a sua senha!', check:()=>window.userLogged===true },
  { id:3, text:'Crie pelo menos 2 colunas, quantas tarefas quiser, mas lembre-se de movê-las todas para a última coluna.', check:()=>window.usedKanban===true },
  { id:4, text:'Aproveite o modo escuro... mas com sabedoria. Feliz Halloween!', check:()=>window.darkModeEnabled===true }
];

let currentQuest = 0;

// --- Salvar progresso ---
function saveProgress() {
  const state = {
    currentQuest,
    userCreated: window.userCreated || false,
    userLogged: window.userLogged || false,
    usedKanban: window.usedKanban || false,
    darkModeEnabled: window.darkModeEnabled || false
  };
  localStorage.setItem("halloweenProgress", JSON.stringify(state));
}

// --- Carregar progresso ---
function loadProgress() {
  const saved = JSON.parse(localStorage.getItem("halloweenProgress"));
  if (saved) {
    currentQuest = saved.currentQuest || 0;
    window.userCreated = saved.userCreated || false;
    window.userLogged = saved.userLogged || false;
    window.usedKanban = saved.usedKanban || false;
    window.darkModeEnabled = saved.darkModeEnabled || false;
  }
}

// --- Mostrar quest atual ---
function showQuest() {
  questText.textContent = quests[currentQuest].text;
  nextButton.disabled = true;
  nextButton.style.display = "inline-block"; // garante que o botão apareça

  if (currentQuest === quests.length - 1) {
    nextButton.textContent = "Finalizar";
  } else {
    nextButton.textContent = "Próxima Quest";
  }
}

// --- Checar conclusão ---
function checkQuestCompletion() {
  const quest = quests[currentQuest];
  if (quest.check()) {
    nextButton.disabled = false;
  }
}

// --- Próxima quest ---
nextButton.addEventListener("click", () => {
  if (currentQuest < quests.length - 1) {
    currentQuest++;
    showQuest();
    saveProgress();
  } else {
    questText.textContent = "🏆 Todas as quests foram concluídas! Feliz Halloween! 👻";
    nextButton.style.display = "none";

    saveProgress();
  }
});

function nextMission() {
  if (currentQuest < quests.length - 1) {
    currentQuest++;
    showQuest();
    saveProgress();
  } else {
    questText.textContent = "🏆 Todas as quests foram concluídas! Feliz Halloween! 👻";
    nextButton.style.display = "none";
    saveProgress();
  }
  return
}

function resetQuests() {
  localStorage.removeItem("halloweenProgress");
  currentQuest = 0;
  window.userCreated = false;
  window.userLogged = false;
  window.usedKanban = false;
  window.darkModeEnabled = false;
  showQuest();
  nextButton.style.display = "block";
  return
}


// --- Inicializa ---
loadProgress();
showQuest();
checkQuestCompletion();
setInterval(checkQuestCompletion, 1000);

// Sequência secreta: ↑ ↑ ↓ ↓ ← → ← → H
const secretSequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "h"];
let secretIndex = 0;

function setupSecretShortcut() {
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === secretSequence[secretIndex]) {
      secretIndex++;
      if (secretIndex === secretSequence.length) {
        window.location.href = "index.html";
        localStorage.clear();
        resetQuests();
      }
    } else {
      secretIndex = 0;
    }
  });
}

setupSecretShortcut();

// document.addEventListener('keydown', function(e) {
//   if (
//     e.key === 'F12' ||
//     (e.ctrlKey && e.shiftKey && e.key === 'I') ||
//     (e.ctrlKey && e.key === 'U')
//   ) {
//     e.preventDefault();
//   }
// });

// document.addEventListener('contextmenu', function(e) {
//   e.preventDefault();
// });