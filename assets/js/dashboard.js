/* =====================================================
   EMPIRE ERP PREMIUM REMASTER v2.0

   DASHBOARD.JS

   Controle do Painel Principal

===================================================== */



// =====================================================
// CARREGAR PRODUTOS
// =====================================================


function carregarProdutosDashboard(){



    let produtos =


    JSON.parse(

    localStorage.getItem(

    "produtos"

    )

    )

    ||

    [];





    let totalProdutos =


    document.getElementById(

    "totalProdutos"

    );





    let totalEstoque =


    document.getElementById(

    "totalEstoque"

    );






    if(totalProdutos){


        totalProdutos.innerText =

        produtos.length;



    }






    let quantidade = 0;





    produtos.forEach(

    function(produto){



        quantidade +=

        Number(

        produto.quantidade

        )

        ||

        0;



    });







    if(totalEstoque){


        totalEstoque.innerText =

        quantidade;



    }



}







// =====================================================
// CARREGAR VENDAS
// =====================================================



function carregarVendasDashboard(){



    let vendas =


    JSON.parse(

    localStorage.getItem(

    "vendas"

    )

    )

    ||

    [];





    let vendasHoje = 0;



    let faturamento = 0;






    let hoje =


    new Date()

    .toLocaleDateString(

    "pt-BR"

    );







    vendas.forEach(

    function(venda){



        let dataVenda =


        new Date(

        venda.data

        )

        .toLocaleDateString(

        "pt-BR"

        );






        if(

        dataVenda === hoje

        ){



            vendasHoje +=


            Number(

            venda.valor

            )

            ||

            0;



        }






        faturamento +=


        Number(

        venda.valor

        )

        ||

        0;



    });






    let elementoVenda =


    document.getElementById(

    "vendasHoje"

    );





    let elementoFaturamento =


    document.getElementById(

    "faturamento"

    );






    if(elementoVenda){


        elementoVenda.innerText =


        "R$ " +

        vendasHoje.toFixed(2);



    }







    if(elementoFaturamento){


        elementoFaturamento.innerText =


        "R$ " +

        faturamento.toFixed(2);



    }



}







// =====================================================
// USUÁRIOS ONLINE
// =====================================================



function carregarUsuariosOnline(){



    let usuarios =


    JSON.parse(

    localStorage.getItem(

    "usuarios"

    )

    )

    ||

    [];






    let online = 1;





    usuarios.forEach(

    function(usuario){



        if(

        usuario.status ===

        "online"

        ){



            online++;



        }



    });






    let campo =


    document.getElementById(

    "usuariosOnline"

    );






    if(campo){


        campo.innerText =

        online;



    }



}
/* =====================================================
   ÚLTIMAS VENDAS
===================================================== */



function carregarUltimasVendas(){



    let vendas =


    JSON.parse(

    localStorage.getItem(

    "vendas"

    )

    )

    ||

    [];






    let tabela =


    document.getElementById(

    "ultimasVendas"

    );






    if(!tabela){

        return;

    }





    tabela.innerHTML = "";





    let lista =

    vendas.slice(-5)

    .reverse();






    if(lista.length === 0){



        tabela.innerHTML = `

        <tr>

        <td colspan="3">

        Nenhuma venda registrada

        </td>

        </tr>

        `;



        return;



    }






    lista.forEach(

    function(venda){



        tabela.innerHTML += `



        <tr>


        <td>

        ${venda.cliente || "Cliente"}

        </td>



        <td>

        ${venda.produto || "Produto"}

        </td>



        <td>

        R$ ${

        Number(venda.valor || 0)

        .toFixed(2)

        }

        </td>



        </tr>



        `;



    });



}









/* =====================================================
   ESTOQUE BAIXO
===================================================== */



function carregarEstoqueBaixo(){



    let produtos =


    JSON.parse(

    localStorage.getItem(

    "produtos"

    )

    )

    ||

    [];






    let tabela =


    document.getElementById(

    "estoqueBaixo"

    );






    if(!tabela){

        return;

    }





    tabela.innerHTML = "";





    let alerta =

    produtos.filter(

    function(produto){



        return Number(

        produto.quantidade

        )

        <= 5;



    });







    if(alerta.length === 0){



        tabela.innerHTML = `


        <tr>


        <td colspan="2">


        Nenhum alerta de estoque


        </td>


        </tr>



        `;



        return;



    }








    alerta.forEach(

    function(produto){



        tabela.innerHTML += `


        <tr>


        <td>

        ${produto.produto}

        </td>



        <td>

        <span class="badge red">

        ${produto.quantidade}

        unidades

        </span>


        </td>



        </tr>



        `;



    });



}









/* =====================================================
   ATIVIDADES DO SISTEMA
===================================================== */



function carregarAtividades(){



    let atividades =


    JSON.parse(

    localStorage.getItem(

    "monitoramento"

    )

    )

    ||

    [];






    let area =


    document.getElementById(

    "atividadesSistema"

    );






    if(!area){

        return;

    }





    area.innerHTML = "";






    let lista =

    atividades.slice(-5)

    .reverse();







    if(lista.length === 0){



        area.innerHTML = `


        <div class="alert alert-warning">

        Nenhuma atividade registrada

        </div>


        `;



        return;



    }







    lista.forEach(

    function(item){



        area.innerHTML += `


        <div class="alert alert-success">


        ✔ ${item.acao}

        <br>


        <small>

        ${item.usuario}

        - ${item.data}

        </small>


        </div>



        `;



    });



}
/* =====================================================
   RELÓGIO DO SISTEMA
===================================================== */



function atualizarRelogio(){



    let relogio =

    document.getElementById(

    "relogioSistema"

    );





    if(!relogio){

        return;

    }






    relogio.innerText =


    new Date()

    .toLocaleString(

    "pt-BR"

    );



}







/* =====================================================
   ATUALIZAR DASHBOARD COMPLETO
===================================================== */



function atualizarDashboard(){



    carregarProdutosDashboard();



    carregarVendasDashboard();



    carregarUsuariosOnline();



    carregarUltimasVendas();



    carregarEstoqueBaixo();



    carregarAtividades();



}








/* =====================================================
   INICIAR DASHBOARD
===================================================== */



document.addEventListener(

"DOMContentLoaded",



function(){



    atualizarDashboard();



    atualizarRelogio();





    setInterval(

    atualizarDashboard,

    10000

    );





    setInterval(

    atualizarRelogio,

    1000

    );



}

);
