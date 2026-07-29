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


    const whatsapp =
    document.getElementById("whatsappCliente").value;


    const cpf =
    document.getElementById("cpfCliente").value;


    const cidade =
    document.getElementById("cidadeCliente").value;


    const endereco =
    document.getElementById("enderecoCliente").value;


    const observacao =
    document.getElementById("observacaoCliente").value;




    if(!nome){


        alert(
            "Informe o nome do cliente."
        );


        return;

    }



    const cliente = {


        nome,

        telefone,

        whatsapp,

        cpf,

        cidade,

        endereco,

        observacao


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



    const tabela = document.getElementById(
        "listaClientes"
    );



    if(!tabela){

        return;

    }



    tabela.innerHTML = "";



    const contador =
    document.getElementById(
        "contadorClientes"
    );



    if(contador){

        contador.innerHTML =
        clientes.length;

    }




    clientes.forEach((cliente,index)=>{


        tabela.innerHTML += `


        <tr>


        <td>
        ${cliente.nome}
        </td>


        <td>
        ${cliente.telefone}
        </td>


        <td>
        ${cliente.whatsapp}
        </td>


        <td>
        ${cliente.cidade}
        </td>



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



    document.getElementById("nomeCliente").value =
    c.nome;


    document.getElementById("telefoneCliente").value =
    c.telefone;


    document.getElementById("whatsappCliente").value =
    c.whatsapp;


    document.getElementById("cpfCliente").value =
    c.cpf;


    document.getElementById("cidadeCliente").value =
    c.cidade;


    document.getElementById("enderecoCliente").value =
    c.endereco;


    document.getElementById("observacaoCliente").value =
    c.observacao;



    indiceCliente = index;


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

document.getElementById("whatsappCliente").value = "";

document.getElementById("cpfCliente").value = "";

document.getElementById("cidadeCliente").value = "";

document.getElementById("enderecoCliente").value = "";

document.getElementById("observacaoCliente").value = "";


}



// ======================================
// Inicialização
// ======================================


listarClientes();
