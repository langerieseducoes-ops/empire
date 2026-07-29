// ======================================
// EMPIRE ERP
// Módulo Financeiro
// ======================================



// ======================================
// Formatar Moeda
// ======================================

function formatarMoeda(valor){

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style:"currency",
            currency:"BRL"
        }
    );

}




// ======================================
// Calcular Financeiro
// ======================================

function atualizarFinanceiro(){



    const vendas = JSON.parse(

        localStorage.getItem("vendas")

    ) || [];



    const compras = JSON.parse(

        localStorage.getItem("compras")

    ) || [];



    const produtos = JSON.parse(

        localStorage.getItem("produtos")

    ) || [];





    let totalVendido = 0;

    let totalComprado = 0;

    let valorEstoque = 0;






    // Somar vendas

    vendas.forEach(v=>{


        totalVendido += Number(
            v.valor || 0
        );


    });





    // Somar compras

    compras.forEach(c=>{


        totalComprado += Number(
            c.valor || 0
        );


    });





    // Calcular estoque

    produtos.forEach(p=>{


        valorEstoque +=

        Number(p.custo || 0)

        *

        Number(p.quantidade || 0);



    });





    const lucro =

    totalVendido - totalComprado;






    const vendido = document.getElementById(
        "totalVendido"
    );


    const comprado = document.getElementById(
        "totalComprado"
    );


    const lucroTela = document.getElementById(
        "lucro"
    );


    const estoqueTela = document.getElementById(
        "valorEstoque"
    );






    if(vendido){

        vendido.innerHTML =
        formatarMoeda(totalVendido);

    }





    if(comprado){

        comprado.innerHTML =
        formatarMoeda(totalComprado);

    }





    if(lucroTela){

        lucroTela.innerHTML =
        formatarMoeda(lucro);

    }





    if(estoqueTela){

        estoqueTela.innerHTML =
        formatarMoeda(valorEstoque);

    }



}





// ======================================
// Inicialização
// ======================================


atualizarFinanceiro();
