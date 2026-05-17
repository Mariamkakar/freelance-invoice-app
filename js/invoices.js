import { clients, invoices, saveInvoices } from "./data.js";

const form = document.getElementById("invoiceForm");
const list = document.getElementById("invoiceList");
const select = document.getElementById("clientSelect");

// POPULATE CLIENT DROPDOWN
function loadClients() {
  select.innerHTML = clients
    .map((c) => `<option value="${c.id}">${c.name}</option>`)
    .join("");
}

// INIT
loadClients();
renderInvoices();

// CREATE INVOICE
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const invoice = {
    id: Date.now(),
    clientId: Number(select.value),
    service: document.getElementById("service").value,
    description: document.getElementById("description").value,
    amount: Number(document.getElementById("amount").value),
    date: document.getElementById("date").value,
    paid: false,
  };

  invoices.push(invoice);
  saveInvoices();
  renderInvoices();
  form.reset();
});

// TOGGLE PAID
window.togglePaid = function (id) {
  const inv = invoices.find((i) => i.id === id);
  inv.paid = !inv.paid;
  saveInvoices();
  renderInvoices();
};

// DELETE
window.deleteInvoice = function (id) {
  const updated = invoices.filter((i) => i.id !== id);
  invoices.length = 0;
  invoices.push(...updated);
  saveInvoices();
  renderInvoices();
};

// RENDER
function renderInvoices() {
  list.innerHTML = invoices
    .map((i) => {
      const client = clients.find((c) => c.id === i.clientId);

      return `
      <div>
        <h3>${i.service}</h3>
        <p>${i.description}</p>
        <p>Client: ${client?.name || "Unknown"}</p>
        <p>Amount: $${i.amount}</p>
        <p>Status: ${i.paid ? "Paid" : "Unpaid"}</p>

        <button onclick="togglePaid(${i.id})">Toggle Paid</button>
        <button onclick="deleteInvoice(${i.id})">Delete</button>
      </div>
    `;
    })
    .join("");
}
