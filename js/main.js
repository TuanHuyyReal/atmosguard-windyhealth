import { GoogleGenAI } from "https://cdn.jsdelivr.net/npm/@google/genai@1.21.0/+esm";
const ai = new GoogleGenAI({
  apiKey: "AIzaSyANn_NPFr04Th4XyRgn6TjFxmyJusf8ha8",
});
async function fetchBotResponse(userInput) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: userInput,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        }
      },
      maxOutputTokens: 400,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Sorry, I couldn't get a response from the bot.";
  }
}
function sendMessage() {
  const input = document.getElementById("chatbot-input");
  const body = document.querySelector(".chatbot-body");
  if (input.value.trim() !== "") {
    const userMsg = document.createElement("div");
    userMsg.className = "chatbot-message user mb-2 text-end";
    userMsg.innerHTML = `<span>${input.value}</span>`;
    body.appendChild(userMsg);
    body.scrollTop = body.scrollHeight;
    input.value = "";
    // Simulate bot response
    setTimeout(() => {
      const botMsg = document.createElement("div");
      botMsg.className = "chatbot-message bot mb-2";
      botMsg.innerHTML = fetchBotResponse(userMsg.textContent).then(
        (response) => {
          botMsg.innerHTML = `<span>${response}</span>`;
          body.appendChild(botMsg);
          body.scrollTop = body.scrollHeight;
        }
      );
    }, 700);
  }
}
document
  .querySelector(".chatbot-footer")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    sendMessage();
  });
document.querySelectorAll(".toggle-chatbot").forEach((toggle) => {
  toggle.addEventListener("click", function () {
    const chatbot = document.getElementById("chatbot");
    chatbot.classList.toggle("hidden");
  });
});
// Initialize chatbot as hidden
document.getElementById("chatbot").classList.add("hidden");

// search bar
const logo = document.getElementById("logo");
const search_bar = document.querySelector(".search-bar");
logo.addEventListener("click", function () {
  search_bar.classList.toggle("active");
});
document.querySelectorAll(".toggle-search-bar").forEach((button) => {
  button.addEventListener("click", function () {
    search_bar.classList.remove("active");
  });
});

// close chatbot when clicking outside
document.addEventListener("click", function (event) {
  const chatbot = document.getElementById("chatbot");
  if (chatbot.style.display === "block" && !chatbot.contains(event.target)) {
    chatbot.style.display = "none";
  }
});
