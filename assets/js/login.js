/* =====================================================
   EMPIRE ERP
   LOGIN.JS
===================================================== */


/* USUARIO PADRAO */

const USUARIO_PADRAO = {

    nome: "Administrador",

    usuario: "admin",

    senha: "123456",

    nivel: "Administrador",

    status: "ativo"

};





/* CRIAR USUARIO INICIAL */

function criarUsuarioInicial(){


    let usuarios =

    JSON.parse(

        localStorage.getItem("usuarios")

    ) || [];





    if(usuarios.length === 0){


        usuarios.push(

            USUARIO_PADRAO

        );



        localStorage.setItem(

            "usuarios",

            JSON.stringify(usuarios)

        );


    }


}






/* MOSTRAR SENHA */

function mostrarSenha(){


    const campo =

    document.getElementById("senha");



    if(campo.type === "password"){


        campo.type = "text";


    }else{


        campo.type = "password";


    }


}






/* FAZER LOGIN */

function entrar(){



    const usuarioDigitado =

    document.getElementById("usuario").value;



    const senhaDigitada =

    document.getElementById("senha").value;





    const usuarios =

    JSON.parse(

        localStorage.getItem("usuarios")

    ) || [];





    const usuarioEncontrado =

    usuarios.find(

        function(usuario){


            return (

                usuario.usuario === usuarioDigitado

                &&

                usuario.senha === senhaDigitada

            );


        }

    );





    if(!usuarioEncontrado){


        alert(

            "Usuario ou senha incorretos"

        );


        return;


    }






    if(usuarioEncontrado.status === "bloqueado"){


        alert(

            "Usuario bloqueado"

        );


        return;


    }






    localStorage.setItem(

        "usuarioLogado",

        JSON.stringify(usuarioEncontrado)

    );





    window.location.href =

    "pages/dashboard.html";



}







/* INICIAR LOGIN */

document.addEventListener(

"DOMContentLoaded",



function(){



    criarUsuarioInicial();





    const formulario =

    document.getElementById(

        "formLogin"

    );





    if(formulario){



        formulario.addEventListener(

            "submit",

            function(event){



                event.preventDefault();



                entrar();



            }

        );


    }



});
