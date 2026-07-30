/* =====================================================
   EMPIRE ERP PREMIUM REMASTER v2.0

   MONITORAMENTO.JS

   Controle do Monitoramento

===================================================== */





// =====================================================
// CARREGAR USUÁRIOS
// =====================================================



function carregarUsuariosMonitor(){



    let usuarios =


    JSON.parse(

    localStorage.getItem(

    "usuarios"

    )

    )

    ||

    [];






    let usuarioAtual =


    JSON.parse(

    localStorage.getItem(

    "usuarioAtual"

    )

    )

    ||

    {};







    if(usuarioAtual.nome){



        usuarios.push(

        usuarioAtual

        );



    }







    let tabela =


    document.getElementById(

    "listaUsuariosMonitor"

    );






    if(!tabela){

        return;

    }






    tabela.innerHTML = "";








    if(usuarios.length === 0){



        tabela.innerHTML = `


        <tr>

        <td colspan="4">

        Nenhum usuário conectado

        </td>

        </tr>



        `;



        return;



    }







    usuarios.forEach(

    function(usuario){



        let status =


        usuario.status ===

        "online"

        ?

        "🟢 Online"

        :

        "🔴 Offline";







        tabela.innerHTML += `



        <tr>


        <td>

        ${usuario.nome}

        </td>



        <td>

        ${usuario.nivel || "Usuário"}

        </td>



        <td>

        ${status}

        </td>



        <td>

        ${usuario.ultimoAcesso || "-"}

        </td>



        </tr>



        `;



    });



}








// =====================================================
// CONTADORES
// =====================================================



function atualizarContadoresMonitor(){



    let usuarioAtual =


    JSON.parse(

    localStorage.getItem(

    "usuarioAtual"

    )

    )

    ||

    {};







    let online =

    usuarioAtual.status ===

    "online"

    ?

    1

    :

    0;







    let campoOnline =


    document.getElementById(

    "usuariosOnlineMonitor"

    );






    let campoOffline =


    document.getElementById(

    "usuariosOfflineMonitor"

    );








    if(campoOnline){



        campoOnline.innerText =

        online;



    }






    if(campoOffline){



        campoOffline.innerText =

        online ? 0 : 1;



    }



}
/* =====================================================
   HISTÓRICO DE ACESSOS
===================================================== */



function carregarHistoricoAcessos(){



    let acessos =


    JSON.parse(

    localStorage.getItem(

    "historicoAcessos"

    )

    )

    ||

    [];







    let tabela =


    document.getElementById(

    "historicoAcessos"

    );






    if(!tabela){

        return;

    }






    tabela.innerHTML = "";







    let lista =


    acessos

    .slice(-10)

    .reverse();







    if(lista.length === 0){



        tabela.innerHTML = `



        <tr>


        <td colspan="3">


        Nenhum acesso registrado


        </td>


        </tr>



        `;



        return;



    }








    lista.forEach(

    function(acesso){



        tabela.innerHTML += `



        <tr>



        <td>

        ${acesso.usuario}

        </td>



        <td>

        ${acesso.data}

        </td>



        <td>

        🟢 ${acesso.status}

        </td>



        </tr>



        `;



    });



}









/* =====================================================
   LOGS DO SISTEMA
===================================================== */



function carregarLogsSistema(){



    let logs =


    JSON.parse(

    localStorage.getItem(

    "monitoramento"

    )

    )

    ||

    [];







    let tabela =


    document.getElementById(

    "logsSistema"

    );







    if(!tabela){

        return;

    }






    tabela.innerHTML = "";







    let lista =


    logs

    .slice(-15)

    .reverse();







    if(lista.length === 0){



        tabela.innerHTML = `



        <tr>


        <td colspan="4">


        Nenhum registro encontrado


        </td>


        </tr>



        `;



        return;



    }








    lista.forEach(

    function(log){



        tabela.innerHTML += `



        <tr>



        <td>

        ${log.usuario}

        </td>



        <td>

        ${log.acao}

        </td>



        <td>

        ${log.modulo}

        </td>



        <td>

        ${log.data}

        </td>



        </tr>



        `;



    });



}








/* =====================================================
   ÚLTIMA ATUALIZAÇÃO
===================================================== */



function atualizarDataMonitoramento(){



    let campo =


    document.getElementById(

    "ultimaAtualizacao"

    );






    if(campo){



        campo.innerText =


        new Date()

        .toLocaleString(

        "pt-BR"

        );



    }



}
/* =====================================================
   ATUALIZAR MONITORAMENTO
===================================================== */



function atualizarMonitoramento(){



    carregarUsuariosMonitor();



    atualizarContadoresMonitor();



    carregarHistoricoAcessos();



    carregarLogsSistema();



    atualizarDataMonitoramento();





    if(typeof notificacao === "function"){



        notificacao(

        "Monitoramento atualizado!"

        );



    }



}








/* =====================================================
   LIMPAR LOGS
===================================================== */



function limparLogs(){



    let confirmar =


    confirm(

    "Deseja apagar todos os logs?"

    );






    if(!confirmar){

        return;

    }






    localStorage.removeItem(

    "monitoramento"

    );





    localStorage.removeItem(

    "historicoAcessos"

    );






    atualizarMonitoramento();





    if(typeof notificacao === "function"){



        notificacao(

        "Logs removidos com sucesso!"

        );



    }



}








/* =====================================================
   EXPORTAR MONITORAMENTO
===================================================== */



function exportarMonitoramento(){



    let relatorio = {



        sistema:

        "Empire ERP Premium",




        data:

        new Date()

        .toLocaleString(

        "pt-BR"

        ),




        usuarios:

        JSON.parse(

        localStorage.getItem(

        "usuarioAtual"

        )

        )

        ||

        {},




        acessos:

        JSON.parse(

        localStorage.getItem(

        "historicoAcessos"

        )

        )

        ||

        [],




        logs:

        JSON.parse(

        localStorage.getItem(

        "monitoramento"

        )

        )

        ||

        []



    };







    let arquivo =


    new Blob(

    [

    JSON.stringify(

    relatorio,

    null,

    2

    )

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


    "monitoramento-empire.json";







    link.click();







    if(typeof notificacao === "function"){



        notificacao(

        "Relatório exportado!"

        );



    }



}








/* =====================================================
   INICIALIZAÇÃO
===================================================== */



document.addEventListener(

"DOMContentLoaded",



function(){



    atualizarMonitoramento();





    setInterval(

    atualizarMonitoramento,

    10000

    );



});
