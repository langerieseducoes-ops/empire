/* =====================================================
   EMPIRE ERP
   EMPRESA.JS
===================================================== */


const EMPRESA = {


    nome: "EMPIRE",


    fantasia: "Empire - Imperio da Moda Online",


    versao: "1.0.0",


    slogan: "Gestao Inteligente para Moda",


    pais: "Brasil",


    moeda: "BRL",


    idioma: "pt-BR",


    logo: "assets/img/logo.png",


    favicon: "assets/img/favicon.png"



};






/* SALVAR CONFIGURACAO DA EMPRESA */


function carregarEmpresa(){



    localStorage.setItem(

        "empresa",

        JSON.stringify(EMPRESA)

    );





    const nome =

    document.getElementById(

        "nomeEmpresa"

    );





    if(nome){


        nome.innerHTML =

        EMPRESA.fantasia;


    }







    const versao =

    document.getElementById(

        "versaoSistema"

    );





    if(versao){


        versao.innerHTML =

        EMPRESA.versao;


    }



}







document.addEventListener(

"DOMContentLoaded",



function(){



    carregarEmpresa();



});
