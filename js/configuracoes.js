// ======================================
// EMPIRE ERP
// Configurações
// ======================================

// Carregar dados da empresa
function carregarConfiguracoes() {

    const empresa = obterEmpresa();

    document.getElementById("nome").value = empresa.nome || "";
    document.getElementById("fantasia").value = empresa.fantasia || "";
    document.getElementById("slogan").value = empresa.slogan || "";
    document.getElementById("cnpj").value = empresa.cnpj || "";
    document.getElementById("telefone").value = empresa.telefone || "";
    document.getElementById("whatsapp").value = empresa.whatsapp || "";
    document.getElementById("email").value = empresa.email || "";
    document.getElementById("site").value = empresa.site || "";

}

// Salvar configurações
function salvarConfiguracoes() {

    const empresa = obterEmpresa();

    empresa.nome = document.getElementById("nome").value;
    empresa.fantasia = document.getElementById("fantasia").value;
    empresa.slogan = document.getElementById("slogan").value;
    empresa.cnpj = document.getElementById("cnpj").value;
    empresa.telefone = document.getElementById("telefone").value;
    empresa.whatsapp = document.getElementById("whatsapp").value;
    empresa.email = document.getElementById("email").value;
    empresa.site = document.getElementById("site").value;

    salvarEmpresa(empresa);

    alert("Configurações salvas com sucesso!");

}

// Inicialização
carregarConfiguracoes();
