from flask import Flask, jsonify, request

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

@app.route("/", methods=["GET"])
def inicio():
    return jsonify({
        "mensagem": "Quiz"
    })
    
    
    
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
    



if __name__ == "__main__":
    app.run(debug=True)
