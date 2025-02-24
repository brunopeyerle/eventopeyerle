let participants = [];

document.addEventListener("DOMContentLoaded", function () {
    // Espera o DOM ser carregado
    const addButton = document.getElementById("addButton");

    if (addButton) {
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
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Adicionando cada participante à tabela com botões de editar e excluir
    participants.forEach((p, index) => {
        tableHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.cpf}</td>
                <td>
                    <button onclick="editParticipant(${index})">Editar</button>
                    <button onclick="deleteParticipant(${index})">Excluir</button>
                </td>
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

// Função para editar um participante
function editParticipant(index) {
    const nameInput = document.getElementById("name");
    const cpfInput = document.getElementById("cpf");

    const participant = participants[index];
    nameInput.value = participant.name;
    cpfInput.value = participant.cpf;

    // Remove o participante atual da lista para substituí-lo
    participants.splice(index, 1);

    // Atualiza a tabela
    renderParticipants();
}

// Função para excluir um participante
function deleteParticipant(index) {
    // Remove o participante da lista
    participants.splice(index, 1);

    // Atualiza a tabela
    renderParticipants();
}
