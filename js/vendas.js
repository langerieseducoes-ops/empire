// ======================================
// EMPIRE ERP
// Módulo de Vendas
// ======================================

let vendas = JSON.parse(
    localStorage.getItem("vendas")
) || [];

// ======================================
// Carregar Produtos
// ======================================

function carregarProdutos() {

    const select = document.getElementById("produtoVenda");

    if (!select) return;

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
// Registrar Venda
// ======================================

function registrarVenda() {

    const indice = Number(
        document.getElementById("produtoVenda").value
    );

    const cliente =
    document.getElementById("clienteVenda").value;

    const quantidade = Number(
        document.getElementById("quantidadeVenda").value
    );

    const data =
    document.getElementById("dataVenda").value;

    if (!cliente || quantidade <= 0 || !data) {

        alert("Preencha todos os campos.");

        return;

    }

    let produtos = JSON.parse(
        localStorage.getItem("produtos")
    ) || [];

    if (quantidade > produtos[indice].quantidade) {

        alert("Estoque insuficiente.");

        return;

    }

    produtos[indice].quantidade -= quantidade;

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

    const valorUnitario = Number(
        produtos[indice].venda
    );

    vendas.push({

        data: data,

        produto: produtos[indice].produto,

        cliente: cliente,

        quantidade: quantidade,

        valor: valorUnitario,

        total: quantidade * valorUnitario

    });

    localStorage.setItem(

        "vendas",

        JSON.stringify(vendas)

    );

    listarVendas();

    limparFormulario();

    alert("Venda registrada com sucesso!");

}

// ======================================
// Listar Vendas
// ======================================

function listarVendas() {

    const tabela =
    document.getElementById("listaVendas");

    if (!tabela) return;

    tabela.innerHTML = "";

    vendas.forEach(venda => {

        tabela.innerHTML += `

        <tr>

        <td>${venda.data}</td>

        <td>${venda.produto}</td>

        <td>${venda.cliente}</td>

        <td>${venda.quantidade}</td>

        <td>${venda.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}</td>

        <td>${venda.total.toLocaleString("pt-BR", {
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

    document.getElementById("clienteVenda").value = "";

    document.getElementById("quantidadeVenda").value = "";

    document.getElementById("dataVenda").value = "";

}

// ======================================
// Inicialização
// ======================================

carregarProdutos();

listarVendas();
