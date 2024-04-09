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

async function getUserByte() {
    var userName = localStorage.getItem('userName') ?? 'Guest';

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
    };

    console.log(options);
      
    try {
        const response = await fetch(`/api/score?playerName=${userName}`, options);
        scoreReply = await response.json();
    
        if (scoreReply.score == null || scoreReply.score == undefined) {
            localStorage.setItem('userByte', 25);
        } else {
            localStorage.setItem('userByte', scoreReply.score);
        }

      } catch {
        console.log("Error getting user byte.")
      }

      setUserByte();

}

function setUserByte() {
    const userByte = document.querySelector('.userByte');
    if (localStorage.getItem('userByte') == null || localStorage.getItem('userByte') == "undefined") {
        userByte.textContent = "32 Byte";
    } else {
        userByte.textContent = localStorage.getItem('userByte') + " Byte";
    }
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

if (localStorage.getItem("userByte" == null) || localStorage.getItem("userByte") == "undefined") {
    console.log("Getting user byte");
    getUserByte();
} else {
    setUserByte();
}

