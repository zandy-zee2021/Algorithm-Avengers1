/**
 * Chatbox class to handle chat functionality.
 */
class Chatbox {
    /**
     * Initializes the Chatbox instance.
     */
    constructor() {
        // Arguments for accessing DOM elements
        this.args = {
            openButton: document.querySelector('.chatbox__button'), // Button to open/close chatbox
            chatBox: document.querySelector('.chatbox__support'), // Chatbox container
            sendButton: document.querySelector('.send__button') // Button to send messages
        };

        this.state = false; // Tracks whether the chatbox is open or closed
        this.messages = []; // Array to hold chat messages
    }

    /**
     * Sets up event listeners for chatbox interactions.
     */
    display() {
        const { openButton, chatBox, sendButton } = this.args;

        // Toggle chatbox visibility on button click
        openButton.addEventListener('click', () => this.toggleState(chatBox));

        // Send message on send button click
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        // Send message on Enter key press in input field
        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    /**
     * Toggles the visibility of the chatbox.
     * @param {HTMLElement} chatBox - The chatbox element.
     */
    toggleState(chatBox) {
        this.state = !this.state; // Toggle state
        // Show or hide the chatbox based on the state
        if (this.state) {
            chatBox.classList.add('chatbox--active');
        } else {
            chatBox.classList.remove('chatbox--active');
        }
    }

    /**
     * Handles the send button click event, sending the user message to the chatbot.
     * @param {HTMLElement} chatBox - The chatbox element.
     */
    onSendButton(chatBox) {
        const textField = chatBox.querySelector('input'); // Get input field
        const text1 = textField.value; // Get user input value
        if (text1 === "") {
            return; // Do nothing if the input field is empty
        }

        // Add user message to messages array
        const msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        // Send the message to the chatbot API
        fetch('https://nerdma-b8ad4e234783.herokuapp.com/api/chatbot/', {
            method: 'POST',
            body: JSON.stringify({ prompt: text1 }), // Send message as JSON
            headers: {
                'Content-Type': 'application/json' // Set content type header
            },
        })
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            console.log(data); // Log API response (for debugging)
            const msg2 = { name: "Farmie", message: data }; // Add chatbot response to messages array
            this.messages.push(msg2);
            this.updateChatText(chatBox); // Update chatbox with new messages
            textField.value = ''; // Clear input field
        })
        .catch(error => {
            console.error('Error:', error); // Log errors
            this.updateChatText(chatBox); // Update chatbox even on error
            textField.value = ''; // Clear input field
        });
    }

    /**
     * Updates the chatbox with the current messages.
     * @param {HTMLElement} chatBox - The chatbox element.
     */
    updateChatText(chatBox) {
        let html = ''; // HTML string to hold the chat messages
        console.log(this.messages); // Log messages array (for debugging)

        // Iterate over messages in reverse order for latest messages at the bottom
        this.messages.slice().reverse().forEach(item => {
            // Append messages with appropriate styling
            if (item.name === "Farmie") {
                html += '<div class="messages__item messages__item--visitor">' + item.message.response + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatmessages = chatBox.querySelector('.chatbox__messages'); // Get chat messages container
        chatmessages.innerHTML = html; // Update chat messages container
    }
}

// Initialize chatbox functionality once the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chatBox = new Chatbox(); // Create a new Chatbox instance
    chatBox.display(); // Set up event listeners for chatbox

    // Set auction dates for elements with specific IDs
    const auctionDates = [
        { id: 'date1', date: '2024-08-10' },
        { id: 'date2', date: '2024-08-15' },
        { id: 'date3', date: '2024-08-20' },
        { id: 'date4', date: '2024-08-25' },
    ];

    auctionDates.forEach(auction => {
        const dateElement = document.getElementById(auction.id); // Get date element by ID
        if (dateElement) {
            dateElement.textContent = auction.date; // Set the date content
        }
    });

    // Highlight the active navigation link based on the current path
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link'); // Get all navigation links
    navLinks.forEach(link => {
        if (link.href.includes(currentPath)) {
            link.classList.add('active'); // Add 'active' class to current link
        }
    });
});
