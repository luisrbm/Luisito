from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

@app.route('/palavra')
def obter_palavra():
    with open('comuns.txt') as f:
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