// ======================================
// EMPIRE ERP
// Backup do Sistema
// ======================================

// ======================================
// Exportar Backup
// ======================================

function exportarBackup() {

    const backup = {};

    for (let i = 0; i < localStorage.length; i++) {

        const chave = localStorage.key(i);

        backup[chave] = localStorage.getItem(chave);

    }

    const dados = JSON.stringify(backup, null, 4);

    const blob = new Blob([dados], {
        type: "application/json"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    const data = new Date();

    const nomeArquivo =
        "EMPIRE_BACKUP_" +
        data.getFullYear() +
        "-" +
        String(data.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(data.getDate()).padStart(2, "0") +
        ".json";

    link.download = nomeArquivo;

    link.click();

    URL.revokeObjectURL(link.href);

    alert("Backup exportado com sucesso!");

}

// ======================================
// Importar Backup
// ======================================

function importarBackup() {

    const arquivo = document.getElementById("arquivoBackup").files[0];

    if (!arquivo) {

        alert("Selecione um arquivo de backup.");

        return;

    }

    const leitor = new FileReader();

    leitor.onload = function(e) {

        try {

            const backup = JSON.parse(e.target.result);

            localStorage.clear();

            Object.keys(backup).forEach(function(chave) {

                localStorage.setItem(

                    chave,

                    backup[chave]

                );

            });

            alert("Backup restaurado com sucesso!");

            window.location.href = "dashboard.html";

        } catch (erro) {

            alert("Arquivo de backup inválido.");

        }

    };

    leitor.readAsText(arquivo);

}
