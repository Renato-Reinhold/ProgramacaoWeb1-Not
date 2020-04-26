var arr = ['maçã', 'abacaxi', 'abacate', 'amora', 'cereja'];

for (i = 0; i < arr.length; i++) {
	document.getElementById('list').innerHTML += '<li>' + arr[i] + '</li>';
}