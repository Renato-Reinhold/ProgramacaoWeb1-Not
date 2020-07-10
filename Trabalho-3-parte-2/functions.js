var url = "https://private-a1f2ecd-renatomullerreinhold.apiary-mock.com/";

function load(){
	var request = new XMLHttpRequest();
	request.open('GET', 'https://private-a1f2ecd-renatomullerreinhold.apiary-mock.com/carros');
	request.onreadystatechange = function () {
	  if(this.readyState === 4 && this.status == 200){
			let tbody = $(".table tbody");
			tbody.html('');
			let text = "";
			//console.log(this.responseText);
			var data = JSON.parse(this.responseText);
			for (var i = 0; i < data.length; i++) {
				text += "<tr class='header'>";
				text += "<td id='id_"+data[i].id+"'>" + data[i].id + "</td>";
				text += "<td id='nome_"+data[i].id+"'>" + data[i].nome + "</td>";
				text += "<td id='marca_"+data[i].id+"'>" + data[i].marca + "</td>";
				text += "<td id='preco_"+data[i].id+"'>" + data[i].preco + "</td>";
				text += "<td id='ano_"+data[i].id+"'>" + data[i].ano + "</td>";
				text += "<td id='cor_"+data[i].id+"'>" + data[i].cor + "</td>";
				text += "<td><button class='btn btn-info' onclick='update(\""+ data[i].id +"\", action)' style='margin-right: 10px;'>Editar</button>";
				text += "<button class='btn btn-danger' onclick='deletar(\"" + data[i].id + "\", action)' style='margin-right: 10px;'>Excluir</button>";
				text += "<button class='btn btn-success' onclick='mostrar(\""+data[i].id+"\")'>Alugações <i class='fa fa-plus-circle' aria-hidden='true'></i> </button></td></tr>";
				if(data[i].pessoas != undefined){
					text += '<tr class="'+data[i].id+'" style="display:none">';
					text += '<td class="pessoas">Nome da pessoa</td>';
					text += '<td class="pessoas">Email</td>';
					text += '<td class="pessoas">Data nascimento</td>';
					text += '<td class="pessoas">Estado</td>';
					text += '<td class="pessoas">Sexo</td></tr>';
					for (var j = 0; j < data[i].pessoas.length; j++) {
						let pessoa = data[i].pessoas[j];
						text += '<tr class="'+data[i].id+'" style="display:none"><td>'+pessoa.nome+'</td>';
						text += '<td>'+pessoa.email+'</td>';
						text += '<td>'+pessoa.data_nasc+'</td>';
						text += '<td>'+pessoa.estado+'</td>';
						text += '<td>'+pessoa.sexo+'</td></tr>';
					}
					text += "</tr>";
				}
				text += "</tr>";
			}
			tbody.append(text);
		}
	};
	request.send();
}


function exec_action(action) {
	let url_temp = url+action.tela;
	var obj = {};

	if(action.tela == 'carros'){
		obj = {
			nome : $("#nm_carro").val(),
			marca : $("#nr_ano").val(),
			preco : $("#preco").val(),
			ano : $("#nm_marca").val(),
			cor : $("#cor").val(),
			estado : $("#estado").val()
		}
	}else{
		obj = {
			nome : $("#nome").val(),
			email : $("#nm_email").val(),
			data_nasc : $("#date").val(),
			estado : $("#estado").val(),
			sexo : $("#sexo").val() ? $("#sexo").val() : $("#sexo2").val()
		}
	}

	if(action.status == "create"){
		$.post(url_temp+"/"+action.status, obj, function(data, status){
			if(status == "success"){
				swal("Empregado " + data.nome + " criado com sucesso!");
			}
		});
	}
	if(action.status == "update"){
		$.put(url_temp+"/"+action.status+"/"+action.id, obj, function(data, status){
			if (status == 'success') {
				swal("Empregado " + data.nome + " editado com sucesso!");
			}
		});
	}
	if(action.status == "delete"){
		var request = new XMLHttpRequest();
		request.open('DELETE', url_temp+"/"+action.status+"/"+action.id);
		request.onreadystatechange = function () {
		  if (this.readyState === 4) {
		    swal(JSON.parse(this.responseText).mensagem);
		  }
		};
		request.send();
	}

	action.setStatus('create');
	action.setId(null);
}

function update(id, action){
	window.location = 'cadastro_carro.html?id='+$("#id_"+id).text()+'&nome='+$("#nome_"+id).text()+'&marca='+$("#marca_"+id).text()+'&preco='+$("#preco_"+id).text()+'&ano='+$("#ano_"+id).text()+'&cor='+$("#cor_"+id).text();
}

function deletar(id, action){
	swal({
	  title: "Você tem certeza?",
	  text: "Você tem certeza que dejeta excluir " + $("#nome_"+id).text() + " ?",
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((willDelete) => {
	  if (willDelete) {
	  	action.setStatus("delete");
	  	action.setId(id);
	    exec_action(action);
	  }
	});
}

function mostrar(id){
	$("."+id).toggle("slow");
}

$.put = function(url, data, callback){
 
  if ( $.isFunction(data) ){
    type = type || callback,
    callback = data,
    data = {}
  }
 
  return $.ajax({
    url: url,
    type: 'PUT',
    success: callback,
    data: data
  });
}