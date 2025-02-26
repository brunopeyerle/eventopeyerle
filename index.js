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

    document.getElementById("addButton").addEventListener("click", addParticipant);
});

// ➕ Adicionar participante
function addParticipant() {
    const nameInput = document.getElementById("name");
    const cpfInput = document.getElementById("cpf");

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
    list.innerHTML = "";

    if (participants.length === 0) {
        list.innerHTML = "<tr><td colspan='3' style='text-align:center;'>Nenhum participante inscrito.</td></tr>";
        return;
    }

    participants.forEach((p, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${p.name}</td>
            <td>${p.cpf}</td>
            <td>
                <button class="action-button edit-button" onclick="editParticipant(${index})">✏️</button>
                <button class="action-button delete-button" onclick="deleteParticipant(${index})">❌</button>
            </td>
        `;

        list.appendChild(row);
    });
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

    deleteParticipant(index);
}

// ❌ Excluir um participante
function deleteParticipant(index) {
    participants.splice(index, 1);
    saveParticipants();
    renderParticipants();
}
