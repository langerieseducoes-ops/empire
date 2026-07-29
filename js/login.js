// ======================================
// EMPIRE ERP
// Sistema de Login
// ======================================


const USUARIO_PADRAO = {

    usuario: "admin",

    senha: "123456",

    nome: "Administrador",

    perfil: "Administrador"

};


// Criar usuário inicial

if (!localStorage.getItem("usuarios")) {

    localStorage.setItem(
        "usuarios",
        JSON.stringify([USUARIO_PADRAO])
    );

}



// Login

function entrar(){


    let usuario =
    document.getElementById("usuario").value;


    let senha =
    document.getElementById("senha").value;



    let usuarios = JSON.parse(

        localStorage.getItem("usuarios")

    );



    let encontrado = usuarios.find(

        u =>

        u.usuario === usuario &&

        u.senha === senha

    );



    if(encontrado){


        localStorage.setItem(

            "usuarioLogado",

            JSON.stringify(encontrado)

        );


        window.location.href =
        "dashboard.html";


    }else{


        alert(
            "Usuário ou senha incorretos."
        );


    }


}
