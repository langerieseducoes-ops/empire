// ======================================
// EMPIRE ERP
// Monitoramento do Sistema
// ======================================

// ======================================
// Atualizar Monitoramento
// ======================================

function atualizarMonitoramento() {

    // Usuário logado
    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogado")
    );

    if (usuario) {

        document.getElementById("usuarioSistema").innerHTML =
        usuario.nome;

        document.getElementById("perfilSistema").innerHTML =
        usuario.perfil;

    }

    // Data e Hora
    document.getElementById("horaSistema").innerHTML =
    new Date().toLocaleString("pt-BR");

    // Produtos
    const produtos = JSON.parse(
        localStorage.getItem("produtos")
    ) || [];

    document.getElementById("produtosSistema").innerHTML =
    produtos.length;

    // Estoque
    let estoque = 0;

    produtos.forEach(function(produto){

        estoque += Number(
            produto.quantidade || 0
        );

    });

    document.getElementById("estoqueSistema").innerHTML =
    estoque;

    // Espaço utilizado
    let tamanho = 0;

    for(let i = 0; i < localStorage.length; i++){

        const chave = localStorage.key(i);

        tamanho += (
            localStorage.getItem(chave)?.length || 0
        );

    }

    document.getElementById("memoriaSistema").innerHTML =
    (tamanho / 1024).toFixed(2) + " KB";

    // Navegador

    document.getElementById("navegadorSistema").innerHTML =
    navigator.userAgent;

    // Idioma

    document.getElementById("idiomaSistema").innerHTML =
    navigator.language;

}

// ======================================
// Atualização Automática
// ======================================

atualizarMonitoramento();

setInterval(

    atualizarMonitoramento,

    1000

);
