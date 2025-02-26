let participants = JSON.parse(localStorage.getItem("participants")) || [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addButton").addEventListener("click", addParticipant);
    renderParticipants();
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
    localStorage.setItem("participants", JSON.stringify(participants));

    renderParticipants();
    nameInput.value = "";
    cpfInput.value = "";
}

function editParticipant(index) {
    const newName = prompt("Digite o novo nome:", participants[index].name);
    const newCpf = prompt("Digite o novo CPF:", participants[index].cpf);

    if (newName && newCpf) {
        participants[index] = { name: newName.trim(), cpf: newCpf.trim() };
        localStorage.setItem("participants", JSON.stringify(participants));
        renderParticipants();
    }
}

function deleteParticipant(index) {
    if (confirm("Tem certeza que deseja remover este participante?")) {
        participants.splice(index, 1);
        localStorage.setItem("participants", JSON.stringify(participants));
        renderParticipants();
    }
}

function renderParticipants() {
    const list = document.getElementById("participantsList");
    list.innerHTML = participants
        .map((p, index) => `
            <tr>
                <td>${p.name}</td>
                <td>${p.cpf}</td>
                <td>
                    <button class="edit-button" onclick="editParticipant(${index})">✏ Editar</button>
                    <button class="delete-button" onclick="deleteParticipant(${index})">🗑 Excluir</button>
                </td>
            </tr>
        `)
        .join("");
}
