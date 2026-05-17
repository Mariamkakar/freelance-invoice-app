import { clients, saveClients } from "./data.js";

// FETCH CLIENTS API
export async function fetchClientsAPI() {
  try {
    const res = await fetch("https://randomuser.me/api/?results=5&nat=us");
    const data = await res.json();

    const formatted = data.results.map((user) => ({
      id: Date.now() + Math.random(),
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      company: "Freelance Inc.",
      notes: "",
    }));

    clients.push(...formatted);
    saveClients();
  } catch (error) {
    console.error("API Error:", error);
  }
}

// ZEN QUOTES
export async function fetchQuote() {
  try {
    const res = await fetch("https://zenquotes.io/api/quotes");
    const data = await res.json();

    const random = data[Math.floor(Math.random() * data.length)];

    return {
      text: random.q,
      author: random.a || "Unknown",
    };
  } catch (error) {
    return {
      text: "Stay consistent and keep building.",
      author: "System",
    };
  }
}
