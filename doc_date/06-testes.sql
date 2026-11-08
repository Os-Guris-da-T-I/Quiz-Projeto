/* =========================================
   TESTES DE SELEÇÃO (SELECT)
   Garante que os dados podem ser lidos
========================================= */

-- 1. Verificar se todas as perguntas foram inseridas no banco
SELECT * FROM perguntas;

-- 2. Buscar apenas as alternativas e a resposta correta de uma pergunta específica
SELECT texto_pergunta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, resposta_correta 
FROM perguntas 
WHERE id_pergunta = 1;

-- 3. Listar o ranking dos jogadores (Top 5 pontuações)
SELECT nome_jogador, pontuacao 
FROM ranking 
ORDER BY pontuacao DESC 
LIMIT 5;

/* =========================================
   TESTES DE INSERÇÃO (INSERT)
   Simula um novo jogador iniciando o quiz
========================================= */

-- 4. Inserir um jogador de teste
INSERT INTO jogadores (nome_jogador, email, data_registro) 
VALUES ('Jogador Teste', 'teste@gennisquiz.com', CURRENT_DATE);

/* =========================================
   TESTES DE ATUALIZAÇÃO (UPDATE)
   Simula o final da partida, salvando os pontos
========================================= */

-- 5. Atualizar a pontuação final do jogador de teste
UPDATE jogadores 
SET pontuacao = 14
WHERE nome_jogador = 'Jogador Teste';

/* =========================================
   TESTES DE EXCLUSÃO (DELETE)
   Limpa os dados falsos para não sujar o banco oficial
========================================= */

-- 6. Deletar o jogador de teste criado no passo 4
DELETE FROM jogadores 
WHERE nome_jogador = 'Jogador Teste';
