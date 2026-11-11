import base64
import binascii
import json
import math
import os
import re
import secrets
import sqlite3
import time
import unicodedata
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from functools import wraps

from flask import Flask, g, jsonify, request
from itsdangerous import BadSignature, URLSafeTimedSerializer
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
#--------------------------+
# (API) PERGUNTAS DO QUIZ -_-
#--------------------------+
perguntas = [
    {
        "id": 1,
        "pergunta": "O que é Python?",
        "alternativas": [
            "Um tipo de hardware",
            "Uma linguagem de programação",
            "Um sistema operacional",
            "um editor de imagens"
        ],
       "respostaCorreta": 1,
        "dica": "È muito utilizada atualmente em inteligência artificial, automação e análise de dados.",
        "explicacaoCorreta": "Exato! Python é uma linguagem de programação de alto nível, famosa por sua sintaxe simples.",
        "explicacaoErrada": "Erro. Python não é hardware ou sistema, mas sim uma linguagem de programação muito popular."
    },
    {
        "id": 2,
        "pergunta": "Quais linguagens são muito utilizadas no desenvolvimento de jogos de grande porte (AAA)?",
        "alternativas":[
             "HTML e CSS","PHP e Ruby", "C++ e C#", "Python e Scratch"
        ],
       "respostaCorreta": 2,
        "explicacaoCorreta": "Muito bem! C++ é amplamente usada em engines como Unreal, e C# é a linguagem principal da Unity.",
        "explicacaoErrada": "Incorreto. Jogos pesados exigem alta performance, sendo C++ e C# as mais utilizadas."
    },
    {
       "id": 3,
       "pergunta": "O que significa a sigla HTML?",
       "alternativas":[
        "HyperText Markup Language",  "Hyperlinks and Text Markup Language",  "Home Tool Markup Language",  "Hyper Tool Multi Language"
       ],
      "respostaCorreta": 0,
       "explicacaoCorreta": "Correto! HTML significa HyperText Markup Language, a linguagem base para estruturar páginas na web.",
       "explicacaoErrada": "Você errou. A sigla correta é HyperText Markup Language."
    },
    {
        "id": 4,
        "pergunta": "Na área de TI, o que é um 'Bug'?",
        "alternativas": [
           "Um vírus perigoso",  "Uma peça do computador", "Uma linguagem de programação",  "Uma falha ou erro no código"
        ],
       "respostaCorreta": 3,
        "dica": "Pode acontecer quando um sistema apresenta um comportamento inesperado.",
        "explicacaoCorreta": "Isso aí! Um bug é um erro lógico ou falha no código que faz o programa não funcionar como deveria.",
        "explicacaoErrada": "Errado. Um bug não é um vírus físico, é simplesmente um erro no código de um software."
    },
    {
        "id": 5,
        "pergunta": "Para que serve a linguagem SQL?",
        "alternativas": [
        "Criar interfaces gráficas", "Gerenciar bancos de dados relacionais",  "Desenvolver jogos 3D", "Estilizar páginas web"
        ],
        "respostaCorreta": 1,
        "dica": "É muito utilizada quando precisamos organizar e consultar informações armazenadas.",
        "explicacaoCorreta": "Certíssimo! SQL é a linguagem padrão para interagir e gerenciar Bancos de Dados relacionais.",
        "explicacaoErrada": "Incorreto. SQL é usada especificamente para consultar e manipular Bancos de Dados."
    },
    {
        "id": 6,
        "pergunta": "O que é o Git?",
        "alternativas": [
        "Um editor de código", "Um tipo de banco de dados", "Um sistema de controle de versão", "Uma rede social para programadores" 
        ],
        "respostaCorreta": 2,
        "dica": "É muito utilizado por desenvolvedores para acompanhar alterações em projetos.",
        "explicacaoCorreta": "Boa! O Git é um sistema de controle de versão que mapeia todas as alterações feitas no código.",
        "explicacaoErrada": "Errou. Git é um sistema de controle de versão de código."
    },
    {
        "id": 7,
        "pergunta": "Qual a principal diferença entre Front-end e Back-end?",
        "alternativas": [
        "Front-end é hardware, Back-end é software", "Não há diferença no mercado", "Front-end é o servidor, Back-end é o cliente",  "Front-end é a interface visual, Back-end é a lógica do servidor"
        ],
        "respostaCorreta": 3,
        "dica": "Pense na diferença entre aquilo que o usuário vê e aquilo que acontece por trás de um sistema.",
        "explicacaoCorreta": "Perfeito! Front-end é o que o usuário vê. Back-end é o que roda por trás (servidor, banco de dados).",
        "explicacaoErrada": "Incorreto. O Front-end cuida da parte visual, enquanto o Back-end cuida da lógica no servidor."
    },
    {
        "id": 8,
        "pergunta": "O que faz o CSS em uma página web?",
        "alternativas": [
        "Adiciona lógica e interatividade",  "Controla a apresentação visual e o estilo", "Cria a estrutura da página", "Conecta o site ao banco de dados"
        ],
        "respostaCorreta": 1,
        "dica": "É o que ajuda a deixar um site mais bonito e organizado visualmente.",
        "explicacaoCorreta": "Correto! O CSS serve para estilizar o HTML, dando cor e formato ao site.",
        "explicacaoErrada": "Errou. O CSS não adiciona lógica nem cria estrutura. Ele cuida apenas do estilo visual."
    },
    {
        "id": 9,
        "pergunta": "O que é uma 'variável' na programação?",
        "alternativas": [
        "Um erro no código", "Um comando de repetição", "Um espaço na memória para armazenar dados",  "Uma função matemática complexa"
        ],
        "respostaCorreta": 2,
        "dica": "Pense nela como uma 'caixa' com uma etiqueta onde você guarda um valor.",
        "explicacaoCorreta": "Isso! Uma variável é um espaço na memória do computador usado para guardar dados que podem mudar.",
        "explicacaoErrada": "Incorreto. Uma variável atua como uma 'caixa' na memória para salvar informações temporárias."
    },
    {
        "id": 10,
        "pergunta": "Qual é a função da memória RAM em um computador?",
        "alternativas": [
        "Armazenar dados temporários para acesso rápido", "Armazenar arquivos permanentemente", "Resfriar a placa-mãe",  "Processar gráficos de jogos"
        ],
        "respostaCorreta": 0,
        "dica": "Está relacionada ao desempenho do computador enquanto vários programas estão abertos.",
        "explicacaoCorreta": "Exatamente! A RAM armazena informações temporárias que o processador precisa acessar imediatamente.",
        "explicacaoErrada": "Errado. A RAM é memória de curto prazo. Quem armazena permanentemente é o HD ou SSD."
    },
    {
        "id": 11,
        "pergunta": "O que é um Algoritmo?",
        "alternativas": [
        "Uma sequência de passos lógicos para resolver um problema", "Uma peça de hardware da CPU", "Uma linguagem de programação", "Um vírus de computador"
        ],
        "respostaCorreta": 0,
        "dica": "Pense em uma receita de bolo passo a passo.",
        "explicacaoCorreta": "Correto! Um algoritmo é basicamente uma receita, um passo a passo estruturado usado para chegar a um resultado.",
        "explicacaoErrada": "Você errou. Um algoritmo não é físico, é a sequência de passos criada para resolver um problema."
    },
    {
        "id": 12,
        "pergunta": "O que caracteriza um software 'Open-source' (Código Aberto)?",
        "alternativas": [
        "É sempre gratuito e sem regras", "É desenvolvido por uma única empresa", "Seu código-fonte está disponível para ser modificado", "Funciona apenas em navegadores"
        ],
        "respostaCorreta": 2,
        "dica": "É muito utilizado por desenvolvedores que gostam de colaborar em projetos e compartilhar conhecimentos com outras pessoas.",
        "explicacaoCorreta": "Muito bem! O software de código aberto permite que qualquer pessoa veja e modifique o seu código fonte.",
        "explicacaoErrada": "Incorreto. Open-source significa que o código do sistema está público para a comunidade."
    },
    {
        "id": 13,
        "pergunta": "Qual dessas é uma das Engines (motores) de jogos mais populares do mundo?",
        "alternativas": [
        "Photoshop", "Unity", "Excel", "Visual Studio"
        ],
        "respostaCorreta": 1,
        "dica": "É uma ferramenta muito conhecida entre desenvolvedores de jogos e possui recursos para criar ambientes em 2D e 3D.",
        "explicacaoCorreta": "Acertou! Unity é um dos motores de jogos mais famosos do mundo para PC, consoles e mobile.",
        "explicacaoErrada": "Errou. Dentre as opções, a Unity é a engine (motor gráfico) utilizada para criar jogos."
    },
    {
        "id": 14,
        "pergunta": "Na lógica de programação, o que é um dado do tipo 'Booleano' (Boolean)?",
        "alternativas": [
        "Um texto longo",  "Um número decimal", "Uma lista de itens",  "Um valor que só pode ser Verdadeiro ou Falso"
        ],
        "respostaCorreta": 3,
        "dica": "É muito utilizado em estruturas condicionais para trabalhar com duas possibilidades lógicas.",
        "explicacaoCorreta": "Exato! Um tipo Booleano trabalha apenas com duas opções lógicas: Verdadeiro (True) ou Falso (False).",
        "explicacaoErrada": "Incorreto. Variáveis booleanas são binárias, elas só aceitam Verdadeiro ou Falso."
    },
    {
        "id": 15,
        "pergunta": "Quem é frequentemente considerado o 'Pai da Computação'?",
        "alternativas": [
        "Alan Turing", "Bill Gates",  "Steve Jobs", "Mark Zuckerberg"
        ],
        "respostaCorreta": 0,
        "dica": "Ele quebrou o código da máquina Enigma na Segunda Guerra Mundial.",
        "explicacaoCorreta": "Correto! Alan Turing foi um matemático brilhante que criou a base teórica de como os computadores funcionam hoje.",
        "explicacaoErrada": "Errou. Bill Gates e Steve Jobs popularizaram os PCs, mas o pioneiro teórico foi Alan Turing."
    }
]

# Site pelo próprio Flask: abrir http://127.0.0.1:5000/ já mostra o Quiz (não precisa abrir o index.html).
# Só estes arquivos são entregues (nunca o app.py, o banco ou a chave secreta).
PASTA_SITE = os.path.dirname(os.path.abspath(__file__))
ARQUIVOS_DO_SITE = {
    "index.html": "text/html; charset=utf-8",
    "style.css": "text/css; charset=utf-8",
    "script.js": "text/javascript; charset=utf-8",
    "favicon.ico": "image/x-icon",
    "icones/icone-16.png": "image/png",
    "icones/icone-32.png": "image/png",
    "icones/icone-48.png": "image/png",
    "icones/icone-180.png": "image/png",
    "icones/icone-192.png": "image/png",
    "icones/icone-512.png": "image/png",
}


@app.route("/", methods=["GET"])
@app.route("/index.html", methods=["GET"])
def inicio():
    return entregar_arquivo_do_site("index.html")


@app.route("/<path:arquivo>", methods=["GET"])
def arquivo_do_site(arquivo):
    if arquivo not in ARQUIVOS_DO_SITE:
        return erro("Não encontrado", 404)
    return entregar_arquivo_do_site(arquivo)


def entregar_arquivo_do_site(arquivo):
    caminho = os.path.join(PASTA_SITE, arquivo)
    if not os.path.isfile(caminho):
        return erro("Arquivo do site não encontrado. Deixe o app.py na mesma pasta do index.html.", 404)
    with open(caminho, "rb") as f:
        resposta = app.response_class(f.read(), mimetype=ARQUIVOS_DO_SITE[arquivo].split(";")[0])
    resposta.headers["Content-Type"] = ARQUIVOS_DO_SITE[arquivo]
    resposta.headers["Cache-Control"] = "no-cache"      # sempre confere se o arquivo mudou
    return resposta


@app.route("/api/status", methods=["GET"])
def status():
    return jsonify({
        "status": "online"
    })
    
    
@app.route("/api/perguntas", methods=["GET"])
def listar_perguntas():

    resultado = []

    for pergunta in perguntas:
        resultado.append({
            "id": pergunta["id"],
            "pergunta": pergunta["pergunta"],
            "alternativas": pergunta["alternativas"],
            "dica": pergunta.get("dica") 
        })

    return jsonify(resultado)




@app.route("/api/perguntas/<int:id>", methods=["GET"])
def buscar_pergunta(id):
    for pergunta in perguntas:
        if pergunta["id"] == id:
            return jsonify({
                "id": pergunta["id"],
                "pergunta": pergunta["pergunta"],
                "alternativas": pergunta["alternativas"],
                "dica": pergunta.get("dica") 
            })
    return jsonify({
        "erro": "Pergunta não encontrada"
    }), 404
    

@app.route("/api/respostas", methods=["POST"])
def verificar_resposta():

    dados = request.get_json(silent=True)

    if not isinstance(dados, dict):
        return jsonify({"erro": "Envie os dados em JSON"}), 400

    id_pergunta = dados.get("id_pergunta")
    alternativa = dados.get("alternativa")

    if not isinstance(id_pergunta, int) or isinstance(id_pergunta, bool):
        return jsonify({"erro": "ID da pergunta inválido"}), 400

    if not isinstance(alternativa, int) or isinstance(alternativa, bool):
        return jsonify({"erro": "Alternativa inválida"}), 400

    pergunta_encontrada = None

    for pergunta in perguntas:
        if pergunta["id"] == id_pergunta:
            pergunta_encontrada = pergunta
            break

    if pergunta_encontrada is None:
        return jsonify({"erro": "Pergunta não encontrada"}), 404

    if alternativa < 0 or alternativa >= len(pergunta_encontrada["alternativas"]):
        return jsonify({"erro": "Alternativa inexistente"}), 400

    correta = alternativa == pergunta_encontrada["respostaCorreta"]

    if correta:
        mensagem = "Resposta correta!"
        explicacao = pergunta_encontrada["explicacaoCorreta"]
    else:
        mensagem = "Resposta incorreta!"
        explicacao = pergunta_encontrada["explicacaoErrada"]

    return jsonify({
        "correta": correta,
        "mensagem": mensagem,
        "explicacao": explicacao
    })




#--------------------------+
# BANCO DE DADOS (SQLite)
#--------------------------+
# O banco fica no arquivo quiz.db, na mesma pasta do app.py. Ele é criado sozinho
# na primeira vez que a API roda, não precisa instalar nada.
# As tabelas usuario, login e ranking seguem os nomes do doc_date/08-extensao.

PASTA = os.path.dirname(os.path.abspath(__file__))
CAMINHO_BANCO = os.path.join(PASTA, "quiz.db")
CAMINHO_CHAVE = os.path.join(PASTA, "quiz_secret.key")

# Para o login com Google funcionar, coloque aqui o "ID do cliente" criado no Google Cloud
# (ou defina a variável de ambiente GOOGLE_CLIENT_ID). Passo a passo no README.
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "")

DIAS_ENTRE_TROCAS = 7            # tempo de espera para trocar nickname / senha de novo
VALIDADE_SESSAO = 60 * 60 * 24 * 30   # o login vale por 30 dias
MODOS = ("facil", "normal", "dificil")
AVATARES_PADRAO = ["侍", "猫", "狐", "龍", "桜", "月", "鬼", "鯉"]   # mesmos do script.js

app.config["MAX_CONTENT_LENGTH"] = 30 * 1024 * 1024   # foto + banner (GIF de até 10 MB cada, em base64)
LIMITE_JSON_COMUM = 64 * 1024                        # as demais rotas nunca precisam de mais que isso

ESQUEMA = """
-- Dados de usuários
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome          TEXT NOT NULL,                -- guarda o mesmo nickname do login (como no 08-extensao)
    email         TEXT NOT NULL UNIQUE,         -- sempre em minúsculo, não pode repetir
    tipo_conta    TEXT NOT NULL DEFAULT 'site', -- 'site' (cadastro pelo Quiz) ou 'google'
    google_id     TEXT UNIQUE,                  -- só preenchido nas contas do Google
    foto          TEXT,                         -- 'preset:侍' ou uma imagem em base64
    banner        TEXT,                         -- imagem em base64 (opcional)
    biografia     TEXT NOT NULL DEFAULT '',
    pronomes      TEXT NOT NULL DEFAULT '',     -- ex.: 'ele/dele' (opcional, aparece ao lado do nickname)
    data_cadastro TEXT NOT NULL,
    CONSTRAINT ck_usuario_tipo  CHECK (tipo_conta IN ('site', 'google')),
    CONSTRAINT ck_usuario_email CHECK (email = lower(email))
);

-- Dados de login (a senha fica só como hash, e é NULL nas contas do Google)
CREATE TABLE IF NOT EXISTS login (
    id_login           INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario         INTEGER NOT NULL UNIQUE,
    nome_login         TEXT NOT NULL UNIQUE,    -- o nickname, também aparece no ranking
    senha_hash         TEXT,
    data_ultimo_acesso TEXT,
    data_troca_nome    TEXT,                    -- última vez que trocou o nickname (regra dos 7 dias)
    data_troca_senha   TEXT,                    -- última vez que trocou a senha (regra dos 7 dias)
    CONSTRAINT ck_login_nome CHECK (length(nome_login) BETWEEN 3 AND 20 AND nome_login NOT GLOB '*[^a-z0-9_]*'),
    CONSTRAINT fk_login_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE
);

-- Cada linha é uma partida terminada
CREATE TABLE IF NOT EXISTS ranking (
    id_ranking      INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario      INTEGER NOT NULL,
    modo            TEXT NOT NULL,
    acertos         INTEGER NOT NULL,
    total_perguntas INTEGER NOT NULL,
    data_partida    TEXT NOT NULL,
    CONSTRAINT ck_ranking_modo    CHECK (modo IN ('facil', 'normal', 'dificil')),
    CONSTRAINT ck_ranking_total   CHECK (total_perguntas > 0),
    CONSTRAINT ck_ranking_acertos CHECK (acertos >= 0 AND acertos <= total_perguntas),
    CONSTRAINT fk_ranking_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_ranking_modo_acertos ON ranking (modo, acertos DESC);
CREATE INDEX IF NOT EXISTS idx_ranking_usuario ON ranking (id_usuario);

-- Emblemas (insígnias) que existem no Quiz
CREATE TABLE IF NOT EXISTS emblema (
    id_emblema INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo     TEXT NOT NULL UNIQUE,
    nome       TEXT NOT NULL,
    descricao  TEXT NOT NULL
);

-- Quais emblemas cada usuário tem
CREATE TABLE IF NOT EXISTS usuario_emblema (
    id_usuario     INTEGER NOT NULL,
    id_emblema     INTEGER NOT NULL,
    data_conquista TEXT NOT NULL,
    CONSTRAINT pk_usuario_emblema PRIMARY KEY (id_usuario, id_emblema),
    CONSTRAINT fk_ue_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_ue_emblema FOREIGN KEY (id_emblema) REFERENCES emblema (id_emblema)
);
"""

EMBLEMAS = [
    ("GENNIS_ACCOUNT", "GennisAccount", "Criou a conta direto no site do GennisQuiz."),
    ("GOOGLE_ACCOUNT", "GoogleAccount", "Entrou no GennisQuiz com uma conta do Google."),
    ("TOP_1", "Top 1", "Está em 1º lugar no ranking geral. Coroa de ouro!"),
    ("TOP_2", "Top 2", "Está em 2º lugar no ranking geral. Coroa de prata!"),
    ("TOP_3", "Top 3", "Está em 3º lugar no ranking geral. Coroa de bronze!"),
]


def iniciar_banco():
    db = sqlite3.connect(CAMINHO_BANCO)
    db.executescript(ESQUEMA)
    # bancos criados antes da coluna "pronomes" ganham ela aqui, sem perder nenhum dado
    colunas = [linha[1] for linha in db.execute("PRAGMA table_info(usuario)")]
    if "pronomes" not in colunas:
        db.execute("ALTER TABLE usuario ADD COLUMN pronomes TEXT NOT NULL DEFAULT ''")
    db.executemany("INSERT OR IGNORE INTO emblema (codigo, nome, descricao) VALUES (?, ?, ?)", EMBLEMAS)
    db.commit()
    db.close()


def get_db():
    # uma conexão por requisição (o Flask fecha ela no final)
    if "db" not in g:
        g.db = sqlite3.connect(CAMINHO_BANCO)
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA foreign_keys = ON")    # precisa para o ON DELETE CASCADE funcionar
        g.db.execute("PRAGMA secure_delete = ON")   # o que for apagado é sobrescrito no arquivo
    return g.db


@app.teardown_appcontext
def fechar_db(erro):
    db = g.pop("db", None)
    if db is not None:
        db.close()


#--------------------------+
# CHAVE SECRETA, CORS E FUNÇÕES AUXILIARES
#--------------------------+
def carregar_chave():
    chave = os.environ.get("GENNISQUIZ_SECRET")
    if chave:
        return chave
    if not os.path.exists(CAMINHO_CHAVE):
        try:
            with open(CAMINHO_CHAVE, "x") as arquivo:
                arquivo.write(secrets.token_hex(32))
            os.chmod(CAMINHO_CHAVE, 0o600)
        except (FileExistsError, OSError):
            pass
    with open(CAMINHO_CHAVE) as arquivo:
        return arquivo.read().strip()


serializador = URLSafeTimedSerializer(carregar_chave())


@app.after_request
def liberar_cors(resposta):
    # o site (index.html) abre em outro endereço que a API, então o navegador exige isso
    resposta.headers["Access-Control-Allow-Origin"] = "*"
    resposta.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    resposta.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    return resposta


@app.errorhandler(413)
def arquivo_grande(erro):
    return jsonify({"erro": "Imagem grande demais. O limite é de 10 MB."}), 413


@app.before_request
def limitar_tamanho_das_rotas():
    # só o cadastro e a edição de perfil recebem imagens; as outras rotas ficam com um limite pequeno
    if request.method in ("POST", "PUT") and request.endpoint not in (
            "cadastrar", "completar_cadastro_google", "atualizar_perfil"):
        if (request.content_length or 0) > LIMITE_JSON_COMUM:
            return arquivo_grande(None)


def erro(mensagem, codigo=400, **extra):
    return jsonify({"erro": mensagem, **extra}), codigo


def pegar_json():
    dados = request.get_json(silent=True)
    return dados if isinstance(dados, dict) else None


def agora():
    return datetime.now(timezone.utc)


def texto_data(data):
    return data.isoformat(timespec="seconds")


def ler_data(texto):
    return datetime.fromisoformat(texto) if texto else None


def nickname_valido(nickname):
    return isinstance(nickname, str) and re.fullmatch(r"[a-z0-9_]{3,20}", nickname) is not None


def email_valido(email):
    return isinstance(email, str) and len(email) <= 120 and re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email) is not None


def senha_valida(senha):
    return isinstance(senha, str) and 6 <= len(senha) <= 100


def normalizar_nickname(texto):
    # "Matheus P." vira "matheus_p" (mesma regra do script.js)
    texto = unicodedata.normalize("NFD", str(texto))
    texto = "".join(c for c in texto if not unicodedata.combining(c))
    texto = re.sub(r"\s+", "_", texto.lower().strip())
    return re.sub(r"[^a-z0-9_]", "", texto)[:20]


ASSINATURAS_IMAGEM = {
    "png": (b"\x89PNG",),
    "jpeg": (b"\xff\xd8",),
    "gif": (b"GIF8",),
    "webp": (b"RIFF",),
}


def ajuste_valido(texto):
    # o enquadramento escolhido no pop-up de ajuste vai no fim da imagem: #a=zoom,x,y,proporção
    achou = re.fullmatch(r"a=(\d{1,2}(?:\.\d{1,4})?),(\d(?:\.\d{1,4})?),(\d(?:\.\d{1,4})?),(\d{1,3}(?:\.\d{1,6})?)", texto)
    if not achou:
        return False
    zoom, x, y, proporcao = (float(n) for n in achou.groups())
    return 1 <= zoom <= 5 and 0 <= x <= 1 and 0 <= y <= 1 and 0.05 <= proporcao <= 50


def imagem_valida(valor, limite, aceita_padrao=False):
    # aceita 'preset:侍' (só na foto) ou uma imagem em base64 (data URL, PNG/JPG/WEBP/GIF)
    # de até "limite" caracteres, com o enquadramento (#a=...) opcional no final
    if not isinstance(valor, str):
        return False
    if aceita_padrao and valor.startswith("preset:"):
        return valor[len("preset:"):] in AVATARES_PADRAO
    if len(valor) > limite:
        return False
    valor, separador, ajuste = valor.partition("#")
    if separador and not ajuste_valido(ajuste):
        return False
    achou = re.fullmatch(r"data:image/(png|jpeg|webp|gif);base64,([A-Za-z0-9+/]+={0,2})", valor)
    if not achou:
        return False
    try:
        conteudo = base64.b64decode(achou.group(2), validate=True)
    except (binascii.Error, ValueError):
        return False
    # o arquivo em si (já decodificado) pode ter no máximo 10 MB
    if len(conteudo) > LIMITE_IMAGEM_BYTES:
        return False
    # confere se o começo do arquivo bate com o tipo que a imagem diz ser
    if not conteudo.startswith(ASSINATURAS_IMAGEM[achou.group(1)]):
        return False
    if achou.group(1) == "webp" and conteudo[8:12] != b"WEBP":
        return False
    return True


# tamanho máximo de foto e banner: 10 MB (um arquivo de 10 MB vira ~13,4 milhões de caracteres em base64)
LIMITE_IMAGEM_BYTES = 10 * 1024 * 1024
LIMITE_FOTO = 14_000_000
LIMITE_BANNER = 14_000_000
# imagens maiores que isso (em caracteres) não vão dentro das respostas JSON do ranking/perfil:
# elas são entregues em /api/foto/<nickname> e /api/banner/<nickname>
LIMITE_INLINE = 60_000
PARTIDAS_POR_PAGINA = 5


def sql_imagem(coluna):
    # devolve a imagem pequena inteira; a grande vira '@grande' + o enquadramento (#a=...)
    return ("CASE WHEN length({c}) > {n} THEN '@grande' || "
            "CASE WHEN instr({c}, '#') > 0 THEN substr({c}, instr({c}, '#')) ELSE '' END "
            "ELSE {c} END").format(c=coluna, n=LIMITE_INLINE)


def url_imagem(valor, tipo, nickname, versao):
    # troca o marcador '@grande' pelo endereço da imagem; '?v=' faz o navegador recarregar quando ela muda
    if isinstance(valor, str) and valor.startswith("@grande"):
        return "/api/%s/%s?v=%s%s" % (tipo, urllib.parse.quote(nickname), versao, valor[len("@grande"):])
    return valor


def limpar_biografia(texto):
    # mantém as quebras de linha (no máximo uma linha em branco seguida) e tira o resto de espaço sobrando
    texto = texto.replace("\r\n", "\n").replace("\r", "\n")
    texto = re.sub(r"[\x00-\x08\x0b-\x1f\x7f]", "", texto)
    linhas = [re.sub(r"[ \t]+", " ", linha).strip() for linha in texto.split("\n")]
    texto = "\n".join(linhas).strip()
    return re.sub(r"\n{3,}", "\n\n", texto)


def limpar_pronomes(texto):
    texto = re.sub(r"[\x00-\x1f\x7f]", "", texto)
    return re.sub(r"\s+", " ", texto).strip()


# tentativas erradas de login ficam só na memória (zera quando a API reinicia)
FALHAS = {}


def bloqueado(chave, limite):
    recentes = [t for t in FALHAS.get(chave, []) if t > time.time() - 600]
    FALHAS[chave] = recentes
    return len(recentes) >= limite


def registrar_falha(chave):
    FALHAS.setdefault(chave, []).append(time.time())


def criar_sessao(id_usuario):
    return serializador.dumps({"id": id_usuario}, salt="sessao")


def login_obrigatorio(funcao):
    @wraps(funcao)
    def interna(*args, **kwargs):
        cabecalho = request.headers.get("Authorization", "")
        if not cabecalho.startswith("Bearer "):
            return erro("Faça login para continuar", 401, sessao_invalida=True)
        try:
            dados = serializador.loads(cabecalho[7:], salt="sessao", max_age=VALIDADE_SESSAO)
        except BadSignature:
            return erro("Sessão expirada. Entre novamente", 401, sessao_invalida=True)

        usuario = buscar_usuario(get_db(), dados.get("id"))
        if usuario is None:
            return erro("Conta não encontrada", 401, sessao_invalida=True)
        g.usuario = usuario
        return funcao(*args, **kwargs)
    return interna


def buscar_usuario(db, id_usuario):
    # foto e banner grandes não são carregados aqui (ficam em /api/foto e /api/banner)
    return db.execute(
        "SELECT u.id_usuario, u.nome, u.email, u.tipo_conta, u.google_id, u.biografia, u.pronomes, u.data_cadastro, "
        + sql_imagem("u.foto") + " AS foto, length(u.foto) AS foto_tam, "
        + sql_imagem("u.banner") + " AS banner, length(u.banner) AS banner_tam, "
        "l.nome_login, l.senha_hash, l.data_troca_nome, l.data_troca_senha "
        "FROM usuario u JOIN login l ON l.id_usuario = u.id_usuario WHERE u.id_usuario = ?",
        (id_usuario,)
    ).fetchone()


def buscar_por_identificador(db, identificador):
    # entra com e-mail ou com nickname
    return db.execute(
        "SELECT u.*, l.nome_login, l.senha_hash, l.data_troca_nome, l.data_troca_senha "
        "FROM usuario u JOIN login l ON l.id_usuario = u.id_usuario "
        "WHERE u.email = ? OR l.nome_login = ?",
        (identificador, identificador)
    ).fetchone()


def verificar_espera(data_ultima_troca):
    # devolve (libera_em, dias_restantes) se ainda estiver nos 7 dias, ou None se já pode trocar
    if not data_ultima_troca:
        return None
    libera_em = ler_data(data_ultima_troca) + timedelta(days=DIAS_ENTRE_TROCAS)
    falta = (libera_em - agora()).total_seconds()
    if falta <= 0:
        return None
    return libera_em, math.ceil(falta / 86400)


def erro_espera(o_que, espera):
    libera_em, dias = espera
    return erro(
        f"Você só pode alterar {o_que} novamente depois de {DIAS_ENTRE_TROCAS} dias.",
        429, dias_restantes=dias, libera_em=texto_data(libera_em), dias_total=DIAS_ENTRE_TROCAS
    )


#--------------------------+
# RANKING E EMBLEMAS
#--------------------------+
def ranking_melhores(db, modo=None):
    # melhor partida de cada jogador (mais acertos; empate: quem fez primeiro), já em ordem de ranking
    filtro = "WHERE r.modo = ?" if modo else ""
    parametros = (modo,) if modo else ()
    return db.execute(
        "SELECT t.id_usuario, l.nome_login AS jogador, " + sql_imagem("u.foto") + " AS foto, length(u.foto) AS foto_tam, "
        "t.modo, t.acertos, t.total_perguntas, t.data_partida "
        "FROM ("
        "  SELECT r.*, ROW_NUMBER() OVER ("
        "    PARTITION BY r.id_usuario ORDER BY r.acertos DESC, r.data_partida ASC, r.id_ranking ASC"
        "  ) AS rn FROM ranking r " + filtro +
        ") t "
        "JOIN login l ON l.id_usuario = t.id_usuario "
        "JOIN usuario u ON u.id_usuario = t.id_usuario "
        "WHERE t.rn = 1 "
        "ORDER BY t.acertos DESC, t.data_partida ASC, t.id_ranking ASC",
        parametros
    ).fetchall()


def dar_emblema(db, id_usuario, codigo):
    # devolve True se o usuário ainda não tinha esse emblema
    id_emblema = db.execute("SELECT id_emblema FROM emblema WHERE codigo = ?", (codigo,)).fetchone()["id_emblema"]
    cursor = db.execute(
        "INSERT OR IGNORE INTO usuario_emblema (id_usuario, id_emblema, data_conquista) VALUES (?, ?, ?)",
        (id_usuario, id_emblema, texto_data(agora()))
    )
    return cursor.rowcount > 0


def sincronizar_emblemas_top(db):
    # Top 1, 2 e 3 do ranking geral. Quem sai do top perde o emblema e quem entra ganha.
    # Devolve a lista de (id_usuario, codigo) que foram entregues agora.
    top = ranking_melhores(db)[:3]
    novos = []
    for posicao in (1, 2, 3):
        codigo = "TOP_%d" % posicao
        dono = top[posicao - 1]["id_usuario"] if len(top) >= posicao else None
        if dono is None:
            db.execute("DELETE FROM usuario_emblema WHERE id_emblema = (SELECT id_emblema FROM emblema WHERE codigo = ?)", (codigo,))
            continue
        db.execute(
            "DELETE FROM usuario_emblema WHERE id_usuario <> ? "
            "AND id_emblema = (SELECT id_emblema FROM emblema WHERE codigo = ?)",
            (dono, codigo)
        )
        if dar_emblema(db, dono, codigo):
            novos.append((dono, codigo))
    return novos


#--------------------------+
# PERFIL
#--------------------------+
def montar_perfil(db, id_usuario, privado=False):
    usuario = buscar_usuario(db, id_usuario)
    if usuario is None:
        return None

    geral = ranking_melhores(db)
    posicao = next((i + 1 for i, r in enumerate(geral) if r["id_usuario"] == id_usuario), None)

    contagem = {linha["modo"]: linha["qtd"] for linha in db.execute(
        "SELECT modo, COUNT(*) AS qtd FROM ranking WHERE id_usuario = ? GROUP BY modo", (id_usuario,))}

    modos = {}
    for modo in MODOS:
        lista = ranking_melhores(db, modo)
        indice = next((i for i, r in enumerate(lista) if r["id_usuario"] == id_usuario), None)
        modos[modo] = None if indice is None else {
            "acertos": lista[indice]["acertos"],
            "total_perguntas": lista[indice]["total_perguntas"],
            "posicao": indice + 1,
            "partidas": contagem.get(modo, 0)
        }

    ultimas = [dict(p) for p in db.execute(
        "SELECT modo, acertos, total_perguntas, data_partida FROM ranking WHERE id_usuario = ? "
        "ORDER BY data_partida DESC, id_ranking DESC LIMIT ?", (id_usuario, PARTIDAS_POR_PAGINA))]

    emblemas = [dict(e) for e in db.execute(
        "SELECT e.codigo, e.nome, e.descricao, ue.data_conquista FROM usuario_emblema ue "
        "JOIN emblema e ON e.id_emblema = ue.id_emblema WHERE ue.id_usuario = ? ORDER BY e.id_emblema",
        (id_usuario,))]

    perfil = {
        "nickname": usuario["nome_login"],
        "biografia": usuario["biografia"],
        "pronomes": usuario["pronomes"],
        "foto": url_imagem(usuario["foto"], "foto", usuario["nome_login"], usuario["foto_tam"]),
        "banner": url_imagem(usuario["banner"], "banner", usuario["nome_login"], usuario["banner_tam"]),
        "tipo_conta": usuario["tipo_conta"],
        "data_cadastro": usuario["data_cadastro"],
        "posicao_geral": posicao,
        "top": posicao if posicao is not None and posicao <= 3 else None,
        "melhor": None if posicao is None else {
            "acertos": geral[posicao - 1]["acertos"],
            "total_perguntas": geral[posicao - 1]["total_perguntas"],
            "modo": geral[posicao - 1]["modo"]
        },
        "jogadores_no_ranking": len(geral),
        "modos": modos,
        "total_partidas": sum(contagem.values()),
        "ultimas_partidas": ultimas,
        "emblemas": emblemas
    }

    if privado:
        # só o próprio dono da conta recebe estes dados
        espera_nome = verificar_espera(usuario["data_troca_nome"])
        espera_senha = verificar_espera(usuario["data_troca_senha"])
        perfil["email"] = usuario["email"]
        perfil["pode_trocar_senha"] = usuario["tipo_conta"] == "site"
        perfil["proxima_troca_nickname"] = texto_data(espera_nome[0]) if espera_nome else None
        perfil["proxima_troca_senha"] = texto_data(espera_senha[0]) if espera_senha else None
        perfil["dias_entre_trocas"] = DIAS_ENTRE_TROCAS
    return perfil


def resposta_sessao(db, id_usuario, codigo_status=200, emblemas_novos=()):
    return jsonify({
        "token": criar_sessao(id_usuario),
        "usuario": montar_perfil(db, id_usuario, privado=True),
        "emblemas_novos": list(emblemas_novos)
    }), codigo_status


#--------------------------+
# (API) CONFIGURAÇÃO E NICKNAME
#--------------------------+
@app.route("/api/config", methods=["GET"])
def configuracao():
    return jsonify({
        "google_client_id": GOOGLE_CLIENT_ID or None,
        "dias_entre_trocas": DIAS_ENTRE_TROCAS
    })


@app.route("/api/nickname/disponivel", methods=["GET"])
def nickname_disponivel():
    nickname = normalizar_nickname(request.args.get("nome", ""))

    if not nickname_valido(nickname):
        return jsonify({"nickname": nickname, "valido": False, "disponivel": False})

    existe = get_db().execute("SELECT 1 FROM login WHERE nome_login = ?", (nickname,)).fetchone()
    return jsonify({"nickname": nickname, "valido": True, "disponivel": existe is None})


#--------------------------+
# (API) CADASTRO E LOGIN
#--------------------------+
def criar_conta(db, nickname, email, tipo_conta, senha_hash, foto, google_id=None):
    # grava usuario + login + emblema da conta na mesma transação (se der erro em um, volta tudo)
    with db:
        cursor = db.execute(
            "INSERT INTO usuario (nome, email, tipo_conta, google_id, foto, data_cadastro) VALUES (?, ?, ?, ?, ?, ?)",
            (nickname, email, tipo_conta, google_id, foto, texto_data(agora()))
        )
        id_usuario = cursor.lastrowid
        db.execute(
            "INSERT INTO login (id_usuario, nome_login, senha_hash, data_ultimo_acesso) VALUES (?, ?, ?, ?)",
            (id_usuario, nickname, senha_hash, texto_data(agora()))
        )
        dar_emblema(db, id_usuario, "GENNIS_ACCOUNT" if tipo_conta == "site" else "GOOGLE_ACCOUNT")
    return id_usuario


def erro_de_duplicado(db, nickname, email):
    if db.execute("SELECT 1 FROM login WHERE nome_login = ?", (nickname,)).fetchone():
        return erro("Este nickname já está sendo utilizado por outro usuário", 409)
    return erro("Este e-mail já está cadastrado", 409)


@app.route("/api/cadastro", methods=["POST"])
def cadastrar():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    nickname = normalizar_nickname(dados.get("nickname", ""))
    email = str(dados.get("email", "")).strip().lower()
    senha = dados.get("senha")
    foto = dados.get("foto") or "preset:" + AVATARES_PADRAO[0]

    if not nickname_valido(nickname):
        return erro("Use de 3 a 20 letras, números ou _ (sem acentos) no nickname")
    if not email_valido(email):
        return erro("E-mail inválido")
    if not senha_valida(senha):
        return erro("A senha precisa ter de 6 a 100 caracteres")
    if not imagem_valida(foto, LIMITE_FOTO, aceita_padrao=True):
        return erro("Foto de perfil inválida")

    db = get_db()
    if db.execute("SELECT 1 FROM login WHERE nome_login = ?", (nickname,)).fetchone():
        return erro("Este nickname já está sendo utilizado por outro usuário", 409)
    if db.execute("SELECT 1 FROM usuario WHERE email = ?", (email,)).fetchone():
        return erro("Este e-mail já está cadastrado", 409)

    try:
        id_usuario = criar_conta(db, nickname, email, "site", generate_password_hash(senha), foto)
    except sqlite3.IntegrityError:
        # dois cadastros iguais ao mesmo tempo
        return erro_de_duplicado(db, nickname, email)

    return resposta_sessao(db, id_usuario, 201, ["GENNIS_ACCOUNT"])


# hash de mentira, só para o login demorar o mesmo tempo quando o usuário não existe
HASH_FALSO = generate_password_hash("senha-que-ninguem-usa")


@app.route("/api/login", methods=["POST"])
def entrar():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    identificador = str(dados.get("identificador", "")).strip().lower()
    senha = dados.get("senha")
    if not identificador or not isinstance(senha, str) or not senha:
        return erro("Informe o e-mail ou nickname e a senha")

    chave_id = ("login", identificador)
    chave_ip = ("login-ip", request.remote_addr)
    if bloqueado(chave_id, 8) or bloqueado(chave_ip, 30):
        return erro("Muitas tentativas erradas. Aguarde alguns minutos e tente de novo", 429)

    db = get_db()
    usuario = buscar_por_identificador(db, identificador)

    if usuario is not None and usuario["senha_hash"] is None:
        return erro("Esta conta foi criada com o Google. Use o botão \"Continuar com o Google\"", 400)

    if usuario is None:
        check_password_hash(HASH_FALSO, senha)
    if usuario is None or not check_password_hash(usuario["senha_hash"], senha):
        registrar_falha(chave_id)
        registrar_falha(chave_ip)
        return erro("E-mail/nickname ou senha incorretos", 401)

    FALHAS.pop(chave_id, None)
    with db:
        db.execute("UPDATE login SET data_ultimo_acesso = ? WHERE id_usuario = ?",
                   (texto_data(agora()), usuario["id_usuario"]))
    return resposta_sessao(db, usuario["id_usuario"])


#--------------------------+
# (API) LOGIN COM GOOGLE
#--------------------------+
def verificar_token_google(credencial):
    # pergunta para o Google se o token é de verdade; devolve {sub, email} ou None
    if not GOOGLE_CLIENT_ID or not isinstance(credencial, str) or not credencial:
        return None
    try:
        url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + urllib.parse.quote(credencial)
        with urllib.request.urlopen(url, timeout=6) as resposta:
            info = json.loads(resposta.read().decode("utf-8"))
        if info.get("aud") != GOOGLE_CLIENT_ID:
            return None
        if info.get("iss") not in ("accounts.google.com", "https://accounts.google.com"):
            return None
        if str(info.get("email_verified")).lower() != "true":
            return None
        if int(info.get("exp", 0)) < time.time():
            return None
        return {"sub": str(info["sub"]), "email": str(info["email"]).strip().lower()}
    except Exception:
        return None


@app.route("/api/login/google", methods=["POST"])
def entrar_com_google():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")
    if not GOOGLE_CLIENT_ID:
        return erro("O login com Google ainda não foi configurado neste servidor", 503)

    info = verificar_token_google(dados.get("credencial"))
    if info is None:
        return erro("Não foi possível confirmar a conta do Google", 401)

    db = get_db()
    usuario = db.execute("SELECT id_usuario FROM usuario WHERE google_id = ?", (info["sub"],)).fetchone()

    if usuario is not None:
        # já tem conta: entra direto
        with db:
            db.execute("UPDATE login SET data_ultimo_acesso = ? WHERE id_usuario = ?",
                       (texto_data(agora()), usuario["id_usuario"]))
        return resposta_sessao(db, usuario["id_usuario"])

    if db.execute("SELECT 1 FROM usuario WHERE email = ?", (info["email"],)).fetchone():
        return erro("Este e-mail já tem uma conta cadastrada no site. Entre com o e-mail e a senha", 409)

    # primeira vez: o usuário ainda precisa escolher nickname e foto (mesmo procedimento do cadastro)
    return jsonify({
        "novo": True,
        "email": info["email"],
        "sugestao": normalizar_nickname(info["email"].split("@")[0]),
        "cadastro_token": serializador.dumps(info, salt="google-cadastro")
    })


@app.route("/api/login/google/completar", methods=["POST"])
def completar_cadastro_google():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    try:
        info = serializador.loads(str(dados.get("cadastro_token", "")), salt="google-cadastro", max_age=900)
    except BadSignature:
        return erro("O tempo para concluir o cadastro acabou. Entre com o Google de novo", 401)

    nickname = normalizar_nickname(dados.get("nickname", ""))
    foto = dados.get("foto") or "preset:" + AVATARES_PADRAO[0]

    if not nickname_valido(nickname):
        return erro("Use de 3 a 20 letras, números ou _ (sem acentos) no nickname")
    if not imagem_valida(foto, LIMITE_FOTO, aceita_padrao=True):
        return erro("Foto de perfil inválida")

    db = get_db()
    if db.execute("SELECT 1 FROM usuario WHERE google_id = ? OR email = ?", (info["sub"], info["email"])).fetchone():
        return erro("Esta conta do Google já foi cadastrada. Entre novamente", 409)
    if db.execute("SELECT 1 FROM login WHERE nome_login = ?", (nickname,)).fetchone():
        return erro("Este nickname já está sendo utilizado por outro usuário", 409)

    try:
        id_usuario = criar_conta(db, nickname, info["email"], "google", None, foto, google_id=info["sub"])
    except sqlite3.IntegrityError:
        return erro_de_duplicado(db, nickname, info["email"])

    return resposta_sessao(db, id_usuario, 201, ["GOOGLE_ACCOUNT"])


#--------------------------+
# (API) PERFIL
#--------------------------+
@app.route("/api/eu", methods=["GET"])
@login_obrigatorio
def meu_perfil():
    return jsonify(montar_perfil(get_db(), g.usuario["id_usuario"], privado=True))


@app.route("/api/perfil/<nickname>", methods=["GET"])
@login_obrigatorio
def ver_perfil(nickname):
    db = get_db()
    linha = db.execute("SELECT id_usuario FROM login WHERE nome_login = ?", (nickname.lower(),)).fetchone()
    if linha is None:
        return erro("Usuário não encontrado", 404)
    return jsonify(montar_perfil(db, linha["id_usuario"]))


def imagem_propria(valor, tipo):
    # ao reajustar uma imagem grande, o site manda o endereço dela (/api/foto/<nick>?v=..#a=...)
    # em vez de enviar tudo de novo: aqui voltamos a imagem guardada, com o novo enquadramento
    if not isinstance(valor, str) or not valor.startswith("/api/%s/" % tipo):
        return None
    caminho, _, ajuste = valor.partition("#")
    caminho = caminho.partition("?")[0]
    if caminho != "/api/%s/%s" % (tipo, urllib.parse.quote(g.usuario["nome_login"])):
        return None
    if ajuste and not ajuste_valido(ajuste):
        return None
    guardada = get_db().execute(
        "SELECT %s AS imagem FROM usuario WHERE id_usuario = ?" % tipo,
        (g.usuario["id_usuario"],)).fetchone()["imagem"]
    if not guardada or guardada.startswith("preset:"):
        return None
    base = guardada.partition("#")[0]
    return base + ("#" + ajuste if ajuste else "")


def entregar_imagem(nickname, coluna):
    # entrega a foto/banner como imagem de verdade (para o <img>); é o que permite GIFs de até 10 MB
    # sem pesar o ranking e o perfil. Só o dono da conta escolhe a imagem; o endereço é público como o perfil.
    linha = get_db().execute(
        "SELECT u.%s AS imagem FROM usuario u JOIN login l ON l.id_usuario = u.id_usuario "
        "WHERE l.nome_login = ?" % coluna, (nickname.lower(),)).fetchone()
    if linha is None or not linha["imagem"] or linha["imagem"].startswith("preset:"):
        return erro("Imagem não encontrada", 404)
    achou = re.fullmatch(r"data:image/(png|jpeg|webp|gif);base64,([A-Za-z0-9+/]+={0,2})",
                         linha["imagem"].partition("#")[0])
    if not achou:
        return erro("Imagem não encontrada", 404)
    resposta = app.response_class(base64.b64decode(achou.group(2)), mimetype="image/" + achou.group(1))
    resposta.headers["Cache-Control"] = "public, max-age=86400"
    resposta.headers["X-Content-Type-Options"] = "nosniff"
    return resposta


@app.route("/api/foto/<nickname>", methods=["GET"])
def foto_do_usuario(nickname):
    return entregar_imagem(nickname, "foto")


@app.route("/api/banner/<nickname>", methods=["GET"])
def banner_do_usuario(nickname):
    return entregar_imagem(nickname, "banner")


@app.route("/api/perfil/<nickname>/partidas", methods=["GET"])
@login_obrigatorio
def partidas_do_usuario(nickname):
    # histórico de partidas, 5 por página (pagina=1 é a mais recente)
    db = get_db()
    linha = db.execute("SELECT id_usuario FROM login WHERE nome_login = ?", (nickname.lower(),)).fetchone()
    if linha is None:
        return erro("Usuário não encontrado", 404)
    try:
        pagina = max(1, int(request.args.get("pagina", 1)))
    except ValueError:
        return erro("Página inválida")
    total = db.execute("SELECT COUNT(*) AS n FROM ranking WHERE id_usuario = ?", (linha["id_usuario"],)).fetchone()["n"]
    total_paginas = max(1, -(-total // PARTIDAS_POR_PAGINA))
    pagina = min(pagina, total_paginas)
    partidas = [dict(p) for p in db.execute(
        "SELECT modo, acertos, total_perguntas, data_partida FROM ranking WHERE id_usuario = ? "
        "ORDER BY data_partida DESC, id_ranking DESC LIMIT ? OFFSET ?",
        (linha["id_usuario"], PARTIDAS_POR_PAGINA, (pagina - 1) * PARTIDAS_POR_PAGINA))]
    return jsonify({"partidas": partidas, "pagina": pagina, "total_paginas": total_paginas, "total": total})


@app.route("/api/eu", methods=["PUT"])
@login_obrigatorio
def atualizar_perfil():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    campos = {}

    if "biografia" in dados:
        biografia = dados["biografia"]
        if not isinstance(biografia, str):
            return erro("Biografia inválida")
        biografia = limpar_biografia(biografia)
        if len(biografia) > 200:
            return erro("A biografia pode ter no máximo 200 caracteres")
        campos["biografia"] = biografia

    if "pronomes" in dados:
        pronomes = dados["pronomes"]
        if not isinstance(pronomes, str):
            return erro("Pronome inválido")
        pronomes = limpar_pronomes(pronomes)
        if len(pronomes) > 20:
            return erro("O pronome pode ter no máximo 20 caracteres")
        campos["pronomes"] = pronomes

    if "foto" in dados:
        foto = imagem_propria(dados["foto"], "foto") or dados["foto"]
        if not imagem_valida(foto, LIMITE_FOTO, aceita_padrao=True):
            return erro("Foto de perfil inválida")
        campos["foto"] = foto

    if "banner" in dados:
        banner = imagem_propria(dados["banner"], "banner") or dados["banner"]
        if banner in (None, ""):
            campos["banner"] = None      # remove o banner
        elif imagem_valida(banner, LIMITE_BANNER):
            campos["banner"] = banner
        else:
            return erro("Banner inválido")

    if not campos:
        return erro("Nada para atualizar")

    db = get_db()
    with db:
        # os nomes das colunas vêm só do dicionário acima (nunca do usuário)
        colunas = ", ".join("%s = ?" % coluna for coluna in campos)
        db.execute("UPDATE usuario SET " + colunas + " WHERE id_usuario = ?",
                   (*campos.values(), g.usuario["id_usuario"]))
    return jsonify(montar_perfil(db, g.usuario["id_usuario"], privado=True))


@app.route("/api/eu/nickname", methods=["PUT"])
@login_obrigatorio
def trocar_nickname():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    espera = verificar_espera(g.usuario["data_troca_nome"])
    if espera:
        return erro_espera("o nickname", espera)

    nickname = normalizar_nickname(dados.get("nickname", ""))
    if not nickname_valido(nickname):
        return erro("Use de 3 a 20 letras, números ou _ (sem acentos) no nickname")
    if nickname == g.usuario["nome_login"]:
        return erro("Esse já é o seu nickname atual")

    db = get_db()
    if db.execute("SELECT 1 FROM login WHERE nome_login = ?", (nickname,)).fetchone():
        return erro("Este nickname já está sendo utilizado por outro usuário", 409)

    try:
        with db:
            db.execute("UPDATE login SET nome_login = ?, data_troca_nome = ? WHERE id_usuario = ?",
                       (nickname, texto_data(agora()), g.usuario["id_usuario"]))
            db.execute("UPDATE usuario SET nome = ? WHERE id_usuario = ?", (nickname, g.usuario["id_usuario"]))
    except sqlite3.IntegrityError:
        return erro("Este nickname já está sendo utilizado por outro usuário", 409)

    return jsonify(montar_perfil(db, g.usuario["id_usuario"], privado=True))


@app.route("/api/eu/senha", methods=["PUT"])
@login_obrigatorio
def trocar_senha():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    if g.usuario["tipo_conta"] != "site":
        return erro("Contas do Google não têm senha no Quiz. Altere a senha direto na sua conta Google")

    espera = verificar_espera(g.usuario["data_troca_senha"])
    if espera:
        return erro_espera("a senha", espera)

    senha_atual = dados.get("senha_atual")
    senha_nova = dados.get("senha_nova")

    chave = ("senha", g.usuario["id_usuario"])
    if bloqueado(chave, 8):
        return erro("Muitas tentativas erradas. Aguarde alguns minutos e tente de novo", 429)
    if not isinstance(senha_atual, str) or not check_password_hash(g.usuario["senha_hash"], senha_atual):
        registrar_falha(chave)
        return erro("A senha atual está incorreta", 401)
    if not senha_valida(senha_nova):
        return erro("A nova senha precisa ter de 6 a 100 caracteres")
    if senha_nova == senha_atual:
        return erro("A nova senha precisa ser diferente da atual")

    db = get_db()
    with db:
        db.execute("UPDATE login SET senha_hash = ?, data_troca_senha = ? WHERE id_usuario = ?",
                   (generate_password_hash(senha_nova), texto_data(agora()), g.usuario["id_usuario"]))
    FALHAS.pop(chave, None)
    return jsonify(montar_perfil(db, g.usuario["id_usuario"], privado=True))


@app.route("/api/eu", methods=["DELETE"])
@login_obrigatorio
def excluir_conta():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    chave = ("excluir", g.usuario["id_usuario"])
    if bloqueado(chave, 8):
        return erro("Muitas tentativas erradas. Aguarde alguns minutos e tente de novo", 429)

    nickname = str(dados.get("nickname", "")).strip().lower()
    senha = dados.get("senha")

    if nickname != g.usuario["nome_login"]:
        registrar_falha(chave)
        return erro("O nickname digitado não confere com o da sua conta", 400)

    # conta do Google não tem senha no Quiz: a confirmação é só o nickname
    if g.usuario["tipo_conta"] == "site":
        if not isinstance(senha, str) or not check_password_hash(g.usuario["senha_hash"], senha):
            registrar_falha(chave)
            return erro("Senha incorreta", 401)

    db = get_db()
    with db:
        # o ON DELETE CASCADE apaga login, partidas e emblemas junto
        db.execute("DELETE FROM usuario WHERE id_usuario = ?", (g.usuario["id_usuario"],))
        # sem este jogador o ranking muda, então confere os emblemas de Top de novo
        sincronizar_emblemas_top(db)
    FALHAS.pop(chave, None)
    return jsonify({"mensagem": "Conta excluída"})


#--------------------------+
# (API) RANKING
#--------------------------+
@app.route("/ranking", methods=["GET"])
@login_obrigatorio
def listar_ranking():
    modo = request.args.get("modo")
    if modo is not None and modo not in MODOS:
        return erro("Modo inválido")

    try:
        limite = max(1, min(int(request.args.get("limite", 100)), 500))
    except ValueError:
        return erro("Limite inválido")

    linhas = ranking_melhores(get_db(), modo)[:limite]
    return jsonify([{
        "jogador": linha["jogador"],
        "foto": url_imagem(linha["foto"], "foto", linha["jogador"], linha["foto_tam"]),
        "modo": linha["modo"],
        "acertos": linha["acertos"],
        "total_perguntas": linha["total_perguntas"],
        "data_partida": linha["data_partida"]
    } for linha in linhas])


@app.route("/ranking", methods=["POST"])
@login_obrigatorio
def salvar_partida():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    modo = dados.get("modo")
    acertos = dados.get("acertos")
    total = dados.get("total_perguntas")

    if modo not in MODOS:
        return erro("Modo inválido")
    for numero in (acertos, total):
        if not isinstance(numero, int) or isinstance(numero, bool):
            return erro("Pontuação inválida")
    if total < 1 or total > 100 or acertos < 0 or acertos > total:
        return erro("Pontuação inválida")

    db = get_db()
    with db:
        # o usuário vem do login (token), não do que o navegador manda
        db.execute(
            "INSERT INTO ranking (id_usuario, modo, acertos, total_perguntas, data_partida) VALUES (?, ?, ?, ?, ?)",
            (g.usuario["id_usuario"], modo, acertos, total, texto_data(agora()))
        )
        novos = sincronizar_emblemas_top(db)

    meus = [codigo for (dono, codigo) in novos if dono == g.usuario["id_usuario"]]
    return jsonify({"mensagem": "Partida salva", "emblemas_novos": meus}), 201


iniciar_banco()


if __name__ == "__main__":
    # Para abrir pelo celular na mesma rede Wi-Fi, rode com:  QUIZ_HOST=0.0.0.0 python app.py
    # (nesse modo o modo de depuração fica desligado, por segurança)
    host = os.environ.get("QUIZ_HOST", "127.0.0.1")
    app.run(host=host, port=5000, debug=(host == "127.0.0.1"))
