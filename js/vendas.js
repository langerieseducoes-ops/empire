// ======================================
// EMPIRE ERP
// Módulo de Vendas
// Saída de Estoque
// ======================================


let vendas = JSON.parse(

    localStorage.getItem("vendas")

) || [];




// ======================================
// Salvar Vendas
// ======================================

function salvarVendas(){


    localStorage.setItem(

        "vendas",

        JSON.stringify(vendas)

    );


}





// ======================================
// Registrar Venda
// ======================================


function registrarVenda(){



    const produto =
    document.getElementById("produtoVenda").value;



    const cliente =
    document.getElementById("clienteVenda").value;



    const quantidade =
    Number(
        document.getElementById("quantidadeVenda").value
    );



    const valor =
    Number(
        document.getElementById("valorVenda").value
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





    const sucesso = baixarEstoque(

        produto,

        quantidade

    );




    if(!sucesso){

        return;

    }





    const novaVenda = {


        produto,

        cliente,

        quantidade,

        valor,

        data:
        new Date().toLocaleString("pt-BR")


    };





    vendas.push(

        novaVenda

    );



    salvarVendas();



    listarVendas();



    limparVenda();



}





// ======================================
// Baixar Estoque
// ======================================


function baixarEstoque(

    nomeProduto,

    quantidade

){



    let produtos = JSON.parse(

        localStorage.getItem("produtos")

    ) || [];





    let produtoEncontrado = produtos.find(

        p =>

        p.produto.toLowerCase() ===

        nomeProduto.toLowerCase()

    );





    if(!produtoEncontrado){


        alert(

        "Produto não encontrado no estoque."

        );


        return false;


    }





    if(

        Number(produtoEncontrado.quantidade)

        <

        Number(quantidade)

    ){


        alert(

        "Estoque insuficiente."

        );


        return false;


    }





    produtoEncontrado.quantidade =

    Number(produtoEncontrado.quantidade)

    -

    Number(quantidade);





    localStorage.setItem(

        "produtos",

        JSON.stringify(produtos)

    );




    return true;



}





// ======================================
// Listar Vendas
// ======================================


function listarVendas(){



    const tabela = document.getElementById(

        "listaVendas"

    );



    if(!tabela){

        return;

    }





    tabela.innerHTML = "";





    const contador = document.getElementById(

        "contadorVendas"

    );



    if(contador){


        contador.innerHTML =

        vendas.length;


    }






    vendas.forEach((v)=>{



        tabela.innerHTML += `


        <tr>


        <td>
        ${v.produto}
        </td>


        <td>
        ${v.cliente}
        </td>


        <td>
        ${v.quantidade}
        </td>


        <td>
        R$ ${v.valor.toFixed(2)}
        </td>


        <td>
        ${v.data}
        </td>


        </tr>


        `;



    });



}





// ======================================
// Limpar Formulário
// ======================================


function limparVenda(){



document.getElementById("produtoVenda").value = "";


document.getElementById("clienteVenda").value = "";


document.getElementById("quantidadeVenda").value = "";


document.getElementById("valorVenda").value = "";



}





// ======================================
// Inicialização
// ======================================


listarVendas();
