/* =====================================================
   EMPIRE ERP PREMIUM REMASTER v2.0

   PRODUTOS.JS

   Controle de Estoque

===================================================== */



let produtos =


JSON.parse(

localStorage.getItem(

"produtos"

)

)

||

[];





let indiceEdicao = -1;







// =====================================================
// GERAR CÓDIGO AUTOMÁTICO
// =====================================================



function gerarCodigoProduto(){



    let numero =


    produtos.length + 1;





    return "EMP-" +

    String(numero)

    .padStart(5,"0");



}








// =====================================================
// LIMPAR FORMULÁRIO
// =====================================================



function limparFormulario(){



    document.getElementById(

    "codigo"

    ).value = "";





    document.getElementById(

    "produto"

    ).value = "";





    document.getElementById(

    "categoria"

    ).value = "";





    document.getElementById(

    "tamanho"

    ).value = "";





    document.getElementById(

    "cor"

    ).value = "";





    document.getElementById(

    "custo"

    ).value = "";





    document.getElementById(

    "venda"

    ).value = "";





    document.getElementById(

    "quantidade"

    ).value = "";






    indiceEdicao = -1;



}







// =====================================================
// SALVAR PRODUTOS
// =====================================================



function salvarProdutos(){



    localStorage.setItem(

    "produtos",

    JSON.stringify(

    produtos

    )

    );



}







// =====================================================
// ADICIONAR PRODUTO
// =====================================================



function adicionarProduto(){



    let codigo =


    document.getElementById(

    "codigo"

    ).value.trim();






    let nome =


    document.getElementById(

    "produto"

    ).value.trim();






    let categoria =


    document.getElementById(

    "categoria"

    ).value;






    let tamanho =


    document.getElementById(

    "tamanho"

    ).value;






    let cor =


    document.getElementById(

    "cor"

    ).value;






    let custo =


    Number(

    document.getElementById(

    "custo"

    ).value

    );






    let venda =


    Number(

    document.getElementById(

    "venda"

    ).value

    );






    let quantidade =


    Number(

    document.getElementById(

    "quantidade"

    ).value

    );







    if(!nome){



        alert(

        "Digite o nome do produto"

        );



        return;



    }







    if(!codigo){



        codigo =

        gerarCodigoProduto();



    }





    let produto = {



        codigo,



        produto:

        nome,



        categoria,



        tamanho,



        cor,



        custo,



        venda,



        quantidade,



        data:

        new Date()

        .toLocaleString("pt-BR")



    };






    if(indiceEdicao === -1){



        produtos.push(

        produto

        );



    }

    else{



        produtos[indiceEdicao] =

        produto;



    }







    salvarProdutos();




    limparFormulario();




    carregarProdutos();



    atualizarResumoProdutos();




    if(typeof registrarAtividade === "function"){



        registrarAtividade(

        "Produto cadastrado",

        "Produtos"

        );



    }



}
/* =====================================================
   CARREGAR PRODUTOS NA TABELA
===================================================== */



function carregarProdutos(){



    let tabela =


    document.getElementById(

    "listaProdutos"

    );






    if(!tabela){

        return;

    }






    tabela.innerHTML = "";







    if(produtos.length === 0){



        tabela.innerHTML = `



        <tr>


        <td colspan="10">


        Nenhum produto cadastrado


        </td>


        </tr>



        `;



        return;



    }








    produtos.forEach(

    function(item,index){



        let status =



        Number(item.quantidade) <= 5



        ?



        `<span class="estoque-baixo">

        Baixo

        </span>`



        :



        `<span class="estoque-normal">

        Normal

        </span>`;








        tabela.innerHTML += `



        <tr class="produto-item">



        <td>


        <div class="sem-imagem">

        📦

        </div>


        </td>





        <td>

        ${item.codigo}

        </td>





        <td>

        ${item.produto}

        </td>





        <td>

        ${item.categoria || "-"}

        </td>





        <td>

        ${item.tamanho || "-"}

        </td>





        <td>

        ${item.cor || "-"}

        </td>





        <td>

        ${item.quantidade}

        </td>





        <td>

        R$ ${

        Number(item.venda)

        .toFixed(2)

        }

        </td>





        <td>

        ${status}

        </td>





        <td>


        <div class="produto-acoes">



        <button

        class="btn-produto btn-editar-produto"

        onclick="editarProduto(${index})">

        ✏

        </button>





        <button

        class="btn-produto btn-excluir-produto"

        onclick="excluirProduto(${index})">

        🗑

        </button>



        </div>



        </td>





        </tr>



        `;



    });



}









/* =====================================================
   EDITAR PRODUTO
===================================================== */



function editarProduto(index){



    let produto =


    produtos[index];






    document.getElementById(

    "codigo"

    ).value = produto.codigo;






    document.getElementById(

    "produto"

    ).value = produto.produto;






    document.getElementById(

    "categoria"

    ).value = produto.categoria;






    document.getElementById(

    "tamanho"

    ).value = produto.tamanho;






    document.getElementById(

    "cor"

    ).value = produto.cor;






    document.getElementById(

    "custo"

    ).value = produto.custo;






    document.getElementById(

    "venda"

    ).value = produto.venda;






    document.getElementById(

    "quantidade"

    ).value = produto.quantidade;






    indiceEdicao = index;





    window.scrollTo(

    {

        top:0,

        behavior:"smooth"

    }

    );



}







/* =====================================================
   EXCLUIR PRODUTO
===================================================== */



function excluirProduto(index){



    let confirmar =


    confirm(

    "Deseja excluir este produto?"

    );






    if(!confirmar){

        return;

    }







    produtos.splice(

    index,

    1

    );







    salvarProdutos();





    carregarProdutos();





    atualizarResumoProdutos();






    if(typeof registrarAtividade === "function"){



        registrarAtividade(

        "Produto excluído",

        "Produtos"

        );



    }



}
/* =====================================================
   PESQUISAR PRODUTO
===================================================== */



function pesquisarProduto(){



    let busca =


    document.getElementById(

    "pesquisaProduto"

    )

    .value

    .toLowerCase();






    let linhas =


    document.querySelectorAll(

    "#listaProdutos tr"

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
   ATUALIZAR RESUMO DOS PRODUTOS
===================================================== */



function atualizarResumoProdutos(){



    let estoque = 0;



    let valor = 0;



    let baixos = 0;







    produtos.forEach(

    function(item){



        let qtd =


        Number(item.quantidade)

        ||

        0;





        estoque += qtd;





        valor +=


        qtd *

        Number(item.custo || 0);






        if(qtd <= 5){



            baixos++;



        }



    });







    let total =


    document.getElementById(

    "totalProdutos"

    );





    let totalEstoque =


    document.getElementById(

    "totalEstoque"

    );





    let valorEstoque =


    document.getElementById(

    "valorEstoque"

    );





    let produtosBaixos =


    document.getElementById(

    "produtosBaixos"

    );







    if(total){


        total.innerText =

        produtos.length;



    }







    if(totalEstoque){


        totalEstoque.innerText =

        estoque;



    }







    if(valorEstoque){


        valorEstoque.innerText =


        "R$ " +

        valor.toFixed(2);



    }







    if(produtosBaixos){


        produtosBaixos.innerText =

        baixos;



    }






    carregarAlertasEstoque();



}








/* =====================================================
   ALERTAS DE ESTOQUE
===================================================== */



function carregarAlertasEstoque(){



    let area =


    document.getElementById(

    "alertasEstoque"

    );






    if(!area){

        return;

    }






    area.innerHTML = "";







    let baixos =


    produtos.filter(

    function(item){



        return Number(

        item.quantidade

        )

        <=5;



    });







    if(baixos.length === 0){



        area.innerHTML = `



        <div class="alerta-estoque">


        ✔ Estoque saudável


        </div>



        `;



        return;



    }







    baixos.forEach(

    function(item){



        area.innerHTML += `



        <div class="alerta-estoque">


        ⚠ ${item.produto}

        possui apenas

        ${item.quantidade}

        unidades



        </div>



        `;



    });



}







/* =====================================================
   INICIAR PRODUTOS
===================================================== */



document.addEventListener(

"DOMContentLoaded",



function(){



    carregarProdutos();



    atualizarResumoProdutos();



});
