// ======================================
// EMPIRE ERP
// Controle do Dashboard
// ======================================



// ======================================
// Verificar Sessão
// ======================================


const usuarioLogado = JSON.parse(

    localStorage.getItem("usuarioLogado")

);



if (!usuarioLogado) {


    window.location.href = "index.html";


}




// ======================================
// Carregar Usuário
// ======================================


function carregarUsuario() {


    const area = document.getElementById(
        "usuarioInfo"
    );


    if(area) {


        area.innerHTML = `

        👤 <strong>
        ${usuarioLogado.nome}
        </strong>

        <br>

        Perfil:
        ${usuarioLogado.perfil}

        <br>

        <span id="dataHora"></span>

        `;


    }


}




// ======================================
// Informações Empresa
// ======================================


function carregarEmpresa() {


    const empresa = obterEmpresa();



    const nome = document.getElementById(
        "nomeEmpresa"
    );


    const versao = document.getElementById(
        "versaoSistema"
    );



    if(nome) {


        nome.innerHTML =
        empresa.fantasia;


    }



    if(versao) {


        versao.innerHTML =
        empresa.versao;


    }


}




// ======================================
// Relógio
// ======================================


function atualizarHora() {


    const hora = document.getElementById(
        "dataHora"
    );


    if(hora) {


        hora.innerHTML =

        new Date().toLocaleString(
            "pt-BR"
        );


    }


}




// ======================================
// Sair do Sistema
// ======================================


function sairSistema() {


    localStorage.removeItem(
        "usuarioLogado"
    );


    window.location.href =
    "index.html";


}




// ======================================
// Carregar Dados dos Cards
// ======================================


function atualizarCards(){


    const produtos = JSON.parse(

        localStorage.getItem("produtos")

    ) || [];



    let estoque = 0;



    produtos.forEach(produto => {


        estoque +=

        Number(produto.quantidade || 0);


    });



    const totalProdutos =
    document.getElementById("totalProdutos");


    const totalEstoque =
    document.getElementById("totalEstoque");



    if(totalProdutos){

        totalProdutos.innerHTML =
        produtos.length;

    }



    if(totalEstoque){

        totalEstoque.innerHTML =
        estoque;

    }


}




// ======================================
// Inicialização
// ======================================


carregarUsuario();

carregarEmpresa();

atualizarCards();

atualizarHora();



setInterval(

    atualizarHora,

    1000

);
