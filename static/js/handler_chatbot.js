// Ensure axios is available in your environment
const sendMessageToChatbot = async (message) => {
  try {
    const response = await axios.post('/predict', { message });
    console.log('Response:', response.data.answer);
    // Update the chatbox with the chatbot's response
    document.getElementById('chatbox').innerHTML += `<div>Farmie: ${response.data.answer}</div>`;
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
