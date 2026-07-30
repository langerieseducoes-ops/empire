/* =====================================================
   EMPIRE ERP PREMIUM REMASTER v2.0

   VENDAS.JS

   Controle de Vendas e Faturamento

===================================================== */



let vendas =


JSON.parse(

localStorage.getItem(

"vendas"

)

)

||

[];






let produtosVendas =


JSON.parse(

localStorage.getItem(

"produtos"

)

)

||

[];






// =====================================================
// SALVAR VENDAS
// =====================================================



function salvarVendas(){



    localStorage.setItem(

    "vendas",

    JSON.stringify(

    vendas

    )

    );



}








// =====================================================
// CARREGAR PRODUTOS PARA VENDA
// =====================================================



function carregarProdutosVenda(){



    let select =


    document.getElementById(

    "produtoVenda"

    );






    if(!select){

        return;

    }







    select.innerHTML = `



    <option value="">


    Selecione o produto


    </option>



    `;







    produtosVendas.forEach(

    function(produto,index){



        if(produto.quantidade > 0){



            select.innerHTML += `



            <option value="${index}">


            ${produto.produto}

            |

            Estoque:

            ${produto.quantidade}



            </option>



            `;



        }



    });



}








// =====================================================
// REGISTRAR VENDA
===================================================== */



function registrarVenda(){



    let cliente =


    document.getElementById(

    "clienteVenda"

    )

    .value;






    let produtoIndex =


    document.getElementById(

    "produtoVenda"

    )

    .value;






    let quantidade =


    Number(

    document.getElementById(

    "quantidadeVenda"

    )

    .value

    );






    let pagamento =


    document.getElementById(

    "pagamentoVenda"

    )

    .value;






    let data =


    document.getElementById(

    "dataVenda"

    )

    .value;








    if(

    produtoIndex === ""

    ||

    quantidade <=0

    ){



        alert(

        "Informe produto e quantidade"

        );



        return;



    }







    let produto =


    produtosVendas[produtoIndex];








    if(

    produto.quantidade < quantidade

    ){



        alert(

        "Estoque insuficiente"

        );



        return;



    }








    produto.quantidade -= quantidade;







    localStorage.setItem(

    "produtos",

    JSON.stringify(

    produtosVendas

    )

    );








    let total =


    produto.venda *

    quantidade;








    let venda = {



        cliente,



        produto:

        produto.produto,



        quantidade,



        total,



        pagamento,



        data:



        data ||

        new Date()

        .toLocaleDateString("pt-BR"),



        status:

        "Finalizada"



    };








    vendas.push(

    venda

    );








    salvarVendas();







    carregarVendas();



    atualizarResumoVendas();







    if(typeof registrarAtividade === "function"){



        registrarAtividade(

        "Venda realizada",

        "Vendas"

        );



    }







    alert(

    "Venda realizada com sucesso!"

    );



}
/* =====================================================
   CARREGAR VENDAS NA TABELA
===================================================== */



function carregarVendas(){



    let tabela =


    document.getElementById(

    "listaVendas"

    );






    if(!tabela){

        return;

    }






    tabela.innerHTML = "";







    if(vendas.length === 0){



        tabela.innerHTML = `



        <tr>


        <td colspan="8">


        Nenhuma venda registrada


        </td>


        </tr>



        `;



        return;



    }







    vendas.forEach(

    function(item,index){



        tabela.innerHTML += `



        <tr class="venda-item">



        <td>

        ${item.cliente || "-"}

        </td>





        <td>

        ${item.produto}

        </td>





        <td>

        ${item.quantidade}

        </td>





        <td>

        R$ ${

        Number(item.total)

        .toFixed(2)

        }

        </td>





        <td>

        <span class="pagamento-ok">

        ${item.pagamento}

        </span>

        </td>





        <td>

        ${item.data}

        </td>





        <td>

        <span class="pagamento-ok">

        ${item.status}

        </span>

        </td>







        <td>



        <button

        class="btn-venda btn-excluir-venda"

        onclick="excluirVenda(${index})">


        🗑


        </button>



        </td>





        </tr>



        `;



    });



}








/* =====================================================
   PESQUISAR VENDA
===================================================== */



function pesquisarVenda(){



    let busca =


    document.getElementById(

    "pesquisaVenda"

    )

    .value

    .toLowerCase();







    let linhas =


    document.querySelectorAll(

    "#listaVendas tr"

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
   EXCLUIR VENDA
===================================================== */



function excluirVenda(index){



    let confirmar =


    confirm(

    "Deseja excluir esta venda?"

    );






    if(!confirmar){

        return;

    }






    vendas.splice(

    index,

    1

    );






    salvarVendas();






    carregarVendas();





    atualizarResumoVendas();





}
/* =====================================================
   ATUALIZAR RESUMO DE VENDAS
===================================================== */



function atualizarResumoVendas(){



    let total =

    vendas.length;





    let itens = 0;



    let faturamento = 0;







    vendas.forEach(

    function(item){



        itens +=

        Number(item.quantidade)

        ||

        0;





        faturamento +=

        Number(item.total)

        ||

        0;



    });







    let campoTotal =


    document.getElementById(

    "totalVendas"

    );







    let campoItens =


    document.getElementById(

    "itensVendidos"

    );







    let campoFaturamento =


    document.getElementById(

    "faturamento"

    );







    let campoUltima =


    document.getElementById(

    "ultimaVenda"

    );







    if(campoTotal){



        campoTotal.innerText =

        total;



    }







    if(campoItens){



        campoItens.innerText =

        itens;



    }







    if(campoFaturamento){



        campoFaturamento.innerText =


        "R$ " +

        faturamento.toFixed(2);



    }







    if(campoUltima && vendas.length){



        campoUltima.innerText =


        vendas[

        vendas.length - 1

        ]

        .data;



    }



}








/* =====================================================
   CARREGAR CLIENTES
===================================================== */



function carregarClientesVenda(){



    let select =


    document.getElementById(

    "clienteVenda"

    );






    if(!select){

        return;

    }







    let clientes =


    JSON.parse(

    localStorage.getItem(

    "clientes"

    )

    )

    ||

    [];







    clientes.forEach(

    function(cliente){



        select.innerHTML += `



        <option>


        ${cliente.nome || cliente}


        </option>



        `;



    });



}








/* =====================================================
   CARRINHO VISUAL
===================================================== */



function atualizarCarrinho(){



    let area =


    document.getElementById(

    "listaCarrinho"

    );






    let total =


    document.getElementById(

    "totalCarrinho"

    );






    if(!area){

        return;

    }






    area.innerHTML = `



    <div class="item-carrinho">


    Venda pronta para finalização


    </div>



    `;






    if(total){



        total.innerText =


        "R$ 0,00";



    }



}








/* =====================================================
   INICIALIZAÇÃO
===================================================== */



document.addEventListener(

"DOMContentLoaded",



function(){



    carregarProdutosVenda();



    carregarClientesVenda();



    carregarVendas();



    atualizarResumoVendas();



    atualizarCarrinho();



});
