var filme1 = {
	titulo: 'Coração Valante',
	ano: 1995,
	genero: 'Ação/Drama',
}
var filme2 = {
	titulo: 'Matrix',
	ano: 1999 ,
	genero: 'Ficcção científica/Ação',
}

var filme3 = {
	titulo: 'Jurassic Park',
	ano: 1993,
	genero: 'Ficcção científica',
}

document.getElementById('main').innerHTML += '<tr><td>'+ filme1.titulo + '</td><td>' + filme1.ano + '</td><td>' + filme1.genero + '</td></tr>';
document.getElementById('main').innerHTML += '<tr><td>'+ filme2.titulo + '</td><td>' + filme2.ano + '</td><td>' + filme2.genero + '</td></tr>';
document.getElementById('main').innerHTML += '<tr><td>'+ filme3.titulo + '</td><td>' + filme3.ano + '</td><td>' + filme3.genero + '</td></tr>';
