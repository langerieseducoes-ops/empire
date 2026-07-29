// ======================================
// EMPIRE ERP
// Módulo de Fornecedores
// ======================================



let fornecedores = JSON.parse(

    localStorage.getItem("fornecedores")

) || [];



let indiceFornecedor = -1;




// ======================================
// Salvar Fornecedores
// ======================================


function salvarFornecedores(){


    localStorage.setItem(

        "fornecedores",

        JSON.stringify(fornecedores)

    );


}




// ======================================
// Adicionar Fornecedor
// ======================================


function adicionarFornecedor(){


    const nome =
    document.getElementById("nomeFornecedor").value;


    const cnpj =
    document.getElementById("cnpj").value;


    const telefone =
    document.getElementById("telefoneFornecedor").value;


    const whatsapp =
    document.getElementById("whatsappFornecedor").value;


    const cidade =
    document.getElementById("cidadeFornecedor").value;


    const endereco =
    document.getElementById("enderecoFornecedor").value;


    const produtos =
    document.getElementById("produtoFornecedor").value;


    const observacao =
    document.getElementById("observacaoFornecedor").value;




    if(!nome){


        alert(
            "Digite o nome do fornecedor."
        );


        return;

    }





    const fornecedor = {


        nome,

        cnpj,

        telefone,

        whatsapp,

        cidade,

        endereco,

        produtos,

        observacao


    };





    if(indiceFornecedor === -1){


        fornecedores.push(fornecedor);


    }else{


        fornecedores[indiceFornecedor] = fornecedor;


        indiceFornecedor = -1;


    }





    salvarFornecedores();


    listarFornecedores();


    limparFornecedor();


}





// ======================================
// Listar Fornecedores
// ======================================


function listarFornecedores(){


    const tabela =

    document.getElementById(
        "listaFornecedores"
    );



    if(!tabela){

        return;

    }




    tabela.innerHTML = "";



    const contador =

    document.getElementById(
        "contadorFornecedores"
    );



    if(contador){

        contador.innerHTML =
        fornecedores.length;

    }





    fornecedores.forEach((f,index)=>{


        tabela.innerHTML += `


        <tr>


        <td>${f.nome}</td>


        <td>${f.cnpj}</td>


        <td>${f.telefone}</td>


        <td>${f.cidade}</td>


        <td>


        <button onclick="editarFornecedor(${index})">
        ✏️
        </button>



        <button onclick="excluirFornecedor(${index})">
        🗑️
        </button>


        </td>


        </tr>


        `;



    });



}





// ======================================
// Editar Fornecedor
// ======================================


function editarFornecedor(index){


    const f = fornecedores[index];



    document.getElementById("nomeFornecedor").value =
    f.nome;


    document.getElementById("cnpj").value =
    f.cnpj;


    document.getElementById("telefoneFornecedor").value =
    f.telefone;


    document.getElementById("whatsappFornecedor").value =
    f.whatsapp;


    document.getElementById("cidadeFornecedor").value =
    f.cidade;


    document.getElementById("enderecoFornecedor").value =
    f.endereco;


    document.getElementById("produtoFornecedor").value =
    f.produtos;


    document.getElementById("observacaoFornecedor").value =
    f.observacao;



    indiceFornecedor = index;


}





// ======================================
// Excluir Fornecedor
// ======================================


function excluirFornecedor(index){


    if(confirm(

        "Deseja excluir este fornecedor?"

    )){


        fornecedores.splice(

            index,

            1

        );


        salvarFornecedores();


        listarFornecedores();


    }


}





// ======================================
// Limpar Formulário
// ======================================


function limparFornecedor(){


    document.getElementById("nomeFornecedor").value = "";

    document.getElementById("cnpj").value = "";

    document.getElementById("telefoneFornecedor").value = "";

    document.getElementById("whatsappFornecedor").value = "";

    document.getElementById("cidadeFornecedor").value = "";

    document.getElementById("enderecoFornecedor").value = "";

    document.getElementById("produtoFornecedor").value = "";

    document.getElementById("observacaoFornecedor").value = "";


}





// ======================================
// Inicialização
// ======================================


listarFornecedores();
