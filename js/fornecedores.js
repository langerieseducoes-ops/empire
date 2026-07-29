// ======================================
// EMPIRE ERP
// Módulo de Fornecedores
// ======================================


let fornecedores = JSON.parse(

    localStorage.getItem("fornecedores")

) || [];



let indiceFornecedorEdicao = -1;



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
// Salvar Fornecedor
// ======================================

function salvarFornecedor(){


    const nome =
    document.getElementById("nomeFornecedor").value;


    const cnpj =
    document.getElementById("cnpjFornecedor").value;


    const telefone =
    document.getElementById("telefoneFornecedor").value;


    const email =
    document.getElementById("emailFornecedor").value;


    const endereco =
    document.getElementById("enderecoFornecedor").value;



    if(!nome){


        alert("Informe o nome do fornecedor.");

        return;

    }



    const fornecedor = {


        nome,

        cnpj,

        telefone,

        email,

        endereco


    };




    if(indiceFornecedorEdicao === -1){


        fornecedores.push(fornecedor);


    }else{


        fornecedores[indiceFornecedorEdicao] = fornecedor;


        indiceFornecedorEdicao = -1;


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
    document.getElementById("listaFornecedores");



    if(!tabela){

        return;

    }



    tabela.innerHTML = "";



    fornecedores.forEach((fornecedor,index)=>{


        tabela.innerHTML += `


        <tr>


        <td>${fornecedor.nome}</td>


        <td>${fornecedor.cnpj}</td>


        <td>${fornecedor.telefone}</td>


        <td>${fornecedor.email}</td>


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


    const fornecedor =
    fornecedores[index];



    document.getElementById("nomeFornecedor").value =
    fornecedor.nome;


    document.getElementById("cnpjFornecedor").value =
    fornecedor.cnpj;


    document.getElementById("telefoneFornecedor").value =
    fornecedor.telefone;


    document.getElementById("emailFornecedor").value =
    fornecedor.email;


    document.getElementById("enderecoFornecedor").value =
    fornecedor.endereco;



    indiceFornecedorEdicao = index;


}



// ======================================
// Excluir Fornecedor
// ======================================

function excluirFornecedor(index){


    if(confirm("Deseja excluir este fornecedor?")){


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

    document.getElementById("cnpjFornecedor").value = "";

    document.getElementById("telefoneFornecedor").value = "";

    document.getElementById("emailFornecedor").value = "";

    document.getElementById("enderecoFornecedor").value = "";


}



// ======================================
// Inicialização
// ======================================

listarFornecedores();
