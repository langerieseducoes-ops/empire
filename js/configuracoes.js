// ======================================
// EMPIRE ERP
// Configurações
// ======================================

// ======================================
// Carregar Configurações
// ======================================

function carregarConfiguracoes() {

    const empresa = obterEmpresa();

    document.getElementById("nome").value = empresa.nome || "";

    document.getElementById("fantasia").value = empresa.fantasia || "";

    document.getElementById("slogan").value = empresa.slogan || "";

    document.getElementById("cnpj").value = empresa.cnpj || "";

    document.getElementById("inscricaoEstadual").value = empresa.inscricaoEstadual || "";

    document.getElementById("telefone").value = empresa.telefone || "";

    document.getElementById("whatsapp").value = empresa.whatsapp || "";

    document.getElementById("email").value = empresa.email || "";

    document.getElementById("site").value = empresa.site || "";

    document.getElementById("endereco").value = empresa.endereco || "";

    document.getElementById("cidade").value = empresa.cidade || "";

    document.getElementById("estado").value = empresa.estado || "";

    document.getElementById("cep").value = empresa.cep || "";

    document.getElementById("pais").value = empresa.pais || "";

    document.getElementById("moeda").value = empresa.moeda || "";

    document.getElementById("idioma").value = empresa.idioma || "";

    document.getElementById("logo").value = empresa.logo || "";

    document.getElementById("favicon").value = empresa.favicon || "";

}

// ======================================
// Salvar Configurações
// ======================================

function salvarConfiguracoes() {

    const empresa = obterEmpresa();

    empresa.nome = document.getElementById("nome").value;

    empresa.fantasia = document.getElementById("fantasia").value;

    empresa.slogan = document.getElementById("slogan").value;

    empresa.cnpj = document.getElementById("cnpj").value;

    empresa.inscricaoEstadual = document.getElementById("inscricaoEstadual").value;

    empresa.telefone = document.getElementById("telefone").value;

    empresa.whatsapp = document.getElementById("whatsapp").value;

    empresa.email = document.getElementById("email").value;

    empresa.site = document.getElementById("site").value;

    empresa.endereco = document.getElementById("endereco").value;

    empresa.cidade = document.getElementById("cidade").value;

    empresa.estado = document.getElementById("estado").value;

    empresa.cep = document.getElementById("cep").value;

    empresa.pais = document.getElementById("pais").value;

    empresa.moeda = document.getElementById("moeda").value;

    empresa.idioma = document.getElementById("idioma").value;

    empresa.logo = document.getElementById("logo").value;

    empresa.favicon = document.getElementById("favicon").value;

    salvarEmpresa(empresa);

    alert("Configurações salvas com sucesso!");

}

// ======================================
// Restaurar Padrão
// ======================================

function restaurarConfiguracoes() {

    if (!confirm("Deseja restaurar as configurações padrão?")) {

        return;

    }

    localStorage.removeItem("empresa");

    location.reload();

}

// ======================================
// Inicialização
// ======================================

carregarConfiguracoes();
