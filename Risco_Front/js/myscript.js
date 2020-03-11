

function adicionar(){
    var nome = $("#nome").val();
    var descricao = $("#descricao").val();
    var jsonData = { nome: nome, descricao: descricao };
    $.ajax({
           method: "POST",
           contentType: "application/json",
           url: "http://localhost:8080/spring-rest-demo/empresa",
           data: JSON.stringify(jsonData),
           success: function(result){ montarModal(); },
           error: function(error){ }
         })
  } 

  function deletar(){
       var id = $("#nomes").val();
       var jsonData = {id: id};
       $.ajax({
              method: "DELETE",
              contentType: "application/json",
              url: "http://localhost:8080/spring-rest-demo/empresa",
              data: JSON.stringify(jsonData)
            })
     }

     function findEmpresa(){
       $.ajax({
              method: "GET",
              crossDomain: true,
              url: "http://localhost:8080/spring-rest-demo/empresa",
              dataType: 'JSON',
              success: function(response, textStatus, xhr){
                     xhr.status
                     var len = response.length;
                     var tr_str = "";
                     var tr_str2 = "<datalist id='aaa'>";
                     var id = "";
                     var nome = "";
                     var descricao = "";
                     
                     for(var i=0; i<len; i++){
                            id = response[i].id;
                            nome = response[i].nome;
                            descricao = response[i].descricao;
                     
                            tr_str +=
                            "<option value='"+ (id) +"'>" + nome + "</option>";
                            tr_str2 +=
                            "<option value='"+ nome +"'>" + id + "</option>";
                     }
            
              tr_str2 += "</datalist>";
              tr_str += "</select>";
              $("#nomes").append(tr_str);
              $("#nomess").append(tr_str2);
             
              },
              error: function (error) {
                     console.log(error);
              }
        })
     }
     
    function preencherValorDescricao(e){
        $.ajax({
              method: "GET",
              crossDomain: true,
              url: "http://localhost:8080/spring-rest-demo/empresa/"+e.value,
              dataType: 'JSON',
              success: function(response){
                     var descricao = response.descricao;
                     $("#descricoes").val(descricao);
              }
       })
     } 
