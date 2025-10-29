// Pega o botão e o elemento <html>
const themeButton = document.getElementById("toggle-theme");
const html = document.documentElement;

// 1️⃣ Carrega o tema salvo (se houver)
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
} else {
  html.setAttribute("data-theme", "default");
}

// 2️⃣ Função para alternar o tema
themeButton.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "halloween" ? "default" : "halloween";
  
  window.darkModeEnabled = true;

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme); // salva para reabrir no mesmo tema
});
