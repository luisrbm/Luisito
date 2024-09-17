from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import random
import os

# doc_path = os.getcwd() + '/luisito/comuns.txt' #Se linux
doc_path = os.getcwd() + '\comuns.txt' #Se windows
print(doc_path)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ("https://lrbm.pythonanywhere.com", 'http://127.0.0.1:5000', 'http://localhost:5000')}})

@app.route('/inserir_palavra/<palavra>', methods=['POST'])
def inserir_palavra(palavra):
    dados = request.json
    print(dados)
    resp = 'N'
    if palavra in dados['string']:
        resp = input('Deseja inserir a palavra ' +  palavra + ' no dicionário? (S/[N])')
        if resp == 'S':
            with open(doc_path, 'r+', encoding='utf-8') as f:
                palavras = f.readlines()
                print('Palavras atuais: ... ', palavras[-6:])
                palavras.append(palavra + '\n')
                print('Palavras após inserir: ... ', palavras[-6:])
                palavras = sorted(palavras)
                print('Palavras após organizar: ... ', palavras[-6:])
                f.seek(0)
                f.writelines(palavras)
                f.truncate()
                print('Arquivo atualizado!')
    return jsonify({'status: ': 'sucesso'}, {'Palavra inserida: ': palavra}), 200

@app.route('/lista')
def obter_lista():
    with open(doc_path, 'r', encoding='utf-8') as f:
        palavras = f.readlines()
        lista_palavras = [i.strip() for i in palavras]
    return jsonify({'lista': lista_palavras})

@app.route('/palavra')
def obter_palavra():
    with open(doc_path, 'r', encoding='utf-8') as f:
        palavras = f.readlines()
    if not palavras:
        return jsonify({'erro': 'Nenhuma palavra encontrada'})

    i = random.randint(0, len(palavras)-1)
    palavra = palavras[i].strip()
    return jsonify({'palavra': palavra})

@app.route('/')
def luisito():
    return render_template('index.html')

@app.route('/duplo')
def luisito_duplo():
    return render_template('duplo.html')

@app.route('/quadruplo')
def luisito_quadruplo():
    return render_template('quadruplo.html')

if __name__ == "__main__":
    app.run(debug=True)
