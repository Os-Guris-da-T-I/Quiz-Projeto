-- Passo 8 — Carga de teste e consultas
-- Rode depois de 04-ddl.sql.
--   psql -d tech_trivia -v ON_ERROR_STOP=1 -f 05-dml-consultas.sql
-- Nomes de tabelas e colunas conforme o dicionário (03-logico.md).

BEGIN;

-- Massa de teste com o tema do nosso quiz de T.I., nesta ordem: categoria, publicador, fonte, pergunta.
-- O que a gente colocou (o mínimo pedido era 6 perguntas):
--   20 perguntas com id fact-001, fact-002, ... fact-020
--   7 categorias (Python, Front-end, Linguagem C, Banco de Dados, Segurança, Redes e Internet, JSON e APIs),
--     cada uma com 2 ou 3 perguntas
--   6 publicadores, e o Mozilla tem 5 fontes
--   4 URLs citadas por 2 perguntas (malloc, Constraints, HTTP e JSON)
--   10 perguntas cuja correta é Certo e 10 cuja correta é Errado
-- Categoria, publicador e URL não são inseridos de novo: a fonte e a pergunta buscam o id com SELECT.

INSERT INTO categoria (nome) VALUES
    ('Python'),
    ('Front-end'),
    ('Linguagem C'),
    ('Banco de Dados'),
    ('Segurança'),
    ('Redes e Internet'),
    ('JSON e APIs');

INSERT INTO publicador (nome) VALUES
    ('Mozilla'),
    ('Python Software Foundation'),
    ('Cppreference'),
    ('PostgreSQL Global Development Group'),
    ('OWASP Foundation'),
    ('JSON.org');

INSERT INTO fonte (titulo, url, id_publicador, id_idioma) VALUES
    ('HTML',
     'https://developer.mozilla.org/pt-BR/docs/Web/HTML',
     (SELECT id_publicador FROM publicador WHERE nome = 'Mozilla'), 'pt'),
    ('CSS',
     'https://developer.mozilla.org/pt-BR/docs/Web/CSS',
     (SELECT id_publicador FROM publicador WHERE nome = 'Mozilla'), 'pt'),
    ('JavaScript',
     'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
     (SELECT id_publicador FROM publicador WHERE nome = 'Mozilla'), 'pt'),
    ('An overview of HTTP',
     'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview',
     (SELECT id_publicador FROM publicador WHERE nome = 'Mozilla'), 'en'),
    ('HTTP cookies',
     'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies',
     (SELECT id_publicador FROM publicador WHERE nome = 'Mozilla'), 'en'),
    ('The Python Tutorial',
     'https://docs.python.org/3/tutorial/index.html',
     (SELECT id_publicador FROM publicador WHERE nome = 'Python Software Foundation'), 'en'),
    ('Data model',
     'https://docs.python.org/3/reference/datamodel.html',
     (SELECT id_publicador FROM publicador WHERE nome = 'Python Software Foundation'), 'en'),
    ('Built-in Types',
     'https://docs.python.org/3/library/stdtypes.html',
     (SELECT id_publicador FROM publicador WHERE nome = 'Python Software Foundation'), 'en'),
    ('malloc',
     'https://en.cppreference.com/w/c/memory/malloc',
     (SELECT id_publicador FROM publicador WHERE nome = 'Cppreference'), 'en'),
    ('Pointer declaration',
     'https://en.cppreference.com/w/c/language/pointer',
     (SELECT id_publicador FROM publicador WHERE nome = 'Cppreference'), 'en'),
    ('Constraints',
     'https://www.postgresql.org/docs/current/ddl-constraints.html',
     (SELECT id_publicador FROM publicador WHERE nome = 'PostgreSQL Global Development Group'), 'en'),
    ('Joins Between Tables',
     'https://www.postgresql.org/docs/current/tutorial-join.html',
     (SELECT id_publicador FROM publicador WHERE nome = 'PostgreSQL Global Development Group'), 'en'),
    ('OWASP Top Ten',
     'https://owasp.org/www-project-top-ten/',
     (SELECT id_publicador FROM publicador WHERE nome = 'OWASP Foundation'), 'en'),
    ('Password Storage Cheat Sheet',
     'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
     (SELECT id_publicador FROM publicador WHERE nome = 'OWASP Foundation'), 'en'),
    ('SQL Injection',
     'https://owasp.org/www-community/attacks/SQL_Injection',
     (SELECT id_publicador FROM publicador WHERE nome = 'OWASP Foundation'), 'en'),
    ('Introducing JSON',
     'https://www.json.org/json-en.html',
     (SELECT id_publicador FROM publicador WHERE nome = 'JSON.org'), 'en');

INSERT INTO pergunta (id_pergunta, titulo, enunciado, explicacao, id_categoria, id_fonte, id_alternativa_correta) VALUES
    -- Python
    ('fact-001',
     'Tipagem do Python',
     'O Python usa tipagem dinâmica.',
     'Em Python a gente não declara o tipo da variável, ele é descoberto na hora que o programa roda. O tutorial oficial cita a tipagem dinâmica e o fato de ser interpretado como motivos para ele ser bom para scripts.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Python'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://docs.python.org/3/tutorial/index.html'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Certo')),
    ('fact-002',
     'Inteiros em Python',
     'Em Python, números inteiros não são objetos, são valores primitivos.',
     'No modelo de dados do Python, todos os dados de um programa são representados por objetos, e isso inclui os números inteiros.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Python'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://docs.python.org/3/reference/datamodel.html'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Errado')),
    ('fact-003',
     'Tuplas e listas',
     'Em Python, as tuplas são mutáveis, assim como as listas.',
     'Só as listas são mutáveis. As tuplas são sequências imutáveis: depois de criadas, não dá para trocar os elementos.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Python'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://docs.python.org/3/library/stdtypes.html'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Errado')),
    -- Front-end
    ('fact-004',
     'Para que serve o HTML',
     'O HTML define o significado e a estrutura do conteúdo de uma página web.',
     'O HTML é a base da web: ele organiza o conteúdo em títulos, parágrafos, links, imagens e assim por diante. A aparência fica por conta do CSS e o comportamento por conta do JavaScript.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Front-end'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://developer.mozilla.org/pt-BR/docs/Web/HTML'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Certo')),
    ('fact-005',
     'Para que serve o CSS',
     'O CSS serve para programar a lógica da página, como cálculos e condições.',
     'O CSS é uma linguagem de estilos, usada para descrever a apresentação de um documento HTML, como cores, fontes e layout. A lógica da página fica com o JavaScript.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Front-end'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://developer.mozilla.org/pt-BR/docs/Web/CSS'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Errado')),
    ('fact-006',
     'Onde o JavaScript roda',
     'O JavaScript só funciona dentro de navegadores.',
     'O JavaScript é mais conhecido como a linguagem das páginas web, mas também roda fora do navegador, por exemplo no Node.js.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Front-end'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Errado')),
    -- Linguagem C
    ('fact-007',
     'O que o malloc faz',
     'Em C, a função malloc reserva um bloco de memória sem inicializar o conteúdo.',
     'O malloc aloca a quantidade de bytes pedida e devolve um ponteiro para o bloco. O conteúdo vem sem inicialização, ou seja, pode ter lixo de memória.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Linguagem C'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://en.cppreference.com/w/c/memory/malloc'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Certo')),
    ('fact-008',
     'Malloc e zeros',
     'O malloc deixa toda a memória reservada preenchida com zeros.',
     'O malloc não zera a memória, o conteúdo fica indeterminado. Para receber o bloco já zerado existe a função calloc.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Linguagem C'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://en.cppreference.com/w/c/memory/malloc'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Errado')),
    ('fact-009',
     'Ponteiros em C',
     'Em C, um ponteiro guarda o endereço de outro objeto ou função.',
     'Ponteiro é um tipo que se refere a um objeto ou a uma função, guardando o endereço dele na memória. Por isso dá para chegar ao valor usando o ponteiro.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Linguagem C'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://en.cppreference.com/w/c/language/pointer'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Certo')),
    -- Banco de Dados
    ('fact-010',
     'Chave primária',
     'No PostgreSQL, uma chave primária não aceita valores nulos nem repetidos.',
     'Na prática, a chave primária é a soma de uma restrição UNIQUE com uma NOT NULL.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Banco de Dados'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://www.postgresql.org/docs/current/ddl-constraints.html'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Certo')),
    ('fact-011',
     'UNIQUE e NULL',
     'No PostgreSQL, uma coluna UNIQUE aceita no máximo um valor NULL.',
     'Por padrão o PostgreSQL não considera dois NULL iguais, então uma coluna UNIQUE pode ter vários valores NULL.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Banco de Dados'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://www.postgresql.org/docs/current/ddl-constraints.html'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Errado')),
    ('fact-012',
     'Consultas com várias tabelas',
     'Em SQL, uma consulta só consegue acessar uma tabela por vez.',
     'Uma consulta pode acessar várias tabelas ao mesmo tempo. Isso é o que se chama de join e serve para juntar dados que estão relacionados.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Banco de Dados'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://www.postgresql.org/docs/current/tutorial-join.html'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Errado')),
    -- Segurança
    ('fact-013',
     'Guardando senhas',
     'Senhas devem ser guardadas com um hash próprio para senhas, e nunca em texto puro.',
     'O guia da OWASP recomenda algoritmos de hash feitos para senhas, como o Argon2id. Guardar a senha em texto puro deixa tudo exposto se o banco vazar.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Segurança'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Certo')),
    ('fact-014',
     'SQL Injection',
     'SQL Injection acontece quando dados digitados pelo usuário entram na consulta SQL sem tratamento.',
     'O ataque coloca comandos SQL numa entrada da aplicação que não foi tratada, e esses comandos acabam sendo executados no banco.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Segurança'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://owasp.org/www-community/attacks/SQL_Injection'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Certo')),
    ('fact-015',
     'OWASP Top 10',
     'O OWASP Top 10 é uma lista dos dez sites mais perigosos da internet.',
     'O OWASP Top 10 é um documento de conscientização sobre os riscos de segurança mais críticos em aplicações web. Ele não é uma lista de sites.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Segurança'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://owasp.org/www-project-top-ten/'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Errado')),
    -- Redes e Internet
    ('fact-016',
     'Quem começa no HTTP',
     'No HTTP, é o cliente quem inicia a comunicação, enviando uma requisição ao servidor.',
     'O HTTP funciona no modelo de requisição e resposta: o cliente, normalmente o navegador, pede e o servidor responde.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Redes e Internet'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Certo')),
    ('fact-017',
     'HTTP e estado',
     'Por padrão, o HTTP guarda o estado entre uma requisição e a seguinte.',
     'O HTTP não guarda estado, cada requisição é independente. Para criar sessões usam-se coisas como cookies, que ficam por cima dele.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Redes e Internet'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Errado')),
    ('fact-018',
     'O que é um cookie',
     'Um cookie é um pequeno dado que o servidor envia ao navegador, que pode devolvê-lo nas requisições seguintes.',
     'É assim que o servidor consegue reconhecer o mesmo navegador em várias requisições, por exemplo para manter um login.',
     (SELECT id_categoria FROM categoria WHERE nome = 'Redes e Internet'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Certo')),
    -- JSON e APIs
    ('fact-019',
     'O que é JSON',
     'O JSON é um formato leve para troca de dados e é fácil de ler para humanos.',
     'Esse é o objetivo do JSON: ser simples de ler e escrever para pessoas e simples de interpretar e gerar para máquinas.',
     (SELECT id_categoria FROM categoria WHERE nome = 'JSON e APIs'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://www.json.org/json-en.html'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Certo')),
    ('fact-020',
     'JSON só no JavaScript',
     'O JSON só pode ser lido por programas escritos em JavaScript.',
     'O JSON é um formato de texto independente de linguagem. Python, C, Java e muitas outras linguagens conseguem ler e gerar JSON.',
     (SELECT id_categoria FROM categoria WHERE nome = 'JSON e APIs'),
     (SELECT id_fonte FROM fonte WHERE url = 'https://www.json.org/json-en.html'),
     (SELECT id_alternativa FROM alternativa WHERE rotulo = 'Errado'));

COMMIT;

-- RA01. Categorias em ordem alfabética, com a quantidade de perguntas.
-- Resultado:
--       categoria     | qtd_perguntas
--   ------------------+---------------
--    Banco de Dados   |             3
--    Front-end        |             3
--    JSON e APIs      |             2
--    Linguagem C      |             3
--    Python           |             3
--    Redes e Internet |             3
--    Segurança        |             3
--   (7 rows)
-- Usei LEFT JOIN para uma categoria sem pergunta aparecer com 0, e ORDER BY nome para a ordem alfabética.
SELECT c.nome AS categoria, COUNT(p.id_pergunta) AS qtd_perguntas
FROM categoria c
LEFT JOIN pergunta p ON p.id_categoria = c.id_categoria
GROUP BY c.id_categoria, c.nome
ORDER BY c.nome;

-- RA02a. Uma pergunta aleatória, de qualquer categoria.
-- Resultado (id sorteado):
--    id_pergunta |      titulo      |                                     enunciado
--   -------------+------------------+------------------------------------------------------------------------------------
--    fact-013    | Guardando senhas | Senhas devem ser guardadas com um hash próprio para senhas, e nunca em texto puro.
--   (1 row)
-- ORDER BY random() embaralha e LIMIT 1 pega uma só. Como é sorteio, muda a cada vez que roda.
SELECT id_pergunta, titulo, enunciado
FROM pergunta
ORDER BY random()
LIMIT 1;

-- RA02b. Uma pergunta aleatória de uma categoria recebida por parâmetro.
\set categoria 'Python'
-- Resultado (categoria = Python):
--    id_pergunta |      titulo       |           enunciado
--   -------------+-------------------+--------------------------------
--    fact-001    | Tipagem do Python | O Python usa tipagem dinâmica.
--   (1 row)
-- Igual ao RA02a, mas só entre as perguntas da categoria escolhida (no site, ela viria da tela do quiz).
SELECT p.id_pergunta, p.titulo, p.enunciado
FROM pergunta p
JOIN categoria c ON c.id_categoria = p.id_categoria
WHERE c.nome = :'categoria'
ORDER BY random()
LIMIT 1;

-- RA03. Título, enunciado e alternativas de uma pergunta.
\set pergunta 'fact-001'
-- Resultado (pergunta = fact-001):
--         titulo       |           enunciado            | id_alternativa | alternativa
--   -------------------+--------------------------------+----------------+-------------
--    Tipagem do Python | O Python usa tipagem dinâmica. |              1 | Certo
--    Tipagem do Python | O Python usa tipagem dinâmica. |              2 | Errado
--   (2 rows)
-- As alternativas ficam na tabela alternativa, então o CROSS JOIN junta a pergunta com todas elas (Certo e Errado).
SELECT p.titulo, p.enunciado, a.id_alternativa, a.rotulo AS alternativa
FROM pergunta p
CROSS JOIN alternativa a
WHERE p.id_pergunta = :'pergunta'
ORDER BY a.id_alternativa;

-- RA04. Dada a pergunta e a alternativa escolhida, se acertou.
-- Provem com a alternativa correta e com a errada.
\set pergunta 'fact-001'
-- Resultado (fact-001, escolhida = 1, Certo, a correta):
--    id_pergunta | escolhida | acertou
--   -------------+-----------+---------
--    fact-001    | Certo     | t
--   (1 row)
\set escolhida 1
-- Comparei a alternativa escolhida com o id_alternativa_correta da pergunta: t é acerto, f é erro.
SELECT p.id_pergunta, a.rotulo AS escolhida, (p.id_alternativa_correta = a.id_alternativa) AS acertou
FROM pergunta p
JOIN alternativa a ON a.id_alternativa = :escolhida
WHERE p.id_pergunta = :'pergunta';
-- Resultado (fact-001, escolhida = 2, Errado, a errada):
--    id_pergunta | escolhida | acertou
--   -------------+-----------+---------
--    fact-001    | Errado    | f
--   (1 row)
\set escolhida 2
SELECT p.id_pergunta, a.rotulo AS escolhida, (p.id_alternativa_correta = a.id_alternativa) AS acertou
FROM pergunta p
JOIN alternativa a ON a.id_alternativa = :escolhida
WHERE p.id_pergunta = :'pergunta';

-- RA05. Explicação e fonte: título, publicador, URL e idioma.
\set pergunta 'fact-017'
\x on
-- Resultado (pergunta = fact-017, saída em modo expandido):
--   -[ RECORD 1 ]----------------------------------------------------------------------------------------------------------------------------------
--   explicacao | O HTTP não guarda estado, cada requisição é independente. Para criar sessões usam-se coisas como cookies, que ficam por cima dele.
--   fonte      | An overview of HTTP
--   publicador | Mozilla
--   url        | https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
--   idioma     | Inglês
-- Junta pergunta, fonte, publicador e idioma. Usei a fact-017 (HTTP e estado) de exemplo.
SELECT p.explicacao, f.titulo AS fonte, pu.nome AS publicador, f.url, i.descricao AS idioma
FROM pergunta p
JOIN fonte f       ON f.id_fonte       = p.id_fonte
JOIN publicador pu ON pu.id_publicador = f.id_publicador
JOIN idioma i      ON i.id_idioma      = f.id_idioma
WHERE p.id_pergunta = :'pergunta';
\x off

-- RA06. Publicadores mais citados, com o número de perguntas.
-- Resultado:
--                publicador              | qtd_perguntas
--   -------------------------------------+---------------
--    Mozilla                             |             6
--    Cppreference                        |             3
--    OWASP Foundation                    |             3
--    PostgreSQL Global Development Group |             3
--    Python Software Foundation          |             3
--    JSON.org                            |             2
--   (6 rows)
-- A pergunta não aponta direto para o publicador, então o caminho é pergunta, fonte e publicador.
SELECT pu.nome AS publicador, COUNT(p.id_pergunta) AS qtd_perguntas
FROM publicador pu
JOIN fonte f    ON f.id_publicador = pu.id_publicador
JOIN pergunta p ON p.id_fonte      = f.id_fonte
GROUP BY pu.id_publicador, pu.nome
ORDER BY qtd_perguntas DESC, pu.nome;

-- RA07. Fontes citadas por mais de uma pergunta.
-- Resultado:
--           fonte        |                             url                              | qtd_perguntas
--   ---------------------+--------------------------------------------------------------+---------------
--    An overview of HTTP | https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview   |             2
--    Constraints         | https://www.postgresql.org/docs/current/ddl-constraints.html |             2
--    Introducing JSON    | https://www.json.org/json-en.html                            |             2
--    malloc              | https://en.cppreference.com/w/c/memory/malloc                |             2
--   (4 rows)
-- HAVING filtra depois do COUNT (WHERE não serve aqui, porque o filtro é em cima da contagem).
SELECT f.titulo AS fonte, f.url, COUNT(p.id_pergunta) AS qtd_perguntas
FROM fonte f
JOIN pergunta p ON p.id_fonte = f.id_fonte
GROUP BY f.id_fonte, f.titulo, f.url
HAVING COUNT(p.id_pergunta) > 1
ORDER BY qtd_perguntas DESC, f.titulo;
