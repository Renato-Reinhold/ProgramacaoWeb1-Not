function Calcular(){
	let n1 = document.getElementById('n1').value;
	let n2 = document.getElementById('n2').value;
	let n3 = document.getElementById('n3').value;
	if(isNull(n1) || isNull(n2) || isNull(n3)){
		alert('Todos os campos precisão estar preenchidos.');
	}else{
		let soma = parseFloat(n1) + parseFloat(n2) + parseFloat(n3);
		alert('Resultado : ' + soma);
	}
}

function isNull(c){
	return c == null || c == undefined || c == NaN || c == '';
}