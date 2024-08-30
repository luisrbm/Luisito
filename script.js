const words = ['balao', 'carne', 'junto', 'xinga', 'pombo', 'trico', 'doula', 'minha', 'verao'];

function validarInput(id){
	let arrId = id.split('');
	let nId = [parseInt(arrId[0]), parseInt(arrId[1])];
	let letra = document.getElementById(id).value;
	
	if (letra.length == 0){
		if (nId[1] < 5){
	document.getElementById(nId[0].toString() + (nId[1]+1).toString()).focus();
	}
		else {
	document.getElementById((nId[0]+1).toString() + '1').focus();
	}
    }
}

function limpar(){
	for (let k= 1; k <= 6; k++){
		for (let j = 1; j <= 5; j++){
			var strId = k.toString() + j.toString();
			document.getElementById(strId).value = "";
		}
	} 
}

function validarLinha(){

}
