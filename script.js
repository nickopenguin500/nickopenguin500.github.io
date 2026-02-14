// Simple Mobile Menu Toggle (Optional expansion)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    // You can add a class here to toggle a mobile menu in CSS
    alert("Mobile menu clicked! (Expand this logic in CSS if needed)");
});

// Console greeting for developers looking at your code
console.log("Welcome to Nicholas Weng's Portfolio. Built with vanilla HTML/CSS/JS.");

async function sendMessage() {
    const input = document.getElementById('user-input');
    const window = document.getElementById('chat-window');
    const message = input.value;
    if (!message) return;

    // Display user message
    // 1. Convert **bold** to <strong>bold</strong>
    let formattedResponse = data.response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 2. (Optional) Convert *italics* to <em>italics</em>
    formattedResponse = formattedResponse.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // 3. Display the formatted message
    window.innerHTML += `<div style="margin-bottom: 8px; color: #ff4d4d;"><strong>AI:</strong> ${formattedResponse}</div>`;    input.value = '';
    window.scrollTop = window.scrollHeight;

    try {
        // You will replace this URL after Phase 2
        const response = await fetch('https://personal-website-chatbot-backend.onrender.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        window.innerHTML += `<div style="margin-bottom: 8px; color: #ff4d4d;"><strong>AI:</strong> ${data.response}</div>`;
    } catch (error) {
        window.innerHTML += `<div style="color: #ff4d4d; font-size: 0.8rem;">Error: Backend not responding.</div>`;
    }
    window.scrollTop = window.scrollHeight;
}