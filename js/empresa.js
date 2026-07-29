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


    favicon: "img/favicon.png",


    tema: {


        principal: "#D4AF37",

        fundo: "#050505",

        grafite: "#181818",

        branco: "#FFFFFF"


    }


};



// ======================================
// Criar Configuração Inicial
// ======================================


if (!localStorage.getItem("empresa")) {


    localStorage.setItem(

        "empresa",

        JSON.stringify(EMPRESA)

    );


}



// ======================================
// Buscar Dados da Empresa
// ======================================


function obterEmpresa() {


    return JSON.parse(

        localStorage.getItem("empresa")

    );


}



// ======================================
// Atualizar Dados da Empresa
// ======================================


function salvarEmpresa(dados) {


    localStorage.setItem(

        "empresa",

        JSON.stringify(dados)

    );


}



// ======================================
// Mostrar Nome do Sistema
// ======================================


function nomeSistema(){


    const empresa = obterEmpresa();


    return empresa.nome +

    " - " +

    empresa.fantasia;


}
