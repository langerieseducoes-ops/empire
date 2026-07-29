// ======================================
// EMPIRE ERP
// Módulo de Clientes
// ======================================


let clientes = JSON.parse(

    localStorage.getItem("clientes")

) || [];



let indiceClienteEdicao = -1;



// ======================================
// Salvar Clientes
// ======================================

function salvarClientes(){

    localStorage.setItem(

        "clientes",

        JSON.stringify(clientes)

    );

}



// ======================================
// Salvar Cliente
// ======================================

function salvarCliente(){


    const nome =
    document.getElementById("nomeCliente").value;


    const telefone =
    document.getElementById("telefoneCliente").value;


    const email =
    document.getElementById("emailCliente").value;


    const cpf =
    document.getElementById("cpfCliente").value;


    const endereco =
    document.getElementById("enderecoCliente").value;



    if(!nome){


        alert("Informe o nome do cliente.");

        return;


    }



    const cliente = {


        nome,

        telefone,

        email,

        cpf,

        endereco


    };




    if(indiceClienteEdicao === -1){


        clientes.push(cliente);


    }else{


        clientes[indiceClienteEdicao] = cliente;


        indiceClienteEdicao = -1;


    }



    salvarClientes();


    listarClientes();


    limparCliente();


}




// ======================================
// Listar Clientes
// ======================================

function listarClientes(){


    const tabela =
    document.getElementById("listaClientes");



    if(!tabela){

        return;

    }



    tabela.innerHTML = "";



    clientes.forEach((cliente,index)=>{


        tabela.innerHTML += `


        <tr>


        <td>${cliente.nome}</td>


        <td>${cliente.telefone}</td>


        <td>${cliente.email}</td>


        <td>${cliente.cpf}</td>


        <td>


        <button onclick="editarCliente(${index})">

        ✏️

        </button>



        <button onclick="excluirCliente(${index})">

        🗑️

        </button>


        </td>


        </tr>


        `;


    });


}




// ======================================
// Editar Cliente
// ======================================

function editarCliente(index){


    const cliente =
    clientes[index];



    document.getElementById("nomeCliente").value =
    cliente.nome;


    document.getElementById("telefoneCliente").value =
    cliente.telefone;


    document.getElementById("emailCliente").value =
    cliente.email;


    document.getElementById("cpfCliente").value =
    cliente.cpf;


    document.getElementById("enderecoCliente").value =
    cliente.endereco;



    indiceClienteEdicao = index;


}




// ======================================
// Excluir Cliente
// ======================================

function excluirCliente(index){


    if(confirm("Deseja excluir este cliente?")){


        clientes.splice(

            index,

            1

        );


        salvarClientes();


        listarClientes();


    }


}



// ======================================
// Limpar Formulário
// ======================================

function limparCliente(){


    document.getElementById("nomeCliente").value = "";

    document.getElementById("telefoneCliente").value = "";

    document.getElementById("emailCliente").value = "";

    document.getElementById("cpfCliente").value = "";

    document.getElementById("enderecoCliente").value = "";


}



// ======================================
// Inicialização
// ======================================

listarClientes();
