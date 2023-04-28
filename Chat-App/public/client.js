const socket = io();

let name;
const textarea = document.querySelector('#textarea');
const messageArea = document.querySelector('.message-area');

do{
    name = prompt('Please Enter your name.')
}while(!name)

textarea.addEventListener('keyup', (event) => {
    if(event.key === 'Enter'){
        sendMessage(event.target.value);
    }
});

const sendMessage = (message) =>{
    let msg = {
        user : name,
        message : message.trim(),
    }
    // Append 
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // send to server
    socket.emit('message',msg);
}

const appendMessage = (msg, type) =>{
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

// Receive Message 

socket.on('message', (msg) =>{
    appendMessage(msg,'incoming');
    scrollToBottom();
});

const scrollToBottom = () =>{
    messageArea.scrollTop = messageArea.scrollHeight;
}