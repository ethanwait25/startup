async function create() {
    const prompt = document.querySelector("#prompt").value;

    await process(prompt);
    localStorage.setItem("prompt", prompt);
    window.location.href = "index.html";
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function process(prompt) {
    const avatar = document.getElementById("avatar");
    avatar.src = "assets/images/loading.gif";
    avatar.style.width = "300px";
    
    await sleep(1500);

    prompt = strShorten(prompt);

    avatar.src = `https://fakeimg.pl/300x300?text=${prompt}`;

    await sleep(1500);
}

function strShorten(str) {
    return str.replace(/\s+/g, '').substring(0, 9) + "...";
}
