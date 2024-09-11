const words = ['balao', 'carne', 'junto', 'xinga', 'pombo', 'trico', 'doula', 'minha', 'verao'];
const daVez = words[Math.floor(Math.random()*words.length)];
console.log(daVez)

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
    if (words.includes(linha.toLowerCase())) {
      const proxLinha = elemento.nextElementSibling.querySelectorAll('input');
      let x = verificarPalavra(elemento).then(() => {
      if (x !== true){
		for (let i=0; i < linhas.length; i++) {
        linhas[i].disabled = true;
        proxLinha[i].disabled = false;
        }
        proxLinha[0].select();
      } else {
          for (let i=0; i < linhas.length; i++) {
          linhas[i].disabled = true;
          }
      }});
    } else {
      alert('Palavra inválida!');
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
