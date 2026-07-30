/* =====================================================
   EMPIRE ERP PREMIUM REMASTER

   CONFIGURACOES.JS

===================================================== */



let configuracoes =

JSON.parse(

localStorage.getItem("configuracoes")

)

||

{};



/* =====================================================
   CARREGAR CONFIGURAÇÕES
===================================================== */


function carregarConfiguracoes(){


    const empresa =

    JSON.parse(

        localStorage.getItem("empresa")

    )

    ||

    {};





    document.getElementById("nomeEmpresaConfig").value =

    empresa.nome || "";





    document.getElementById("fantasiaConfig").value =

    empresa.fantasia || "";





    document.getElementById("cnpjConfig").value =

    empresa.cnpj || "";





    document.getElementById("telefoneConfig").value =

    empresa.telefone || "";





    document.getElementById("whatsappConfig").value =

    empresa.whatsapp || "";





    document.getElementById("emailConfig").value =

    empresa.email || "";





    document.getElementById("enderecoConfig").value =

    empresa.endereco || "";





    document.getElementById("cidadeConfig").value =

    empresa.cidade || "";





    document.getElementById("estadoConfig").value =

    empresa.estado || "";





    document.getElementById("cepConfig").value =

    empresa.cep || "";



}





/* =====================================================
   SALVAR EMPRESA
===================================================== */


function salvarEmpresa(){


    let empresa = {


        nome:

        document.getElementById("nomeEmpresaConfig").value,



        fantasia:

        document.getElementById("fantasiaConfig").value,



        cnpj:

        document.getElementById("cnpjConfig").value,



        telefone:

        document.getElementById("telefoneConfig").value,



        whatsapp:

        document.getElementById("whatsappConfig").value,



        email:

        document.getElementById("emailConfig").value,



        endereco:

        document.getElementById("enderecoConfig").value,



        cidade:

        document.getElementById("cidadeConfig").value,



        estado:

        document.getElementById("estadoConfig").value,



        cep:

        document.getElementById("cepConfig").value


    };





    localStorage.setItem(

        "empresa",

        JSON.stringify(empresa)

    );



}
/* =====================================================
   SALVAR CONFIGURAÇÕES GERAIS
===================================================== */


function salvarConfiguracoes(){


    salvarEmpresa();





    configuracoes = {


        logo:

        document.getElementById("logoConfig").value,



        tema:

        document.getElementById("temaConfig").value,



        moeda:

        document.getElementById("moedaConfig").value,



        idioma:

        document.getElementById("idiomaConfig").value,



        notificacaoVenda:

        document.getElementById("notificacaoVenda").checked,



        notificacaoEstoque:

        document.getElementById("notificacaoEstoque").checked,



        notificacaoBackup:

        document.getElementById("notificacaoBackup").checked



    };







    localStorage.setItem(

        "configuracoes",

        JSON.stringify(configuracoes)

    );







    alert(

        "Configurações salvas com sucesso!"

    );



}








/* =====================================================
   RESTAURAR PADRÃO
===================================================== */


function restaurarConfiguracoes(){



    if(

    !confirm(

    "Restaurar configurações padrão?"

    )

    ){

        return;

    }







    localStorage.removeItem(

        "configuracoes"

    );







    location.reload();



}








/* =====================================================
   CARREGAR PREFERÊNCIAS
===================================================== */


function carregarPreferencias(){



    const config =

    JSON.parse(

        localStorage.getItem(

            "configuracoes"

        )

    );







    if(!config){

        return;

    }







    document.getElementById("logoConfig").value =

    config.logo || "";





    document.getElementById("temaConfig").value =

    config.tema || "escuro";





    document.getElementById("moedaConfig").value =

    config.moeda || "BRL";





    document.getElementById("idiomaConfig").value =

    config.idioma || "pt-BR";







    document.getElementById("notificacaoVenda").checked =

    config.notificacaoVenda;





    document.getElementById("notificacaoEstoque").checked =

    config.notificacaoEstoque;





    document.getElementById("notificacaoBackup").checked =

    config.notificacaoBackup;



}
/* =====================================================
   APLICAR TEMA
===================================================== */


function aplicarTema(){


    const config =

    JSON.parse(

        localStorage.getItem(

            "configuracoes"

        )

    );





    if(!config){

        return;

    }







    if(config.tema === "claro"){



        document.body.classList.add(

            "tema-claro"

        );



    }else{



        document.body.classList.remove(

            "tema-claro"

        );



    }



}








/* =====================================================
   ATUALIZAR LOGO
===================================================== */


function atualizarLogo(){



    const config =

    JSON.parse(

        localStorage.getItem(

            "configuracoes"

        )

    );





    if(!config){

        return;

    }







    const logos =

    document.querySelectorAll(

        ".marca img"

    );







    logos.forEach(

        function(img){



            if(config.logo){



                img.src =

                "../" + config.logo;



            }



        }

    );



}








/* =====================================================
   INICIALIZAÇÃO
===================================================== */


document.addEventListener(

"DOMContentLoaded",



function(){



    carregarConfiguracoes();



    carregarPreferencias();



    aplicarTema();



    atualizarLogo();



});
