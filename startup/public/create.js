var API_KEY = null;
var MODEL = null;

async function initializeConfig() {
  await fetch("config.json")
    .then(response => response.json())
    .then(json => { 
      API_KEY = json.prodiaKey;
      MODEL = json.model; 
    });

  console.log(API_KEY);
  console.log(MODEL);
}

async function create() {
    if (API_KEY == null || MODEL == null) {
      await initializeConfig();
    }

    const prompt = document.querySelector("#prompt").value;

    const imageUrl = await process(prompt);
    localStorage.setItem("prompt", prompt);
    localStorage.setItem("imageUrl", imageUrl);
    await updateDatabase(prompt, imageUrl);
    window.location.href = "index.html";
}

async function updateDatabase(prompt, imageUrl) {

  const userName = localStorage.getItem('userName');
  const response = await fetch("/avatar", {
    method: 'post',
    body: JSON.stringify({ username: userName, prompt: prompt, image: imageUrl }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const body = await response.json();

  if (response.ok) {
    console.log("Avatar created successfully");
    localStorage.setItem('avatar', body);
  } else {
    console.log("Error creating avatar");
    localStorage.setItem('avatar', null);
  }

  return;

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
          'X-Prodia-Key': API_KEY
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
          'X-Prodia-Key': API_KEY
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

initializeConfig();
