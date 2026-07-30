/* =====================================================
   EMPIRE ERP PREMIUM REMASTER v2.0

   APP.JS
   Sistema Global

===================================================== */



// =====================================================
// CONFIGURAÇÃO PRINCIPAL
// =====================================================


const SISTEMA = {


    nome:

    "Empire ERP Premium",



    empresa:

    "Império da Moda Online",



    versao:

    "2.0"



};






// =====================================================
// CONTROLE DO USUÁRIO
// =====================================================



let usuarioAtual =

JSON.parse(

localStorage.getItem("usuarioAtual")

)

||

{

    nome:

    "Administrador",


    nivel:

    "Administrador",


    status:

    "online"



};






// =====================================================
// SALVAR SESSÃO
// =====================================================



function salvarSessao(){


    localStorage.setItem(

        "usuarioAtual",

        JSON.stringify(usuarioAtual)

    );


}






// =====================================================
// CARREGAR INFORMAÇÕES DO USUÁRIO
// =====================================================



function carregarUsuario(){



    const elemento =

    document.getElementById(

        "usuarioInfo"

    );



    if(!elemento){

        return;

    }





    elemento.innerHTML = `



    <div class="avatar">

        ${

        usuarioAtual.nome

        .charAt(0)

        .toUpperCase()

        }

    </div>



    <div>


    <strong>

    ${usuarioAtual.nome}

    </strong>



    <br>



    <span class="status online">

    Online

    </span>



    </div>


    `;



}






// =====================================================
// REGISTRO DE ACESSO
// =====================================================



function registrarAcesso(){



    let acessos =


    JSON.parse(

    localStorage.getItem(

        "historicoAcessos"

    )

    )

    ||

    [];





    acessos.push({


        usuario:

        usuarioAtual.nome,



        data:

        new Date()

        .toLocaleString("pt-BR"),



        status:

        "online"



    });





    localStorage.setItem(

        "historicoAcessos",

        JSON.stringify(acessos)

    );



}






// =====================================================
// SAIR DO SISTEMA
// =====================================================



function sairSistema(){



    usuarioAtual.status =

    "offline";



    salvarSessao();



    registrarAcesso();





    alert(

    "Sessão encerrada com sucesso."

    );





    window.location.href =

    "login.html";



}






// =====================================================
// INICIALIZAÇÃO
// =====================================================



document.addEventListener(

"DOMContentLoaded",



function(){



    salvarSessao();



    carregarUsuario();



    registrarAcesso();



}

);
// =====================================================
// MONITORAMENTO GLOBAL DO SISTEMA
// =====================================================



let monitoramento =

JSON.parse(

localStorage.getItem(

"monitoramento"

)

)

||

[];







// =====================================================
// REGISTRAR ATIVIDADE
// =====================================================



function registrarAtividade(

acao,

modulo

){



    let registro = {


        usuario:

        usuarioAtual.nome,



        acao:

        acao,



        modulo:

        modulo,



        data:

        new Date()

        .toLocaleString(

        "pt-BR"

        ),



        status:

        "online"



    };






    monitoramento.push(

        registro

    );





    localStorage.setItem(

        "monitoramento",

        JSON.stringify(

        monitoramento

        )

    );



}







// =====================================================
// ATUALIZAR STATUS ONLINE
// =====================================================



function atualizarStatusOnline(){



    usuarioAtual.status =

    "online";



    usuarioAtual.ultimoAcesso =


    new Date()

    .toLocaleString(

    "pt-BR"

    );





    salvarSessao();



}







// =====================================================
// VERIFICAR USUÁRIO ATIVO
// =====================================================



function verificarAtividade(){



    let ultimaAtividade =


    localStorage.getItem(

    "ultimaAtividade"

    );





    if(!ultimaAtividade){


        localStorage.setItem(

        "ultimaAtividade",

        Date.now()

        );


        return;


    }





    let tempo =


    Date.now()

    -

    Number(

    ultimaAtividade

    );






    // 5 minutos sem atividade

    if(

    tempo >

    300000

    ){



        usuarioAtual.status =

        "offline";



        salvarSessao();



    }



}






// =====================================================
// CAPTURAR MOVIMENTAÇÃO DO USUÁRIO
// =====================================================



function registrarMovimento(){



    localStorage.setItem(

    "ultimaAtividade",

    Date.now()

    );





    atualizarStatusOnline();



}







// Eventos do usuário


document.addEventListener(

"click",

registrarMovimento

);



document.addEventListener(

"keydown",

registrarMovimento

);





document.addEventListener(

"mousemove",

registrarMovimento

);






// =====================================================
// VERIFICAÇÃO AUTOMÁTICA
// =====================================================



setInterval(

function(){


    verificarAtividade();



},

60000

);






// =====================================================
// REGISTRAR ACESSO AUTOMÁTICO
// =====================================================



registrarAtividade(

"Entrou no sistema",

"Sistema"

);
/* =====================================================
   FUNÇÕES GLOBAIS DO SISTEMA
===================================================== */



// =====================================================
// NOTIFICAÇÕES PREMIUM
// =====================================================



function notificacao(

mensagem,

tipo = "success"

){



    let div =

    document.createElement(

    "div"

    );





    div.className =

    "notificacao " +

    tipo;





    div.innerHTML = `

    
    <span>

    ${mensagem}

    </span>


    `;





    document.body.appendChild(

    div

    );






    setTimeout(


    function(){


        div.remove();



    },


    4000


    );



}







// =====================================================
// DATA ATUAL
// =====================================================



function dataAtual(){



    return new Date()

    .toLocaleString(

    "pt-BR"

    );



}







// =====================================================
// BACKUP AUTOMÁTICO
// =====================================================



function criarBackup(){



    let backup = {



        produtos:

        JSON.parse(

        localStorage.getItem(

        "produtos"

        )

        )

        ||

        [],




        clientes:

        JSON.parse(

        localStorage.getItem(

        "clientes"

        )

        )

        ||

        [],




        vendas:

        JSON.parse(

        localStorage.getItem(

        "vendas"

        )

        )

        ||

        [],





        monitoramento:

        JSON.parse(

        localStorage.getItem(

        "monitoramento"

        )

        )

        ||

        [],




        data:

        dataAtual()



    };







    localStorage.setItem(

    "ultimoBackup",

    JSON.stringify(

    backup

    )

    );





}







// Backup automático a cada 30 minutos


setInterval(

function(){


    criarBackup();



},

1800000

);







// =====================================================
// EXPORTAR BACKUP
// =====================================================



function exportarBackup(){



    let dados =


    localStorage.getItem(

    "ultimoBackup"

    );





    if(!dados){



        notificacao(

        "Nenhum backup encontrado",

        "warning"

        );



        return;



    }






    let arquivo =

    new Blob(

    [

    dados

    ],



    {


        type:

        "application/json"



    }



    );





    let link =

    document.createElement(

    "a"

    );





    link.href =

    URL.createObjectURL(

    arquivo

    );





    link.download =

    "backup-empire.json";





    link.click();



    notificacao(

    "Backup exportado com sucesso!"

    );



}






// =====================================================
// INFORMAÇÕES DO SISTEMA
// =====================================================



function infoSistema(){



    return {


        nome:

        SISTEMA.nome,



        empresa:

        SISTEMA.empresa,



        versao:

        SISTEMA.versao,



        usuario:

        usuarioAtual.nome,



        data:

        dataAtual()



    };



}





// =====================================================
// INICIAR SISTEMA
// =====================================================



criarBackup();


registrarAtividade(

"Sistema carregado",

"Sistema"

);
