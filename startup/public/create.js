import { createProdia } from "../node_modules/prodia/dist";

async function create() {
    const prompt = document.querySelector("#prompt").value;

    await process(prompt);
    localStorage.setItem("prompt", prompt);
    window.location.href = "index.html";
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function process(userPrompt) {
    const avatar = document.getElementById("avatar");
    avatar.src = "assets/images/loading.gif";
    avatar.style.width = "300px";
    
    const job = await prodia.generate({
        prompt: userPrompt,
    });

    const { imageURL, status } = await prodia.wait(job);

    if (status == 200) {
        avatar.src = imageURL;
    } else {
        avatar.src = "https://fakeimg.pl/300x300?text=Error!}";
    }

    await sleep(1500);
}

const prodia = createProdia({
    apiKey: "472a7454-0812-414d-8a69-bc66d7c71482",
});