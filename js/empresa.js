// ======================================
// EMPIRE ERP
// Configuração da Empresa
// ======================================

const EMPRESA = {

    nome: "EMPIRE",

    fantasia: "Empire – Império da Moda Online",

    versao: "1.0.0",

    slogan: "Gestão Inteligente para Moda",

    cnpj: "",

    inscricaoEstadual: "",

    telefone: "",

    whatsapp: "",

    email: "",

    site: "",

    endereco: "",

    cidade: "",

    estado: "",

    cep: "",

    pais: "Brasil",

    moeda: "BRL",

    idioma: "pt-BR",

    logo: "img/logo.png",

    favicon: "img/favicon.png"

};

// ======================================
// Inicializar Configuração
// ======================================

if (!localStorage.getItem("empresa")) {

    localStorage.setItem(
        "empresa",
        JSON.stringify(EMPRESA)
    );

}

// ======================================
// Obter Dados
// ======================================

function obterEmpresa() {

    return JSON.parse(
        localStorage.getItem("empresa")
    );

}

// ======================================
// Salvar Dados
// ======================================

function salvarEmpresa(dados) {

    localStorage.setItem(
        "empresa",
        JSON.stringify(dados)
    );

}
