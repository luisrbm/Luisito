//var words = ['balao', 'carne', 'junto', 'xinga', 'pombo', 'trico', 'doula', 'minha', 'verao'];
//const daVez = words[Math.floor(Math.random()*words.length)];
// const url_1 = 'https://lrbm.pythonanywhere.com/palavra' //se online
const url_1 = 'http://127.0.0.1:5000/palavra'; //se servidor for offline
// const url_2 = 'https://lrbm.pythonanywhere.com/lista' //se online
const url_2 = 'http://127.0.0.1:5000/lista'; //se servidor for offline
// const url_3 = 'https://lrbm.pythonanywhere.com/inserir_palavra/' //se online
const url_3 = 'http://127.0.0.1:5000/inserir_palavra/'; //se servidor for offline
let daVez = '';
let words = [];


async function enviar_nova(palavra, bool){
    if (bool) {
      document.getElementById('popup').style.visibility = 'visible';
    } else {
      document.getElementById('popup').style.visibility = 'hidden';
    }
    document.getElementById('palavra_ausente').innerHTML = palavra;
    await fetch(url_3 + palavra, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({string: palavra}),
    }).finished;
}

async function obter_palavra(){
    const resposta = await fetch(url_1);
    // console.log(resposta);
    const palavra = await resposta.json();
    // console.log(palavra);
    return palavra['palavra'];
}

async function lista_palavras(){
    const lista_resp = await fetch(url_2);
    // console.log(lista_resp);
    const lista = await lista_resp.json();
    // console.log(lista);
    return lista;
}

function obter_palavra_e_lista(){
  obter_palavra().then(value => {daVez = value;});
  // console.log(daVez);
  lista_palavras().then(value => {words = value;});
  // console.log(words.lista);
  iniciar()
}

function iniciar() {

  document.getElementById('jogos');
  const forms = [];
  var active = 0;
  for (let i = 0; i <= 5; i++) {
    forms.push(document.createElement('div'));
    forms[i].name = 'linha' + (i + 1);
    forms[i].id = 'linha' + (i + 1);
    forms[i].className = 'formContainer';
    forms[i].contenteditable = true;
    document.getElementById('jogos').appendChild(forms[i]);
    forms[i].addEventListener('keydown', function(event) {
    	if (event.key === "Enter") {
	    event.preventDefault();
	    validarLinha(this);}});

    const casinhas = [];
    for (let j = 0; j <= 4; j++) {
      casinhas.push(document.createElement('input'));
      casinhas[j].name = (i + 1).toString() + (j + 1).toString();
      casinhas[j].id = (i + 1).toString() + (j + 1).toString();
      casinhas[j].className = 'letra';
      casinhas[j].maxLength = 1;
      casinhas[j].required = true;
      (i !== 0) ? casinhas[j].disabled = true: casinhas[j].disabled = false;
      casinhas[j].addEventListener('input', validarInput)
      casinhas[j].addEventListener( 'keydown', function(event) {((event.keyCode == '37') && (j >= '1')) ? this.previousSibling.select() : (((event.keyCode == '39') && (j <= '3')) ? this.nextSibling.select() : ({}))});
      forms[i].appendChild(casinhas[j]);
     }
   }
  document.getElementById('jogos').animate([{'opacity':0},{'opacity':1}], 1500)
 }

function validarLinha(elemento) {
  const linhas = elemento.querySelectorAll('input');
  let linha = "";
  for (let i=0; i<linhas.length; i++) {
    if (linhas[i].value === "") {
      linhas[i].select();
      return;}
    linha += linhas[i].value;
  }
  if (linha.length == 5){
    if ((words.lista).includes(linha.toLowerCase())) {
      const proxLinhas = elemento.nextElementSibling;
      if (proxLinhas !== null) {
        var proxLinha = proxLinhas.querySelectorAll('input')
      }
      let x = verificarPalavra(elemento).then(() => {
      if (x !== true && proxLinhas !== null){
		for (let i=0; i < linhas.length; i++) {
        linhas[i].disabled = true;
        proxLinha[i].disabled = false;
        }
        proxLinha[0].select();
      } else if (x !== true && !proxLinha) {
        for (let i=0; i < linhas.length; i++) {
          linhas[i].disabled = true;}
      } else {
          for (let i=0; i < linhas.length; i++) {
          linhas[i].disabled = true;
          }
      }});
    } else {
      enviar_nova(linha.toLowerCase());
      }
    }
}


async function verificarPalavra(elemento) {
  const linhas = elemento.querySelectorAll('input');
  let lin_arr = [];
  const daVez_arr = daVez.split('');

  for (let i = 0; i < linhas.length; i++) {
    lin_arr.push(linhas[i].value.toLowerCase());
  }

  await elemento.animate([{'opacity': 1}, {'opacity': 0}], {duration:500, fill: 'forwards'}).finished;

  for (let i=0; i < lin_arr.length; i++){
    if (daVez[i] === lin_arr[i]){
      linhas[i].className = 'letra_lugar_certo';
      } else if (daVez_arr.includes(lin_arr[i])) {
		linhas[i].className = 'letra_lugar_errado';
        } else {
        linhas[i].className = "letra_errada";
      }
  }

    await elemento.animate([{'opacity':0}, {'opacity': 1}],{duration:500, fill: 'forwards'}).finished;

	if (daVez_arr.join('') == lin_arr.join('')) {
      for (let i in linhas){
        let spin = [
            {transform:'scale(1) rotate(0)'},
            {transform:'scale(2) rotate(360deg'},
            {transform:'scale(1) rotate(720deg)'},
        ];

        linhas[i].animate(spin, 1000)
      }
	  return true;
  }
}

function validarInput() {
  const valor = document.getElementById(this.id);
  valor.value = valor.value.toUpperCase();
  if ((valor.value.length === 1) && (valor.id.split("")[1] !== '5')) {
    valor.nextSibling.select();
  }
  if ((valor.value.length === 0) && (valor.id.split("")[1] !== '1')) {
    valor.previousSibling.select();
  }
}

function limpar() {
  for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= 5; j++) {
      var strId = i.toString() + j.toString();
      document.getElementById(strId).value = "";
    }
  }
}
