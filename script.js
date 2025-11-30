const API_URL = "https://apisimpsons.fly.dev/api/personajes?limit=1000";

const cardsContainer = document.getElementById("cardsContainer");
const statusBar = document.getElementById("statusBar");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let allCharacters = [];

// Busca os personagens da API
async function fetchCharacters() {
  try {
    statusBar.textContent = "Carregando personagens...";
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
    const data = await res.json();
    allCharacters = data.docs || [];
    renderCards(allCharacters);
    statusBar.textContent = `Exibindo ${allCharacters.length} personagens.`;
    console.log("Fetch executado:", allCharacters);
  } catch (err) {
    console.error(err);
    statusBar.textContent = "Erro ao carregar personagens. Tente novamente.";
  }
}

// Cria os cards dinamicamente
function renderCards(list) {
  cardsContainer.innerHTML = "";
  if (!list.length) {
    cardsContainer.innerHTML = "<p>Nenhum personagem encontrado.</p>";
    return;
  }

  list.forEach(personagem => {
    const card = document.createElement("article");
    card.classList.add("card");

    const thumb = document.createElement("div");
    thumb.classList.add("thumb");
    const img = document.createElement("img");
    img.src = personagem.Imagen || "";
    img.alt = personagem.Nombre || "Personagem dos Simpsons";
    thumb.appendChild(img);

    const content = document.createElement("div");
    content.classList.add("content");

    const title = document.createElement("h3");
    title.textContent = personagem.Nombre;

    const meta = document.createElement("p");
    meta.classList.add("meta");
    meta.textContent = personagem.Historia || "Sem descrição disponível.";

    content.appendChild(title);
    content.appendChild(meta);
    card.appendChild(thumb);
    card.appendChild(content);
    cardsContainer.appendChild(card);
  });
}

// Filtro de pesquisa
searchBtn.addEventListener("click", () => {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = allCharacters.filter(c =>
    c.Nombre.toLowerCase().includes(q)
  );
  renderCards(filtered);
  statusBar.textContent = `Encontrados ${filtered.length} personagens.`;
});

// Enter no campo ativa pesquisa
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") searchBtn.click();
});

// Inicializa
document.addEventListener("DOMContentLoaded", fetchCharacters);
