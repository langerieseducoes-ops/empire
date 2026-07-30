/* =====================================================
   EMPIRE ERP PREMIUM REMASTER v2.0

   FORNECEDORES.JS

   Controle de Fornecedores

===================================================== */



let fornecedores =


JSON.parse(

localStorage.getItem(

"fornecedores"

)

)

||

[];






let fornecedorEditando = -1;








// =====================================================
// SALVAR FORNECEDORES
// =====================================================



function salvarFornecedores(){



    localStorage.setItem(

    "fornecedores",

    JSON.stringify(

    fornecedores

    )

    );



}








// =====================================================
// SALVAR FORNECEDOR
// =====================================================



function salvarFornecedor(){



    let nome =


    document.getElementById(

    "nomeFornecedor"

    )

    .value;






    let responsavel =


    document.getElementById(

    "responsavelFornecedor"

    )

    .value;






    let telefone =


    document.getElementById(

    "telefoneFornecedor"

    )

    .value;






    let email =


    document.getElementById(

    "emailFornecedor"

    )

    .value;






    let endereco =


    document.getElementById(

    "enderecoFornecedor"

    )

    .value;






    let produtos =


    document.getElementById(

    "produtosFornecedor"

    )

    .value;








    if(!nome){



        alert(

        "Informe o nome do fornecedor"

        );



        return;



    }








    let fornecedor = {



        nome,



        responsavel,



        telefone,



        email,



        endereco,



        produtos,



        compras:

        0,



        status:

        "Ativo"



    };








    if(fornecedorEditando === -1){



        fornecedores.push(

        fornecedor

        );



    }

    else{



        fornecedores[

        fornecedorEditando

        ] = fornecedor;



        fornecedorEditando = -1;



    }








    salvarFornecedores();







    carregarFornecedores();



    atualizarResumoFornecedores();



    limparFornecedor();








    if(typeof registrarAtividade === "function"){



        registrarAtividade(

        "Fornecedor cadastrado",

        "Fornecedores"

        );



    }







    alert(

    "Fornecedor salvo com sucesso!"

    );



}








// =====================================================
// LIMPAR FORMULÁRIO
// =====================================================



function limparFornecedor(){



    let campos = [



    "nomeFornecedor",



    "responsavelFornecedor",



    "telefoneFornecedor",



    "emailFornecedor",



    "enderecoFornecedor",



    "produtosFornecedor"



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
   CARREGAR FORNECEDORES NA TABELA
===================================================== */



function carregarFornecedores(){



    let tabela =


    document.getElementById(

    "listaFornecedores"

    );






    if(!tabela){

        return;

    }






    tabela.innerHTML = "";







    if(fornecedores.length === 0){



        tabela.innerHTML = `



        <tr>


        <td colspan="7">


        Nenhum fornecedor cadastrado


        </td>


        </tr>



        `;



        return;



    }







    fornecedores.forEach(

    function(fornecedor,index){



        tabela.innerHTML += `



        <tr class="fornecedor-item">



        <td>

        ${fornecedor.nome}

        </td>





        <td>

        ${fornecedor.responsavel || "-"}

        </td>





        <td>

        ${fornecedor.telefone || "-"}

        </td>





        <td>

        ${fornecedor.produtos || "-"}

        </td>





        <td>

        ${fornecedor.compras}

        </td>





        <td>


        <span class="fornecedor-ativo">


        ${fornecedor.status}


        </span>


        </td>





        <td>



        <button

        class="btn-fornecedor"

        onclick="editarFornecedor(${index})">


        ✏


        </button>





        <button

        class="btn-fornecedor btn-excluir-fornecedor"

        onclick="excluirFornecedor(${index})">


        🗑


        </button>



        </td>





        </tr>



        `;



    });



}








/* =====================================================
   PESQUISAR FORNECEDOR
===================================================== */



function pesquisarFornecedor(){



    let busca =


    document.getElementById(

    "pesquisaFornecedor"

    )

    .value

    .toLowerCase();







    let linhas =


    document.querySelectorAll(

    "#listaFornecedores tr"

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
   EDITAR FORNECEDOR
===================================================== */



function editarFornecedor(index){



    let fornecedor =


    fornecedores[index];







    document.getElementById(

    "nomeFornecedor"

    ).value = fornecedor.nome;






    document.getElementById(

    "responsavelFornecedor"

    ).value = fornecedor.responsavel;






    document.getElementById(

    "telefoneFornecedor"

    ).value = fornecedor.telefone;






    document.getElementById(

    "emailFornecedor"

    ).value = fornecedor.email;






    document.getElementById(

    "enderecoFornecedor"

    ).value = fornecedor.endereco;






    document.getElementById(

    "produtosFornecedor"

    ).value = fornecedor.produtos;






    fornecedorEditando = index;







    window.scrollTo({

        top:0,

        behavior:"smooth"

    });



}








/* =====================================================
   EXCLUIR FORNECEDOR
===================================================== */



function excluirFornecedor(index){



    let confirmar =


    confirm(

    "Deseja excluir este fornecedor?"

    );







    if(!confirmar){

        return;

    }







    fornecedores.splice(

    index,

    1

    );







    salvarFornecedores();






    carregarFornecedores();





    atualizarResumoFornecedores();



}
/* =====================================================
   ATUALIZAR RESUMO DOS FORNECEDORES
===================================================== */



function atualizarResumoFornecedores(){



    let total =

    fornecedores.length;





    let ativos = 0;



    let compras = 0;







    fornecedores.forEach(

    function(fornecedor){



        if(fornecedor.status === "Ativo"){



            ativos++;



        }







        compras +=


        Number(fornecedor.compras)

        ||

        0;



    });







    let campoTotal =


    document.getElementById(

    "totalFornecedores"

    );







    let campoAtivos =


    document.getElementById(

    "fornecedoresAtivos"

    );







    let campoCompras =


    document.getElementById(

    "comprasFornecedor"

    );







    let campoUltimo =


    document.getElementById(

    "ultimoFornecedor"

    );







    if(campoTotal){



        campoTotal.innerText =

        total;



    }







    if(campoAtivos){



        campoAtivos.innerText =

        ativos;



    }







    if(campoCompras){



        campoCompras.innerText =

        compras;



    }







    if(campoUltimo && fornecedores.length){



        campoUltimo.innerText =


        fornecedores[

        fornecedores.length - 1

        ]

        .nome;



    }



}








/* =====================================================
   HISTÓRICO DO FORNECEDOR
===================================================== */



function mostrarHistoricoFornecedor(index){



    let area =


    document.getElementById(

    "historicoFornecedor"

    );







    if(!area){

        return;

    }







    let fornecedor =


    fornecedores[index];







    area.innerHTML = `



    <div class="compra-fornecedor">


    Fornecedor:

    ${fornecedor.nome}


    </div>





    <div class="compra-fornecedor">


    Compras realizadas:

    ${fornecedor.compras}


    </div>



    `;



}








/* =====================================================
   INICIALIZAÇÃO
===================================================== */



document.addEventListener(

"DOMContentLoaded",



function(){



    carregarFornecedores();



    atualizarResumoFornecedores();



});
