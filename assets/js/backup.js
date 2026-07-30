/* =====================================================
   EMPIRE ERP PREMIUM REMASTER

   BACKUP.JS

===================================================== */


/* =====================================================
   CRIAR BACKUP
===================================================== */


function criarBackup(){


    const dados = {


        produtos:

        JSON.parse(

            localStorage.getItem("produtos")

        ) || [],



        usuarios:

        JSON.parse(

            localStorage.getItem("usuarios")

        ) || [],



        clientes:

        JSON.parse(

            localStorage.getItem("clientes")

        ) || [],



        vendas:

        JSON.parse(

            localStorage.getItem("vendas")

        ) || [],



        compras:

        JSON.parse(

            localStorage.getItem("compras")

        ) || [],



        financeiro:

        JSON.parse(

            localStorage.getItem("financeiro")

        ) || [],



        empresa:

        JSON.parse(

            localStorage.getItem("empresa")

        ) || {},



        data:

        new Date().toLocaleString()


    };



    const arquivo = new Blob(

        [

            JSON.stringify(

                dados,

                null,

                2

            )

        ],

        {

            type:"application/json"

        }

    );



    const url =

    URL.createObjectURL(arquivo);



    const link =

    document.createElement("a");



    link.href = url;



    link.download =

    "backup-empire-" +

    Date.now() +

    ".json";



    link.click();



    URL.revokeObjectURL(url);



    registrarBackup(dados.data);


    alert(

        "Backup criado com sucesso!"

    );


}
/* =====================================================
   RESTAURAR BACKUP
===================================================== */


function restaurarBackup(event){


    const arquivo =

    event.target.files[0];



    if(!arquivo){

        return;

    }





    const leitor =

    new FileReader();





    leitor.onload = function(e){



        try{



            const dados =

            JSON.parse(

                e.target.result

            );





            Object.keys(dados).forEach(

                function(chave){



                    if(chave !== "data"){



                        localStorage.setItem(

                            chave,

                            JSON.stringify(

                                dados[chave]

                            )

                        );

                    }



                }

            );





            alert(

                "Backup restaurado com sucesso!"

            );



            location.reload();



        }

        catch(erro){



            alert(

                "Arquivo de backup invalido."

            );



        }



    };





    leitor.readAsText(

        arquivo

    );


}






/* =====================================================
   REGISTRAR HISTORICO
===================================================== */


function registrarBackup(data){



    let historico =

    JSON.parse(

        localStorage.getItem(

            "historicoBackup"

        )

    ) || [];





    historico.unshift({


        data:data,

        arquivo:

        "backup-empire.json",


        usuario:

        JSON.parse(

            localStorage.getItem(

                "usuarioLogado"

            )

        )?.nome || "Sistema",


        acao:

        "Backup criado"


    });





    localStorage.setItem(

        "historicoBackup",

        JSON.stringify(

            historico

        )

    );


}
/* =====================================================
   ATUALIZAR INFORMACOES
===================================================== */


function atualizarInformacoesBackup(){


    let total = 0;


    const tabelas = [


        "produtos",

        "usuarios",

        "clientes",

        "vendas",

        "compras",

        "financeiro"


    ];





    tabelas.forEach(

        function(item){



            const dados =

            JSON.parse(

                localStorage.getItem(item)

            ) || [];



            total += dados.length;



        }

    );





    const campoTotal =

    document.getElementById(

        "totalDadosBackup"

    );





    if(campoTotal){



        campoTotal.innerText =

        total;


    }








    const historico =

    JSON.parse(

        localStorage.getItem(

            "historicoBackup"

        )

    ) || [];





    if(historico.length > 0){



        document.getElementById(

            "ultimoBackup"

        ).innerText =

        historico[0].data;



    }



}






/* =====================================================
   CARREGAR HISTORICO
===================================================== */


function carregarHistoricoBackup(){



    const tabela =

    document.getElementById(

        "listaBackups"

    );





    if(!tabela){

        return;

    }







    const historico =

    JSON.parse(

        localStorage.getItem(

            "historicoBackup"

        )

    ) || [];





    tabela.innerHTML = "";





    if(historico.length === 0){



        tabela.innerHTML = `

        <tr>

        <td colspan="4">

        Nenhum backup realizado

        </td>

        </tr>

        `;



        return;


    }







    historico.forEach(

        function(item){



            tabela.innerHTML += `

            
            <tr>

            <td>${item.data}</td>

            <td>${item.arquivo}</td>

            <td>${item.usuario}</td>

            <td>${item.acao}</td>

            </tr>

            

            `;


        }

    );



}
/* =====================================================
   BACKUP AUTOMATICO
===================================================== */


function iniciarBackupAutomatico(){



    const ativo =

    document.getElementById(

        "backupAutomatico"

    );





    const intervalo =

    document.getElementById(

        "intervaloBackup"

    );





    if(!ativo || !intervalo){

        return;

    }







    ativo.checked =

    JSON.parse(

        localStorage.getItem(

            "backupAutomatico"

        )

    ) || false;







    intervalo.value =

    localStorage.getItem(

        "intervaloBackup"

    ) || 24;








    ativo.addEventListener(

        "change",

        function(){



            localStorage.setItem(

                "backupAutomatico",

                ativo.checked

            );



        }

    );







    intervalo.addEventListener(

        "change",

        function(){



            localStorage.setItem(

                "intervaloBackup",

                intervalo.value

            );



        }

    );



}






/* =====================================================
   INICIALIZACAO
===================================================== */


document.addEventListener(

"DOMContentLoaded",



function(){



    atualizarInformacoesBackup();



    carregarHistoricoBackup();



    iniciarBackupAutomatico();



});
