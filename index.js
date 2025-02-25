let participants = [];

// Carregar os participantes do LocalStorage ao iniciar a página
document.addEventListener("DOMContentLoaded", function () {
    const storedParticipants = localStorage.getItem("participants");
    if (storedParticipants) {
        participants = JSON.parse(storedParticipants);
        renderParticipants();
    }

    const addButton = document.getElementById("addButton");
    if (addButton) {
        addButton.addEventListener("click", addParticipant);
    } else {
        console.error("Botão não encontrado!");
    }
});

function addParticipant() {
    const nameInput = document.getElementById("name");
    const cpfInput = document.getElementById("cpf");

    if (!nameInput || !cpfInput) {
        console.error("Os campos não foram encontrados!");
        return;
    }

    const name = nameInput.value.trim();
    const cpf = cpfInput.value.trim();

    if (name === "" || cpf === "") {
        alert("Preencha todos os campos!");
        return;
    }

    participants.push({ name, cpf });
    participants.sort((a, b) => a.name.localeCompare(b.name));

    saveParticipants(); // Salvar no LocalStorage
    renderParticipants();

    nameInput.value = "";
    cpfInput.value = "";
}

function renderParticipants() {
    const list = document.getElementById("participantsList");

    if (!list) {
        console.error("Elemento participantsList não encontrado!");
        return;
    }

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

    list.innerHTML = tableHTML;
}

// Função para salvar os participantes no LocalStorage
function saveParticipants() {
    localStorage.setItem("participants", JSON.stringify(participants));
}

// Função para editar um participante
function editParticipant(index) {
    const nameInput = document.getElementById("name");
    const cpfInput = document.getElementById("cpf");

    const participant = participants[index];
    nameInput.value = participant.name;
    cpfInput.value = participant.cpf;

    participants.splice(index, 1);
    saveParticipants(); // Atualizar o LocalStorage
    renderParticipants();
}

// Função para excluir um participante
function deleteParticipant(index) {
    participants.splice(index, 1);
    saveParticipants(); // Atualizar o LocalStorage
    renderParticipants();
}
