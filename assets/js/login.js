/* =====================================================
   EMPIRE ERP PREMIUM REMASTER

   LOGIN.JS

===================================================== */


/* =====================================================
   USUÁRIO PADRÃO
===================================================== */


const USUARIO_PADRAO = {

    nome:"Administrador",

    usuario:"admin",

    senha:"123456",

    nivel:"Administrador",

    status:"Ativo"

};





/* =====================================================
   INICIALIZAR USUÁRIOS
===================================================== */


function iniciarUsuarios(){


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





/* =====================================================
   MOSTRAR / OCULTAR SENHA
===================================================== */


function mostrarSenha(){


    const campo =

    document.getElementById("senha");





    if(campo.type === "password"){


        campo.type = "text";


    }else{


        campo.type = "password";


    }


}





/* =====================================================
   STATUS LOGIN
===================================================== */


function alterarStatusLogin(texto){


    const status =

    document.getElementById("statusLogin");





    if(status){


        status.innerText = texto;


    }


}
/* =====================================================
   PROCESSAR LOGIN
===================================================== */


function entrarSistema(event){


    if(event){

        event.preventDefault();

    }



    const usuarioDigitado =

    document.getElementById("usuario").value.trim();



    const senhaDigitada =

    document.getElementById("senha").value;





    alterarStatusLogin(

        "Validando acesso..."

    );





    let usuarios =

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



        alterarStatusLogin(

            "Usuário ou senha inválidos."

        );



        alert(

            "Login inválido!"

        );



        return;


    }







    if(usuarioEncontrado.status !== "Ativo"){



        alterarStatusLogin(

            "Usuário bloqueado."

        );



        alert(

            "Este usuário está bloqueado."

        );



        return;


    }







    localStorage.setItem(

        "usuarioLogado",

        JSON.stringify(usuarioEncontrado)

    );

         registrarLogin(usuarioEncontrado);






    if(document.getElementById("lembrar").checked){



        localStorage.setItem(

            "usuarioLembrado",

            usuarioDigitado

        );



    }else{



        localStorage.removeItem(

            "usuarioLembrado"

        );



    }







    alterarStatusLogin(

        "Acesso autorizado!"

    );







    setTimeout(function(){



        window.location.href =

        "pages/dashboard.html";



    },800);



}






/* =====================================================
   RECUPERAR SENHA
===================================================== */


function recuperarSenha(){



    alert(

    "Procure um administrador do sistema para redefinir a senha."

    );



}
/* =====================================================
   CARREGAR USUÁRIO LEMBRADO
===================================================== */


function carregarUsuarioLembrado(){


    const usuarioSalvo =

    localStorage.getItem(

        "usuarioLembrado"

    );





    const campoUsuario =

    document.getElementById("usuario");





    if(usuarioSalvo && campoUsuario){


        campoUsuario.value = usuarioSalvo;


        document.getElementById("lembrar").checked = true;


    }


}






/* =====================================================
   REGISTRAR LOGIN
===================================================== */


function registrarLogin(usuario){



    let registros =

    JSON.parse(

        localStorage.getItem(

            "monitoramento"

        )

    ) || [];







    registros.unshift({


        acao:

        "Login realizado",



        usuario:

        usuario.nome,



        data:

        new Date().toLocaleString()



    });







    localStorage.setItem(

        "monitoramento",

        JSON.stringify(registros)

    );



}






/* =====================================================
   SAIR DO SISTEMA
===================================================== */


function sairSistema(){



    localStorage.removeItem(

        "usuarioLogado"

    );



    window.location.href =

    "../index.html";



}






/* =====================================================
   INICIALIZAÇÃO LOGIN
===================================================== */


document.addEventListener(

"DOMContentLoaded",



function(){



    iniciarUsuarios();



    carregarUsuarioLembrado();





    const formulario =

    document.getElementById(

        "formLogin"

    );





    if(formulario){



        formulario.addEventListener(

            "submit",

            entrarSistema

        );



    }



});
/* =====================================================
   CONTROLE DE TENTATIVAS
===================================================== */


let tentativasLogin =

parseInt(

    localStorage.getItem("tentativasLogin")

) || 0;



function registrarTentativaFalha(){


    tentativasLogin++;


    localStorage.setItem(

        "tentativasLogin",

        tentativasLogin

    );


}





function limparTentativas(){


    tentativasLogin = 0;


    localStorage.removeItem(

        "tentativasLogin"

    );


}






/* =====================================================
   VERIFICAR BLOQUEIO
===================================================== */


function verificarTentativas(){


    if(tentativasLogin >= 5){


        alterarStatusLogin(

            "Muitas tentativas. Acesso bloqueado."

        );


        return false;


    }



    return true;


}






/* =====================================================
   CARREGAR EMPRESA
===================================================== */


function carregarEmpresaLogin(){


    const empresa =

    JSON.parse(

        localStorage.getItem("empresa")

    );





    if(!empresa) return;





    const nome =

    document.getElementById("nomeEmpresa");





    const versao =

    document.getElementById("versaoSistema");





    if(nome){


        nome.innerText = empresa.fantasia;


    }





    if(versao){


        versao.innerText =

        "v" + empresa.versao;


    }


}






/* =====================================================
   FINALIZAÇÃO DO LOGIN
===================================================== */


document.addEventListener(

"DOMContentLoaded",



function(){



    iniciarUsuarios();



    carregarUsuarioLembrado();



    carregarEmpresaLogin();





    const formulario =

    document.getElementById("formLogin");





    if(formulario){


        formulario.addEventListener(

            "submit",

            entrarSistema

        );


    }



});
