// Ensure axios is available in your environment
const sendMessageToChatbot = async (message) => {
  try {
    // Send a POST request to the chatbot API
    const response = await axios.post('https://f6af-41-116-106-123.ngrok-free.app/api/chatbot/',
    {
      prompt: message  // Adjust the key from "message" to "prompt"
    },
    {
      headers: {
        'Content-Type': 'application/json'  // Set the Content-Type header
      }
    });

    // Log the response and update the chatbox with the chatbot's response
    console.log('Response:', response);
//    document.getElementById('chatbox').innerHTML += `<div>Farmie: ${response}</div>`;
  } catch (error) {
    console.error('There was an error!', error);
  }
};

// Function to handle chat messages
function handleChat() {
  document.getElementById('sendButton').addEventListener('click', function() {
    let userMessage = document.getElementById('userInput').value;
    if (userMessage.trim()) {
      document.getElementById('chatbox').innerHTML += `<div>You: ${userMessage}</div>`;
      document.getElementById('userInput').value = '';  // Clear input field

      // Send the message to the chatbot
      sendMessageToChatbot(userMessage);
    }
  });
}

// Call the function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  handleChat();
});
