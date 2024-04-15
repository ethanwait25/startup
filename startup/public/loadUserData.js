const defaultPromptLength = 25;
const battlePromptLength = 35;

const userJson = localStorage.getItem('user');
const avatarJson = localStorage.getItem('avatar');
const user = JSON.parse(userJson);
const avatar = JSON.parse(avatarJson);

(async () => {
    if (user) {
      setDisplay('loginControls', 'none');
      setDisplay('playControls', 'block');
    } else {
      setDisplay('loginControls', 'block');
      setDisplay('playControls', 'none');
    }
})();

function getUserName() {
    return user.userName ?? 'Guest';
}

function getSynthPrompt(len) {
    const fullPrompt = avatar.prompt ?? 'Guest Avatar Name';
    var reducedPrompt = fullPrompt.substring(0, len);
    if (fullPrompt.length > len) {
        reducedPrompt += "...";
    }
    return reducedPrompt;
}

async function getUserByte() {
    var userName = user.userName ?? 'Guest';

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
    if (avatar.byte == null || avatar.byte == "null") {
        userByte.textContent = "Byte";
    } else {
        userByte.textContent = avatar.byte + " Byte";
    }
}

const userNameEl = document.querySelector('.userName');

if (window.location.pathname.split("/").pop() == "battle.html") {
    userNameEl.textContent = getSynthPrompt(battlePromptLength);
} else {
    userNameEl.textContent = getSynthPrompt(defaultPromptLength);
}

const userAvatar = document.querySelector('#userAvatar');

if (avatar.image != null) {
    userAvatar.src = avatar.image;
}

if (avatar.byte == null || avatar.byte == "undefined") {
    console.log("Getting user byte");
    getUserByte();
} else {
    setUserByte();
}

function setDisplay(controlId, display) {
    const displayEls = document.querySelectorAll(`.${controlId}`);
    displayEls.forEach(item => {
        item.style.display = display;
    });
}
