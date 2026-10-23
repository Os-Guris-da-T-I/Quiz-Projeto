# Passo 4 — Modelo conceitual
 
Marco M1. A entrega deste passo é o modelo conceitual: o desenho em `entregas/02-conceitual.pdf` (ou `.png`) e as tabelas abaixo.
 
É um DER na notação de Chen, no brModelo ou no Visual Paradigm Online. Entidades, atributos, relacionamentos e cardinalidades. Ainda não aparecem tabela, chave estrangeira nem tipo de coluna: isso é o modelo lógico, no passo 5.
 
[Baixar DER em PDF] [02-conceitual.pdf](https://github.com/user-attachments/files/33888332/02-conceitual.pdf)


## Entidades
 
| Entidade | Atributos | Identificador |
| --- | --- | --- |
| pergunta | codigo, titulo, enunciado, explicacao | codigo |
| categoria | nome | nome |
| fonte | titulo, url | url |
| publicador | nome | nome |
| idioma | codigo, descricao | codigo |
| alternativa | rotulo, valor_logico | rotulo |
 
## Relacionamentos
 
Uma frase por linha, ligada a um requisito. Cardinalidade dos dois lados, mínimo e máximo.
 
| Relacionamento | Cardinalidade | Justificativa | Requisito |
| --- | --- | --- | --- |
| classifica | categoria (0,N) , pergunta (1,1) | Cada pergunta pertence a exatamente uma categoria, e uma categoria pode ter nenhuma ou várias perguntas. | RD01, RD10 |
| cita | pergunta (1,1) , fonte (0,N) | Cada pergunta cita exatamente uma fonte, e a mesma fonte (mesma URL) pode ser citada por nenhuma ou várias perguntas. | RD02, RD10 |
| publica | publicador (0,N) , fonte (1,1) | Cada fonte tem exatamente um publicador, e um publicador pode ter nenhuma ou várias fontes. | RD03, RD10 |
| tem_idioma | idioma (0,N) , fonte (1,1) | Cada fonte tem exatamente um idioma da lista fixa, e um idioma pode ser o de nenhuma ou de várias fontes. | RD04 |
| indica_correta | alternativa (0,N) , pergunta (1,1) | Cada pergunta indica exatamente uma alternativa correta, e a mesma alternativa pode ser a correta de nenhuma ou várias perguntas. Mais alternativas no futuro entram como novas ocorrências, sem mudar a pergunta. | RD05, RD06, RD07 |
 
 
O diagrama e esta tabela descrevem o mesmo modelo. Toda entidade do desenho está na tabela.
 
