let participants = [];

function addParticipant() {
  const nameInput = document.getElementById('name');
  const cpfInput = document.getElementById('cpf');
  const name = nameInput.value.trim();
  const cpf = cpfInput.value.trim();

  if (name === "" || cpf === "") {
    alert("Preencha todos os campos!");
    return;
  }

  participants.push({ name, cpf });
  participants.sort((a, b) => a.name.localeCompare(b.name));

  renderParticipants();
  nameInput.value = "";
  cpfInput.value = "";
}

function renderParticipants() {
  const list = document.getElementById('participantsList');
  list.innerHTML = "<h3>Inscritos:</h3>" +
    participants.map(p => `<p>${p.name} - ${p.cpf}</p>`).join('');
}
