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
    const chatWindow = document.getElementById('chat-window'); // Changed variable name to avoid conflicts
    const message = input.value;
    if (!message) return;

    // Display user message
    chatWindow.innerHTML += `<div style="margin-bottom: 8px;"><strong>You:</strong> ${message}</div>`;
    input.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        // Make the request to your backend
        const response = await fetch('https://personal-website-chatbot-backend.onrender.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        
        // 1. THIS LINE MUST COME FIRST (It defines 'data')
        const data = await response.json();

        // 2. NOW we can format the text (convert **bold** to <strong>)
        // Check if data.response exists to prevent errors
        let rawText = data.response || "No response received.";
        
        // Replace **text** with <strong>text</strong>
        let formattedResponse = rawText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Optional: Replace *italics* with <em>italics</em>
        formattedResponse = formattedResponse.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // 3. Display the AI response
        chatWindow.innerHTML += `<div style="margin-bottom: 8px; color: #ff4d4d;"><strong>AI:</strong> ${formattedResponse}</div>`;
        
    } catch (error) {
        console.error(error); // Print error to console for debugging
        chatWindow.innerHTML += `<div style="color: #ff4d4d; font-size: 0.8rem;">Error: Backend not responding.</div>`;
    }
    
    chatWindow.scrollTop = chatWindow.scrollHeight;
}