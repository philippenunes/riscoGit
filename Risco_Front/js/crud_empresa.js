$(function() {
       montarPagina();
       findEmpresa();
  });

function chamadaPutona(method, url, data, codigo){
       $.ajax({
              method: method,
              contentType: "application/json",
              url: url,
              crossDomain: true,
              data: data,
              success: function(result, textStatus, xhr){
                   switch(codigo) {
                            case "adicionar":
                                   showModal("adicionado");
                                   break;
                            case "deletar":
                                   showModal("deletado");
                                   break;
                            case "atualizar":
                                   showModal("atualizado");
                                   break;
                            case "findEmpresa":
                                   preencherFindEmpresa(result);
                                   break;
                            case "preencherValorDescricao":
                                   var descricao = result.descricao;
                                   $("#descricoes").val(descricao);
                                   break;
                       }
               },
              error: function(error){
                     showModal("error");
               }
            })
}

function adicionar(){
    var nome = $("#nome").val();
    var descricao = $("#descricao").val();
    var jsonData = { nome: nome, descricao: descricao };
    var method = "POST";
    var url = "http://localhost:8080/spring-rest-demo/empresa";
    
    chamadaPutona(method,url,JSON.stringify(jsonData), "adicionar");
  } 

function atualizar(){
    var nome = $("#nomess").val();
    var descricao = $("#descricoes").val();
    var json = {nome: nome, descricao: descricao};
    var method = "PUT";
    var url = "http://localhost:8080/spring-rest-demo/empresa";
    
    chamadaPutona(method,url,JSON.stringify(json),"atualizar");
}

  function deletar(){
       var id = $("#nomes").val();
       var jsonData = {id: id};
       var method = "DELETE";
       var url = "http://localhost:8080/spring-rest-demo/empresa";
       
       chamadaPutona(method,url,JSON.stringify(jsonData), "deletar");
       // $.ajax({
       //        method: "DELETE",
       //        contentType: "application/json",
       //        url: "http://localhost:8080/spring-rest-demo/empresa",
       //        data: JSON.stringify(jsonData)
       //      })
     }

     function findEmpresa(){
       var method = "GET";
       var url = "http://localhost:8080/spring-rest-demo/empresa";
       chamadaPutona(method,url,null,"findEmpresa");
//        $.ajax({
//               method: "GET",
//               crossDomain: true,
//               url: "http://localhost:8080/spring-rest-demo/empresa",
//               dataType: 'JSON',
//               success: function(response){
//                      var len = response.length;
//                      var tr_str = "";
//                      var tr_str2 = "<datalist id='aaa'>";
//                      var id = "";
//                      var nome = "";
//                      var descricao = "";
                     
//                      for(var i=0; i<len; i++){
//                             id = response[i].id;
//                             nome = response[i].nome;
//                             descricao = response[i].descricao;
                     
//                             tr_str +=
//                             "<option value='"+ (id) +"'>" + nome + "</option>";
//                             tr_str2 +=
//                             "<option value='"+ nome +"'>" + id + "</option>";
//                      }
            
//               tr_str2 += "</datalist>";
//               tr_str += "</select>";
//               $("#nomes").append(tr_str);
//               $("#nomess").append(tr_str2);
             
//               },
//               error: function (error) {
//                      console.log(error);
//               }
//         })
        }
     
    function preencherValorDescricao(e){
       var method = "GET";
       var url = "http://localhost:8080/spring-rest-demo/empresa/"+e.value;
       chamadaPutona(method,url, null, "preencherValorDescricao"); 
       // $.ajax({
       //        method: "GET",
       //        crossDomain: true,
       //        url: "http://localhost:8080/spring-rest-demo/empresa/"+e.value,
       //        dataType: 'JSON',
       //        success: function(response){
       //               var descricao = response.descricao;
       //               $("#descricoes").val(descricao);
       //        }
       // })
     } 

     function preencherFindEmpresa(response){
       $("#nomes").empty();
       $("#nomess").empty();
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

       }

       function montarPagina(){
              var str = '<h1>Tela CRUD Empresa</h1>'+
                     '<div>'+
                            '<div class="label">'+
                            'Nome Empresa: <input type="text" id="nome" name="nome">'+
                            'Descrição: <input type="text" id="descricao" name="descricao">'+
                            '<input type="button" onclick="adicionar()" value="Adicionar">'+
                            '</div>'+
                     '</div>'+
                     '<div>'+
                            '<div class="label">'+
                            'Nome Empresa: <select id="nomes">'+
                            '<input type="button" onclick="deletar()" value="Deletar">'+
                            '</div>'+
                     '</div>'+
                     '<div class="label">'+
                            'Nome Empresa: <input onChange="preencherValorDescricao(this)"type="text" id="nomess" list="aaa">'+
                            'Descricao: <input type="text" id="descricoes">'+
                            '<input type="button" onclick="atualizar()" value="Atualizar">'+
                     '</div>';
                     


              $("body").append(str);                     
       }
       
       
// chamadas dos modal's
       function showModal(e) {
              switch(e) {
                     case "adicionado":
                            var str = '<div id="myModal" class="modal">'+
                                          '<!-- Modal content -->'+
                                          '<div class="modal-content">'+
                                          '<span onclick="closeModal();" class="close">&times;</span>'+
                                          '<p>Empresa Adicionada com sucesso.</p>'+
                                          '</div>'+
                                       '</div>';
                            $("body").append(str); 
                            $(".modal").css("background-color","rgba(0,0,200,0.1)");
                     break;
                     case "atualizado":
                            var str = '<div id="myModal" class="modal">'+
                                          '<!-- Modal content -->'+
                                          '<div class="modal-content">'+
                                          '<span onclick="closeModal();" class="close">&times;</span>'+
                                          '<p>Empresa Atualizada com sucesso.</p>'+
                                          '</div>'+
                                       '</div>';
                            $("body").append(str); 
                            $(".modal").css("background-color","rgba(0,0,200,0.1)");
                     break;
                     case "deletado":
                            var str = '<div id="myModal" class="modal">'+
                                          '<!-- Modal content -->'+
                                          '<div class="modal-content">'+
                                          '<span onclick="closeModal();" class="close">&times;</span>'+
                                          '<p>Empresa Deletada com sucesso.</p>'+
                                          '</div>'+
                                       '</div>';
                            $("body").append(str); 
                            $(".modal").css("background-color","rgba(0,0,200,0.1)");
                     break;
                     case "error":
                            var str = '<div id="myModal" class="modal">'+
                                          '<!-- Modal content -->'+
                                          '<div class="modal-content">'+
                                          '<span onclick="closeModal();" class="close">&times;</span>'+
                                          '<p>Erro na operação.</p>'+
                                          '</div>'+
                                   '</div>';
                            $("body").append(str);
                            $(".modal").css("background-color","rgba(200,0,0,0.1)");
                     break;
                }
              $(".modal").css("display", "block");
       }
       
       function closeModal(){
              $(".modal").css("display", "none");
       }