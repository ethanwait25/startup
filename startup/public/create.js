async function create() {
    // const prompt = document.querySelector("#prompt").value;
    const prompt = "A dark tree with an angry face";

    await process(prompt);
    // localStorage.setItem("prompt", prompt);
    // window.location.href = "index.html";
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function process(userPrompt) {
    // const avatar = document.getElementById("avatar");
    // avatar.src = "assets/images/loading.gif";
    // avatar.style.width = "300px";

    console.log("Here");
    
    const job = await prodia.generate({
        prompt: userPrompt,
        model: "absolutereality_v181.safetensors [3d9d4d2b]",
    });

    console.log("Here2");

    console.log(job);

    const thing = await prodia.wait(job);
    console.log(thing.imageUrl);

    // if (status == 200) {
    //     avatar.src = imageURL;
    // } else {
    //     avatar.src = "https://fakeimg.pl/300x300?text=Error!}";
    // }

    await sleep(1500);
}

console.log("Hi!");

const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-Prodia-Key': '472a7454-0812-414d-8a69-bc66d7c71482'
    },
    body: JSON.stringify({ prompt: "A dark tree with an angry face", model: "absolutereality_v181.safetensors [3d9d4d2b]" })
  };
  
  fetch('http://localhost:8010/proxy/v1/sd/generate', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

// create();