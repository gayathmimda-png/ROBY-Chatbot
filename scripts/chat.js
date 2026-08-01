// Collapsible Chat Widget Toggle
function toggleChat() {
    const widget = document.getElementById("chat-widget");
    const icon = document.getElementById("toggle-icon");
    
    widget.classList.toggle("closed");
    if (widget.classList.contains("closed")) {
        icon.innerHTML = '<i class="fa fa-chevron-up"></i>';
    } else {
        icon.innerHTML = '<i class="fa fa-chevron-down"></i>';
    }
}

// Time Helper Function (Fixed implicit global variables)
function getTime() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Scroll to bottom helper
function scrollToBottom() {
    const chatScroll = document.getElementById("chat-scroll");
    if (chatScroll) {
        chatScroll.scrollTop = chatScroll.scrollHeight;
    }
}

// First Bot Message Initialization
function firstBotMessage() {
    let firstMessage = "Hi! How can I help you today?";
    const chatbox = document.getElementById("chatbox");
    
    if (chatbox) {
        let botHtml = '<div class="botText"><span>' + firstMessage + '</span></div>';
        $("#chatbox").append(botHtml);
        
        let time = getTime();
        $("#chat-timestamp").append(time);
        scrollToBottom();
    }
}

// Typing Indicator Helpers
function showTypingIndicator() {
    $("#typing-indicator").css("display", "flex");
    scrollToBottom();
}

function hideTypingIndicator() {
    $("#typing-indicator").css("display", "none");
}

// Retrieves and renders bot response with typing delay
function getHardResponse(userText) {
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        let botResponse = getBotResponse(userText);
        let botHtml = '<div class="botText"><span>' + botResponse + '</span></div>';
        $("#chatbox").append(botHtml);
        scrollToBottom();
    }, 700);
}

// Processes user text input
function getResponse() {
    let userText = $("#textInput").val().trim();

    if (userText == "") {
        userText = "Help";
    }

    let userHtml = '<div class="userText"><span>' + userText + '</span></div>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    scrollToBottom();

    getHardResponse(userText);
}

// Quick Chip / Hero Button Handler
function quickSend(sampleText) {
    const widget = document.getElementById("chat-widget");
    if (widget && widget.classList.contains("closed")) {
        toggleChat();
    }
    
    let userHtml = '<div class="userText"><span>' + sampleText + '</span></div>';
    $("#chatbox").append(userHtml);
    scrollToBottom();

    getHardResponse(sampleText);
}

// Clear Chat History
function clearChat() {
    $("#chatbox").empty();
    $("#chat-timestamp").empty();
    firstBotMessage();
}

function sendButton() {
    getResponse();
}

// Initialize chat on document load
$(document).ready(function () {
    firstBotMessage();
});

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});

// Browser Environment Guard
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getTime };
}