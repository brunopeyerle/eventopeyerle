let participants = [];

document.addEventListener("DOMContentLoaded", function () {
    // Espera o DOM ser carregado
    const addButton = document.getElementById("addButton");

    if (addButton) {
        addButton.addEventListener("click", addParticipant); // Atribui o evento ao botão
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

    if (name === "" || cpf === "") {
        alert("Preencha todos os campos!");
        return;
    }

    participants.push({ name, cpf });
    participants.sort((a, b) => a.name.localeCompare(b.name));

    renderParticipants();
    nameInput.value = ""; // Limpa o campo de nome
    cpfInput.value = ""; // Limpa o campo de CPF
}

function renderParticipants() {
    console.log("Atualizando a lista...");
    const list = document.getElementById("participantsList");

    if (!list) {
        console.error("Elemento participantsList não encontrado!");
        return;
    }

    // Criando a tabela
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

    // Adicionando cada participante na tabela
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

    list.innerHTML = tableHTML; // Atualiza a lista de participantes
}
