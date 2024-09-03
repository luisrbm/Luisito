const words = ['balao', 'carne', 'junto', 'xinga', 'pombo', 'trico', 'doula', 'minha', 'verao'];

function iniciar(){
	document.getElementById('jogos');
	const forms = [];
	for (let i=0;i<=5;i++){
		forms.push(document.createElement('div'));
		forms[i].name = 'linha' + (i+1);
		forms[i].id = 'linha' + (i+1);
		forms[i].className = 'formContainer';
		forms[i].contenteditable = true;
		document.getElementById('jogos').appendChild(forms[i]);
		const casinhas = [];
		for (let j=0;j<=4;j++){
			casinhas.push(document.createElement('div'));
			casinhas[j].contentEditable = true;
			casinhas[j].name = (i+1).toString() + (j+1).toString();
			casinhas[j].id = (i+1).toString() + (j+1).toString();
			casinhas[j].className = 'letra';
			// debugger;
			casinhas[j].addEventListener('keyup', validarInput);
			// debugger;
			forms[i].appendChild(casinhas[j]);
		}
	}
}

function validarInput(id){
	let arrId = this.id.split('');
	let nId = [parseInt(arrId[0]), parseInt(arrId[1])];
	let letra = document.getElementById(this.id).value.toUpperCase();

	if (letra.length === 1){
		if (nId[1] < 5){
			document.getElementById(nId[0].toString() + (nId[1]+1).toString()).focus();
		}
		else {
			document.getElementById((nId[0]+1).toString() + '1').focus();
		}
    }
}

function limpar(){
	for (let i= 1; i <= 6; i++){
		for (let j = 1; j <= 5; j++){
			var strId = i.toString() + j.toString();
			document.getElementById(strId).value = "";
		}
	} 
}

function validarLinha(){

}
