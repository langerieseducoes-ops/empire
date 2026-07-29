// ======================================
// EMPIRE ERP
// Módulo de Compras
// Entrada de Estoque
// ======================================


let compras = JSON.parse(

    localStorage.getItem("compras")

) || [];




// ======================================
// Salvar Compras
// ======================================

function salvarCompras(){


    localStorage.setItem(

        "compras",

        JSON.stringify(compras)

    );


}




// ======================================
// Registrar Compra
// ======================================


function registrarCompra(){



    const produto =
    document.getElementById("produtoCompra").value;



    const fornecedor =
    document.getElementById("fornecedorCompra").value;



    const quantidade =
    Number(
        document.getElementById("quantidadeCompra").value
    );



    const valor =
    Number(
        document.getElementById("valorCompra").value
    );





    if(
        !produto ||
        !quantidade
    ){


        alert(
            "Preencha produto e quantidade."
        );


        return;


    }






    const novaCompra = {


        produto,

        fornecedor,

        quantidade,

        valor,

        data:
        new Date().toLocaleString("pt-BR")


    };





    compras.push(
        novaCompra
    );



    salvarCompras();



    atualizarEstoque(
        produto,
        quantidade
    );



    listarCompras();



    limparCompra();



}




// ======================================
// Atualizar Estoque
// ======================================


function atualizarEstoque(
    nomeProduto,
    quantidade
){



    let produtos = JSON.parse(

        localStorage.getItem("produtos")

    ) || [];




    let encontrado = produtos.find(

        p =>
        p.produto.toLowerCase() ===
        nomeProduto.toLowerCase()

    );





    if(encontrado){


        encontrado.quantidade =

        Number(encontrado.quantidade || 0)

        +

        Number(quantidade);



        localStorage.setItem(

            "produtos",

            JSON.stringify(produtos)

        );



    }else{


        alert(

        "Produto não encontrado no estoque. Cadastre primeiro em Produtos."

        );


    }



}




// ======================================
// Listar Compras
// ======================================


function listarCompras(){



    const tabela = document.getElementById(

        "listaCompras"

    );



    if(!tabela){

        return;

    }




    tabela.innerHTML = "";




    const contador = document.getElementById(

        "contadorCompras"

    );



    if(contador){


        contador.innerHTML =
        compras.length;


    }





    compras.forEach((c)=>{



        tabela.innerHTML += `


        <tr>


        <td>
        ${c.produto}
        </td>


        <td>
        ${c.fornecedor}
        </td>


        <td>
        ${c.quantidade}
        </td>


        <td>
        R$ ${c.valor.toFixed(2)}
        </td>


        <td>
        ${c.data}
        </td>


        </tr>


        `;



    });



}





// ======================================
// Limpar Formulário
// ======================================


function limparCompra(){



document.getElementById("produtoCompra").value = "";


document.getElementById("fornecedorCompra").value = "";


document.getElementById("quantidadeCompra").value = "";


document.getElementById("valorCompra").value = "";



}




// ======================================
// Inicialização
// ======================================


listarCompras();
