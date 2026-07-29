 // ======================================
// EMPIRE ERP
// Módulo de Monitoramento
// ======================================


let monitoramento = JSON.parse(

    localStorage.getItem("monitoramento")

) || [];




// ======================================
// Registrar Atividade
// ======================================

function registrarAtividade(acao, descricao){


    const usuario = JSON.parse(

        localStorage.getItem("usuarioLogado")

    );



    const registro = {


        data:

        new Date().toLocaleString("pt-BR"),



        usuario:

        usuario ? usuario.nome : "Sistema",



        acao,



        descricao


    };



    monitoramento.push(registro);



    localStorage.setItem(

        "monitoramento",

        JSON.stringify(monitoramento)

    );


}




// ======================================
// Listar Monitoramento
// ======================================

function listarMonitoramento(){


    const tabela = document.getElementById(

        "listaMonitoramento"

    );



    if(!tabela){

        return;

    }



    tabela.innerHTML = "";



    monitoramento.reverse().forEach(item=>{


        tabela.innerHTML += `


        <tr>


        <td>

        ${item.data}

        </td>


        <td>

        ${item.usuario}

        </td>


        <td>

        ${item.acao}

        </td>


        <td>

        ${item.descricao}

        </td>


        </tr>


        `;


    });


}




// ======================================
// Limpar Histórico
// ======================================

function limparMonitoramento(){


    if(confirm(

        "Deseja apagar todo o histórico?"

    )){


        monitoramento = [];



        localStorage.removeItem(

            "monitoramento"

        );



        listarMonitoramento();


    }


}



// ======================================
// Inicialização
// ======================================

listarMonitoramento();
