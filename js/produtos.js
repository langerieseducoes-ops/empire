// ======================================
// EMPIRE ERP
// Módulo de Produtos
// ======================================


let produtos = JSON.parse(

    localStorage.getItem("produtos")

) || [];


let indiceEdicao = -1;



// ======================================
// Salvar Produtos
// ======================================

function salvarProdutos(){


    localStorage.setItem(

        "produtos",

        JSON.stringify(produtos)

    );


}



// ======================================
// Carregar Categorias
// ======================================

function carregarCategorias(){


    const select = document.getElementById(
        "categoria"
    );


    if(!select){

        return;

    }



    const categorias = JSON.parse(

        localStorage.getItem("categorias")

    ) || [];



    select.innerHTML = `

    <option value="">

    Selecione a categoria

    </option>

    `;



    categorias.forEach(categoria=>{


        select.innerHTML += `

        <option value="${categoria.nome}">

        ${categoria.nome}

        </option>

        `;


    });


}



// ======================================
// Adicionar Produto
// ======================================

function adicionarProduto(){


    const produto = {


        codigo:
        document.getElementById("codigo").value,


        produto:
        document.getElementById("produto").value,


        categoria:
        document.getElementById("categoria").value,


        tamanho:
        document.getElementById("tamanho").value,


        cor:
        document.getElementById("cor").value,


        custo:
        Number(document.getElementById("custo").value),


        venda:
        Number(document.getElementById("venda").value),


        quantidade:
        Number(document.getElementById("quantidade").value)


    };





    if(

        !produto.codigo ||

        !produto.produto ||

        !produto.categoria

    ){


        alert(

        "Preencha os campos obrigatórios."

        );


        return;


    }




    if(indiceEdicao === -1){


        produtos.push(produto);


    }else{


        produtos[indiceEdicao] = produto;


        indiceEdicao = -1;


    }





    salvarProdutos();


    listarProdutos();


    limparFormulario();


}





// ======================================
// Listar Produtos
// ======================================

function listarProdutos(){


    const tabela = document.getElementById(

        "listaProdutos"

    );



    if(!tabela){

        return;

    }



    tabela.innerHTML = "";



    const contador = document.getElementById(

        "contadorProdutos"

    );



    if(contador){

        contador.innerHTML = produtos.length;

    }





    produtos.forEach((p,index)=>{


        tabela.innerHTML += `


        <tr>


        <td>${p.codigo}</td>


        <td>${p.produto}</td>


        <td>${p.categoria}</td>


        <td>${p.tamanho}</td>


        <td>${p.cor}</td>


        <td>${p.quantidade}</td>


        <td>

        R$ ${Number(p.venda).toFixed(2)}

        </td>



        <td>


        <button onclick="editarProduto(${index})">

        ✏️

        </button>



        <button onclick="excluirProduto(${index})">

        🗑️

        </button>


        </td>


        </tr>


        `;


    });


}




// ======================================
// Editar Produto
// ======================================

function editarProduto(index){


    const p = produtos[index];



    document.getElementById("codigo").value =
    p.codigo;


    document.getElementById("produto").value =
    p.produto;


    document.getElementById("categoria").value =
    p.categoria;


    document.getElementById("tamanho").value =
    p.tamanho;


    document.getElementById("cor").value =
    p.cor;


    document.getElementById("custo").value =
    p.custo;


    document.getElementById("venda").value =
    p.venda;


    document.getElementById("quantidade").value =
    p.quantidade;



    indiceEdicao = index;


}




// ======================================
// Excluir Produto
// ======================================

function excluirProduto(index){


    if(confirm("Deseja excluir este produto?")){


        produtos.splice(

            index,

            1

        );


        salvarProdutos();


        listarProdutos();


    }


}





// ======================================
// Limpar Formulário
// ======================================

function limparFormulario(){


    document.getElementById("codigo").value = "";

    document.getElementById("produto").value = "";

    document.getElementById("categoria").value = "";

    document.getElementById("tamanho").value = "";

    document.getElementById("cor").value = "";

    document.getElementById("custo").value = "";

    document.getElementById("venda").value = "";

    document.getElementById("quantidade").value = "";


}




// ======================================
// Pesquisar Produto
// ======================================

function pesquisarProduto(){


    const texto = document.getElementById(

        "pesquisaProduto"

    ).value.toLowerCase();



    const tabela = document.getElementById(

        "listaProdutos"

    );



    tabela.innerHTML = "";



    produtos

    .filter(p =>


        p.produto.toLowerCase()

        .includes(texto)


        ||


        p.codigo.toLowerCase()

        .includes(texto)


    )


    .forEach((p,index)=>{


        tabela.innerHTML += `


        <tr>


        <td>${p.codigo}</td>


        <td>${p.produto}</td>


        <td>${p.categoria}</td>


        <td>${p.tamanho}</td>


        <td>${p.cor}</td>


        <td>${p.quantidade}</td>


        <td>

        R$ ${Number(p.venda).toFixed(2)}

        </td>



        <td>


        <button onclick="editarProduto(${index})">

        ✏️

        </button>



        <button onclick="excluirProduto(${index})">

        🗑️

        </button>


        </td>


        </tr>


        `;


    });


}



// ======================================
// Inicialização
// ======================================

carregarCategorias();

listarProdutos();
