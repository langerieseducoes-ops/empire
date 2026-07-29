// ======================================
// EMPIRE ERP
// Módulo de Relatórios
// ======================================



// ======================================
// Carregar Relatórios
// ======================================

function carregarRelatorios(){



    const produtos = JSON.parse(

        localStorage.getItem("produtos")

    ) || [];



    const clientes = JSON.parse(

        localStorage.getItem("clientes")

    ) || [];



    const fornecedores = JSON.parse(

        localStorage.getItem("fornecedores")

    ) || [];




    let quantidadeEstoque = 0;


    let valorEstoque = 0;




    produtos.forEach(produto=>{


        quantidadeEstoque += Number(

            produto.quantidade || 0

        );



        valorEstoque +=

        Number(produto.custo || 0)

        *

        Number(produto.quantidade || 0);



    });






    const campoProdutos =

    document.getElementById("relProdutos");



    const campoEstoque =

    document.getElementById("relEstoque");



    const campoValor =

    document.getElementById("relValorEstoque");



    const campoClientes =

    document.getElementById("relClientes");



    const campoFornecedores =

    document.getElementById("relFornecedores");







    if(campoProdutos){


        campoProdutos.innerHTML =

        produtos.length;


    }





    if(campoEstoque){


        campoEstoque.innerHTML =

        quantidadeEstoque;


    }





    if(campoValor){


        campoValor.innerHTML =

        formatarRelatorioMoeda(valorEstoque);


    }





    if(campoClientes){


        campoClientes.innerHTML =

        clientes.length;


    }





    if(campoFornecedores){


        campoFornecedores.innerHTML =

        fornecedores.length;


    }





}



// ======================================
// Formatar Moeda
// ======================================

function formatarRelatorioMoeda(valor){


    return Number(valor).toLocaleString(

        "pt-BR",

        {

            style:"currency",

            currency:"BRL"

        }

    );


}




// ======================================
// Inicialização
// ======================================

carregarRelatorios();
