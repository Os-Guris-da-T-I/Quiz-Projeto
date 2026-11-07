// ==========================================
// 1. BANCO DE DADOS (15 Perguntas de TI)
// ==========================================
const perguntas = [
    {
        pergunta: "O que é Python?",
        alternativas: ["Um tipo de hardware", "Uma linguagem de programação", "Um sistema operacional", "Um editor de imagens"],
        respostaCorreta: 1,
        dica: "É muito utilizada atualmente em inteligência artificial, automação e análise de dados.",
        explicacaoCorreta: "Exato! Python é uma linguagem de programação de alto nível, famosa por sua sintaxe simples.",
        explicacaoErrada: "Erro. Python não é hardware ou sistema, mas sim uma linguagem de programação muito popular."
    },
    {
        pergunta: "Quais linguagens são muito utilizadas no desenvolvimento de jogos de grande porte (AAA)?",
        alternativas: ["HTML e CSS", "PHP e Ruby", "C++ e C#", "Python e Scratch"],
        respostaCorreta: 2,
        dica: "São conhecidas por oferecer alto desempenho e são utilizadas em grandes produções de videogames.",
        explicacaoCorreta: "Muito bem! C++ é amplamente usada em engines como Unreal, e C# é a linguagem principal da Unity.",
        explicacaoErrada: "Incorreto. Jogos pesados exigem alta performance, sendo C++ e C# as mais utilizadas."
    },
    {
        pergunta: "O que significa a sigla HTML?",
        alternativas: ["HyperText Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Multi Language"],
        respostaCorreta: 0,
        dica: "É uma sigla em inglês relacionada à criação de páginas na internet.",
        explicacaoCorreta: "Correto! HTML significa HyperText Markup Language, a linguagem base para estruturar páginas na web.",
        explicacaoErrada: "Você errou. A sigla correta é HyperText Markup Language."
    },
    {
        pergunta: "Na área de TI, o que é um 'Bug'?",
        alternativas: ["Um vírus perigoso", "Uma peça do computador", "Uma linguagem de programação", "Uma falha ou erro no código"],
        respostaCorreta: 3,
        dica: "Pode acontecer quando um sistema apresenta um comportamento inesperado.",
        explicacaoCorreta: "Isso aí! Um bug é um erro lógico ou falha no código que faz o programa não funcionar como deveria.",
        explicacaoErrada: "Errado. Um bug não é um vírus físico, é simplesmente um erro no código de um software."
    },
    {
        pergunta: "Para que serve a linguagem SQL?",
        alternativas: ["Criar interfaces gráficas", "Gerenciar bancos de dados relacionais", "Desenvolver jogos 3D", "Estilizar páginas web"],
        respostaCorreta: 1,
        dica: "É muito utilizada quando precisamos organizar e consultar informações armazenadas.",
        explicacaoCorreta: "Certíssimo! SQL é a linguagem padrão para interagir e gerenciar Bancos de Dados relacionais.",
        explicacaoErrada: "Incorreto. SQL é usada especificamente para consultar e manipular Bancos de Dados."
    },
    {
        pergunta: "O que é o Git?",
        alternativas: ["Um editor de código", "Um tipo de banco de dados", "Um sistema de controle de versão", "Uma rede social para programadores"],
        respostaCorreta: 2,
        dica: "É muito utilizado por desenvolvedores para acompanhar alterações em projetos.",
        explicacaoCorreta: "Boa! O Git é um sistema de controle de versão que mapeia todas as alterações feitas no código.",
        explicacaoErrada: "Errou. Git é um sistema de controle de versão de código."
    },
    {
        pergunta: "Qual a principal diferença entre Front-end e Back-end?",
        alternativas: ["Front-end é hardware, Back-end é software", "Não há diferença no mercado", "Front-end é o servidor, Back-end é o cliente", "Front-end é a interface visual, Back-end é a lógica do servidor"],
        respostaCorreta: 3,
        dica:  "Pense na diferença entre aquilo que o usuário vê e aquilo que acontece por trás de um sistema.",
        explicacaoCorreta: "Perfeito! Front-end é o que o usuário vê. Back-end é o que roda por trás (servidor, banco de dados).",
        explicacaoErrada: "Incorreto. O Front-end cuida da parte visual, enquanto o Back-end cuida da lógica no servidor."
    },
    {
        pergunta: "O que faz o CSS em uma página web?",
        alternativas: ["Adiciona lógica e interatividade", "Controla a apresentação visual e o estilo", "Cria a estrutura da página", "Conecta o site ao banco de dados"],
        respostaCorreta: 1,
        dica: "É o que ajuda a deixar um site mais bonito e organizado visualmente.",
        explicacaoCorreta: "Correto! O CSS serve para estilizar o HTML, dando cor e formato ao site.",
        explicacaoErrada: "Errou. O CSS não adiciona lógica nem cria estrutura. Ele cuida apenas do estilo visual."
    },
    {
        pergunta: "O que é uma 'variável' na programação?",
        alternativas: ["Um erro no código", "Um comando de repetição", "Um espaço na memória para armazenar dados", "Uma função matemática complexa"],
        respostaCorreta: 2,
        dica: "Pense nela como uma 'caixa' com uma etiqueta onde você guarda um valor.",
        explicacaoCorreta: "Isso! Uma variável é um espaço na memória do computador usado para guardar dados que podem mudar.",
        explicacaoErrada: "Incorreto. Uma variável atua como uma 'caixa' na memória para salvar informações temporárias."
    },
    {
        pergunta: "Qual é a função da memória RAM em um computador?",
        alternativas: ["Armazenar dados temporários para acesso rápido", "Armazenar arquivos permanentemente", "Resfriar a placa-mãe", "Processar gráficos de jogos"],
        respostaCorreta: 0,
        dica: "Está relacionada ao desempenho do computador enquanto vários programas estão abertos.",
        explicacaoCorreta: "Exatamente! A RAM armazena informações temporárias que o processador precisa acessar imediatamente.",
        explicacaoErrada: "Errado. A RAM é memória de curto prazo. Quem armazena permanentemente é o HD ou SSD."
    },
    {
        pergunta: "O que é um Algoritmo?",
        alternativas: ["Uma sequência de passos lógicos para resolver um problema", "Uma peça de hardware da CPU", "Uma linguagem de programação", "Um vírus de computador"],
        respostaCorreta: 0,
        dica: "Pense em uma receita de bolo passo a passo.",
        explicacaoCorreta: "Correto! Um algoritmo é basicamente uma receita, um passo a passo estruturado usado para chegar a um resultado.",
        explicacaoErrada: "Você errou. Um algoritmo não é físico, é a sequência de passos criada para resolver um problema."
    },
    {
        pergunta: "O que caracteriza um software 'Open-source' (Código Aberto)?",
        alternativas: ["É sempre gratuito e sem regras", "É desenvolvido por uma única empresa", "Seu código-fonte está disponível para ser modificado", "Funciona apenas em navegadores"],
        respostaCorreta: 2,
        dica: "É muito utilizado por desenvolvedores que gostam de colaborar em projetos e compartilhar conhecimentos com outras pessoas.",
        explicacaoCorreta: "Muito bem! O software de código aberto permite que qualquer pessoa veja e modifique o seu código fonte.",
        explicacaoErrada: "Incorreto. Open-source significa que o código do sistema está público para a comunidade."
    },
    {
        pergunta: "Qual dessas é uma das Engines (motores) de jogos mais populares do mundo?",
        alternativas: ["Photoshop", "Unity", "Excel", "Visual Studio"],
        respostaCorreta: 1,
        dica: "É uma ferramenta muito conhecida entre desenvolvedores de jogos e possui recursos para criar ambientes em 2D e 3D.",
        explicacaoCorreta: "Acertou! Unity é um dos motores de jogos mais famosos do mundo para PC, consoles e mobile.",
        explicacaoErrada: "Errou. Dentre as opções, a Unity é a engine (motor gráfico) utilizada para criar jogos."
    },
    {
        pergunta: "Na lógica de programação, o que é um dado do tipo 'Booleano' (Boolean)?",
        alternativas: ["Um texto longo", "Um número decimal", "Uma lista de itens", "Um valor que só pode ser Verdadeiro ou Falso"],
        respostaCorreta: 3,
        dica: "É muito utilizado em estruturas condicionais para trabalhar com duas possibilidades lógicas.",
        explicacaoCorreta: "Exato! Um tipo Booleano trabalha apenas com duas opções lógicas: Verdadeiro (True) ou Falso (False).",
        explicacaoErrada: "Incorreto. Variáveis booleanas são binárias, elas só aceitam Verdadeiro ou Falso."
    },
    {
        pergunta: "Quem é frequentemente considerado o 'Pai da Computação'?",
        alternativas: ["Alan Turing", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
        respostaCorreta: 0,
        dica: "Ele quebrou o código da máquina Enigma na Segunda Guerra Mundial.",
        explicacaoCorreta: "Correto! Alan Turing foi um matemático brilhante que criou a base teórica de como os computadores funcionam hoje.",
        explicacaoErrada: "Errou. Bill Gates e Steve Jobs popularizaram os PCs, mas o pioneiro teórico foi Alan Turing."
    }
];

// ==========================================
// 2. CONFIGURAÇÕES GERAIS
// ==========================================
const API_URL = "http://127.0.0.1:5000"; // API Flask do projeto (se estiver desligada, o site usa o modo local)

const TEMPOS = { facil: 90, normal: 40, dificil: 15 }; // segundos por pergunta
const NOMES_MODO = { facil: "Fácil", normal: "Normal", dificil: "Difícil" };

const AVATARES = [
    { kanji: "侍", rotulo: "Samurai", tema: "escuro" },
    { kanji: "猫", rotulo: "Gato", tema: "claro" },
    { kanji: "狐", rotulo: "Raposa", tema: "escuro" },
    { kanji: "龍", rotulo: "Dragão", tema: "claro" },
    { kanji: "桜", rotulo: "Cerejeira", tema: "claro" },
    { kanji: "月", rotulo: "Lua", tema: "escuro" },
    { kanji: "鬼", rotulo: "Oni", tema: "escuro" },
    { kanji: "鯉", rotulo: "Carpa", tema: "claro" }
];

const CRIADORES = [
    { nome: "Matheus Pentogennis", user: "mwtheuskkj" },
    { nome: "Gustavo Naves", user: "Massarubash" },
    { nome: "João Guimarães", user: "jaobom006" },
    { nome: "Gabriel Gonçalves", user: "midasrei68-dev" },
    { nome: "Lucas Teles", user: "Luucasy" },
    { nome: "Lucas da Graça", user: "lucasgracaleandro-arch" }
];

const CORES_COROA = {
    1: { fill: "#ffd54a", stroke: "#8a6508", nome: "Ouro" },
    2: { fill: "#dfe3e8", stroke: "#5f6b78", nome: "Prata" },
    3: { fill: "#d98a4a", stroke: "#6e3f14", nome: "Bronze" }
};

// ==========================================
// 3. MAPEAMENTO DOS ELEMENTOS HTML
// ==========================================
const $ = (id) => document.getElementById(id);

const splash = $("splash");
const telaLogin = $("tela-login");
const appEl = $("app");
const rodapeCriadores = $("rodapeCriadores");

const formLogin = $("formLogin");
const inputNome = $("inputNome");
const previaNome = $("previaNome");
const erroLogin = $("erroLogin");

const inicioContainer = $("inicio-container");
const quizContainer = $("quiz-container");
const questionTitle = $("question");
const btnDica = $("btnDica");
const textoDica = $("textoDica");
const areaExplicacao = $("areaExplicacao");
const tituloResultado = $("tituloResultado");
const textoExplicacao = $("textoExplicacao");
const btnProxima = $("btnProxima");
const timerDisplay = $("timer-display");
const spanTempo = $("tempo");
const barraTempo = $("barraTempo");
const finalScreen = $("final");
const finalScore = $("finalScore");
const mensagemFinal = $("mensagemFinal");
const emojiFinal = $("emojiFinal");
const btnReiniciar = $("btnReiniciar");
const btnModos = document.querySelectorAll(".btn-modo");
const gradeInicio = $("gradeInicio");
const btnSair = $("btnSair");
const rotuloModo = $("rotuloModo");

const btnAlternativas = [
    $("alternative1"),
    $("alternative2"),
    $("alternative3"),
    $("alternative4")
];

// Acessibilidade
const btnAcessibilidade = $("btnAcessibilidade");
const menuAcessibilidade = $("menuAcessibilidade");
const btnContraste = $("btnContraste");
const btnFonteMais = $("btnFonteMais");
const btnFonteMenos = $("btnFonteMenos");
const btnResetarAcessibilidade = $("btnResetarAcessibilidade");

// Abas, perfil, ranking, pop-ups
const abasBtns = document.querySelectorAll(".aba");
const btnPerfil = $("btnPerfil");
const modalPerfil = $("modalPerfil");
const modalSair = $("modalSair");
const modalGithub = $("modalGithub");
const listaRanking = $("listaRanking");
const rankingVazio = $("rankingVazio");

// ==========================================
// 4. VARIÁVEIS DE ESTADO
// ==========================================
let indiceAtual = 0;
let pontuacao = 0;
let modoAtual = "normal";
let timer = null;
let tempoRestante = 0;
let tempoTotal = 0;
let respondida = false;
let jogando = false;

let usuario = null;          // { id, nome_login, foto }
let appAberto = false;
let bancoOnline = null;      // null = ainda não testado
let filtroRanking = "geral";
let fotoTemp = null;

const ESCALA_MIN = 0.8;
const ESCALA_MAX = 1.6;
const ESCALA_PASSO = 0.1;

let escalaFonte = 1;
let altoContraste = false;
let tema = "escuro";
let daltonismo = "nenhum";

// ==========================================
// 5. FUNÇÕES AUXILIARES
// ==========================================
function mostrar(elemento, visivel) {
    elemento.hidden = !visivel;
}

function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
}

function lerLS(chave, padrao) {
    try {
        const v = JSON.parse(localStorage.getItem(chave));
        return v === null || v === undefined ? padrao : v;
    } catch (e) {
        return padrao;
    }
}

function gravarLS(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
    } catch (e) { /* o navegador pode bloquear o armazenamento */ }
}

// "Matheus P." -> "matheus_p" (mesma regra da tabela login: a-z, 0-9 e _, de 3 a 20)
function normalizarNome(texto) {
    return texto
        .normalize("NFD").replace(/[̀-ͯ]/g, "")
        .toLowerCase().trim()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "")
        .slice(0, 20);
}

function nomeValido(nome) {
    return /^[a-z0-9_]{3,20}$/.test(nome);
}

// ---------- pop-ups com fade-in / fade-out ----------
let focoAntesDoModal = null;

function abrirModal(modal) {
    clearTimeout(modal._t);
    focoAntesDoModal = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add("visivel")));
    const foco = modal.querySelector("[data-foco]") || modal.querySelector("button");
    setTimeout(() => foco && foco.focus({ preventScroll: true }), 60);
}

function fecharModal(modal, devolverFoco = true) {
    modal.classList.remove("visivel");
    clearTimeout(modal._t);
    modal._t = setTimeout(() => { modal.hidden = true; }, 290);
    if (devolverFoco && focoAntesDoModal && document.contains(focoAntesDoModal)) {
        focoAntesDoModal.focus({ preventScroll: true });
    }
}

// ---------- avatar e coroa ----------
function criarAvatar(foto, tam = 48) {
    const a = el("span", "avatar");
    a.style.setProperty("--tam", tam + "px");

    if (typeof foto === "string" && /^data:image\/(png|jpeg|webp|gif);base64,/.test(foto)) {
        const img = new Image();
        img.alt = "";
        img.src = foto;
        a.appendChild(img);
    } else {
        const preset = AVATARES.find(p => "preset:" + p.kanji === foto) || AVATARES[0];
        a.textContent = preset.kanji;
        a.classList.add("avatar-" + preset.tema);
    }
    return a;
}

function criarCoroa(pos) {
    const c = CORES_COROA[pos];
    const wrap = el("span", "coroa");
    wrap.title = `Coroa de ${c.nome} - ${pos}º lugar`;
    wrap.innerHTML =
        `<svg viewBox="0 0 40 30" role="img" aria-label="Coroa de ${c.nome}, ${pos}º lugar">` +
        `<path d="M3 25 L6 8 L14 17 L20 4 L26 17 L34 8 L37 25 Z" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2" stroke-linejoin="round"/>` +
        `<rect x="3" y="25" width="34" height="4" rx="1" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2"/>` +
        `<text x="20" y="23" text-anchor="middle" font-size="10" font-weight="800" font-family="sans-serif" fill="${c.stroke}">${pos}</text>` +
        `</svg>`;
    return wrap;
}

// ==========================================
// 6. BANCO DE DADOS (API Flask + modo local de reserva)
// ==========================================
function atualizarStatusBanco() {
    let texto = "Conectando ao banco de dados…";
    if (bancoOnline === true) texto = "● Banco de dados conectado";
    if (bancoOnline === false) texto = "○ Sem conexão com o banco: ranking salvo neste navegador";
    document.querySelectorAll("[data-status]").forEach(e => { e.textContent = texto; });
}

async function chamarAPI(caminho, opcoes = {}) {
    const ctrl = new AbortController();
    const limite = setTimeout(() => ctrl.abort(), 3000);
    try {
        const resp = await fetch(API_URL + caminho, {
            headers: { "Content-Type": "application/json" },
            ...opcoes,
            signal: ctrl.signal
        });
        clearTimeout(limite);
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        bancoOnline = true;
        atualizarStatusBanco();
        return await resp.json();
    } catch (e) {
        clearTimeout(limite);
        bancoOnline = false;
        atualizarStatusBanco();
        return null;
    }
}

// fotos e partidas guardadas no navegador (reserva e cache)
function fotoLocal(nomeLogin) {
    return lerLS("gq_fotos", {})[nomeLogin] || null;
}

function salvarFotoLocal(nomeLogin, foto) {
    const fotos = lerLS("gq_fotos", {});
    fotos[nomeLogin] = foto;
    gravarLS("gq_fotos", fotos);
}

function normalizarPartida(p) {
    const jogador = p.jogador ?? p.nome_login ?? "?";
    return {
        jogador,
        foto: p.foto || fotoLocal(jogador),
        modo: p.modo,
        acertos: Number(p.acertos) || 0,
        total: Number(p.total_perguntas ?? p.total) || perguntas.length,
        data: p.data_partida ?? p.data ?? ""
    };
}

async function buscarRanking(filtro) {
    const consulta = filtro && filtro !== "geral" ? "?modo=" + filtro : "";
    const resp = await chamarAPI("/ranking" + consulta);
    let lista;
    if (Array.isArray(resp)) {
        lista = resp.map(normalizarPartida);
    } else {
        lista = lerLS("gq_partidas", []).map(normalizarPartida);
    }
    return lista.filter(p => filtro === "geral" || !filtro || p.modo === filtro);
}

// melhor partida de cada jogador (mais acertos; empate: quem fez primeiro)
function melhoresPorJogador(partidas) {
    const mapa = new Map();
    partidas.forEach(p => {
        const atual = mapa.get(p.jogador);
        if (!atual || p.acertos > atual.acertos ||
            (p.acertos === atual.acertos && String(p.data) < String(atual.data))) {
            mapa.set(p.jogador, p);
        }
    });
    return [...mapa.values()].sort((a, b) =>
        b.acertos - a.acertos || String(a.data).localeCompare(String(b.data)));
}

async function salvarPartida(modo, acertos, total) {
    // cópia local (também serve de reserva se a API estiver desligada)
    const locais = lerLS("gq_partidas", []);
    locais.push({
        jogador: usuario.nome_login, foto: usuario.foto, modo, acertos,
        total_perguntas: total, data_partida: new Date().toISOString()
    });
    gravarLS("gq_partidas", locais.slice(-200));

    if (usuario.id !== null) {
        await chamarAPI("/ranking", {
            method: "POST",
            body: JSON.stringify({ id_usuario: usuario.id, modo, acertos, total_perguntas: total })
        });
    }
}

async function atualizarRanking() {
    const partidas = await buscarRanking(filtroRanking);
    const lista = melhoresPorJogador(partidas).slice(0, 10);

    listaRanking.replaceChildren(...lista.map((r, i) => {
        const pos = i + 1;
        const eVoce = usuario && r.jogador === usuario.nome_login;
        const li = el("li", "item-ranking" + (eVoce ? " voce" : ""));
        li.appendChild(el("span", "pos", pos + "º"));

        const wrap = el("span", "avatar-wrap");
        wrap.appendChild(criarAvatar(r.foto, 44));
        if (pos <= 3) wrap.appendChild(criarCoroa(pos));
        li.appendChild(wrap);

        const info = el("span", "info");
        info.appendChild(el("strong", "nome", r.jogador));
        info.appendChild(el("small", "modo-tag", (NOMES_MODO[r.modo] || r.modo) + (eVoce ? " · você" : "")));
        li.appendChild(info);

        li.appendChild(el("span", "pontos", `${r.acertos}/${r.total}`));
        return li;
    }));

    rankingVazio.hidden = lista.length > 0;
    return lista;
}

// ==========================================
// 7. ABERTURA, LOGIN E PERFIL
// ==========================================
function iniciarSplash() {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let encerrada = false;

    const encerrar = () => {
        if (encerrada) return;
        encerrada = true;
        splash.classList.add("saindo");
        setTimeout(() => {
            splash.hidden = true;
            mostrarLogin();
        }, 700);
    };

    setTimeout(encerrar, reduzido ? 1400 : 4300);
    splash.addEventListener("click", encerrar);
    document.addEventListener("keydown", (e) => {
        if (!splash.hidden && (e.key === "Enter" || e.key === " " || e.key === "Escape")) encerrar();
    });
}

function mostrarLogin() {
    appAberto = false;
    mostrar(appEl, false);
    mostrar(telaLogin, true);
    atualizarRodape();
    inputNome.value = lerLS("gq_ultimo_usuario", "");
    atualizarPreviaNome();
    inputNome.focus({ preventScroll: true });
}

function atualizarPreviaNome() {
    const n = normalizarNome(inputNome.value);
    previaNome.textContent = n || "—";
}

async function tentarEntrar(e) {
    e.preventDefault();
    const nome = normalizarNome(inputNome.value);

    if (!nomeValido(nome)) {
        erroLogin.textContent = "Use de 3 a 20 letras, números ou _ (sem acentos).";
        inputNome.focus();
        return;
    }
    erroLogin.textContent = "";

    const btn = $("btnEntrar");
    btn.disabled = true;
    btn.textContent = "Entrando…";

    // login no banco (cria o usuário se não existir)
    const resp = await chamarAPI("/login", {
        method: "POST",
        body: JSON.stringify({ nome_login: nome })
    });

    usuario = {
        id: resp && resp.id_usuario !== undefined ? resp.id_usuario : null,
        nome_login: nome,
        foto: (resp && resp.foto) || fotoLocal(nome)
    };
    gravarLS("gq_ultimo_usuario", nome);

    btn.disabled = false;
    btn.textContent = "Entrar";

    abrirPerfil(true);
}

function abrirPerfil(primeiraVez) {
    fotoTemp = usuario.foto || "preset:" + AVATARES[0].kanji;
    $("perfilNome").textContent = usuario.nome_login;
    $("erroFoto").textContent = "";
    $("btnPerfilCancelar").hidden = primeiraVez;
    atualizarSelecaoPerfil();
    abrirModal(modalPerfil);
}

function atualizarSelecaoPerfil() {
    $("perfilPrevia").replaceChildren(criarAvatar(fotoTemp, 96));
    document.querySelectorAll(".avatar-opcao").forEach(b => {
        b.setAttribute("aria-pressed", b.dataset.foto === fotoTemp);
    });
}

function montarGradeAvatares() {
    $("gradeAvatares").replaceChildren(...AVATARES.map(a => {
        const b = el("button", "avatar-opcao");
        b.type = "button";
        b.dataset.foto = "preset:" + a.kanji;
        b.setAttribute("aria-label", "Avatar " + a.rotulo);
        b.appendChild(criarAvatar("preset:" + a.kanji, 56));
        b.addEventListener("click", () => {
            fotoTemp = b.dataset.foto;
            atualizarSelecaoPerfil();
        });
        return b;
    }));
}

function redimensionarImagem(arquivo) {
    return new Promise((ok, falhou) => {
        const url = URL.createObjectURL(arquivo);
        const img = new Image();
        img.onload = () => {
            const t = 160;
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = t;
            const lado = Math.min(img.width, img.height);
            const sx = (img.width - lado) / 2;
            const sy = (img.height - lado) / 2;
            canvas.getContext("2d").drawImage(img, sx, sy, lado, lado, 0, 0, t, t);
            URL.revokeObjectURL(url);
            ok(canvas.toDataURL("image/jpeg", 0.82));
        };
        img.onerror = () => { URL.revokeObjectURL(url); falhou(new Error("imagem inválida")); };
        img.src = url;
    });
}

async function aoEscolherFoto() {
    const inputFoto = $("inputFoto");
    const erro = $("erroFoto");
    const arquivo = inputFoto.files[0];
    erro.textContent = "";
    if (!arquivo) return;

    if (!/^image\/(png|jpe?g|webp|gif)$/.test(arquivo.type)) {
        erro.textContent = "Escolha uma imagem PNG, JPG, WEBP ou GIF.";
    } else if (arquivo.size > 8 * 1024 * 1024) {
        erro.textContent = "A imagem é grande demais (máximo de 8 MB).";
    } else {
        try {
            fotoTemp = await redimensionarImagem(arquivo);
            atualizarSelecaoPerfil();
        } catch (e) {
            erro.textContent = "Não foi possível abrir essa imagem.";
        }
    }
    inputFoto.value = "";
}

function confirmarPerfil() {
    usuario.foto = fotoTemp;
    salvarFotoLocal(usuario.nome_login, fotoTemp);
    if (usuario.id !== null) {
        chamarAPI(`/usuario/${usuario.id}/foto`, { method: "PUT", body: JSON.stringify({ foto: fotoTemp }) });
    }
    fecharModal(modalPerfil, false);
    atualizarChip();
    if (!appAberto) entrarNoApp(); else atualizarRanking();
}

function atualizarChip() {
    $("chipAvatar").replaceChildren(criarAvatar(usuario.foto, 34));
    $("chipNome").textContent = usuario.nome_login;
    $("saudacaoNome").textContent = usuario.nome_login;
}

function entrarNoApp() {
    appAberto = true;
    mostrar(telaLogin, false);
    mostrar(appEl, true);
    atualizarChip();
    irParaAba("inicio");
    voltarAoInicio();
    atualizarRodape();
}

function sairDaConta() {
    clearInterval(timer);
    jogando = false;
    usuario = null;
    mostrarLogin();
}

// ==========================================
// 8. ABAS E RODAPÉ DOS CRIADORES
// ==========================================
function irParaAba(nome) {
    abasBtns.forEach(b => {
        const ativa = b.dataset.aba === nome;
        b.classList.toggle("ativa", ativa);
        b.setAttribute("aria-selected", ativa);
    });
    ["inicio", "config", "sobre"].forEach(a => mostrar($("aba-" + a), a === nome));
    if (nome === "inicio" && appAberto) atualizarRanking();
}

function bloquearNavegacao(bloquear) {
    abasBtns.forEach(b => { b.disabled = bloquear; });
    btnPerfil.disabled = bloquear;
}

function atualizarRodape() {
    const telaVisivel = !telaLogin.hidden || (appAberto && !jogando);
    mostrar(rodapeCriadores, telaVisivel);
}

function montarCriadores() {
    const trilho = $("marqueeTrilho");

    const montarGrupo = (copia) => {
        const grupo = el("div", "marquee-grupo");
        if (copia) grupo.setAttribute("aria-hidden", "true");

        CRIADORES.forEach(c => {
            const b = el("button", "criador");
            b.type = "button";
            if (copia) b.tabIndex = -1;
            b.setAttribute("aria-label", `${c.nome}, perfil no GitHub @${c.user}`);

            const foto = el("span", "criador-foto");
            const img = new Image();
            img.alt = "";
            img.referrerPolicy = "no-referrer";
            img.src = `https://github.com/${encodeURIComponent(c.user)}.png?size=120`;
            img.addEventListener("error", () => { foto.replaceChildren(document.createTextNode(c.nome[0])); });
            foto.appendChild(img);

            const texto = el("span", "criador-texto");
            texto.appendChild(el("strong", "", c.nome));
            texto.appendChild(el("span", "criador-user", "@" + c.user));

            b.append(foto, texto);
            b.addEventListener("click", () => abrirGithub(c));
            grupo.appendChild(b);
        });
        return grupo;
    };

    // dois grupos iguais: a animação anda -50% e recomeça sem pulo
    trilho.append(montarGrupo(false), montarGrupo(true));
}

function abrirGithub(c) {
    const av = el("span", "criador-foto");
    av.style.cssText = "width:6rem;height:6rem;font-size:2.4rem";
    const img = new Image();
    img.alt = "";
    img.referrerPolicy = "no-referrer";
    img.src = `https://github.com/${encodeURIComponent(c.user)}.png?size=240`;
    img.addEventListener("error", () => { av.replaceChildren(document.createTextNode(c.nome[0])); });
    av.appendChild(img);

    $("ghAvatar").replaceChildren(av);
    $("ghNome").textContent = c.nome;
    $("ghUser").textContent = "@" + c.user + " no GitHub";
    $("ghLink").href = `https://github.com/${encodeURIComponent(c.user)}`;
    abrirModal(modalGithub);
}

// ==========================================
// 9. LÓGICA DO QUIZ
// ==========================================
function iniciarQuiz(modo) {
    modoAtual = modo;
    indiceAtual = 0;
    pontuacao = 0;
    jogando = true;

    gradeInicio.classList.add("jogando");
    bloquearNavegacao(true);
    atualizarRodape();

    rotuloModo.textContent = "Modo " + NOMES_MODO[modo];

    mostrar(inicioContainer, false);
    mostrar(finalScreen, false);
    mostrar(quizContainer, true);

    carregarPergunta();
}

function carregarPergunta() {
    clearInterval(timer);
    respondida = false;
    quizContainer.classList.remove("quiz-borrado");
    const dados = perguntas[indiceAtual];

    questionTitle.innerText = `(${indiceAtual + 1}/${perguntas.length}) ${dados.pergunta}`;
    textoDica.innerText = "Dica: " + dados.dica;

    mostrar(areaExplicacao, false);
    mostrar(btnProxima, false);
    btnDica.setAttribute("aria-expanded", "false");

    // Cada modo mostra um conjunto diferente de ajudas
    if (modoAtual === "facil") {
        mostrar(textoDica, true);      // dica sempre visível
        mostrar(btnDica, false);
    } else if (modoAtual === "normal") {
        mostrar(textoDica, false);     // dica só quando clicar no ?
        mostrar(btnDica, true);
    } else if (modoAtual === "dificil") {
        mostrar(textoDica, false);     // sem dica
        mostrar(btnDica, false);
    }

    // o cronômetro roda em todos os modos (tempo por pergunta)
    mostrar(timerDisplay, true);
    iniciarTimer(TEMPOS[modoAtual]);

    btnAlternativas.forEach((btn, index) => {
        btn.innerText = dados.alternativas[index];
        btn.disabled = false;
        btn.classList.remove("correta", "errada");
        btn.onclick = () => verificarResposta(index);
    });

    btnAlternativas[0].focus({ preventScroll: true });
}

function verificarResposta(indiceEscolhido) {
    clearInterval(timer);
    respondida = true;
    const dados = perguntas[indiceAtual];
    const correta = dados.respostaCorreta;

    btnAlternativas.forEach(btn => btn.disabled = true);

    if (indiceEscolhido === -1) {
        // Estourou o tempo
        mostrarResultado(
            "✖ O tempo acabou!",
            "Você demorou muito. A resposta correta era: " + dados.alternativas[correta],
            false
        );
        btnAlternativas[correta].classList.add("correta");
    } else if (indiceEscolhido === correta) {
        // Acertou
        pontuacao++;
        btnAlternativas[indiceEscolhido].classList.add("correta");
        mostrarResultado("✔ Resposta Correta!", dados.explicacaoCorreta, true);
    } else {
        // Errou
        btnAlternativas[indiceEscolhido].classList.add("errada");
        btnAlternativas[correta].classList.add("correta");
        mostrarResultado("✖ Resposta Incorreta!", dados.explicacaoErrada, false);
    }

    mostrar(areaExplicacao, true);
    mostrar(btnProxima, true);
    btnProxima.focus({ preventScroll: true });
}

function mostrarResultado(titulo, texto, acertou) {
    tituloResultado.innerText = titulo;
    tituloResultado.className = acertou ? "resultado-certo" : "resultado-errado";
    textoExplicacao.innerText = texto;
}

function animarNumero(elemento, ate, duracao = 1500) {
    const inicio = performance.now();
    const passo = (agora) => {
        const t = Math.min(1, (agora - inicio) / duracao);
        elemento.textContent = Math.round(ate * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
}

async function finalizarQuiz() {
    clearInterval(timer);
    jogando = false;
    mostrar(quizContainer, false);
    mostrar(finalScreen, true);
    gradeInicio.classList.remove("jogando");
    bloquearNavegacao(false);
    atualizarRodape();

    const total = perguntas.length;
    const erros = total - pontuacao;
    const modoJogado = modoAtual;

    finalScore.innerText = `Você acertou ${pontuacao} de ${total} questões!`;

    // perfil do usuário
    $("finalAvatar").replaceChildren(criarAvatar(usuario.foto, 64));
    $("finalNome").textContent = usuario.nome_login;
    $("finalModo").textContent = "Modo " + NOMES_MODO[modoJogado];

    // barras de acertos e erros sendo carregadas
    const barraAcertos = $("barraAcertos");
    const barraErros = $("barraErros");
    barraAcertos.style.width = "0";
    barraErros.style.width = "0";
    $("numAcertos").textContent = "0";
    $("numErros").textContent = "0";
    setTimeout(() => {
        barraAcertos.style.width = (pontuacao / total * 100) + "%";
        barraErros.style.width = (erros / total * 100) + "%";
        animarNumero($("numAcertos"), pontuacao);
        animarNumero($("numErros"), erros);
    }, 150);

    const porcentagem = pontuacao / total;
    let kanji, mensagem;

    if (porcentagem === 1) {
        kanji = "優";
        mensagem = "Perfeito! Você domina TI!";
    } else if (porcentagem >= 0.7) {
        kanji = "良";
        mensagem = "Mandou muito bem!";
    } else if (porcentagem >= 0.4) {
        kanji = "可";
        mensagem = "Bom resultado, mas dá para melhorar.";
    } else {
        kanji = "学";
        mensagem = "Continue estudando, você chega lá!";
    }

    emojiFinal.innerText = kanji;
    mensagemFinal.innerText = mensagem;
    btnReiniciar.focus({ preventScroll: true });

    // salva no banco e descobre a colocação no ranking do modo jogado
    const lugar = $("finalLugar");
    lugar.textContent = "Calculando a sua colocação…";
    await salvarPartida(modoJogado, pontuacao, total);

    const ranking = melhoresPorJogador(await buscarRanking(modoJogado));
    const posicao = ranking.findIndex(r => r.jogador === usuario.nome_login) + 1;

    lugar.replaceChildren();
    if (posicao >= 1 && posicao <= 3) {
        lugar.append(criarCoroa(posicao),
            document.createTextNode(`${posicao}º lugar - Coroa de ${CORES_COROA[posicao].nome}!`));
    } else if (posicao > 3) {
        lugar.textContent = `Você ficou em ${posicao}º lugar no modo ${NOMES_MODO[modoJogado]}.`;
    } else {
        lugar.textContent = "Sua pontuação foi registrada.";
    }

    atualizarRanking();
}

function voltarAoInicio() {
    clearInterval(timer);
    jogando = false;
    respondida = true;
    quizContainer.classList.remove("quiz-borrado");
    gradeInicio.classList.remove("jogando");
    bloquearNavegacao(false);
    mostrar(finalScreen, false);
    mostrar(quizContainer, false);
    mostrar(inicioContainer, true);
    atualizarRodape();
    if (appAberto) atualizarRanking();
}

// ---------- sair do quiz no meio (pop-up com blur) ----------
function pedirSaida() {
    pausarTimer();
    quizContainer.classList.add("quiz-borrado");
    abrirModal(modalSair);
}

function cancelarSaida() {
    fecharModal(modalSair, false);
    quizContainer.classList.remove("quiz-borrado");
    if (!respondida) retomarTimer();
    const proximoFoco = respondida ? btnProxima : btnAlternativas.find(b => !b.disabled);
    if (proximoFoco) proximoFoco.focus({ preventScroll: true });
}

function confirmarSaida() {
    fecharModal(modalSair, false);
    voltarAoInicio();
}

// ==========================================
// 10. TIMER (por pergunta, em todos os modos)
// ==========================================
function iniciarTimer(segundos) {
    tempoTotal = segundos;
    tempoRestante = segundos;

    // a barra volta cheia sem animação
    barraTempo.style.transition = "none";
    barraTempo.style.width = "100%";
    void barraTempo.offsetWidth;
    barraTempo.style.transition = "";

    atualizarDisplayTempo();
    retomarTimer();
}

function retomarTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        tempoRestante--;
        atualizarDisplayTempo();

        if (tempoRestante <= 0) {
            clearInterval(timer);
            verificarResposta(-1); // Estourou o tempo
        }
    }, 1000);
}

function pausarTimer() {
    clearInterval(timer);
}

function atualizarDisplayTempo() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundosRestantes = tempoRestante % 60;
    spanTempo.innerText = `${minutos}:${segundosRestantes.toString().padStart(2, "0")}`;
    barraTempo.style.width = Math.max(0, tempoRestante / tempoTotal * 100) + "%";

    const limiteUrgente = Math.min(10, Math.ceil(tempoTotal / 3));
    timerDisplay.classList.toggle("urgente", tempoRestante <= limiteUrgente);
}

// ==========================================
// 11. ACESSIBILIDADE: menu, alto contraste, fonte, tema e daltonismo
// ==========================================
function abrirFecharMenu() {
    const aberto = menuAcessibilidade.classList.toggle("ativo");
    btnAcessibilidade.setAttribute("aria-expanded", aberto);
}

function fecharMenuAcessibilidade() {
    menuAcessibilidade.classList.remove("ativo");
    btnAcessibilidade.setAttribute("aria-expanded", "false");
}

function aplicarAcessibilidade() {
    document.body.classList.toggle("modo-acessivel", altoContraste);
    document.documentElement.style.setProperty("--escala-fonte", escalaFonte);

    btnContraste.setAttribute("aria-pressed", altoContraste);
    btnContraste.innerText = altoContraste ? "🌙 Contraste normal" : "🌓 Alto contraste";

    btnFonteMais.disabled = escalaFonte >= ESCALA_MAX;
    btnFonteMenos.disabled = escalaFonte <= ESCALA_MIN;

    gravarLS("acessibilidade", { escalaFonte, altoContraste });
}

function aplicarTema() {
    document.documentElement.dataset.tema = tema;
    const claro = tema === "claro";
    $("btnTema").setAttribute("aria-checked", claro);
    $("temaTexto").textContent = claro ? "Tema claro" : "Tema escuro";
    gravarLS("gq_tema", tema);
}

function aplicarDaltonismo() {
    ["protanopia", "deuteranopia", "tritanopia"].forEach(t => {
        document.documentElement.classList.toggle("daltonismo-" + t, t === daltonismo);
    });
    const radio = document.querySelector(`input[name="daltonismo"][value="${daltonismo}"]`);
    if (radio) radio.checked = true;
    gravarLS("gq_daltonismo", daltonismo);
}

function carregarPreferencias() {
    const salvo = lerLS("acessibilidade", null);
    if (salvo) {
        const escala = Number(salvo.escalaFonte);
        if (escala >= ESCALA_MIN && escala <= ESCALA_MAX) escalaFonte = escala;
        altoContraste = salvo.altoContraste === true;
    }
    tema = lerLS("gq_tema", "escuro") === "claro" ? "claro" : "escuro";
    const dalt = lerLS("gq_daltonismo", "nenhum");
    daltonismo = ["protanopia", "deuteranopia", "tritanopia"].includes(dalt) ? dalt : "nenhum";

    aplicarAcessibilidade();
    aplicarTema();
    aplicarDaltonismo();
}

// ==========================================
// 12. EVENTOS
// ==========================================

// Login e perfil
inputNome.addEventListener("input", () => { erroLogin.textContent = ""; atualizarPreviaNome(); });
formLogin.addEventListener("submit", tentarEntrar);
$("btnEscolherFoto").addEventListener("click", () => $("inputFoto").click());
$("inputFoto").addEventListener("change", aoEscolherFoto);
$("btnPerfilSalvar").addEventListener("click", confirmarPerfil);
$("btnPerfilCancelar").addEventListener("click", () => fecharModal(modalPerfil));
btnPerfil.addEventListener("click", () => abrirPerfil(false));
$("btnAlterarFoto").addEventListener("click", () => abrirPerfil(false));
$("btnTrocarUsuario").addEventListener("click", sairDaConta);

// Abas
abasBtns.forEach(b => b.addEventListener("click", () => irParaAba(b.dataset.aba)));

// Escolha do modo de jogo
btnModos.forEach(btn => {
    btn.addEventListener("click", () => {
        const modoEscolhido = btn.dataset.modo; // "facil" | "normal" | "dificil"

        if (!modoEscolhido) {
            console.warn("O botão de modo precisa de um atributo data-modo no HTML.");
            return;
        }
        iniciarQuiz(modoEscolhido);
    });
});

// Próxima pergunta
btnProxima.addEventListener("click", () => {
    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        carregarPergunta();
    } else {
        finalizarQuiz();
    }
});

// Botão de dica (modo normal)
btnDica.addEventListener("click", () => {
    const visivel = !textoDica.hidden;
    mostrar(textoDica, !visivel);
    btnDica.setAttribute("aria-expanded", !visivel);
});

// Sair do quiz (com confirmação)
btnSair.addEventListener("click", pedirSaida);
$("btnSairSim").addEventListener("click", confirmarSaida);
$("btnSairNao").addEventListener("click", cancelarSaida);

// Voltar ao início (sem recarregar a página)
btnReiniciar.addEventListener("click", voltarAoInicio);

// Ranking: filtro por modo
document.querySelectorAll(".filtro").forEach(btn => {
    btn.addEventListener("click", () => {
        filtroRanking = btn.dataset.filtro;
        document.querySelectorAll(".filtro").forEach(b => b.setAttribute("aria-pressed", b === btn));
        atualizarRanking();
    });
});

// Pop-up do GitHub
$("btnGhFechar").addEventListener("click", () => fecharModal(modalGithub));
modalGithub.addEventListener("click", (e) => { if (e.target === modalGithub) fecharModal(modalGithub); });

// Tema e daltonismo
$("btnTema").addEventListener("click", () => {
    tema = tema === "claro" ? "escuro" : "claro";
    aplicarTema();
});

document.querySelectorAll('input[name="daltonismo"]').forEach(r => {
    r.addEventListener("change", () => {
        daltonismo = r.value;
        aplicarDaltonismo();
    });
});

// Menu de acessibilidade
btnAcessibilidade.addEventListener("click", (e) => {
    e.stopPropagation();
    abrirFecharMenu();
});

document.addEventListener("click", (e) => {
    if (!menuAcessibilidade.contains(e.target)) fecharMenuAcessibilidade();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (menuAcessibilidade.classList.contains("ativo")) {
            fecharMenuAcessibilidade();
            btnAcessibilidade.focus();
        } else if (modalGithub.classList.contains("visivel")) {
            fecharModal(modalGithub);
        } else if (modalSair.classList.contains("visivel")) {
            cancelarSaida();
        } else if (modalPerfil.classList.contains("visivel") && !$("btnPerfilCancelar").hidden) {
            fecharModal(modalPerfil);
        }
    }

    // mantém o foco dentro do pop-up aberto
    if (e.key === "Tab") {
        const aberto = [...document.querySelectorAll(".modal-fundo.visivel")].pop();
        if (!aberto) return;
        const focaveis = [...aberto.querySelectorAll("button:not(:disabled), a[href], input:not([type=file])")]
            .filter(x => !x.hidden && x.offsetParent !== null);
        if (!focaveis.length) return;
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (e.shiftKey && document.activeElement === primeiro) {
            e.preventDefault();
            ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
            e.preventDefault();
            primeiro.focus();
        }
    }
});

btnContraste.addEventListener("click", () => {
    altoContraste = !altoContraste;
    aplicarAcessibilidade();
});

btnFonteMais.addEventListener("click", () => {
    escalaFonte = Math.min(ESCALA_MAX, +(escalaFonte + ESCALA_PASSO).toFixed(1));
    aplicarAcessibilidade();
});

btnFonteMenos.addEventListener("click", () => {
    escalaFonte = Math.max(ESCALA_MIN, +(escalaFonte - ESCALA_PASSO).toFixed(1));
    aplicarAcessibilidade();
});

btnResetarAcessibilidade.addEventListener("click", () => {
    escalaFonte = 1;
    altoContraste = false;
    aplicarAcessibilidade();
});

// ==========================================
// 13. INICIALIZAÇÃO
// ==========================================
function montarPrevias() {
    $("previaCoroas").append(criarCoroa(1), criarCoroa(2), criarCoroa(3));
    document.querySelectorAll(".mini-coroa").forEach(m => m.appendChild(criarCoroa(Number(m.dataset.coroa))));
}

carregarPreferencias();
montarGradeAvatares();
montarCriadores();
montarPrevias();
atualizarStatusBanco();
chamarAPI("/ranking"); // só para saber se o banco está conectado
iniciarSplash();
