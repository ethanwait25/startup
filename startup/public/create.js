async function create() {
    const prompt = document.querySelector("#prompt").value;

    const avatar = document.getElementById("avatar");
    avatar.src = "assets/images/loading.gif";
    avatar.style.width = "300px";

    await createAvatar(prompt);

    const avatarJson = localStorage.getItem('avatar');
    const newAvatar = await JSON.parse(avatarJson);
    avatar.src = newAvatar.image;

    await sleep(1500);
    window.location.href = "index.html";
}

async function createAvatar(prompt) {

  const userJson = localStorage.getItem('user');
  const user = JSON.parse(userJson);
  const userName = user.userName;
  const response = await fetch("/api/avatar", {
    method: 'post',
    body: JSON.stringify({ username: userName, prompt: prompt }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const body = await response.json();

  if (response.ok) {
    localStorage.setItem('avatar', JSON.stringify(body));
  } else {
    console.log("Error creating avatar");
    localStorage.setItem('avatar', null);
  }

  return;

}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
