# Passos 5 e 6 — Modelo lógico, normalização e dicionário
 
O desenho está em `entregas/03-logico.pdf`. Este texto conta o mesmo modelo em palavras.
 
## 5. Modelo lógico
 
| Relacionamento no DER | Cardinalidade | Vira | Onde fica a FK ou a tabela associativa |
| --- | --- | --- | --- |
| classifica (categoria–pergunta) | 1:N | FK no lado N | `pergunta.id_categoria` → `categoria.id_categoria` |
| cita (pergunta–fonte) | 1:N | FK no lado N | `pergunta.id_fonte` → `fonte.id_fonte` |
| publica (publicador–fonte) | 1:N | FK no lado N | `fonte.id_publicador` → `publicador.id_publicador` |
| tem_idioma (idioma–fonte) | 1:N | FK no lado N | `fonte.id_idioma` → `idioma.id_idioma` |
| indica_correta (alternativa–pergunta) | 1:N | FK no lado N | `pergunta.id_alternativa_correta` → `alternativa.id_alternativa` |
 
Nenhum relacionamento do nosso recorte é N:N, então não criamos tabela associativa. Em todos os casos a FK fica do lado que tem só um do outro lado: a pergunta guarda o `id_categoria`, e a categoria não guarda uma lista de perguntas.
 
No conceitual os identificadores são atributos que já existem de verdade (nome, url, rotulo, codigo). No lógico, `categoria`, `publicador`, `fonte` e `alternativa` ganharam uma chave `id_<tabela>`, e nome, url e rotulo viraram UNIQUE para continuar sem repetição (RD01, RD02, RD03).
 
Duas tabelas ficaram com chave natural, como a orientação permite: `pergunta.id_pergunta` guarda o código fact-001, fact-002… (RD08) e `idioma.id_idioma` guarda o código do idioma (pt, en, es). Os dois códigos já são únicos e não mudam.
 
### Normalização
 
| ID | Dependência | Requisito |
| --- | --- | --- |
| DF1 | id_categoria → nome | RD01, RD10 |
| DF2 | id_publicador → nome | RD03, RD10 |
| DF3 | id_idioma → descricao | RD04 |
| DF4 | id_alternativa → rotulo, valor_logico | RD05 |
| DF5 | id_fonte → titulo, url, id_publicador, id_idioma | RD02, RD03, RD04, RD10 |
| DF6 | id_pergunta → titulo, enunciado, explicacao, id_categoria, id_fonte, id_alternativa_correta | RD01, RD02, RD06, RD08, RD09 |
| DF7 | url → id_fonte (a url é chave candidata, por isso UNIQUE) | RD02 |
 
| Forma | Por que o esquema atende | Tabela em que isso aparece |
| --- | --- | --- |
| 1FN | Cada coluna guarda um valor só e não há grupo repetido. Certo e Errado não ficam numa lista nem em colunas dentro da pergunta: são linhas da tabela `alternativa`, e a pergunta só aponta para a correta com `id_alternativa_correta`. | `pergunta`, `alternativa` |
| 2FN | Nenhuma tabela tem chave primária composta, todas têm PK de uma coluna só. Então não existe dependência parcial para eliminar. | `categoria`, `publicador`, `idioma`, `alternativa`, `fonte`, `pergunta` |
| 3FN | Não há dependência transitiva, porque o que não é chave e determina outra coisa está em tabela própria. Na pergunta, id_pergunta → id_fonte e id_fonte → url, por isso a URL fica só em `fonte`. Do mesmo jeito, id_fonte → id_publicador → nome (o nome fica em `publicador`), id_fonte → id_idioma → descricao (fica em `idioma`), id_pergunta → id_categoria → nome (fica em `categoria`) e id_pergunta → id_alternativa_correta → rotulo, valor_logico (ficam em `alternativa`). | `pergunta`, `fonte`, `publicador`, `idioma`, `categoria`, `alternativa` |
 
Se alguma forma falhar: nenhuma falhou, então não mudamos nada no dicionário nem no desenho.
 
## 6. Dicionário de dados
 
### Tabela: categoria
 
| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| id_categoria | INTEGER (identity) | NOT NULL | PK | Número que identifica a categoria. |
| nome | VARCHAR(80) | NOT NULL | UNIQUE | Nome da categoria, que não pode repetir. |
 
### Tabela: publicador
 
| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| id_publicador | INTEGER (identity) | NOT NULL | PK | Número que identifica o publicador. |
| nome | VARCHAR(120) | NOT NULL | UNIQUE | Nome do publicador, gravado uma vez só. |
 
### Tabela: idioma
 
| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| id_idioma | VARCHAR(5) | NOT NULL | PK | Código do idioma (pt, en, es). Usamos o próprio código como chave porque ele é único e não muda. |
| descricao | VARCHAR(50) | NOT NULL | UNIQUE | Nome do idioma por extenso (Português, Inglês, Espanhol). |
 
### Tabela: alternativa
 
| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| id_alternativa | SMALLINT | NOT NULL | PK | Número que identifica a alternativa (1 = Certo, 2 = Errado). |
| rotulo | VARCHAR(20) | NOT NULL | UNIQUE | Texto que aparece para o jogador (Certo, Errado). |
| valor_logico | BOOLEAN | NOT NULL | — | Valor lógico da alternativa (Certo = verdadeiro, Errado = falso). |
 
### Tabela: fonte
 
| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| id_fonte | INTEGER (identity) | NOT NULL | PK | Número que identifica a fonte. |
| titulo | VARCHAR(255) | NOT NULL | — | Título da fonte. |
| url | VARCHAR(500) | NOT NULL | UNIQUE | Endereço da fonte, gravado uma vez só. |
| id_publicador | INTEGER | NOT NULL | FK → publicador.id_publicador | Quem publicou a fonte. |
| id_idioma | VARCHAR(5) | NOT NULL | FK → idioma.id_idioma | Idioma em que a fonte está escrita. |
 
### Tabela: pergunta
 
| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| id_pergunta | VARCHAR(20) | NOT NULL | PK; CHECK (id_pergunta ~ '^fact-[0-9]{3,}$') | Código original da pergunta (fact-001, fact-002…), mantido como veio (RD08). |
| titulo | VARCHAR(150) | NOT NULL | CHECK (btrim(titulo) <> '') | Título da pergunta. |
| enunciado | TEXT | NOT NULL | CHECK (btrim(enunciado) <> '') | A afirmação que o jogador julga como Certa ou Errada; pode ser longa. |
| explicacao | TEXT | NOT NULL | CHECK (btrim(explicacao) <> '') | Explicação de por que a resposta é aquela; pode ser longa. |
| id_categoria | INTEGER | NOT NULL | FK → categoria.id_categoria | Categoria da pergunta. |
| id_fonte | INTEGER | NOT NULL | FK → fonte.id_fonte | Fonte que a pergunta cita. |
| id_alternativa_correta | SMALLINT | NOT NULL | FK → alternativa.id_alternativa | Alternativa que é a resposta certa da pergunta. |
 
