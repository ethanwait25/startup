var winner = true;

async function initAnim() {
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

    await setDialogue("It's gonna be an awesome day!");
    await setDialogue("Because you are testing this awesome page!");
    await setDialogue("This is where battle dialogue will go!");
    await setDialogue("Isn't it neat?");
    await setDialogue("Yippee, hooray!");
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
        userByte.textContent = updateByteText(userByte.textContent, scoreAdjust);
        chalByte.textContent = updateByteText(chalByte.textContent, -scoreAdjust);
        userByte.classList.add("byteWinner");
        chalByte.classList.add("byteLoser");
        await waitforAnimation(userAvatarBattleEl);
        await waitforAnimation(chalAvatarBattleEl);
    } else {
        userAvatarBattleEl.classList.add("userAvatarLoseAnim");
        chalAvatarBattleEl.classList.add("chalAvatarWinAnim");
        userByte.textContent = updateByteText(userByte.textContent, -scoreAdjust);
        chalByte.textContent = updateByteText(chalByte.textContent, scoreAdjust);
        userByte.classList.add("byteLoser");
        chalByte.classList.add("byteWinner");
        await waitforAnimation(userAvatarBattleEl);
        await waitforAnimation(chalAvatarBattleEl);
    }
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