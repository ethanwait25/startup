const defaultPromptLength = 25;
const battlePromptLength = 35;

function getUserName() {
    return localStorage.getItem('userName') ?? 'Guest';
}

function getSynthPrompt(len) {
    const fullPrompt = localStorage.getItem('prompt') ?? 'Guest Avatar Name';
    var reducedPrompt = fullPrompt.substring(0, len);
    if (fullPrompt.length > len) {
        reducedPrompt += "...";
    }
    return reducedPrompt;
}

const userNameEl = document.querySelector('.userName');

if (window.location.pathname.split("/").pop() == "battle.html") {
    userNameEl.textContent = getSynthPrompt(battlePromptLength);
} else {
    userNameEl.textContent = getSynthPrompt(defaultPromptLength);
}

const userAvatar = document.querySelector('#userAvatar');

if (localStorage.getItem('imageUrl') != null) {
    userAvatar.src = localStorage.getItem('imageUrl');
}