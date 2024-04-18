import React from 'react';

export function Create() {

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
    window.location.href = "/";
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




  return (
    <main>
      <h2>Create a Synth</h2>
      <p>Let your mind run wild! (Appropriate entries only, please.)</p>
      <div className="avatarGeneration">
        <img alt="Avatar" id="avatar" src="assets/images/default-user.jpg" />
      </div>
      <div id="creationLine">
        <div>
          <input type="text" id="prompt" placeholder="Describe your character!" />
          <button type="submit" onClick={create}>Generate</button>
        </div>
      </div>
    </main>
  );
}