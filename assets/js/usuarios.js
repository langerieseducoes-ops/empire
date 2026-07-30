/* =====================================================
   EMPIRE ERP PREMIUM REMASTER

   usuarios.js

===================================================== */

let usuarios =
JSON.parse(localStorage.getItem("usuarios")) || [];

let usuarioEditando = -1;

/* =====================================================
   SALVAR USUÁRIOS
===================================================== */

function salvarUsuariosLocal() {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}

/* =====================================================
   CADASTRAR / EDITAR USUÁRIO
===================================================== */

function salvarUsuario() {

    const nome = document.getElementById("nomeUsuario").value.trim();
    const login = document.getElementById("loginUsuario").value.trim();
    const senha = document.getElementById("senhaUsuario").value;
    const nivel = document.getElementById("nivelUsuario").value;
    const status = document.getElementById("statusUsuario").value;

    if (!nome || !login || !senha) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    const loginExistente = usuarios.some((u, i) =>
        u.login.toLowerCase() === login.toLowerCase() &&
        i !== usuarioEditando
    );

    if (loginExistente) {
        alert("Já existe um usuário com esse login.");
        return;
    }

    const usuario = {
        nome,
        login,
        senha,
        nivel,
        status
    };

    if (usuarioEditando === -1) {
        usuarios.push(usuario);
    } else {
        usuarios[usuarioEditando] = usuario;
        usuarioEditando = -1;
    }

    salvarUsuariosLocal();
    carregarUsuarios();
    atualizarResumoUsuarios();
    limparFormularioUsuario();

    alert("Usuário salvo com sucesso!");
}

/* =====================================================
   LIMPAR FORMULÁRIO
===================================================== */

function limparFormularioUsuario() {

    document.getElementById("nomeUsuario").value = "";
    document.getElementById("loginUsuario").value = "";
    document.getElementById("senhaUsuario").value = "";
    document.getElementById("nivelUsuario").value = "Administrador";
    document.getElementById("statusUsuario").value = "Ativo";

}
/* =====================================================
   CARREGAR USUÁRIOS
===================================================== */

function carregarUsuarios() {

    const tabela = document.getElementById("listaUsuarios");

    if (!tabela) return;

    tabela.innerHTML = "";

    if (usuarios.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="5">Nenhum usuário cadastrado</td>
            </tr>
        `;
        return;
    }

    usuarios.forEach((usuario, index) => {

        const classeStatus =
            usuario.status === "Ativo"
                ? "usuario-ativo"
                : "usuario-bloqueado";

        tabela.innerHTML += `
            <tr class="usuario-item">

                <td>${usuario.nome}</td>

                <td>${usuario.login}</td>

                <td>${usuario.nivel}</td>

                <td>
                    <span class="${classeStatus}">
                        ${usuario.status}
                    </span>
                </td>

                <td>

                    <button onclick="editarUsuario(${index})">
                        ✏️
                    </button>

                    <button onclick="excluirUsuario(${index})">
                        🗑️
                    </button>

                </td>

            </tr>
        `;

    });

}

/* =====================================================
   EDITAR
===================================================== */

function editarUsuario(index) {

    const usuario = usuarios[index];

    document.getElementById("nomeUsuario").value = usuario.nome;
    document.getElementById("loginUsuario").value = usuario.login;
    document.getElementById("senhaUsuario").value = usuario.senha;
    document.getElementById("nivelUsuario").value = usuario.nivel;
    document.getElementById("statusUsuario").value = usuario.status;

    usuarioEditando = index;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

/* =====================================================
   EXCLUIR
===================================================== */

function excluirUsuario(index) {

    if (!confirm("Deseja realmente excluir este usuário?")) {
        return;
    }

    usuarios.splice(index, 1);

    salvarUsuariosLocal();

    carregarUsuarios();

    atualizarResumoUsuarios();

}

/* =====================================================
   PESQUISA
===================================================== */

function pesquisarUsuario() {

    const texto = document
        .getElementById("pesquisaUsuario")
        .value
        .toLowerCase();

    document
        .querySelectorAll("#listaUsuarios tr")
        .forEach(function(linha) {

            linha.style.display =
                linha.innerText.toLowerCase().includes(texto)
                    ? ""
                    : "none";

        });

}
/* =====================================================
   ATUALIZAR RESUMO
===================================================== */

function atualizarResumoUsuarios() {

    const total = usuarios.length;

    const ativos = usuarios.filter(
        u => u.status === "Ativo"
    ).length;

    const bloqueados = usuarios.filter(
        u => u.status === "Bloqueado"
    ).length;

    const administradores = usuarios.filter(
        u => u.nivel === "Administrador"
    ).length;

    const campoTotal = document.getElementById("totalUsuarios");
    const campoAtivos = document.getElementById("usuariosAtivos");
    const campoAdmins = document.getElementById("usuariosAdmin");
    const campoBloqueados = document.getElementById("usuariosBloqueados");

    if (campoTotal) campoTotal.textContent = total;
    if (campoAtivos) campoAtivos.textContent = ativos;
    if (campoAdmins) campoAdmins.textContent = administradores;
    if (campoBloqueados) campoBloqueados.textContent = bloqueados;
}

/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    carregarUsuarios();

    atualizarResumoUsuarios();

});
