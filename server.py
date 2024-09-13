from flask import Flask, render_template, jsonify
from flask_cors import CORS
import random
import os

doc_path = os.getcwd() + '/luisito/comuns.txt'

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://lrbm.pythonanywhere.com"}})

with open(doc_path, 'r') as f:
    palavras = f.readlines()

@app.route('/lista')
def obter_lista():
    return jsonify({'lista':palavras})

@app.route('/palavra')
def obter_palavra():
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
