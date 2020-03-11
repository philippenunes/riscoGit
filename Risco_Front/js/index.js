    $(function(){
        montarMenu();
    });

    function montarMenu(){
        var str = '<div class="topnav">'+
                '<a href="crud_empresa.html">Home</a>'+
                '<a href="#news">News</a>'+
                '<a href="#contact">Contact</a>'+
                '<a href="#about">About</a>'+
                '</div>';
      
        $("body").append(str);
    }
    