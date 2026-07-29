// ======================================
// EMPIRE ERP
// Módulo Financeiro
// ======================================



// ======================================
// Carregar Financeiro
// ======================================


function carregarFinanceiro(){



    const vendas = JSON.parse(

        localStorage.getItem("vendas")

    ) || [];



    const produtos = JSON.parse(

        localStorage.getItem("produtos")

    ) || [];





    let faturamento = 0;


    let lucro = 0;


    let valorEstoque = 0;






    // Calcular vendas


    vendas.forEach(v=>{


        faturamento += Number(
            v.valor || 0
        );


    });






    // Calcular estoque e lucro estimado


    produtos.forEach(p=>{


        valorEstoque +=

        Number(p.custo || 0) *

        Number(p.quantidade || 0);




        lucro +=

        (Number(p.venda || 0) -

        Number(p.custo || 0)) *

        Number(p.quantidade || 0);



    });







    const campoFaturamento =

    document.getElementById(
        "faturamentoTotal"
    );



    const campoVendas =

    document.getElementById(
        "totalVendas"
    );



    const campoEstoque =

    document.getElementById(
        "valorEstoqueFinanceiro"
    );



    const campoLucro =

    document.getElementById(
        "lucroTotal"
    );







    if(campoFaturamento){


        campoFaturamento.innerHTML =

        faturamento.toLocaleString(

            "pt-BR",

            {
                style:"currency",
                currency:"BRL"
            }

        );


    }






    if(campoVendas){


        campoVendas.innerHTML =

        vendas.length;


    }






    if(campoEstoque){


        campoEstoque.innerHTML =

        valorEstoque.toLocaleString(

            "pt-BR",

            {
                style:"currency",
                currency:"BRL"
            }

        );


    }






    if(campoLucro){


        campoLucro.innerHTML =

        lucro.toLocaleString(

            "pt-BR",

            {
                style:"currency",
                currency:"BRL"
            }

        );


    }






    listarMovimentoFinanceiro(vendas);



}





// ======================================
// Lista de Movimentações
// ======================================


function listarMovimentoFinanceiro(vendas){



    const tabela =

    document.getElementById(
        "listaFinanceiro"
    );



    if(!tabela){

        return;

    }





    tabela.innerHTML = "";






    vendas.forEach(v=>{



        tabela.innerHTML += `


        <tr>


        <td>
        ${v.data}
        </td>


        <td>
        ${v.cliente}
        </td>


        <td>
        ${v.produto}
        </td>


        <td>

        ${Number(v.valor).toLocaleString(

            "pt-BR",

            {
                style:"currency",
                currency:"BRL"
            }

        )}

        </td>


        </tr>


        `;



    });



}







// ======================================
// Inicialização
// ======================================


carregarFinanceiro();
