//
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


    const documento =
    document.getElementById("documento").value;


    const telefone =
    document.getElementById("telefone").value;


    const whatsapp =
    document.getElementById("whatsapp").value;


    const cidade =
    document.getElementById("cidade").value;


    const endereco =
    document.getElementById("endereco").value;


    const observacao =
    document.getElementById("observacao").value;




    if(!nome){


        alert(
            "Digite o nome do cliente."
        );


        return;

    }





    const cliente = {


        nome,

        documento,

        telefone,

        whatsapp,

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


    const tabela =

    document.getElementById(
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





    clientes.forEach((c,index)=>{


        tabela.innerHTML += `


        <tr>


        <td>${c.nome}</td>


        <td>${c.documento}</td>


        <td>${c.telefone}</td>


        <td>${c.cidade}</td>


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


    document.getElementById("documento").value =
    c.documento;


    document.getElementById("telefone").value =
    c.telefone;


    document.getElementById("whatsapp").value =
    c.whatsapp;


    document.getElementById("cidade").value =
    c.cidade;


    document.getElementById("endereco").value =
    c.endereco;


    document.getElementById("observacao").value =
    c.observacao;



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


    document.getElementById("nomeCliente").value = "";

    document.getElementById("documento").value = "";

    document.getElementById("telefone").value = "";

    document.getElementById("whatsapp").value = "";

    document.getElementById("cidade").value = "";

    document.getElementById("endereco").value = "";

    document.getElementById("observacao").value = "";


}




// ======================================
// Iniciar
// ======================================


listarClientes();
