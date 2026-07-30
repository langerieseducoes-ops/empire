/* =====================================================
   EMPIRE ERP PREMIUM REMASTER v2.0

   FINANCEIRO.JS

   Controle Financeiro

===================================================== */



let movimentacoes =


JSON.parse(

localStorage.getItem(

"movimentacoes"

)

)

||

[];






let movimentacaoEditando = -1;








// =====================================================
// SALVAR MOVIMENTAÇÕES
// =====================================================



function salvarMovimentacoes(){



    localStorage.setItem(

    "movimentacoes",

    JSON.stringify(

    movimentacoes

    )

    );



}








// =====================================================
// SALVAR MOVIMENTAÇÃO
// =====================================================



function salvarMovimentacao(){



    let descricao =


    document.getElementById(

    "descricaoFinanceira"

    )

    .value;






    let tipo =


    document.getElementById(

    "tipoFinanceiro"

    )

    .value;






    let valor =


    Number(

    document.getElementById(

    "valorFinanceiro"

    )

    .value

    );






    let data =


    document.getElementById(

    "dataFinanceira"

    )

    .value;








    if(!descricao || !valor){



        alert(

        "Preencha descrição e valor"

        );



        return;



    }








    let movimento = {



        descricao,



        tipo,



        valor,



        data



    };








    if(movimentacaoEditando === -1){



        movimentacoes.push(

        movimento

        );



    }

    else{



        movimentacoes[

        movimentacaoEditando

        ] = movimento;



        movimentacaoEditando = -1;



    }








    salvarMovimentacoes();







    carregarFinanceiro();



    atualizarResumoFinanceiro();



    limparFinanceiro();








    if(typeof registrarAtividade === "function"){



        registrarAtividade(

        "Movimentação financeira registrada",

        "Financeiro"

        );



    }







    alert(

    "Movimentação salva com sucesso!"

    );



}








// =====================================================
// LIMPAR FORMULÁRIO
=====================================================



function limparFinanceiro(){



    let campos = [



    "descricaoFinanceira",



    "valorFinanceiro",



    "dataFinanceira"



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
   CARREGAR MOVIMENTAÇÕES NA TABELA
===================================================== */



function carregarFinanceiro(){



    let tabela =


    document.getElementById(

    "listaFinanceiro"

    );






    if(!tabela){

        return;

    }






    tabela.innerHTML = "";







    if(movimentacoes.length === 0){



        tabela.innerHTML = `



        <tr>


        <td colspan="5">


        Nenhuma movimentação cadastrada


        </td>


        </tr>



        `;



        return;



    }







    movimentacoes.forEach(

    function(movimento,index){



        let classe =


        movimento.tipo === "entrada"

        ?

        "entrada"

        :

        "saida";







        let sinal =


        movimento.tipo === "entrada"

        ?

        "+"

        :

        "-";








        tabela.innerHTML += `



        <tr class="financeiro-item">



        <td>

        ${movimento.descricao}

        </td>





        <td class="${classe}">


        ${movimento.tipo}


        </td>





        <td class="${classe}">


        ${sinal} R$ 

        ${movimento.valor.toFixed(2)}


        </td>





        <td>

        ${movimento.data || "-"}

        </td>





        <td>



        <button

        onclick="editarMovimentacao(${index})">


        ✏


        </button>





        <button

        onclick="excluirMovimentacao(${index})">


        🗑


        </button>



        </td>





        </tr>



        `;



    });



}








/* =====================================================
   PESQUISAR MOVIMENTAÇÃO
===================================================== */



function pesquisarMovimentacao(){



    let busca =


    document.getElementById(

    "pesquisaFinanceira"

    )

    .value

    .toLowerCase();







    let linhas =


    document.querySelectorAll(

    "#listaFinanceiro tr"

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
   EDITAR MOVIMENTAÇÃO
===================================================== */



function editarMovimentacao(index){



    let movimento =


    movimentacoes[index];







    document.getElementById(

    "descricaoFinanceira"

    ).value = movimento.descricao;






    document.getElementById(

    "tipoFinanceiro"

    ).value = movimento.tipo;






    document.getElementById(

    "valorFinanceiro"

    ).value = movimento.valor;






    document.getElementById(

    "dataFinanceira"

    ).value = movimento.data;






    movimentacaoEditando = index;







    window.scrollTo({

        top:0,

        behavior:"smooth"

    });



}








/* =====================================================
   EXCLUIR MOVIMENTAÇÃO
===================================================== */



function excluirMovimentacao(index){



    let confirmar =


    confirm(

    "Deseja excluir esta movimentação?"

    );







    if(!confirmar){

        return;

    }







    movimentacoes.splice(

    index,

    1

    );







    salvarMovimentacoes();






    carregarFinanceiro();





    atualizarResumoFinanceiro();



}
/* =====================================================
   ATUALIZAR RESUMO FINANCEIRO
===================================================== */



function atualizarResumoFinanceiro(){



    let entradas = 0;



    let saidas = 0;







    movimentacoes.forEach(

    function(movimento){



        if(movimento.tipo === "entrada"){



            entradas += Number(movimento.valor);



        }

        else{



            saidas += Number(movimento.valor);



        }



    });







    let saldo =

    entradas - saidas;







    let lucro = saldo;







    let campoSaldo =


    document.getElementById(

    "saldoAtual"

    );







    let campoEntrada =


    document.getElementById(

    "totalEntradas"

    );







    let campoSaida =


    document.getElementById(

    "totalSaidas"

    );







    let campoLucro =


    document.getElementById(

    "lucroTotal"

    );







    if(campoSaldo){



        campoSaldo.innerText =


        "R$ " + saldo.toFixed(2);



    }







    if(campoEntrada){



        campoEntrada.innerText =


        "R$ " + entradas.toFixed(2);



    }







    if(campoSaida){



        campoSaida.innerText =


        "R$ " + saidas.toFixed(2);



    }







    if(campoLucro){



        campoLucro.innerText =


        "R$ " + lucro.toFixed(2);



    }



}








/* =====================================================
   HISTÓRICO FINANCEIRO
===================================================== */



function atualizarHistoricoFinanceiro(){



    let area =


    document.getElementById(

    "historicoFinanceiro"

    );







    if(!area){

        return;

    }







    area.innerHTML = "";







    movimentacoes.slice()

    .reverse()

    .forEach(

    function(movimento){



        let sinal =


        movimento.tipo === "entrada"

        ?

        "+"

        :

        "-";







        area.innerHTML += `



        <div class="movimento-financeiro">


        <span>


        ${movimento.descricao}


        </span>





        <strong>


        ${sinal} R$ ${movimento.valor.toFixed(2)}


        </strong>



        </div>



        `;



    });



}








/* =====================================================
   INICIALIZAÇÃO DO FINANCEIRO
===================================================== */



document.addEventListener(

"DOMContentLoaded",



function(){



    carregarFinanceiro();



    atualizarResumoFinanceiro();



    atualizarHistoricoFinanceiro();



});
