// Ensure axios is available in your environment
const sendMessageToChatbot = async (message) => {
  try {
    const response = await axios.post('http://localhost:8000/api/chatbot/', { message });
    console.log('Response:', response.data.response);
    // Update the chatbox with the chatbot's response
    document.getElementById('chatbox').innerHTML += `<div>Farmie: ${response.data.response}</div>`;
  } catch (error) {
    console.error('There was an error!', error);
  }
};

// Function to handle chat messages
function handleChat() {
  document.getElementById('sendButton').addEventListener('click', function() {
    let userMessage = document.getElementById('userInput').value;
    document.getElementById('chatbox').innerHTML += `<div>You: ${userMessage}</div>`;
    document.getElementById('userInput').value = '';  // Clear input field

    // Send the message to the chatbot
    sendMessageToChatbot(userMessage);
  });
}

// Call the function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  handleChat();
});
