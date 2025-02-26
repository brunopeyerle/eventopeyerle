let participants = [];

// 🔄 Carregar os participantes do LocalStorage ao iniciar a página
document.addEventListener("DOMContentLoaded", function () {
    const storedParticipants = localStorage.getItem("participants");
    if (storedParticipants) {
        participants = JSON.parse(storedParticipants);
    } else {
        participants = [];
    }
    renderParticipants();

    const addButton = document.getElementById("addButton");
    if (addButton) {
        addButton.addEventListener("click", addParticipant);
    } else {
        console.error("Botão de adicionar não encontrado!");
    }
});

// ➕ Adicionar participante
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

    saveParticipants();
    renderParticipants();

    nameInput.value = "";
    cpfInput.value = "";
}

// 🔄 Renderizar tabela de participantes
function renderParticipants() {
    const list = document.getElementById("participantsList");

    if (!list) {
        console.error("Elemento participantsList não encontrado!");
        return;
    }

    if (participants.length === 0) {
        list.innerHTML = "<p>Nenhum participante inscrito.</p>";
        return;
    }

    let tableHTML = "<h3>Inscritos:</h3>";
    tableHTML += `
        <table>
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
                    <button onclick="editParticipant(${index})">✏️</button>
                    <button onclick="deleteParticipant(${index})">❌</button>
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

// 💾 Salvar participantes no LocalStorage
function saveParticipants() {
    localStorage.setItem("participants", JSON.stringify(participants));
}

// ✏️ Editar um participante
function editParticipant(index) {
    const nameInput = document.getElementById("name");
    const cpfInput = document.getElementById("cpf");

    const participant = participants[index];
    nameInput.value = participant.name;
    cpfInput.value = participant.cpf;

    participants.splice(index, 1);
    saveParticipants();
    renderParticipants();
}

// ❌ Excluir um participante
function deleteParticipant(index) {
    participants.splice(index, 1);
    saveParticipants();
    renderParticipants();
}
