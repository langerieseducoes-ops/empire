/* =====================================================
   EMPIRE ERP PREMIUM REMASTER v2.0

   CLIENTES.JS

   Controle de Clientes

===================================================== */



let clientes =


JSON.parse(

localStorage.getItem(

"clientes"

)

)

||

[];






let clienteEditando = -1;








// =====================================================
// SALVAR CLIENTES
// =====================================================



function salvarClientes(){



    localStorage.setItem(

    "clientes",

    JSON.stringify(

    clientes

    )

    );



}








// =====================================================
// SALVAR NOVO CLIENTE
// =====================================================



function salvarCliente(){



    let nome =


    document.getElementById(

    "nomeCliente"

    )

    .value;






    let telefone =


    document.getElementById(

    "telefoneCliente"

    )

    .value;






    let email =


    document.getElementById(

    "emailCliente"

    )

    .value;






    let documento =


    document.getElementById(

    "documentoCliente"

    )

    .value;






    let endereco =


    document.getElementById(

    "enderecoCliente"

    )

    .value;






    let data =


    document.getElementById(

    "dataCliente"

    )

    .value;








    if(!nome){



        alert(

        "Informe o nome do cliente"

        );



        return;



    }








    let cliente = {



        nome,



        telefone,



        email,



        documento,



        endereco,



        data:



        data ||

        new Date()

        .toLocaleDateString("pt-BR"),



        status:

        "Ativo",



        totalComprado:

        0



    };








    if(clienteEditando === -1){



        clientes.push(

        cliente

        );



    }

    else{



        clientes[

        clienteEditando

        ] = cliente;



        clienteEditando = -1;



    }








    salvarClientes();






    carregarClientes();



    atualizarResumoClientes();



    limparCliente();








    if(typeof registrarAtividade === "function"){



        registrarAtividade(

        "Cliente cadastrado",

        "Clientes"

        );



    }







    alert(

    "Cliente salvo com sucesso!"

    );



}








// =====================================================
// LIMPAR FORMULÁRIO
// =====================================================



function limparCliente(){



    let campos = [



    "nomeCliente",



    "telefoneCliente",



    "emailCliente",



    "documentoCliente",



    "enderecoCliente",



    "dataCliente"



    ];







    campos.forEach(

    function(id){



        let campo =


        document.getElementById(id);







        if(campo){



            campo.value = "";



        }



    });



}
/* =====================================================
   CARREGAR CLIENTES NA TABELA
===================================================== */



function carregarClientes(){



    let tabela =


    document.getElementById(

    "listaClientes"

    );






    if(!tabela){

        return;

    }






    tabela.innerHTML = "";







    if(clientes.length === 0){



        tabela.innerHTML = `



        <tr>


        <td colspan="7">


        Nenhum cliente cadastrado


        </td>


        </tr>



        `;



        return;



    }







    clientes.forEach(

    function(cliente,index){



        tabela.innerHTML += `



        <tr class="cliente-item">



        <td>

        ${cliente.nome}

        </td>





        <td>

        ${cliente.telefone || "-"}

        </td>





        <td>

        ${cliente.email || "-"}

        </td>





        <td>

        R$ ${

        Number(cliente.totalComprado)

        .toFixed(2)

        }

        </td>





        <td>

        ${cliente.ultimaCompra || "-"}

        </td>





        <td>


        <span class="cliente-ativo">


        ${cliente.status}


        </span>


        </td>





        <td>



        <button

        class="btn-cliente"

        onclick="editarCliente(${index})">


        ✏


        </button>





        <button

        class="btn-cliente btn-excluir-cliente"

        onclick="excluirCliente(${index})">


        🗑


        </button>



        </td>





        </tr>



        `;



    });



}








/* =====================================================
   PESQUISAR CLIENTE
===================================================== */



function pesquisarCliente(){



    let busca =


    document.getElementById(

    "pesquisaCliente"

    )

    .value

    .toLowerCase();







    let linhas =


    document.querySelectorAll(

    "#listaClientes tr"

    );







    linhas.forEach(

    function(linha){



        let texto =


        linha.innerText

        .toLowerCase();







        if(

        texto.includes(busca)

        ){



            linha.style.display = "";



        }

        else{



            linha.style.display =

            "none";



        }



    });



}








/* =====================================================
   EDITAR CLIENTE
===================================================== */



function editarCliente(index){



    let cliente =


    clientes[index];






    document.getElementById(

    "nomeCliente"

    ).value = cliente.nome;






    document.getElementById(

    "telefoneCliente"

    ).value = cliente.telefone;






    document.getElementById(

    "emailCliente"

    ).value = cliente.email;






    document.getElementById(

    "documentoCliente"

    ).value = cliente.documento;






    document.getElementById(

    "enderecoCliente"

    ).value = cliente.endereco;






    document.getElementById(

    "dataCliente"

    ).value = cliente.data;






    clienteEditando = index;







    window.scrollTo({

        top:0,

        behavior:"smooth"

    });



}








/* =====================================================
   EXCLUIR CLIENTE
===================================================== */



function excluirCliente(index){



    let confirmar =


    confirm(

    "Deseja excluir este cliente?"

    );







    if(!confirmar){

        return;

    }







    clientes.splice(

    index,

    1

    );







    salvarClientes();





    carregarClientes();





    atualizarResumoClientes();



}
/* =====================================================
   ATUALIZAR RESUMO DOS CLIENTES
===================================================== */



function atualizarResumoClientes(){



    let total =

    clientes.length;





    let ativos = 0;



    let comprado = 0;







    clientes.forEach(

    function(cliente){



        if(cliente.status === "Ativo"){



            ativos++;



        }






        comprado +=


        Number(cliente.totalComprado)

        ||

        0;



    });







    let campoTotal =


    document.getElementById(

    "totalClientes"

    );







    let campoAtivos =


    document.getElementById(

    "clientesAtivos"

    );







    let campoComprado =


    document.getElementById(

    "totalComprado"

    );







    let campoUltimo =


    document.getElementById(

    "ultimoCliente"

    );







    if(campoTotal){



        campoTotal.innerText =

        total;



    }







    if(campoAtivos){



        campoAtivos.innerText =

        ativos;



    }







    if(campoComprado){



        campoComprado.innerText =


        "R$ " +

        comprado.toFixed(2);



    }







    if(campoUltimo && clientes.length){



        campoUltimo.innerText =


        clientes[

        clientes.length - 1

        ]

        .nome;



    }



}








/* =====================================================
   HISTÓRICO DO CLIENTE
===================================================== */



function mostrarHistoricoCliente(index){



    let area =


    document.getElementById(

    "historicoCliente"

    );







    if(!area){

        return;

    }







    let cliente =


    clientes[index];







    area.innerHTML = `



    <div class="compra-cliente">


    Cliente:

    ${cliente.nome}


    </div>





    <div class="compra-cliente">


    Total comprado:

    R$ ${

    Number(cliente.totalComprado)

    .toFixed(2)

    }


    </div>



    `;



}








/* =====================================================
   INICIALIZAÇÃO
===================================================== */



document.addEventListener(

"DOMContentLoaded",



function(){



    carregarClientes();



    atualizarResumoClientes();



});
