/* =====================================================
   EMPIRE ERP PREMIUM REMASTER v2.0

   CATEGORIAS.JS

   Controle de Categorias

===================================================== */



let categorias =


JSON.parse(

localStorage.getItem(

"categorias"

)

)

||

[];






let categoriaEditando = -1;








// =====================================================
// SALVAR CATEGORIAS
// =====================================================



function salvarCategorias(){



    localStorage.setItem(

    "categorias",

    JSON.stringify(

    categorias

    )

    );



}








// =====================================================
// SALVAR NOVA CATEGORIA
// =====================================================



function salvarCategoria(){



    let nome =


    document.getElementById(

    "nomeCategoria"

    )

    .value;






    let descricao =


    document.getElementById(

    "descricaoCategoria"

    )

    .value;






    let codigo =


    document.getElementById(

    "codigoCategoria"

    )

    .value;






    let status =


    document.getElementById(

    "statusCategoria"

    )

    .value;








    if(!nome){



        alert(

        "Informe o nome da categoria"

        );



        return;



    }








    let categoria = {



        nome,



        descricao,



        codigo,



        status,



        produtos:

        0



    };








    if(categoriaEditando === -1){



        categorias.push(

        categoria

        );



    }

    else{



        categorias[

        categoriaEditando

        ] = categoria;



        categoriaEditando = -1;



    }








    salvarCategorias();







    carregarCategorias();



    atualizarResumoCategorias();



    limparCategoria();








    if(typeof registrarAtividade === "function"){



        registrarAtividade(

        "Categoria cadastrada",

        "Categorias"

        );



    }







    alert(

    "Categoria salva com sucesso!"

    );



}








// =====================================================
// LIMPAR FORMULÁRIO
// =====================================================



function limparCategoria(){



    let campos = [



    "nomeCategoria",



    "descricaoCategoria",



    "codigoCategoria"



    ];







    campos.forEach(

    function(id){



        let campo =


        document.getElementById(id);







        if(campo){



            campo.value = "";



        }



    });



}
/* =====================================================
   CARREGAR CATEGORIAS NA TABELA
===================================================== */



function carregarCategorias(){



    let tabela =


    document.getElementById(

    "listaCategorias"

    );






    if(!tabela){

        return;

    }






    tabela.innerHTML = "";







    if(categorias.length === 0){



        tabela.innerHTML = `



        <tr>


        <td colspan="6">


        Nenhuma categoria cadastrada


        </td>


        </tr>



        `;



        return;



    }







    categorias.forEach(

    function(categoria,index){



        let classeStatus =


        categoria.status === "Ativa"

        ?

        "categoria-ativa"

        :

        "categoria-inativa";







        tabela.innerHTML += `



        <tr class="categoria-item">



        <td>

        ${categoria.nome}

        </td>





        <td>

        ${categoria.codigo || "-"}

        </td>





        <td>

        ${categoria.descricao || "-"}

        </td>





        <td>

        ${categoria.produtos}

        </td>





        <td>


        <span class="${classeStatus}">


        ${categoria.status}


        </span>


        </td>





        <td>



        <button

        class="btn-categoria"

        onclick="editarCategoria(${index})">


        ✏


        </button>





        <button

        class="btn-categoria btn-excluir-categoria"

        onclick="excluirCategoria(${index})">


        🗑


        </button>



        </td>





        </tr>



        `;



    });



}








/* =====================================================
   PESQUISAR CATEGORIA
===================================================== */



function pesquisarCategoria(){



    let busca =


    document.getElementById(

    "pesquisaCategoria"

    )

    .value

    .toLowerCase();







    let linhas =


    document.querySelectorAll(

    "#listaCategorias tr"

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
   EDITAR CATEGORIA
===================================================== */



function editarCategoria(index){



    let categoria =


    categorias[index];







    document.getElementById(

    "nomeCategoria"

    ).value = categoria.nome;






    document.getElementById(

    "descricaoCategoria"

    ).value = categoria.descricao;






    document.getElementById(

    "codigoCategoria"

    ).value = categoria.codigo;






    document.getElementById(

    "statusCategoria"

    ).value = categoria.status;






    categoriaEditando = index;







    window.scrollTo({

        top:0,

        behavior:"smooth"

    });



}








/* =====================================================
   EXCLUIR CATEGORIA
===================================================== */



function excluirCategoria(index){



    let confirmar =


    confirm(

    "Deseja excluir esta categoria?"

    );







    if(!confirmar){

        return;

    }







    categorias.splice(

    index,

    1

    );







    salvarCategorias();






    carregarCategorias();





    atualizarResumoCategorias();



}
/* =====================================================
   ATUALIZAR RESUMO DAS CATEGORIAS
===================================================== */



function atualizarResumoCategorias(){



    let total =

    categorias.length;





    let ativas = 0;



    let produtos = 0;







    categorias.forEach(

    function(categoria){



        if(categoria.status === "Ativa"){



            ativas++;



        }







        produtos +=


        Number(categoria.produtos)

        ||

        0;



    });







    let campoTotal =


    document.getElementById(

    "totalCategorias"

    );







    let campoAtivas =


    document.getElementById(

    "categoriasAtivas"

    );







    let campoProdutos =


    document.getElementById(

    "produtosCategoria"

    );







    let campoUltima =


    document.getElementById(

    "ultimaCategoria"

    );







    if(campoTotal){



        campoTotal.innerText =

        total;



    }







    if(campoAtivas){



        campoAtivas.innerText =

        ativas;



    }







    if(campoProdutos){



        campoProdutos.innerText =

        produtos;



    }







    if(campoUltima && categorias.length){



        campoUltima.innerText =


        categorias[

        categorias.length - 1

        ]

        .nome;



    }



}








/* =====================================================
   PRODUTOS DA CATEGORIA
===================================================== */



function mostrarProdutosCategoria(index){



    let area =


    document.getElementById(

    "produtosCategoriaLista"

    );







    if(!area){

        return;

    }







    let categoria =


    categorias[index];







    area.innerHTML = `



    <div class="item-produto-categoria">


    Categoria:

    ${categoria.nome}


    </div>





    <div class="item-produto-categoria">


    Produtos vinculados:

    ${categoria.produtos}


    </div>



    `;



}








/* =====================================================
   INICIALIZAÇÃO
===================================================== */



document.addEventListener(

"DOMContentLoaded",



function(){



    carregarCategorias();



    atualizarResumoCategorias();



});
