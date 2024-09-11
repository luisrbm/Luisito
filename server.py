from flask import Flask, render_template, request, make_response
import random

app = Flask(__name__)

@app.route('/palavra')
def obter_palavra():
    with open('comuns.txt') as f:
    	x = f.readlines()
    	i = random(0, len(x)-1)
        return make_response({'palavra': x[i]}, 200)

@app.route('/')
def luisito():
    return render_template('index.html')

@app.route('/duplo')
def luisito_duplo():
    return render_template('duplo.html')

@app.route('/quadruplo')
def luisito_quadruplo():
    return render_template('quadruplo.html')
