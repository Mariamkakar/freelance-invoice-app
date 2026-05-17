import { clients, invoices } from "./data.js";
import { fetchQuote } from "./utils.js";

// STATS
document.getElementById("totalClients").textContent = clients.length;
document.getElementById("totalInvoices").textContent = invoices.length;

const revenue = invoices.reduce((sum, i) => sum + i.amount, 0);
document.getElementById("totalRevenue").textContent = revenue;

const paid = invoices.filter((i) => i.paid).length;
const unpaid = invoices.filter((i) => !i.paid).length;

document.getElementById("paidCount").textContent = paid;
document.getElementById("unpaidCount").textContent = unpaid;

// QUOTE
const quote = await fetchQuote();

document.getElementById("quoteText").textContent = quote.text;
document.getElementById("quoteAuthor").textContent = "- " + quote.author;
