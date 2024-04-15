var winner = true;

var API_KEY = null;
var BASE_PROMPT = null;
var EMAIL = "";
var PLAYER_NAME = "";
var CHAL_NAME = "";

async function initializeConfig() {
  await fetch("config.json")
    .then(response => response.json())
    .then(json => { 
      API_KEY = json.openAiKey;
      BASE_PROMPT = json.basePrompt;
    });

    EMAIL = user.email;
    PLAYER_NAME = user.userName;
    CHAL_NAME = "defaultChal";
}

async function startBattle() {
    if (API_KEY == null || BASE_PROMPT == null) {
        await initializeConfig();
      }

    const userName = avatar.prompt;
    const chalName = document.querySelector(".chalName");

    chalName.textContent = "A dog with a jetpack";
    const chalAvatar = document.querySelector("#chalAvatar");
    chalAvatar.src = "assets/images/dog-jetpack.png";

    var dialogue = await createDialogue(userName, chalName.textContent);

    if (dialogue[3] == "1") {
        winner = true;
    } else if (dialogue[3] == "2") {
        winner = false;
    } else {
        console.log("Error: Winner not found.")
    }

    await initAnim(dialogue);
}

async function initAnim(dialogue) {
    const userAvatarBattleEl = document.querySelector(".userAvatarBattle");
    const chalAvatarBattleEl = document.querySelector(".chalAvatarBattle");
    const dialogueEl = document.querySelector(".dialogue");
    
    userAvatarBattleEl.classList.add("userAvatarAnim");
    chalAvatarBattleEl.classList.add("chalAvatarAnim");
    dialogueEl.classList.add("vs-fadeAnim");

    await waitforAnimation(dialogueEl);
    await waitforAnimation(userAvatarBattleEl);
    await waitforAnimation(chalAvatarBattleEl);
    dialogueEl.classList.remove("vs-fadeAnim");
    resetAnimation(dialogueEl);

    await setDialogue(dialogue[0]);
    await setDialogue(dialogue[1]);
    await setDialogue(dialogue[2]);
    await setDialogue("", false);

    await battleEndAnim();

    await waitforClick();

    window.location.href = "index.html";

}

async function battleEndAnim() {
    const userAvatarBattleEl = document.querySelector(".userAvatarBattle");
    const chalAvatarBattleEl = document.querySelector(".chalAvatarBattle");
    const forfeitButton = document.querySelector(".forfeit")
    forfeitButton.classList.add("vs-fadeAnim");
    forfeitButton.removeAttribute("href");
    document.querySelector("#battleTitle").textContent = "Battle Complete!";

    var scoreAdjust = getRandomInteger(3, 13);
    const userByte = document.querySelector(".userByte");
    const chalByte = document.querySelector(".chalByte");

    if (winner == true) {
        userAvatarBattleEl.classList.add("userAvatarWinAnim");
        chalAvatarBattleEl.classList.add("chalAvatarLoseAnim");

        var newUserByte = updateByteText(userByte.textContent, scoreAdjust);
        var newChalByte = updateByteText(chalByte.textContent, -scoreAdjust);

        userByte.textContent = newUserByte;
        chalByte.textContent = newChalByte;

        userByte.classList.add("byteWinner");
        chalByte.classList.add("byteLoser");
        await waitforAnimation(userAvatarBattleEl);
        await waitforAnimation(chalAvatarBattleEl);
    } else {
        userAvatarBattleEl.classList.add("userAvatarLoseAnim");
        chalAvatarBattleEl.classList.add("chalAvatarWinAnim");

        var newUserByte = updateByteText(userByte.textContent, -scoreAdjust);
        var newChalByte = updateByteText(chalByte.textContent, scoreAdjust);

        userByte.textContent = newUserByte;
        chalByte.textContent = newChalByte;

        userByte.classList.add("byteLoser");
        chalByte.classList.add("byteWinner");
        await waitforAnimation(userAvatarBattleEl);
        await waitforAnimation(chalAvatarBattleEl);
    }

    await updateUserByte(newUserByte.substring(0, newUserByte.indexOf(' ')));
}

async function updateUserByte(newScore) {
    var requestBody = {
        "username": PLAYER_NAME,
        "score": newScore
    }

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    };
      
    try {
        const response = await fetch('/api/score', options);
        body = await response.json();

        if (response.ok) {
            var avatarModify = JSON.parse(avatarJson);
            avatarModify.byte = body.score;

            localStorage.setItem('avatar', JSON.stringify(avatarModify));
        } else {
            throw "Error updating user byte.";
        }
      } catch {
        console.log("Error updating user byte.")
      }
}

async function forfeit() {
    const userByte = avatar.byte;
    var scoreAdjust = getRandomInteger(3, 13);
    var newUserByte = updateByteText(userByte, -scoreAdjust);
    await updateUserByte(newUserByte.substring(0, newUserByte.indexOf(' ')));
    window.location.href = "index.html";
}

function getRandomInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function updateByteText(curByte, adjust) {
    return parseInt(curByte) + adjust + ` Byte (${(adjust > 0 ? "+" : "") + adjust})`;
}

async function setDialogue(text, requireClick = true) {
    const dialogueEl = document.querySelector(".dialogue");
    dialogueEl.textContent = text;
    dialogueEl.classList.add("dialogueEnter");
    await waitforAnimation(dialogueEl);
    if (requireClick) {
        await waitforClick();
    }
    dialogueEl.classList.remove("dialogueEnter");
    resetAnimation(dialogueEl);
}

function waitforAnimation(element) {
    return new Promise(resolve => {
        function handleAnimationEnd() {
            element.removeEventListener('animationend', handleAnimationEnd);
            resolve();
        }

        element.addEventListener('animationend', handleAnimationEnd);
    });
}

function waitforClick() {
    return new Promise(resolve => {
        document.addEventListener("click", function() {
            resolve();
        });
    });
}

function resetAnimation(element) {
    element.scrollBy(0, 0);
}

async function createDialogue(userName, chalName) {
    var testPrompt = `${userName} vs. ${chalName}`;
    var response = await generateDialogue(testPrompt);
    var dialogue = await parseDialogue(response);
    return dialogue;
}

async function generateDialogue(prompt) {
    var requestBody = {
        "model": "gpt-3.5-turbo",
        "user": EMAIL,
        "messages": [
            {
                "role": "system",
                "content": BASE_PROMPT
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(requestBody)
    };
      
    const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        .then(response => response.json())
        .then(response => {
          return response;
        })
        .catch(err => console.error(err));
    return response.choices[0].message.content;
}

function parseDialogue(text) {
    dialogue = [];

    var startIndex = text.indexOf("Turn 1:") + "Turn 1:".length;
    var endIndex = text.indexOf("Turn 2");

    var firstTurn = text.substring(startIndex, endIndex).trim();

    startIndex = text.indexOf("Turn 2:") + "Turn 2:".length;
    endIndex = text.indexOf("Turn 3");

    var secondTurn = text.substring(startIndex, endIndex).trim();

    startIndex = text.indexOf("Turn 3:") + "Turn 3:".length;
    endIndex = text.indexOf("WINNER");

    var thirdTurn = text.substring(startIndex, endIndex).trim();

    let match = text.match(/WINNER: (\d+)/);

    var winner = null;
    if (match) {
        winner = match[1];
    } else {
        console.log("Winner not found");
    }

    dialogue.push(firstTurn);
    dialogue.push(secondTurn);
    dialogue.push(thirdTurn);
    dialogue.push(winner);

    return dialogue;
}

const chalName = document.querySelector(".chalName");
const chalAvatar = document.querySelector("#chalAvatar");
const opponent = localStorage.getItem('opponent');

// Not chosen through playground
if (!opponent) {

    // Get opponent through WebSocket

    opponent = localStorage.getItem('opponent');
}

chalName.textContent = opponent.prompt;
chalAvatar.src = opponent.image;

initializeConfig();
startBattle();
