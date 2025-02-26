let participants = JSON.parse(localStorage.getItem("participants")) || [];

document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("addButton");
    addButton.addEventListener("click", addParticipant);

    renderParticipants(); // Carregar participantes ao iniciar
});

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

function renderParticipants() {
    const list = document.getElementById("participantsList");
    list.innerHTML = ""; // Limpa a tabela antes de renderizar

    if (participants.length === 0) {
        list.innerHTML = "<tr><td colspan='3'>Nenhum participante inscrito ainda.</td></tr>";
    }

    participants.forEach((p, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${p.name}</td>
            <td>${p.cpf}</td>
            <td>
                <button class="action-button edit-button" onclick="editParticipant(${index})">✏️ Editar</button>
                <button class="action-button delete-button" onclick="deleteParticipant(${index})">🗑 Excluir</button>
            </td>
        `;

        list.appendChild(row);
    });
}

function editParticipant(index) {
    const newName = prompt("Novo nome:", participants[index].name);
    const newCpf = prompt("Novo CPF:", participants[index].cpf);

    if (newName !== null && newCpf !== null && newName.trim() !== "" && newCpf.trim() !== "") {
        participants[index].name = newName.trim();
        participants[index].cpf = newCpf.trim();
        saveParticipants();
        renderParticipants();
    }
}

function deleteParticipant(index) {
    if (confirm("Tem certeza que deseja excluir este participante?")) {
        participants.splice(index, 1);
        saveParticipants();
        renderParticipants();
    }
}

function saveParticipants() {
    localStorage.setItem("participants", JSON.stringify(participants));
}
