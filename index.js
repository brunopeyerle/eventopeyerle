let participants = [];

document.addEventListener("DOMContentLoaded", function () {
    // Espera o DOM ser carregado
    const addButton = document.getElementById("addButton");

    if (addButton) {
        // Associa a função ao evento de clique
        addButton.addEventListener("click", addParticipant);
    } else {
        console.error("Botão não encontrado!");
    }
});

function addParticipant() {
    console.log("Botão foi clicado!"); // Para verificar no console se está funcionando

    const nameInput = document.getElementById("name");
    const cpfInput = document.getElementById("cpf");

    if (!nameInput || !cpfInput) {
        console.error("Os campos não foram encontrados!");
        return;
    }

    const name = nameInput.value.trim();
    const cpf = cpfInput.value.trim();

    // Verifica se os campos estão preenchidos
    if (name === "" || cpf === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Adiciona o participante à lista e ordena por nome
    participants.push({ name, cpf });
    participants.sort((a, b) => a.name.localeCompare(b.name));

    // Atualiza a tabela
    renderParticipants();

    // Limpa os campos após o envio
    nameInput.value = "";
    cpfInput.value = "";
}

function renderParticipants() {
    console.log("Atualizando a lista...");

    const list = document.getElementById("participantsList");

    if (!list) {
        console.error("Elemento participantsList não encontrado!");
        return;
    }

    // Criando a tabela de participantes
    let tableHTML = "<h3>Inscritos:</h3>";
    tableHTML += `
        <table border="1">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Adicionando cada participante à tabela
    participants.forEach(p => {
        tableHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.cpf}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    // Insere a tabela gerada no HTML
    list.innerHTML = tableHTML;
}
