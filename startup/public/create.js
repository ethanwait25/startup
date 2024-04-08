const MODEL = "absolutereality_v181.safetensors [3d9d4d2b]";

async function create() {
    const prompt = document.querySelector("#prompt").value;

    const imageUrl = await process(prompt);
    localStorage.setItem("prompt", prompt);
    localStorage.setItem("imageUrl", imageUrl);
    window.location.href = "index.html";
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function process(userPrompt) {
    const avatar = document.getElementById("avatar");
    avatar.src = "assets/images/loading.gif";
    avatar.style.width = "300px";
    
    const job = await createGeneration(userPrompt);
    const imageUrl = await getGeneratedImageUrl(job);

    if (imageUrl != null) {
        avatar.src = imageUrl;
    } else {
        avatar.src = "https://fakeimg.pl/300x300?text=Error!}";
    }

    await sleep(1500);
    return imageUrl;
}

async function createGeneration(userPrompt) {
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'X-Prodia-Key': '472a7454-0812-414d-8a69-bc66d7c71482'
        },
        body: JSON.stringify({ prompt: `${userPrompt}`, model: `${MODEL}` })
      };
      
    const job = await fetch('http://localhost:8010/proxy/v1/sd/generate', options)
        .then(response => response.json())
        .then(response => {
          return response.job;
        })
        .catch(err => console.error(err));
    return job;
}

async function getGeneratedImageUrl(job) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'X-Prodia-Key': '472a7454-0812-414d-8a69-bc66d7c71482'
        },
      };
      
    var response = null;
    do {
    response = await fetch(`http://localhost:8010/proxy/v1/job/${job}`, options)
        .then(response => response.json())
        .then(response => {
          return response;
        })
        .catch(err => console.error(err));
    } while(response.status != "succeeded");
    return response.imageUrl;
}

console.log("Hi!");
