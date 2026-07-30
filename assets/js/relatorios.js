/* =====================================================
   EMPIRE ERP PREMIUM REMASTER v2.0

   RELATORIOS.JS

   Sistema de Relatórios

===================================================== */



let graficoEstoque;

let graficoFinanceiro;

let graficoVendas;








// =====================================================
// GERAR RELATÓRIO
// =====================================================



function gerarRelatorio(){



    atualizarIndicadores();



    carregarTabelaRelatorio();



    criarGraficos();







    if(typeof registrarAtividade === "function"){



        registrarAtividade(

        "Relatório gerado",

        "Relatórios"

        );



    }



}








// =====================================================
// LER PRODUTOS
// =====================================================



function buscarProdutos(){



    return JSON.parse(

    localStorage.getItem(

    "produtos"

    )

    )

    ||

    [];



}








// =====================================================
// LER MOVIMENTAÇÕES
// =====================================================



function buscarFinanceiro(){



    return JSON.parse(

    localStorage.getItem(

    "movimentacoes"

    )

    )

    ||

    [];



}








// =====================================================
// ATUALIZAR INDICADORES
// =====================================================



function atualizarIndicadores(){



    let produtos =

    buscarProdutos();





    let financeiro =

    buscarFinanceiro();







    let estoque = 0;







    produtos.forEach(

    function(produto){



        estoque +=


        Number(produto.quantidade)

        ||

        0;



    });







    let vendas = 0;



    let lucro = 0;







    financeiro.forEach(

    function(movimento){



        if(movimento.tipo === "entrada"){



            vendas += Number(movimento.valor);



        }







        if(movimento.tipo === "saida"){



            lucro -= Number(movimento.valor);



        }



    });







    let campoProdutos =


    document.getElementById(

    "relatorioProdutos"

    );







    let campoEstoque =


    document.getElementById(

    "relatorioEstoque"

    );







    let campoVendas =


    document.getElementById(

    "relatorioVendas"

    );







    let campoLucro =


    document.getElementById(

    "relatorioLucro"

    );







    if(campoProdutos){



        campoProdutos.innerText =

        produtos.length;



    }







    if(campoEstoque){



        campoEstoque.innerText =

        estoque;



    }







    if(campoVendas){



        campoVendas.innerText =


        "R$ " + vendas.toFixed(2);



    }







    if(campoLucro){



        campoLucro.innerText =


        "R$ " + lucro.toFixed(2);



    }



}
/* =====================================================
   CARREGAR TABELA DE RELATÓRIO
===================================================== */



function carregarTabelaRelatorio(){



    let tabela =


    document.getElementById(

    "resultadoRelatorio"

    );






    if(!tabela){

        return;

    }






    let produtos =

    buscarProdutos();







    tabela.innerHTML = "";







    if(produtos.length === 0){



        tabela.innerHTML = `



        <tr>


        <td colspan="5">


        Nenhum dado encontrado


        </td>


        </tr>



        `;



        return;



    }







    produtos.forEach(

    function(produto){



        tabela.innerHTML += `



        <tr class="relatorio-item">



        <td>

        ${produto.produto || "-"}

        </td>





        <td>

        ${produto.categoria || "-"}

        </td>





        <td>

        ${produto.quantidade || 0}

        </td>





        <td>

        R$ ${

        Number(produto.venda || 0)

        .toFixed(2)

        }

        </td>





        <td>

        --

        </td>





        </tr>



        `;



    });



}








/* =====================================================
   CRIAR GRÁFICOS
===================================================== */



function criarGraficos(){



    let produtos =

    buscarProdutos();





    let financeiro =

    buscarFinanceiro();







    let nomesProdutos = [];



    let quantidades = [];







    produtos.forEach(

    function(produto){



        nomesProdutos.push(

        produto.produto

        );



        quantidades.push(

        Number(produto.quantidade)

        ||

        0

        );



    });







    let entradas = 0;



    let saidas = 0;







    financeiro.forEach(

    function(movimento){



        if(movimento.tipo === "entrada"){



            entradas += Number(movimento.valor);



        }

        else{



            saidas += Number(movimento.valor);



        }



    });







    if(graficoEstoque){



        graficoEstoque.destroy();



    }







    if(graficoFinanceiro){



        graficoFinanceiro.destroy();



    }







    let estoqueCanvas =


    document.getElementById(

    "graficoEstoque"

    );







    if(estoqueCanvas){



        graficoEstoque = new Chart(

        estoqueCanvas,

        {



        type:"bar",



        data:{



            labels:

            nomesProdutos,



            datasets:[{

            label:

            "Estoque",



            data:

            quantidades



            }]



        }



        });



    }








    let financeiroCanvas =


    document.getElementById(

    "graficoFinanceiro"

    );







    if(financeiroCanvas){



        graficoFinanceiro = new Chart(

        financeiroCanvas,

        {



        type:"doughnut",



        data:{



            labels:[

            "Entradas",

            "Saídas"

            ],



            datasets:[{

            data:[

            entradas,

            saidas

            ]

            }]



        }



        });



    }



}
/* =====================================================
   GRÁFICO DE VENDAS
===================================================== */



function criarGraficoVendas(){



    let financeiro =

    buscarFinanceiro();







    let valores = [];



    let datas = [];







    financeiro.forEach(

    function(movimento){



        if(movimento.tipo === "entrada"){



            valores.push(

            movimento.valor

            );



            datas.push(

            movimento.data || "Sem data"

            );



        }



    });







    let canvas =


    document.getElementById(

    "graficoVendas"

    );







    if(!canvas){

        return;

    }







    if(graficoVendas){



        graficoVendas.destroy();



    }







    graficoVendas = new Chart(

    canvas,

    {



        type:"line",



        data:{



            labels:

            datas,



            datasets:[{




            label:

            "Vendas",





            data:

            valores





            }]



        }



    });



}








/* =====================================================
   ATUALIZAR INDICADORES DE DESEMPENHO
===================================================== */



function atualizarDesempenho(){



    let produtos =

    buscarProdutos();







    let campo =


    document.getElementById(

    "indicadoresRelatorio"

    );







    if(!campo){

        return;

    }







    let produtoDestaque =

    "--";







    if(produtos.length > 0){



        produtoDestaque =


        produtos[0].produto;



    }







    campo.innerHTML = `



    <div class="indicador-relatorio">


    <span>

    Produtos cadastrados

    </span>



    <strong>

    ${produtos.length}

    </strong>


    </div>







    <div class="indicador-relatorio">


    <span>

    Produto em destaque

    </span>



    <strong>

    ${produtoDestaque}

    </strong>


    </div>







    <div class="indicador-relatorio">


    <span>

    Sistema

    </span>



    <strong>

    Atualizado

    </strong>


    </div>



    `;



}








/* =====================================================
   INICIALIZAÇÃO DOS RELATÓRIOS
===================================================== */



document.addEventListener(

"DOMContentLoaded",



function(){



    atualizarIndicadores();



    carregarTabelaRelatorio();



    criarGraficos();



    criarGraficoVendas();



    atualizarDesempenho();



});
