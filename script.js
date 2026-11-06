// ==========================================
// 1. BANCO DE DADOS (15 Perguntas de TI)
// ==========================================
const perguntas = [
    {
        pergunta: "O que é Python?",
        alternativas: ["Um tipo de hardware", "Uma linguagem de programação", "Um sistema operacional", "Um editor de imagens"],
        respostaCorreta: 1,
        dica: "É frequentemente associada a uma cobra, mas não morde!",
        explicacaoCorreta: "Exato! Python é uma linguagem de programação de alto nível, famosa por sua sintaxe simples.",
        explicacaoErrada: "Erro. Python não é hardware ou sistema, mas sim uma linguagem de programação muito popular."
    },
    {
        pergunta: "Quais linguagens são muito utilizadas no desenvolvimento de jogos de grande porte (AAA)?",
        alternativas: ["HTML e CSS", "PHP e Ruby", "C++ e C#", "Python e Scratch"],
        respostaCorreta: 2,
        dica: "São linguagens da família 'C', conhecidas pela altíssima performance.",
        explicacaoCorreta: "Muito bem! C++ é amplamente usada em engines como Unreal, e C# é a linguagem principal da Unity.",
        explicacaoErrada: "Incorreto. Jogos pesados exigem alta performance, sendo C++ e C# as mais utilizadas."
    },
    {
        pergunta: "O que significa a sigla HTML?",
        alternativas: ["HyperText Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Multi Language"],
        respostaCorreta: 0,
        dica: "É uma linguagem de 'Marcação' de 'Hipertexto'.",
        explicacaoCorreta: "Correto! HTML significa HyperText Markup Language, a linguagem base para estruturar páginas na web.",
        explicacaoErrada: "Você errou. A sigla correta é HyperText Markup Language."
    },
    {
        pergunta: "Na área de TI, o que é um 'Bug'?",
        alternativas: ["Um vírus perigoso", "Uma peça do computador", "Uma linguagem de programação", "Uma falha ou erro no código"],
        respostaCorreta: 3,
        dica: "O termo surgiu quando um inseto real entrou em um computador antigo.",
        explicacaoCorreta: "Isso aí! Um bug é um erro lógico ou falha no código que faz o programa não funcionar como deveria.",
        explicacaoErrada: "Errado. Um bug não é um vírus físico, é simplesmente um erro no código de um software."
    },
    {
        pergunta: "Para que serve a linguagem SQL?",
        alternativas: ["Criar interfaces gráficas", "Gerenciar bancos de dados relacionais", "Desenvolver jogos 3D", "Estilizar páginas web"],
        respostaCorreta: 1,
        dica: "Pense em tabelas, linhas e colunas de informação.",
        explicacaoCorreta: "Certíssimo! SQL é a linguagem padrão para interagir e gerenciar Bancos de Dados relacionais.",
        explicacaoErrada: "Incorreto. SQL é usada especificamente para consultar e manipular Bancos de Dados."
    },
    {
        pergunta: "O que é o Git?",
        alternativas: ["Um editor de código", "Um tipo de banco de dados", "Um sistema de controle de versão", "Uma rede social para programadores"],
        respostaCorreta: 2,
        dica: "Ele te salva quando você apaga um código importante e precisa voltar no tempo.",
        explicacaoCorreta: "Boa! O Git é um sistema de controle de versão que mapeia todas as alterações feitas no código.",
        explicacaoErrada: "Errou. Git é um sistema de controle de versão de código."
    },
    {
        pergunta: "Qual a principal diferença entre Front-end e Back-end?",
        alternativas: ["Front-end é hardware, Back-end é software", "Não há diferença no mercado", "Front-end é o servidor, Back-end é o cliente", "Front-end é a interface visual, Back-end é a lógica do servidor"],
        respostaCorreta: 3,
        dica: "Front (Frente/Visível) e Back (Trás/Invisível para o usuário).",
        explicacaoCorreta: "Perfeito! Front-end é o que o usuário vê. Back-end é o que roda por trás (servidor, banco de dados).",
        explicacaoErrada: "Incorreto. O Front-end cuida da parte visual, enquanto o Back-end cuida da lógica no servidor."
    },
    {
        pergunta: "O que faz o CSS em uma página web?",
        alternativas: ["Adiciona lógica e interatividade", "Controla a apresentação visual e o estilo", "Cria a estrutura da página", "Conecta o site ao banco de dados"],
        respostaCorreta: 1,
        dica: "Ele é responsável pelas cores, fontes e layout.",
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
        dica: "Se o computador desligar, tudo que está nela é apagado (é volátil).",
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
        dica: "A comunidade de programadores pode ver o código e ajudar a melhorá-lo.",
        explicacaoCorreta: "Muito bem! O software de código aberto permite que qualquer pessoa veja e modifique o seu código fonte.",
        explicacaoErrada: "Incorreto. Open-source significa que o código do sistema está público para a comunidade."
    },
    {
        pergunta: "Qual dessas é uma das Engines (motores) de jogos mais populares do mundo?",
        alternativas: ["Photoshop", "Unity", "Excel", "Visual Studio"],
        respostaCorreta: 1,
        dica: "Começa com a letra U e também tem um C# por trás.",
        explicacaoCorreta: "Acertou! Unity é um dos motores de jogos mais famosos do mundo para PC, consoles e mobile.",
        explicacaoErrada: "Errou. Dentre as opções, a Unity é a engine (motor gráfico) utilizada para criar jogos."
    },
    {
        pergunta: "Na lógica de programação, o que é um dado do tipo 'Booleano' (Boolean)?",
        alternativas: ["Um texto longo", "Um número decimal", "Uma lista de itens", "Um valor que só pode ser Verdadeiro ou Falso"],
        respostaCorreta: 3,
        dica: "É como um interruptor de luz: só tem dois estados.",
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
// 2. MAPEAMENTO DOS ELEMENTOS HTML
// ==========================================
const inicioContainer = document.getElementById("inicio-container");
const quizContainer = document.getElementById("quiz-container");
const questionTitle = document.getElementById("question");
const btnDica = document.getElementById("btnDica");
const textoDica = document.getElementById("textoDica");
const areaExplicacao = document.getElementById("areaExplicacao");
const tituloResultado = document.getElementById("tituloResultado");
const textoExplicacao = document.getElementById("textoExplicacao");
const btnProxima = document.getElementById("btnProxima");
const timerDisplay = document.getElementById("timer-display");
const spanTempo = document.getElementById("tempo");
const finalScreen = document.getElementById("final");
const finalScore = document.getElementById("finalScore");
const mensagemFinal = document.getElementById("mensagemFinal");
const emojiFinal = document.getElementById("emojiFinal");
const btnReiniciar = document.getElementById("btnReiniciar");
const btnModos = document.querySelectorAll(".btn-modo");

const btnAlternativas = [
    document.getElementById("alternative1"),
    document.getElementById("alternative2"),
    document.getElementById("alternative3"),
    document.getElementById("alternative4")
];

// Acessibilidade
const btnAcessibilidade = document.getElementById("btnAcessibilidade");
const menuAcessibilidade = document.getElementById("menuAcessibilidade");
const btnContraste = document.getElementById("btnContraste");
const btnFonteMais = document.getElementById("btnFonteMais");
const btnFonteMenos = document.getElementById("btnFonteMenos");
const btnResetarAcessibilidade = document.getElementById("btnResetarAcessibilidade");

// ==========================================
// 3. VARIÁVEIS DE ESTADO
// ==========================================
let indiceAtual = 0;
let pontuacao = 0;
let modoAtual = "normal";
let timer = null;
let tempoRestante = 0;

const TEMPO_DIFICIL = 110; // 1 minuto e 50 segundos

const ESCALA_MIN = 0.8;
const ESCALA_MAX = 1.6;
const ESCALA_PASSO = 0.1;

let escalaFonte = 1;
let altoContraste = false;

// ==========================================
// 4. FUNÇÕES AUXILIARES
// ==========================================
function mostrar(elemento, visivel) {
    elemento.style.display = visivel ? "block" : "none";
}

// ==========================================
// 5. LÓGICA DO QUIZ
// ==========================================
function iniciarQuiz(modo) {
    modoAtual = modo;
    indiceAtual = 0;
    pontuacao = 0;

    mostrar(inicioContainer, false);
    mostrar(finalScreen, false);
    mostrar(quizContainer, true);

    carregarPergunta();
}

function carregarPergunta() {
    clearInterval(timer);
    const dados = perguntas[indiceAtual];

    questionTitle.innerText = `(${indiceAtual + 1}/${perguntas.length}) ${dados.pergunta}`;
    textoDica.innerText = "💡 Dica: " + dados.dica;

    mostrar(areaExplicacao, false);
    mostrar(btnProxima, false);
    btnDica.setAttribute("aria-expanded", "false");

    // Cada modo mostra um conjunto diferente de ajudas
    if (modoAtual === "facil") {
        mostrar(textoDica, true);      // dica sempre visível
        mostrar(btnDica, false);
        mostrar(timerDisplay, false);
    } else if (modoAtual === "normal") {
        mostrar(textoDica, false);     // dica só quando clicar no ❓
        mostrar(btnDica, true);
        mostrar(timerDisplay, false);
    } else if (modoAtual === "dificil") {
        mostrar(textoDica, false);     // sem dica, com tempo
        mostrar(btnDica, false);
        mostrar(timerDisplay, true);
        iniciarTimer(TEMPO_DIFICIL);
    }

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
    const dados = perguntas[indiceAtual];
    const correta = dados.respostaCorreta;

    btnAlternativas.forEach(btn => btn.disabled = true);

    if (indiceEscolhido === -1) {
        // Estourou o tempo
        mostrarResultado(
            "⏰ O tempo acabou!",
            "Você demorou muito. A resposta correta era: " + dados.alternativas[correta],
            false
        );
        btnAlternativas[correta].classList.add("correta");
    } else if (indiceEscolhido === correta) {
        // Acertou
        pontuacao++;
        btnAlternativas[indiceEscolhido].classList.add("correta");
        mostrarResultado("🎉 Resposta Correta!", dados.explicacaoCorreta, true);
    } else {
        // Errou
        btnAlternativas[indiceEscolhido].classList.add("errada");
        btnAlternativas[correta].classList.add("correta");
        mostrarResultado("❌ Resposta Incorreta!", dados.explicacaoErrada, false);
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

function finalizarQuiz() {
    clearInterval(timer);
    mostrar(quizContainer, false);
    mostrar(finalScreen, true);

    finalScore.innerText = `Você acertou ${pontuacao} de ${perguntas.length} questões!`;

    const porcentagem = pontuacao / perguntas.length;
    let emoji, mensagem;

    if (porcentagem === 1) {
        emoji = "🏆";
        mensagem = "Perfeito! Você domina TI!";
    } else if (porcentagem >= 0.7) {
        emoji = "🎉";
        mensagem = "Mandou muito bem!";
    } else if (porcentagem >= 0.4) {
        emoji = "🙂";
        mensagem = "Bom resultado, mas dá para melhorar.";
    } else {
        emoji = "📚";
        mensagem = "Continue estudando, você chega lá!";
    }

    emojiFinal.innerText = emoji;
    mensagemFinal.innerText = mensagem;
    btnReiniciar.focus({ preventScroll: true });
}

function voltarAoInicio() {
    clearInterval(timer);
    mostrar(finalScreen, false);
    mostrar(quizContainer, false);
    mostrar(inicioContainer, true);
}

// ==========================================
// 6. TIMER (modo difícil)
// ==========================================
function iniciarTimer(segundos) {
    tempoRestante = segundos;
    atualizarDisplayTempo();

    timer = setInterval(() => {
        tempoRestante--;
        atualizarDisplayTempo();

        if (tempoRestante <= 0) {
            clearInterval(timer);
            verificarResposta(-1); // Estourou o tempo
        }
    }, 1000);
}

function atualizarDisplayTempo() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundosRestantes = tempoRestante % 60;
    spanTempo.innerText = `${minutos}:${segundosRestantes.toString().padStart(2, "0")}`;
    timerDisplay.classList.toggle("urgente", tempoRestante <= 10);
}

// ==========================================
// 7. ACESSIBILIDADE: menu, alto contraste e fonte
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

    try {
        localStorage.setItem("acessibilidade", JSON.stringify({ escalaFonte, altoContraste }));
    } catch (e) { /* o navegador pode bloquear o armazenamento */ }
}

function carregarPreferencias() {
    try {
        const salvo = JSON.parse(localStorage.getItem("acessibilidade"));
        if (salvo) {
            const escala = Number(salvo.escalaFonte);
            if (escala >= ESCALA_MIN && escala <= ESCALA_MAX) escalaFonte = escala;
            altoContraste = salvo.altoContraste === true;
        }
    } catch (e) { /* sem preferências salvas */ }
    aplicarAcessibilidade();
}

// ==========================================
// 8. EVENTOS
// ==========================================

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
    const visivel = textoDica.style.display === "block";
    mostrar(textoDica, !visivel);
    btnDica.setAttribute("aria-expanded", !visivel);
});

// Voltar ao início (sem recarregar a página)
btnReiniciar.addEventListener("click", voltarAoInicio);

// Menu de acessibilidade
btnAcessibilidade.addEventListener("click", (e) => {
    e.stopPropagation();
    abrirFecharMenu();
});

document.addEventListener("click", (e) => {
    if (!menuAcessibilidade.contains(e.target)) fecharMenuAcessibilidade();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuAcessibilidade.classList.contains("ativo")) {
        fecharMenuAcessibilidade();
        btnAcessibilidade.focus();
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
// 9. INICIALIZAÇÃO
// ==========================================
carregarPreferencias();
