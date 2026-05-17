const form = document.getElementById("clientForm");

const clientsTable = document.getElementById("clientsTable");

// CLIENTS ARRAY
let clients = JSON.parse(localStorage.getItem("clients")) || [];

// EDIT MODE
let editId = null;

// START APP
async function init() {
  // FIRST TIME API LOAD
  if (clients.length === 0) {
    try {
      const response = await fetch(
        "https://randomuser.me/api/?results=5&nat=us",
      );

      const data = await response.json();

      clients = data.results.map((user) => ({
        id: Date.now() + Math.random(),

        name: user.name.first + " " + user.name.last,

        email: user.email,

        company: "Freelance Inc.",

        notes: "New Client",
      }));

      saveClients();
    } catch (error) {
      console.log(error);
    }
  }

  renderClients();
}

init();

// SAVE LOCALSTORAGE
function saveClients() {
  localStorage.setItem("clients", JSON.stringify(clients));
}

// RENDER CLIENTS
function renderClients() {
  clientsTable.innerHTML = "";

  clients.forEach((client) => {
    clientsTable.innerHTML += `

      <tr>

        <td>${client.name}</td>

        <td>${client.email}</td>

        <td>${client.company}</td>

        <td>${client.notes}</td>

        <td>

          <button
            class="edit-btn"
            onclick="editClient(${client.id})"
          >
            Edit
          </button>

          <button
            class="delete-btn"
            onclick="deleteClient(${client.id})"
          >
            Delete
          </button>

        </td>

      </tr>

    `;
  });
}

// ADD OR UPDATE CLIENT
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;

  const email = document.getElementById("email").value;

  const company = document.getElementById("company").value;

  const notes = document.getElementById("notes").value;

  // VALIDATION
  if (!name || !email) {
    alert("Please fill all required fields");

    return;
  }

  // EDIT CLIENT
  if (editId !== null) {
    const client = clients.find((c) => c.id === editId);

    client.name = name;

    client.email = email;

    client.company = company;

    client.notes = notes;

    editId = null;
  } else {
    // ADD CLIENT
    clients.push({
      id: Date.now(),

      name,

      email,

      company: company || "Freelance Inc.",

      notes: notes || "No Notes",
    });
  }

  saveClients();

  renderClients();

  form.reset();
});

// DELETE CLIENT
window.deleteClient = function (id) {
  clients = clients.filter((client) => client.id !== id);

  saveClients();

  renderClients();
};

// EDIT CLIENT
window.editClient = function (id) {
  const client = clients.find((c) => c.id === id);

  document.getElementById("name").value = client.name;

  document.getElementById("email").value = client.email;

  document.getElementById("company").value = client.company;

  document.getElementById("notes").value = client.notes;

  editId = id;
};
