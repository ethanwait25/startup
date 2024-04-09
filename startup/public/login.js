function login() {
  localStorage.clear();
  const nameEl = document.querySelector("#username");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "index.html";

  return true;
}

async function register() {
  localStorage.clear();
  const nameEl = document.querySelector("#usernameRegister");
  localStorage.setItem("userName", nameEl.value);
  const emailEl = document.querySelector("#email");
  localStorage.setItem("email", emailEl.value);

  await updateUserByte(25, localStorage.getItem("userName"));

  window.location.href = "create.html";

  return true;

}

async function updateUserByte(newScore, playerName) {
  var requestBody = {
      "playerName": playerName,
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

  console.log(options);
    
  try {
      const response = await fetch('/api/score', options);
      scores = await response.json();

      if (scores.status != 200) {
          throw "Error updating user byte.";
      }
  
      localStorage.setItem('userByte', newScore);
    } catch {
      console.log("Error updating user byte.")
    }
}