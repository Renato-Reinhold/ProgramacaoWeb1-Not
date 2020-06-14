var url = "https://us-central1-rest-api-employees.cloudfunctions.net/api/v1/";
//"http://dummy.restapiexample.com/api/v1/"

function load(){
	$.get(url+"employees", function(data, status){
		if(status == "success"){
			var tbody = $(".table tbody");
			tbody.html('');
			var data = data.data;
			for (var i = 0; i < data.length; i++) {
				tbody.append("<tr>");
				tbody.append("<td scope='row'>" + data[i].id + "</td>");
				tbody.append("<td id='nome_"+data[i].id+"'>" + data[i].employee_name + "</td>");
				tbody.append("<td id='salario_"+data[i].id+"'>" + data[i].employee_salary + "</td>");
				tbody.append("<td id='idade_"+data[i].id+"'>" + data[i].employee_age + "</td>");
				tbody.append("<td id='avatar_"+data[i].id+"'>" + data[i].profile_image + "</td>");
				tbody.append("<td><button class='btn btn-info' onclick='update(\""+ data[i].id +"\", action)' style='margin-right: 10px;'>Editar</button><button class='btn btn-danger' onclick='deletar(\"" + data[i].id + "\", action)'>Excluir</button></td>");
			}
			$("#id").val(data.length);
		}
	});
}

function exec_action(action) {

	var employed = {
		name : $("#nome").val(),
		salary : $("#salario").val(),
		age : $("#idade").val(),
	}

	if(action.status == "salvar"){
		$.post(url+"create", employed, function(data, status){
			if(status == "success"){
				swal("Empregado " + data.data.name + " criado com sucesso!");
			}
		});
	}
	if(action.status == "editar"){
		$.put(url+'update/'+action.id, employed, function(data, status){
			if (status == 'success') {
				swal("Empregado " + data.data.name + " editado com sucesso!");
			}
		});
	}
	if(action.status == "deletar"){
		$.delete(url+"delete/" + action.id, employed, function(data, status){
			if (status == 'success') {
				swal("Empregado " + $("#nome_"+action.id).val() + " foi deletado com sucesso.");
			}
		});
	}

	action.setStatus('salvar');
	limparCampos();
	load();
}

function update(id, action){
	$("#nome").val($("#nome_"+id).text());
	$("#salario").val($("#salario_"+id).text());
	$("#idade").val($("#idade_"+id).text());
	action.setId(id);
	action.setStatus('editar');
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
	  	action.setStatus("deletar");
	  	action.setId(id);
	    exec_action(action);
	  }
	});
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

$.delete = function(url, data, callback){
 
  if ( $.isFunction(data) ){
    type = type || callback,
        callback = data,
        data = {}
  }
 
  return $.ajax({
    url: url,
    type: 'DELETE',
    success: callback,
    data: data
  });
}

function limparCampos(){
	$("#nome").val('');
	$("#salario").val('');
	$("#idade").val('');
	$("#avatar").val('');
}
