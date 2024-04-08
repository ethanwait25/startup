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
    console.log("here!");
    userNameEl.textContent = getSynthPrompt(battlePromptLength);
} else {
    console.log("here 2!");
    userNameEl.textContent = getSynthPrompt(defaultPromptLength);
}