// Recupera os dados armazenados no localStorage
let participants = JSON.parse(localStorage.getItem("participants")) || [];

// Função que será chamada quando o formulário for enviado
document.getElementById("addButton").addEventListener("click", function () {
    const nameInput = document.getElementById("name");
    const cpfInput = document.getElementById("cpf");

    // Obtendo os valores dos inputs
    const name = nameInput.value.trim();
    const cpf = cpfInput.value.trim();

    // Verificando se os campos não estão vazios
    if (name === "" || cpf === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Adicionando o novo participante ao array
    participants.push({ name, cpf });
    participants.sort((a, b) => a.name.localeCompare(b.name)); // Ordenando pela ordem alfabética do nome

    // Limpando os campos de entrada
    nameInput.value = "";
    cpfInput.value = "";

    // Atualizando a lista na interface
    renderParticipants();

    // Salvando a lista atualizada no localStorage
    localStorage.setItem("participants", JSON.stringify(participants));
});

// Função que atualiza a tabela com os participantes
function renderParticipants() {
    const list = document.getElementById("participantsList");

    // Verificando se a lista existe
    if (!list) {
        console.error("Elemento de lista não encontrado.");
        return;
    }

    // Criando o HTML da tabela
    let tableHTML = "";
    participants.forEach((p, index) => {
        tableHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.cpf}</td>
                <td>
                    <button class="edit-button" onclick="editParticipant(${index})">Editar</button>
                    <button class="delete-button" onclick="deleteParticipant(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });

    // Atualizando o conteúdo da lista de participantes
    list.innerHTML = tableHTML;
}

// Função para editar um participante
function editParticipant(index) {
    const nameInput = document.getElementById("name");
    const cpfInput = document.getElementById("cpf");

    // Preenche os campos com os dados do participante selecionado
    nameInput.value = participants[index].name;
    cpfInput.value = participants[index].cpf;

    // Atualiza o botão de inscrição para editar
    document.getElementById("addButton").textContent = "Atualizar";

    // Alterando a função do botão para atualizar o participante
    document.getElementById("addButton").onclick = function () {
        const name = nameInput.value.trim();
        const cpf = cpfInput.value.trim();

        if (name === "" || cpf === "") {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        // Atualizando o participante no array
        participants[index] = { name, cpf };
        participants.sort((a, b) => a.name.localeCompare(b.name)); // Ordenando pela ordem alfabética

        // Limpando os campos
        nameInput.value = "";
        cpfInput.value = "";

        // Restaurando o texto original do botão
        document.getElementById("addButton").textContent = "Inscrever-se";

        // Atualizando a lista de participantes
        renderParticipants();

        // Salvando a lista atualizada no localStorage
        localStorage.setItem("participants", JSON.stringify(participants));
    };
}

// Função para excluir um participante
function deleteParticipant(index) {
    // Remover o participante do array
    participants.splice(index, 1);

    // Atualizando a lista de participantes
    renderParticipants();

    // Salvando a lista atualizada no localStorage
    localStorage.setItem("participants", JSON.stringify(participants));
}

// Renderizando os participantes ao carregar a página
renderParticipants();
