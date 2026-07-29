// ======================================
// EMPIRE ERP
// Módulo Financeiro
// ======================================


// ======================================
// Carregar Dados
// ======================================

function carregarFinanceiro(){


    const vendas = JSON.parse(

        localStorage.getItem("vendas")

    ) || [];



    const compras = JSON.parse(

        localStorage.getItem("compras")

    ) || [];



    let entradas = 0;

    let saidas = 0;



    // ==============================
    // Somar Vendas
    // ==============================

    vendas.forEach(venda => {


        entradas += Number(
            venda.total || 0
        );


    });



    // ==============================
    // Somar Compras
    // ==============================

    compras.forEach(compra => {


        saidas += Number(
            compra.total || 0
        );


    });



    const saldo =
    entradas - saidas;



    const campoEntradas =
    document.getElementById("totalEntradas");


    const campoSaidas =
    document.getElementById("totalSaidas");


    const campoSaldo =
    document.getElementById("saldoAtual");



    if(campoEntradas){

        campoEntradas.innerHTML =
        formatarMoeda(entradas);

    }



    if(campoSaidas){

        campoSaidas.innerHTML =
        formatarMoeda(saidas);

    }



    if(campoSaldo){

        campoSaldo.innerHTML =
        formatarMoeda(saldo);

    }


}


// ======================================
// Formatar Valores
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
// Inicialização
// ======================================

carregarFinanceiro();
