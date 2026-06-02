const gridEl = document.getElementById("grid-personagens");
const statusEl = document.getElementById("status-mensagem");
const contadorEl = document.getElementById("contador");
const campoBusca = document.getElementById("campo-busca");
const paginacaoEl = document.getElementById("paginacao");
const filtrosEl = document.getElementById("filtros");

let todosOsPersonagens = [];
let infoApi = null;
let paginaAtual = 1;
let filtroStatus = "all";
let termoBusca = "";

function exibirStatus(mensagem, tipo = "") {
  statusEl.textContent = mensagem;
  statusEl.className = tipo;
}

async function buscarPersonagens(pagina = 1, status = "all") {
  try {
    exibirStatus("⏳ Carregando...", "loading");
    const url = `https://rickandmortyapi.com/api/character?page=${pagina}${status !== "all" ? `&status=${status}` : ""}`;
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`);
    }

    const dados = await resposta.json();
    todosOsPersonagens = dados.results;
    infoApi = dados.info;
    paginaAtual = pagina;
    contadorEl.textContent = `${infoApi.count} personagens`;

    exibirStatus("");
    renderizarPersonagens();
    renderizarPaginacao();
  } catch (error) {
    exibirStatus("Erro ao carregar personagens.", "erro");
    console.error(error);
    gridEl.innerHTML = "";
    paginacaoEl.innerHTML = "";
    contadorEl.textContent = "0 personagens";
  }
}

function criarBadgeStatus(status) {
  const texto = status === "unknown" ? "Unknown" : status;
  return `<span class="badge badge-${status}">${texto}</span>`;
}

function renderizarPersonagens() {
  const filtroNome = termoBusca.toLowerCase();
  const personagensFiltrados = todosOsPersonagens
    .filter(personagem => personagem.name.toLowerCase().includes(filtroNome))
    .map(personagem => {
      const statusClass = personagem.status.toLowerCase();
      return `
        <article class="card">
          <img class="card-img" src="${personagem.image}" alt="${personagem.name}" />
          <div class="card-body">
            <div class="card-nome">${personagem.name}</div>
            <div class="card-especie">${personagem.species}</div>
            ${criarBadgeStatus(statusClass)}
          </div>
        </article>
      `;
    });

  if (!personagensFiltrados.length) {
    gridEl.innerHTML = `<div class="vazio">Nenhum personagem encontrado.</div>`;
    return;
  }

  gridEl.innerHTML = personagensFiltrados.join("");
}

function renderizarPaginacao() {
  if (!infoApi) {
    paginacaoEl.innerHTML = "";
    return;
  }

  paginacaoEl.innerHTML = `
    <div class="pag-info">${infoApi.count} personagens · Página ${paginaAtual} de ${infoApi.pages}</div>
    <div class="pag-botoes">
      <button class="btn-pag" data-action="prev" ${infoApi.prev ? "" : "disabled"}>← Anterior</button>
      <button class="btn-pag proximo" data-action="next" ${infoApi.next ? "" : "disabled"}>Próxima →</button>
    </div>
  `;
}

function atualizarBotaoAtivo() {
  filtrosEl.querySelectorAll("button[data-status]").forEach(btn => {
    btn.classList.toggle("ativo", btn.dataset.status === filtroStatus);
  });
}

campoBusca.addEventListener("input", event => {
  termoBusca = event.target.value.trim();
  renderizarPersonagens();
});

filtrosEl.addEventListener("click", event => {
  const botao = event.target.closest("button[data-status]");
  if (!botao) return;

  const novoStatus = botao.dataset.status;
  if (novoStatus === filtroStatus) return;

  filtroStatus = novoStatus;
  paginaAtual = 1;
  atualizarBotaoAtivo();
  buscarPersonagens(paginaAtual, filtroStatus);
});

paginacaoEl.addEventListener("click", event => {
  const botao = event.target.closest("button[data-action]");
  if (!botao || botao.disabled) return;

  const acao = botao.dataset.action;
  if (acao === "prev" && infoApi.prev) {
    buscarPersonagens(paginaAtual - 1, filtroStatus);
  } else if (acao === "next" && infoApi.next) {
    buscarPersonagens(paginaAtual + 1, filtroStatus);
  }
});

atualizarBotaoAtivo();
buscarPersonagens();