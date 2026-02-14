// Simple Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // Toggle the .active class on nav-links (make sure to add .active logic in CSS if needed)
        navLinks.classList.toggle('active'); 
        // alert("Mobile menu clicked!"); // Uncomment if you want the popup back
    });
}

// Console greeting
console.log("Welcome to Nicholas Weng's Portfolio. Built with vanilla HTML/CSS/JS.");

async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window'); // Renamed from 'window' to avoid crashes
    const message = input.value;
    
    if (!message) return;

    // 1. Display User Message
    chatWindow.innerHTML += `<div style="margin-bottom: 8px; text-align: right; color: #ccc;"><strong>You:</strong> ${message}</div>`;
    input.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        // 2. Send Request to Backend
        // Make sure this URL matches your Render URL exactly
        const response = await fetch('https://personal-website-chatbot-backend.onrender.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();

        // 3. Format the AI Response (Markdown -> HTML)
        let rawText = data.response || "No response received.";
        
        // Format Bold: **text** -> <strong>text</strong>
        let formattedText = rawText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Format Italics: *text* -> <em>text</em>
        formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Format Line Breaks: \n -> <br>
        formattedText = formattedText.replace(/\n/g, '<br>');
        
        // Format Bullet Points: (New line followed by *) -> Bullet
        formattedText = formattedText.replace(/<br>\*/g, '<br>• ');

        // 4. Display AI Message
        chatWindow.innerHTML += `<div style="margin-bottom: 12px; color: #ff4d4d; text-align: left; line-height: 1.5;"><strong>AI:</strong> ${formattedText}</div>`;

    } catch (error) {
        console.error("Backend Error:", error);
        chatWindow.innerHTML += `<div style="color: #ff4d4d; font-size: 0.8rem;">Error: Backend not responding. Please check your internet or try again later.</div>`;
    }

    // 5. Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Allow pressing "Enter" to send
document.getElementById('user-input').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});