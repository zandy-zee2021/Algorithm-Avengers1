class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));

        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatBox) {
        this.state = !this.state;
        // Show or hide the box
        if (this.state) {
            chatBox.classList.add('chatbox--active');
        } else {
            chatBox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatBox) {
        var textField = chatBox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        fetch('https://f6af-41-116-106-123.ngrok-free.app/api/chatbot/', {
            method: 'POST',
            body: JSON.stringify({ prompt: text1 }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let msg2 = { name: "Farmie", message: data };
            this.messages.push(msg2);
            this.updateChatText(chatBox);
            textField.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            this.updateChatText(chatBox);
            textField.value = '';
        });
    }

    updateChatText(chatBox) {
        var html = '';
        console.log(this.messages);
        this.messages.slice().reverse().forEach(function(item) {

            if (item.name === "Farmie") {
                console.log(item.message.response);
                html += '<div class="messages__item messages__item--visitor">' + item.message.response + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });
        const chatmessages = chatBox.querySelector('.chatbox__messages');
        chatmessages.innerHTML = html;
    }
}

// Initialize the Chatbox
document.addEventListener('DOMContentLoaded', () => {
    const chatBox = new Chatbox();
    chatBox.display();
});
