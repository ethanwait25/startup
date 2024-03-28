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

    await setDialogue("Happy days in Bountiful Utah");
    await setDialogue("Second");
    await setDialogue("Third");
    await setDialogue("Fourth");
    await setDialogue("Fifth");

}

async function setDialogue(text) {
    const dialogueEl = document.querySelector(".dialogue");
    dialogueEl.textContent = text;
    dialogueEl.classList.add("dialogueEnter");
    await waitforAnimation(dialogueEl);
    dialogueEl.classList.remove("dialogueEnter");
    resetAnimation(dialogueEl);
}

function waitforAnimation(element) {
    return new Promise(resolve => {
        function handleAnimationEnd() {
            console.log(`The animation for ${element.classList} is finished!`);
            element.removeEventListener('animationend', handleAnimationEnd);
            resolve();
        }

        element.addEventListener('animationend', handleAnimationEnd);
    });
}

function resetAnimation(element) {
    element.scrollBy(0, 0);
}