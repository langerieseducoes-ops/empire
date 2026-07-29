// ======================================
// EMPIRE ERP
// Módulo de Clientes
// ======================================


let clientes = JSON.parse(

    localStorage.getItem("clientes")

) || [];



let indiceCliente = -1;



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
// Adicionar Cliente
// ======================================


function adicionarCliente(){


    const nome =
    document.getElementById("nomeCliente").value;


    const telefone =
    document.getElementById("telefoneCliente").value;


    const email =
    document.getElementById("emailCliente").value;



    if(!nome){

        alert(
            "Digite o nome do cliente."
        );

        return;

    }



    const cliente = {

        nome,
        telefone,
        email

    };



    if(indiceCliente === -1){

        clientes.push(cliente);

    }else{

        clientes[indiceCliente] = cliente;

        indiceCliente = -1;

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
    document.querySelector(
        "#listaClientes"
    );


    if(!tabela){

        return;

    }



    tabela.innerHTML = "";



    clientes.forEach((c,index)=>{


        tabela.innerHTML += `

        <tr>

        <td>${c.nome}</td>

        <td>${c.telefone}</td>

        <td>${c.email}</td>


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


    const c = clientes[index];


    document.getElementById(
        "nomeCliente"
    ).value = c.nome;


    document.getElementById(
        "telefoneCliente"
    ).value = c.telefone;


    document.getElementById(
        "emailCliente"
    ).value = c.email;



    indiceCliente = index;


}




// ======================================
// Excluir Cliente
// ======================================


function excluirCliente(index){


    if(confirm(
        "Deseja excluir este cliente?"
    )){


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


    document.getElementById(
        "nomeCliente"
    ).value = "";


    document.getElementById(
        "telefoneCliente"
    ).value = "";


    document.getElementById(
        "emailCliente"
    ).value = "";


}



// ======================================
// Inicialização
// ======================================


listarClientes();
