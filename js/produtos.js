// ======================================
// EMPIRE ERP
// Módulo de Produtos
// ======================================



let produtos = JSON.parse(

    localStorage.getItem("produtos")

) || [];



let indiceEdicao = -1;




// ======================================
// Salvar no LocalStorage
// ======================================


function salvarProdutos(){


    localStorage.setItem(

        "produtos",

        JSON.stringify(produtos)

    );


}




// ======================================
// Adicionar Produto
// ======================================


function adicionarProduto(){


    const codigo =
    document.getElementById("codigo").value;


    const produto =
    document.getElementById("produto").value;


    const categoria =
    document.getElementById("categoria").value;


    const tamanho =
    document.getElementById("tamanho").value;


    const cor =
    document.getElementById("cor").value;


    const custo =
    Number(document.getElementById("custo").value);


    const venda =
    Number(document.getElementById("venda").value);


    const quantidade =
    Number(document.getElementById("quantidade").value);




    if(
        !codigo ||
        !produto ||
        !categoria
    ){


        alert(
            "Preencha os campos obrigatórios."
        );


        return;


    }




    const novoProduto = {


        codigo,

        produto,

        categoria,

        tamanho,

        cor,

        custo,

        venda,

        quantidade


    };





    if(indiceEdicao === -1){


        produtos.push(
            novoProduto
        );


    }else{


        produtos[indiceEdicao] =
        novoProduto;


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


    const tabela =
    document.getElementById(
        "listaProdutos"
    );



    if(!tabela){

        return;

    }



    tabela.innerHTML = "";




    produtos.forEach(

        (p,index)=>{


        tabela.innerHTML += `


        <tr>


        <td>${p.codigo}</td>


        <td>${p.produto}</td>


        <td>${p.categoria}</td>


        <td>${p.tamanho}</td>


        <td>${p.cor}</td>


        <td>${p.quantidade}</td>


        <td>
        R$ ${p.venda.toFixed(2)}
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


    codigo.value =
    p.codigo;


    produto.value =
    p.produto;


    categoria.value =
    p.categoria;


    tamanho.value =
    p.tamanho;


    cor.value =
    p.cor;


    custo.value =
    p.custo;


    venda.value =
    p.venda;


    quantidade.value =
    p.quantidade;



    indiceEdicao = index;


}




// ======================================
// Excluir Produto
// ======================================


function excluirProduto(index){


    if(
        confirm(
            "Deseja excluir este produto?"
        )
    ){


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


    codigo.value = "";

    produto.value = "";

    categoria.value = "";

    tamanho.value = "";

    cor.value = "";

    custo.value = "";

    venda.value = "";

    quantidade.value = "";


}




// ======================================
// Inicialização
// ======================================


listarProdutos();
