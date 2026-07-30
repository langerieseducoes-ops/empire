/* =====================================================
   EMPIRE ERP PREMIUM REMASTER v2.0

   COMPRAS.JS

   Controle de Entrada de Mercadorias

===================================================== */



let compras =


JSON.parse(

localStorage.getItem(

"compras"

)

)

||

[];






let produtosCompras =


JSON.parse(

localStorage.getItem(

"produtos"

)

)

||

[];








// =====================================================
// SALVAR COMPRAS
// =====================================================



function salvarCompras(){



    localStorage.setItem(

    "compras",

    JSON.stringify(

    compras

    )

    );



}








// =====================================================
// CARREGAR PRODUTOS NO SELECT
// =====================================================



function carregarProdutosCompra(){



    let select =


    document.getElementById(

    "produtoCompra"

    );






    if(!select){

        return;

    }






    select.innerHTML = `



    <option value="">


    Selecione o produto


    </option>



    `;







    produtosCompras.forEach(

    function(produto,index){



        select.innerHTML += `



        <option value="${index}">


        ${produto.produto}

        - Estoque:

        ${produto.quantidade}



        </option>



        `;



    });



}








// =====================================================
// REGISTRAR COMPRA
// =====================================================



function registrarCompra(){



    let fornecedor =


    document.getElementById(

    "fornecedorCompra"

    )

    .value;






    let produtoIndex =


    document.getElementById(

    "produtoCompra"

    )

    .value;






    let quantidade =


    Number(

    document.getElementById(

    "quantidadeCompra"

    )

    .value

    );






    let valor =


    Number(

    document.getElementById(

    "valorCompra"

    )

    .value

    );






    let data =


    document.getElementById(

    "dataCompra"

    )

    .value;






    if(

    produtoIndex === ""

    ||

    quantidade <=0

    ){



        alert(

        "Preencha os dados da compra"

        );



        return;



    }








    let produto =


    produtosCompras[produtoIndex];








    produto.quantidade += quantidade;






    localStorage.setItem(

    "produtos",

    JSON.stringify(

    produtosCompras

    )

    );







    let compra = {



        fornecedor,



        produto:

        produto.produto,



        quantidade,



        valor,



        data:



        data ||

        new Date()

        .toLocaleDateString("pt-BR"),



        status:

        "Finalizada"



    };







    compras.push(

    compra

    );







    salvarCompras();







    carregarCompras();




    atualizarResumoCompras();







    if(typeof registrarAtividade === "function"){



        registrarAtividade(

        "Entrada de mercadoria",

        "Compras"

        );



    }







    alert(

    "Compra registrada com sucesso!"

    );



}
/* =====================================================
   CARREGAR COMPRAS NA TABELA
===================================================== */



function carregarCompras(){



    let tabela =


    document.getElementById(

    "listaCompras"

    );






    if(!tabela){

        return;

    }






    tabela.innerHTML = "";







    if(compras.length === 0){



        tabela.innerHTML = `



        <tr>


        <td colspan="7">


        Nenhuma compra registrada


        </td>


        </tr>



        `;



        return;



    }







    compras.forEach(

    function(item,index){



        tabela.innerHTML += `



        <tr class="compra-item">



        <td>

        ${item.fornecedor || "-"}

        </td>





        <td>

        ${item.produto}

        </td>





        <td>

        ${item.quantidade}

        </td>





        <td>

        R$ ${

        Number(item.valor)

        .toFixed(2)

        }

        </td>





        <td>

        ${item.data}

        </td>





        <td>


        <span class="compra-finalizada">

        ${item.status}

        </span>


        </td>





        <td>



        <button

        class="btn-compra btn-excluir-compra"

        onclick="excluirCompra(${index})">


        🗑


        </button>



        </td>





        </tr>



        `;



    });



}








/* =====================================================
   PESQUISAR COMPRA
===================================================== */



function pesquisarCompra(){



    let busca =


    document.getElementById(

    "pesquisaCompra"

    )

    .value

    .toLowerCase();






    let linhas =


    document.querySelectorAll(

    "#listaCompras tr"

    );







    linhas.forEach(

    function(linha){



        let texto =


        linha.innerText

        .toLowerCase();







        if(

        texto.includes(busca)

        ){



            linha.style.display = "";



        }

        else{



            linha.style.display =

            "none";



        }



    });



}








/* =====================================================
   EXCLUIR COMPRA
===================================================== */



function excluirCompra(index){



    let confirmar =


    confirm(

    "Deseja excluir esta compra?"

    );







    if(!confirmar){

        return;

    }






    compras.splice(

    index,

    1

    );







    salvarCompras();






    carregarCompras();





    atualizarResumoCompras();





}
/* =====================================================
   ATUALIZAR RESUMO DAS COMPRAS
===================================================== */



function atualizarResumoCompras(){



    let total =

    compras.length;





    let itens = 0;



    let valor = 0;







    compras.forEach(

    function(item){



        itens +=

        Number(item.quantidade)

        ||

        0;





        valor +=

        Number(item.valor)

        *

        Number(item.quantidade);



    });







    let campoTotal =


    document.getElementById(

    "totalCompras"

    );







    let campoItens =


    document.getElementById(

    "itensRecebidos"

    );







    let campoValor =


    document.getElementById(

    "valorCompras"

    );







    let campoUltima =


    document.getElementById(

    "ultimaCompra"

    );








    if(campoTotal){



        campoTotal.innerText =

        total;



    }







    if(campoItens){



        campoItens.innerText =

        itens;



    }







    if(campoValor){



        campoValor.innerText =


        "R$ " +

        valor.toFixed(2);



    }







    if(campoUltima && compras.length){



        campoUltima.innerText =


        compras[

        compras.length - 1

        ]

        .data;



    }



}








/* =====================================================
   CARREGAR FORNECEDORES
===================================================== */



function carregarFornecedoresCompra(){



    let select =


    document.getElementById(

    "fornecedorCompra"

    );






    if(!select){

        return;

    }







    let fornecedores =


    JSON.parse(

    localStorage.getItem(

    "fornecedores"

    )

    )

    ||

    [];






    fornecedores.forEach(

    function(item){



        select.innerHTML += `



        <option>


        ${item.nome || item}


        </option>



        `;



    });



}








/* =====================================================
   INICIALIZAÇÃO
===================================================== */



document.addEventListener(

"DOMContentLoaded",



function(){



    carregarProdutosCompra();



    carregarFornecedoresCompra();



    carregarCompras();



    atualizarResumoCompras();



});
