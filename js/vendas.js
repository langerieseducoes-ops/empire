// ======================================
// EMPIRE ERP
// Módulo de Vendas
// ======================================



let vendas = JSON.parse(

    localStorage.getItem("vendas")

) || [];




// ======================================
// Carregar Clientes e Produtos
// ======================================


function carregarOpcoesVenda(){


    const clientes = JSON.parse(

        localStorage.getItem("clientes")

    ) || [];



    const produtos = JSON.parse(

        localStorage.getItem("produtos")

    ) || [];




    const selectCliente =
    document.getElementById("clienteVenda");



    const selectProduto =
    document.getElementById("produtoVenda");




    if(selectCliente){


        selectCliente.innerHTML =

        `<option value="">
        Selecione o cliente
        </option>`;



        clientes.forEach((c,index)=>{


            selectCliente.innerHTML += `

            <option value="${index}">
            ${c.nome}
            </option>

            `;


        });


    }





    if(selectProduto){


        selectProduto.innerHTML =

        `<option value="">
        Selecione o produto
        </option>`;



        produtos.forEach((p,index)=>{


            selectProduto.innerHTML += `

            <option value="${index}">
            ${p.produto} - Estoque: ${p.quantidade}
            </option>

            `;


        });


    }


}





// ======================================
// Registrar Venda
// ======================================


function registrarVenda(){



    const clienteIndex =

    document.getElementById(
        "clienteVenda"
    ).value;



    const produtoIndex =

    document.getElementById(
        "produtoVenda"
    ).value;




    const quantidade = Number(

        document.getElementById(
            "quantidadeVenda"
        ).value

    );





    let clientes = JSON.parse(

        localStorage.getItem("clientes")

    ) || [];




    let produtos = JSON.parse(

        localStorage.getItem("produtos")

    ) || [];





    if(
        clienteIndex === "" ||
        produtoIndex === "" ||
        quantidade <= 0
    ){


        alert(
            "Preencha todos os dados da venda."
        );


        return;


    }





    const cliente =

    clientes[clienteIndex];



    const produto =

    produtos[produtoIndex];





    if(quantidade > produto.quantidade){


        alert(
            "Estoque insuficiente."
        );


        return;


    }






    const valorTotal =

    produto.venda * quantidade;






    const novaVenda = {


        data:

        new Date().toLocaleString(
            "pt-BR"
        ),


        cliente:

        cliente.nome,


        produto:

        produto.produto,


        quantidade,


        valor:

        valorTotal


    };





    vendas.push(novaVenda);





    localStorage.setItem(

        "vendas",

        JSON.stringify(vendas)

    );






    // Baixa no estoque


    produto.quantidade -= quantidade;





    localStorage.setItem(

        "produtos",

        JSON.stringify(produtos)

    );






    listarVendas();


    carregarOpcoesVenda();





    document.getElementById(
        "quantidadeVenda"
    ).value = "";




    alert(
        "Venda registrada com sucesso!"
    );



}





// ======================================
// Listar Vendas
// ======================================


function listarVendas(){


    const tabela =

    document.getElementById(
        "listaVendas"
    );



    if(!tabela){

        return;

    }



    tabela.innerHTML = "";




    const contador =

    document.getElementById(
        "contadorVendas"
    );



    if(contador){

        contador.innerHTML =
        vendas.length;

    }





    vendas.forEach(v=>{


        tabela.innerHTML += `


        <tr>


        <td>
        ${v.data}
        </td>


        <td>
        ${v.cliente}
        </td>


        <td>
        ${v.produto}
        </td>


        <td>
        ${v.quantidade}
        </td>


        <td>
        ${v.valor.toLocaleString(
            "pt-BR",
            {
                style:"currency",
                currency:"BRL"
            }
        )}
        </td>


        </tr>


        `;


    });



}





// ======================================
// Inicialização
// ======================================


carregarOpcoesVenda();

listarVendas();
