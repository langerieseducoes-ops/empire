// ======================================
// EMPIRE ERP
// Módulo de Compras
// ======================================

let compras = JSON.parse(
    localStorage.getItem("compras")
) || [];

// ======================================
// Carregar Produtos
// ======================================

function carregarProdutos() {

    const select = document.getElementById("produtoCompra");

    const produtos = JSON.parse(
        localStorage.getItem("produtos")
    ) || [];

    select.innerHTML = "";

    produtos.forEach((produto, indice) => {

        select.innerHTML += `
            <option value="${indice}">
                ${produto.codigo} - ${produto.produto}
            </option>
        `;

    });

}

// ======================================
// Registrar Compra
// ======================================

function registrarCompra() {

    const indice = Number(
        document.getElementById("produtoCompra").value
    );

    const fornecedor =
    document.getElementById("fornecedorCompra").value;

    const quantidade = Number(
        document.getElementById("quantidadeCompra").value
    );

    const custo = Number(
        document.getElementById("custoCompra").value
    );

    const data =
    document.getElementById("dataCompra").value;

    if (!fornecedor || quantidade <= 0 || custo <= 0 || !data) {

        alert("Preencha todos os campos.");

        return;

    }

    let produtos = JSON.parse(
        localStorage.getItem("produtos")
    ) || [];

    produtos[indice].quantidade =
        Number(produtos[indice].quantidade) + quantidade;

    produtos[indice].custo = custo;

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

    compras.push({

        data: data,

        produto: produtos[indice].produto,

        fornecedor: fornecedor,

        quantidade: quantidade,

        custo: custo,

        total: quantidade * custo

    });

    localStorage.setItem(

        "compras",

        JSON.stringify(compras)

    );

    listarCompras();

    limparFormulario();

    alert("Compra registrada com sucesso!");

}

// ======================================
// Listar Compras
// ======================================

function listarCompras() {

    const tabela =
    document.getElementById("listaCompras");

    tabela.innerHTML = "";

    compras.forEach(compra => {

        tabela.innerHTML += `

        <tr>

        <td>${compra.data}</td>

        <td>${compra.produto}</td>

        <td>${compra.fornecedor}</td>

        <td>${compra.quantidade}</td>

        <td>${compra.custo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}</td>

        <td>${compra.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}</td>

        </tr>

        `;

    });

}

// ======================================
// Limpar Formulário
// ======================================

function limparFormulario() {

    document.getElementById("fornecedorCompra").value = "";

    document.getElementById("quantidadeCompra").value = "";

    document.getElementById("custoCompra").value = "";

    document.getElementById("dataCompra").value = "";

}

// ======================================
// Inicialização
// ======================================

carregarProdutos();

listarCompras();
