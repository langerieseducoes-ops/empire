// ======================================
// EMPIRE ERP
// Módulo de Backup
// ======================================



// ======================================
// Exportar Backup
// ======================================

function exportarBackup(){


    const dados = {


        empresa:

        JSON.parse(

            localStorage.getItem("empresa")

        ) || {},



        produtos:

        JSON.parse(

            localStorage.getItem("produtos")

        ) || [],



        vendas:

        JSON.parse(

            localStorage.getItem("vendas")

        ) || [],



        compras:

        JSON.parse(

            localStorage.getItem("compras")

        ) || [],



        clientes:

        JSON.parse(

            localStorage.getItem("clientes")

        ) || [],



        fornecedores:

        JSON.parse(

            localStorage.getItem("fornecedores")

        ) || [],



        categorias:

        JSON.parse(

            localStorage.getItem("categorias")

        ) || [],



        usuarios:

        JSON.parse(

            localStorage.getItem("usuarios")

        ) || []



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





    const link = document.createElement("a");


    link.href = URL.createObjectURL(arquivo);


    link.download =

    "backup-empire-erp.json";



    link.click();




    document.getElementById(

        "statusBackup"

    ).innerHTML =

    "Backup exportado com sucesso!";



}





// ======================================
// Importar Backup
// ======================================

function importarBackup(){



    const arquivo =

    document.getElementById(

        "arquivoBackup"

    ).files[0];



    if(!arquivo){


        alert(

        "Selecione um arquivo de backup."

        );


        return;


    }





    const leitor = new FileReader();




    leitor.onload = function(e){



        const dados = JSON.parse(

            e.target.result

        );





        Object.keys(dados).forEach(chave=>{


            localStorage.setItem(

                chave,

                JSON.stringify(

                    dados[chave]

                )

            );


        });





        document.getElementById(

            "statusBackup"

        ).innerHTML =

        "Backup restaurado com sucesso!";




        alert(

        "Dados restaurados. Recarregue o sistema."

        );



    };





    leitor.readAsText(arquivo);



}
