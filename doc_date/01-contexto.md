# Passos 1 a 3 — Contexto, minimundo e requisitos
 
## 1. Introdução e contexto
 
O Tech Trivia do nosso grupo é um quiz de conhecimentos gerais de T.I. com 20 perguntas, divididas em categorias como Python, Front-end, Linguagem C, Banco de Dados, Segurança, Redes e Internet e JSON e APIs. Ele é um quiz para a web, feito com HTML, CSS e JavaScript, que troca dados em JSON e conta com uma API de segurança. O jogador lê uma afirmação, marca Certo ou Errado e depois vê a explicação e de onde a informação veio. O objetivo deste banco, feito em PostgreSQL, é guardar as perguntas, as categorias, as alternativas, as explicações e as fontes (com publicador e idioma) e responder às consultas que o aplicativo faz. O ranking e a pontuação do quiz também precisam de banco, mas a orientação da disciplina deixa isso fora do núcleo. Por isso tratamos esse assunto como extensão, na pasta `08-extensao/`.
 
Escopo.
 
| O banco faz | O banco não faz |
| --- | --- |
| Guarda as 20 perguntas do quiz, cada uma com código fixo, título, enunciado e explicação | No núcleo, não guarda pontuação, ranking nem usuário (isso fica na extensão `08-extensao/`) |
| Guarda as categorias, e cada pergunta fica em uma só | Não guarda senha nem sessão: isso é com a API de segurança do aplicativo |
| Guarda as fontes (título, URL e idioma) e os publicadores, sem repetir nada | Não tem tela de cadastro: os dados entram pelo script de carga |
| Guarda as alternativas (Certo ou Errada) e qual é a correta em cada pergunta | |
| Responde às consultas RA01 a RA07 | |
 
Usuários.
 
| Usuário | O que faz |
| --- | --- |
| Jogador | Lê a pergunta, escolhe Certo ou Errado, vê se acertou e vê a explicação e a fonte completa (título, publicador, URL e idioma). Também pode escolher uma categoria ou pedir uma pergunta qualquer. |
| Quem cadastra perguntas | Coloca no banco a categoria, o publicador, a fonte e a pergunta. Como não existe tela de cadastro, isso é feito pelo script de carga (`05-dml-consultas.sql`), mas os dados entram no banco do mesmo jeito. |
 
## 2. Minimundo
 
> Queremos fazer um quiz de afirmações sobre tecnologia. Cada pergunta é uma frase, e o jogador tem que dizer se ela está Certa ou Errada. Toda pergunta tem um código próprio que nunca muda, como fact-001 e fact-002, e tem também um título, o enunciado (a frase em si, que pode ser comprida) e uma explicação, que também pode ser comprida e conta por que a resposta é aquela. Título, enunciado e explicação sempre vêm preenchidos. Cada pergunta fica em uma categoria só, e uma categoria pode ter várias perguntas. Não pode haver duas categorias com o mesmo nome.
>
> Cada pergunta cita uma fonte para provar a explicação. A fonte tem título, endereço (URL) e idioma. A mesma fonte pode servir para várias perguntas, então o mesmo endereço não pode ser cadastrado duas vezes. Cada fonte tem um publicador só, que é quem publicou o material, e um publicador pode ter várias fontes; o nome dele aparece uma única vez. O idioma vem de uma lista fixa, com código e descrição, como pt e Português. Hoje as alternativas são Certo e Errado, cada uma com um rótulo e um valor lógico, e cada pergunta tem uma alternativa correta. A mesma alternativa pode ser a correta de várias perguntas. Mais para frente podemos querer mais de duas alternativas, e isso não pode obrigar a mexer na ficha da pergunta. No aplicativo, queremos listar as categorias em ordem alfabética com a quantidade de perguntas, sortear uma pergunta (de qualquer categoria ou de uma escolhida), mostrar título, enunciado e alternativas, dizer se o jogador acertou, mostrar a explicação com a fonte completa e saber quais publicadores e quais fontes aparecem mais.
 
## 3. Requisitos e regras de negócio
 
| Código | Texto do requisito | Tipo |
| --- | --- | --- |
| RD01 | Toda pergunta pertence a exatamente uma categoria. Não há duas categorias com o mesmo nome. | regra de negócio |
| RD02 | Toda pergunta cita exatamente uma fonte. A mesma fonte pode ser citada por várias perguntas. A URL é única. | regra de negócio |
| RD03 | Toda fonte tem exatamente um publicador. O nome do publicador é único. | regra de negócio |
| RD04 | Toda fonte tem um idioma de um conjunto controlado, com código e descrição. | regra de negócio |
| RD05 | As alternativas atuais são Certo e Errado, cada uma com rótulo e valor lógico. | regra de negócio |
| RD06 | Toda pergunta indica qual alternativa é a correta. | regra de negócio |
| RD07 | O banco aceita, no futuro, mais de duas alternativas sem refazer a estrutura da pergunta. | funcional |
| RD08 | O identificador original da pergunta (fact-001, fact-002, …) é preservado. | regra de negócio |
| RD09 | Título, enunciado e explicação são obrigatórios. Enunciado e explicação podem ser longos. | regra de negócio |
| RD10 | Nome de categoria, nome de publicador e dados da fonte não se repetem em cada pergunta. | regra de negócio |
| RD11 | As perguntas da carga entram sem perda de campo. | funcional |
| RA01 | Listar as categorias em ordem alfabética, com a quantidade de perguntas. | funcional |
| RA02 | Sortear uma pergunta de qualquer categoria ou de uma categoria escolhida. | funcional |
| RA03 | Exibir título, enunciado e as alternativas. | funcional |
| RA04 | Dizer se a alternativa escolhida é a correta. | funcional |
| RA05 | Exibir a explicação e a fonte completa: título, publicador, URL e idioma. | funcional |
| RA06 | Listar os publicadores mais citados, com o número de perguntas. | funcional |
| RA07 | Listar as fontes citadas por mais de uma pergunta. | funcional |
| RNF01 | O SGBD é PostgreSQL. | não funcional |
| RNF02 | Integridade: nome de categoria único, URL única, textos da pergunta obrigatórios, toda chave estrangeira do núcleo preenchida. | não funcional |
 
