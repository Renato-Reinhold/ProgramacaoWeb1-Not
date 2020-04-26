function calcularFatorial(){
	let value = document.getElementById('number').value;
	let cmpResult = document.getElementById('result');
	if(value.match('[0-9]') == null){
		alert('Digite somente números inteiros.');
		cmpResult.value = null;
	}else{
		let result = 1;
		for (var i = 1; i <= value; i++) {
			result *= i;
		}
		cmpResult.value = result;
	}
}