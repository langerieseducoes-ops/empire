// ======================================
// EMPIRE ERP
// Módulo de Usuários
// ======================================

let usuarios = JSON.parse(
    localStorage.getItem("usuarios")
) || [];

function listarUsuarios() {

    const tabela = document.querySelector("tbody");

    if (!tabela) return;

    tabela.innerHTML = "";

    usuarios.forEach((u, index) => {

        tabela.innerHTML += `

        <tr>

            <td>${u.nome}</td>

            <td>${u.usuario}</td>

            <td>${u.perfil}</td>

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

function salvarUsuario() {

    const nome = document.getElementById("nomeUsuario").value;
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const perfil = document.getElementById("perfil").value;

    if (!nome || !usuario || !senha) {

        alert("Preencha todos os campos.");
        return;

    }

    usuarios.push({
        nome,
        usuario,
        senha,
        perfil
    });

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    limparFormulario();

    listarUsuarios();

}

function editarUsuario(index) {

    const u = usuarios[index];

    document.getElementById("nomeUsuario").value = u.nome;
    document.getElementById("usuario").value = u.usuario;
    document.getElementById("senha").value = u.senha;
    document.getElementById("perfil").value = u.perfil;

}

function excluirUsuario(index) {

    if (confirm("Excluir este usuário?")) {

        usuarios.splice(index, 1);

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        listarUsuarios();

    }

}

function limparFormulario() {

    document.getElementById("nomeUsuario").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("perfil").selectedIndex = 0;

}

listarUsuarios();
