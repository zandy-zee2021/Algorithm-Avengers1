// Ensure axios is available in your environment

/**
 * Sends a message to the chatbot API and logs the response.
 * @param {string} message - The message to send to the chatbot.
 */
const sendMessageToChatbot = async (message) => {
  try {
    // Send a POST request to the chatbot API with the user message
    const response = await fetch('https://nerdma-b8ad4e234783.herokuapp.com/api/chatbot/', {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json' // Set the Content-Type header for the request
      },
      body: JSON.stringify({
        prompt: message  // Adjust the key from "message" to "prompt"
      })
    });

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Log the API response (for debugging)
    console.log('Response:', data);

    // Update the chatbox with the chatbot's response
    // document.getElementById('chatbox').innerHTML += `<div>Farmie: ${data.response}</div>`;
  } catch (error) {
    // Log any errors that occur during the request
    console.error('There was an error!', error);
  }
};

/**
 * Sets up event listener for sending chat messages.
 */
function handleChat() {
  // Add a click event listener to the send button
  document.getElementById('sendButton').addEventListener('click', function() {
    // Get the user input from the input field
    let userMessage = document.getElementById('userInput').value;

    // Check if the user message is not empty or just whitespace
    if (userMessage.trim()) {
      // Append the user message to the chatbox
      document.getElementById('chatbox').innerHTML += `<div>You: ${userMessage}</div>`;

      // Clear the input field for the next message
      document.getElementById('userInput').value = '';

      // Send the user message to the chatbot
      sendMessageToChatbot(userMessage);
    }
  });
}

// Initialize chat functionality when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  handleChat(); // Set up chat event listeners
});
