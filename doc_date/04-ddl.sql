-- Passo 7 — Modelo físico
-- Equipe: João Victor Guimarães Gomes, Gustavo Gabriel Naves Ferreira, Matheus Augusto Antunes Pentogennis, Lucas da Graça Leandro, Lucas Siqueira Teles e Gabriel Gonçalves Lima.
-- PostgreSQL. Por que este SGBD: é o que a disciplina pede (RNF01), e ele deixa declarar PK, FK, UNIQUE e CHECK
--   direto nas tabelas, além de ter o tipo TEXT para enunciados e explicações compridos.
-- Contrato com Aplicativos para Web: os nomes abaixo são os acordados.
-- Banco vazio:
--   createdb tech_trivia
--   psql -d tech_trivia -v ON_ERROR_STOP=1 -f 04-ddl.sql
-- Só esquema e domínio fixo (idiomas, alternativas).
-- Categorias, publicadores, fontes e perguntas ficam no passo 8.
 
BEGIN;
 
-- Lista fixa de idiomas (RD04).
-- Usei o próprio código ('pt', 'en', ...) como PK porque ele é único e não muda.
CREATE TABLE idioma (
    id_idioma  VARCHAR(5)  NOT NULL,
    descricao  VARCHAR(50) NOT NULL,
    CONSTRAINT pk_idioma           PRIMARY KEY (id_idioma),
    CONSTRAINT uq_idioma_descricao UNIQUE (descricao)
);
 
-- Alternativas de resposta, cada uma com rótulo e valor lógico (RD05).
-- Ficam numa tabela própria para dar para ter mais de duas no futuro (RD07).
CREATE TABLE alternativa (
    id_alternativa SMALLINT    NOT NULL,
    rotulo         VARCHAR(20) NOT NULL,
    valor_logico   BOOLEAN     NOT NULL,
    CONSTRAINT pk_alternativa        PRIMARY KEY (id_alternativa),
    CONSTRAINT uq_alternativa_rotulo UNIQUE (rotulo)
);
 
-- Categoria: o nome não pode repetir (RD01, RD10).
CREATE TABLE categoria (
    id_categoria INTEGER      GENERATED ALWAYS AS IDENTITY,
    nome         VARCHAR(80)  NOT NULL,
    CONSTRAINT pk_categoria      PRIMARY KEY (id_categoria),
    CONSTRAINT uq_categoria_nome UNIQUE (nome)
);
 
-- Publicador: o nome é gravado uma vez só (RD03, RD10).
CREATE TABLE publicador (
    id_publicador INTEGER      GENERATED ALWAYS AS IDENTITY,
    nome          VARCHAR(120) NOT NULL,
    CONSTRAINT pk_publicador      PRIMARY KEY (id_publicador),
    CONSTRAINT uq_publicador_nome UNIQUE (nome)
);
 
-- Fonte: sempre tem publicador e idioma, e a URL não pode repetir (RD02, RD03, RD04, RD10).
CREATE TABLE fonte (
    id_fonte      INTEGER      GENERATED ALWAYS AS IDENTITY,
    titulo        VARCHAR(255) NOT NULL,
    url           VARCHAR(500) NOT NULL,
    id_publicador INTEGER      NOT NULL,
    id_idioma     VARCHAR(5)   NOT NULL,
    CONSTRAINT pk_fonte           PRIMARY KEY (id_fonte),
    CONSTRAINT uq_fonte_url       UNIQUE (url),
    CONSTRAINT fk_fonte_publicador FOREIGN KEY (id_publicador) REFERENCES publicador (id_publicador),
    CONSTRAINT fk_fonte_idioma     FOREIGN KEY (id_idioma)     REFERENCES idioma (id_idioma)
);
 
-- Pergunta: a PK é o código original fact-001, fact-002, ... para ele não se perder (RD08).
CREATE TABLE pergunta (
    id_pergunta            VARCHAR(20)  NOT NULL,
    titulo                 VARCHAR(150) NOT NULL,
    enunciado              TEXT         NOT NULL,
    explicacao             TEXT         NOT NULL,
    id_categoria           INTEGER      NOT NULL,
    id_fonte               INTEGER      NOT NULL,
    id_alternativa_correta SMALLINT     NOT NULL,
    CONSTRAINT pk_pergunta             PRIMARY KEY (id_pergunta),
    CONSTRAINT ck_pergunta_id          CHECK (id_pergunta ~ '^fact-[0-9]{3,}$'),
    CONSTRAINT ck_pergunta_titulo      CHECK (btrim(titulo)     <> ''),
    CONSTRAINT ck_pergunta_enunciado   CHECK (btrim(enunciado)  <> ''),
    CONSTRAINT ck_pergunta_explicacao  CHECK (btrim(explicacao) <> ''),
    CONSTRAINT fk_pergunta_categoria   FOREIGN KEY (id_categoria)           REFERENCES categoria (id_categoria),
    CONSTRAINT fk_pergunta_fonte       FOREIGN KEY (id_fonte)               REFERENCES fonte (id_fonte),
    CONSTRAINT fk_pergunta_alternativa FOREIGN KEY (id_alternativa_correta) REFERENCES alternativa (id_alternativa)
);
 
-- Dados fixos: idiomas.
INSERT INTO idioma (id_idioma, descricao) VALUES
    ('pt', 'Português'),
    ('en', 'Inglês'),
    ('es', 'Espanhol');
 
-- Dados fixos: as alternativas de hoje.
INSERT INTO alternativa (id_alternativa, rotulo, valor_logico) VALUES
    (1, 'Certo',  TRUE),
    (2, 'Errado', FALSE);
 
COMMIT;
 
