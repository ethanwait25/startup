const defaultPromptLength = 25;
const battlePromptLength = 35;

const userJson = localStorage.getItem('user');
const avatarJson = localStorage.getItem('avatar');
const user = JSON.parse(userJson);
const avatar = JSON.parse(avatarJson);

const userNameEl = document.querySelector('.userName');
const userAvatar = document.querySelector('#userAvatar');

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

function setUserByte() {
    const userByte = document.querySelector('.userByte');
    if (avatar.byte == null || avatar.byte == "null") {
        userByte.textContent = "Byte";
    } else {
        userByte.textContent = avatar.byte + " Byte";
    }
}

if (window.location.pathname.split("/").pop() == "battle.html") {
    userNameEl.textContent = getSynthPrompt(battlePromptLength);
} else {
    userNameEl.textContent = getSynthPrompt(defaultPromptLength);
}

if (avatar.image != null) {
    userAvatar.src = avatar.image;
}

setUserByte();

function setDisplay(controlId, display) {
    const displayEls = document.querySelectorAll(`.${controlId}`);
    displayEls.forEach(item => {
        item.style.display = display;
    });
}
