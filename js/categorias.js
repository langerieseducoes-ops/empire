// ======================================
// EMPIRE ERP
// Módulo de Categorias
// ======================================


let categorias = JSON.parse(

    localStorage.getItem("categorias")

) || [];



let indiceCategoriaEdicao = -1;



// ======================================
// Salvar Categorias
// ======================================

function salvarCategorias(){


    localStorage.setItem(

        "categorias",

        JSON.stringify(categorias)

    );


}



// ======================================
// Salvar Categoria
// ======================================

function salvarCategoria(){


    const nome =

    document.getElementById("nomeCategoria").value;



    if(!nome){


        alert("Digite o nome da categoria.");

        return;


    }



    const categoria = {


        nome


    };



    if(indiceCategoriaEdicao === -1){


        categorias.push(categoria);


    }else{


        categorias[indiceCategoriaEdicao] = categoria;


        indiceCategoriaEdicao = -1;


    }



    salvarCategorias();


    listarCategorias();


    limparCategoria();


}




// ======================================
// Listar Categorias
// ======================================

function listarCategorias(){


    const tabela =

    document.getElementById("listaCategorias");



    if(!tabela){

        return;

    }



    tabela.innerHTML = "";



    categorias.forEach((categoria,index)=>{


        tabela.innerHTML += `


        <tr>


        <td>

        ${categoria.nome}

        </td>


        <td>


        <button onclick="editarCategoria(${index})">

        ✏️

        </button>



        <button onclick="excluirCategoria(${index})">

        🗑️

        </button>


        </td>


        </tr>


        `;


    });


}



// ======================================
// Editar Categoria
// ======================================

function editarCategoria(index){


    const categoria =

    categorias[index];



    document.getElementById("nomeCategoria").value =

    categoria.nome;



    indiceCategoriaEdicao = index;


}




// ======================================
// Excluir Categoria
// ======================================

function excluirCategoria(index){


    if(confirm("Deseja excluir esta categoria?")){


        categorias.splice(

            index,

            1

        );


        salvarCategorias();


        listarCategorias();


    }


}



// ======================================
// Limpar Campo
// ======================================

function limparCategoria(){


    document.getElementById("nomeCategoria").value = "";


}



// ======================================
// Inicialização
// ======================================

listarCategorias();
