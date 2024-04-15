function login(event) {

  event.preventDefault();

  // localStorage.clear();
  // const nameEl = document.querySelector("#username");
  // localStorage.setItem("userName", nameEl.value);
  // console.log("hi")
  // window.location.href = "index.html";
  // console.log("hi2")

  // return true;
}

async function register(event) {

  event.preventDefault();

  const userName = document.querySelector('#usernameRegister')?.value;
  const email = document.querySelector('#email')?.value;
  const password = document.querySelector('#passwordRegister')?.value;
  console.log("Creating user: ", userName, email, password);
  const response = await fetch("/api/auth/create", {
    method: 'post',
    body: JSON.stringify({ email: email, username: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    console.log("Registered successfully");
    localStorage.setItem('userName', "wowzers");
    localStorage.setItem('email', email);
    window.location.href = "create.html";
    return true;
  } else {
    console.log("Error registering");
    const body = await response.json();
    const errorEl = document.querySelector('#registerError');
    errorEl.textContent = `⚠ Error: ${body.msg}`;
    return false;
  }

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