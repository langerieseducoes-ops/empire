/* =====================================================
   EMPIRE ERP PREMIUM REMASTER

   APP.JS

   Controle geral do sistema

===================================================== */



/* =====================================================
   VERIFICAR LOGIN
===================================================== */


function verificarLogin(){


    const usuario =

    JSON.parse(

        localStorage.getItem(

            "usuarioLogado"

        )

    );





    const paginaLogin =

    window.location.pathname.includes(

        "index.html"

    );





    if(!usuario && !paginaLogin){



        window.location.href =

        "../index.html";



        return false;


    }





    return true;


}






/* =====================================================
   MOSTRAR USUARIO LOGADO
===================================================== */


function carregarUsuario(){



    const usuario =

    JSON.parse(

        localStorage.getItem(

            "usuarioLogado"

        )

    );





    const campo =

    document.getElementById(

        "usuarioInfo"

    );





    if(usuario && campo){



        campo.innerHTML = `

        <div class="usuario-logado">

        👤 ${usuario.nome}

        <br>

        <small>

        ${usuario.nivel}

        </small>

        </div>

        `;



    }



}
/* =====================================================
   SAIR DO SISTEMA
===================================================== */


function sairSistema(){


    const confirmar =

    confirm(

        "Deseja realmente sair do sistema?"

    );





    if(!confirmar){

        return;

    }





    localStorage.removeItem(

        "usuarioLogado"

    );





    window.location.href =

    "../index.html";


}






/* =====================================================
   MENU ATIVO
===================================================== */


function ativarMenu(){



    const links =

    document.querySelectorAll(

        ".menu a"

    );





    links.forEach(

        function(link){



            link.addEventListener(

                "click",

                function(){



                    links.forEach(

                        function(item){



                            item.classList.remove(

                                "active"

                            );



                        }

                    );





                    this.classList.add(

                        "active"

                    );



                }

            );



        }

    );



}






/* =====================================================
   CONFIGURACAO GLOBAL
===================================================== */


function carregarConfiguracaoGlobal(){



    const config =

    JSON.parse(

        localStorage.getItem(

            "configuracoes"

        )

    );





    if(!config){

        return;

    }







    if(config.tema === "claro"){



        document.body.classList.add(

            "tema-claro"

        );



    }



}
/* =====================================================
   DATA E HORA DO SISTEMA
===================================================== */


function atualizarDataHora(){


    const campo =

    document.getElementById(

        "dataHoraSistema"

    );





    if(!campo){

        return;

    }





    setInterval(

        function(){



            campo.innerText =

            new Date()

            .toLocaleString();



        },

        1000

    );



}






/* =====================================================
   CONTROLE DE PERFIL
===================================================== */


function verificarPermissao(){



    const usuario =

    JSON.parse(

        localStorage.getItem(

            "usuarioLogado"

        )

    );





    if(!usuario){

        return;

    }





    const bloqueados =

    document.querySelectorAll(

        "[data-permissao]"

    );





    bloqueados.forEach(

        function(item){



            const nivel =

            item.dataset.permissao;





            if(

            usuario.nivel !== nivel

            &&

            usuario.nivel !== "Administrador"

            ){



                item.style.display =

                "none";



            }



        }

    );



}






/* =====================================================
   INICIALIZAR SISTEMA
===================================================== */


document.addEventListener(

"DOMContentLoaded",



function(){



    verificarLogin();



    carregarUsuario();



    ativarMenu();



    carregarConfiguracaoGlobal();



    atualizarDataHora();



    verificarPermissao();



});
