async function login(event) {

  event.preventDefault();
  
  const userName = document.querySelector('#username')?.value;
  const password = document.querySelector('#password')?.value;
  console.log("Login: ", userName, password);
  const response = await fetch("/api/auth/login", {
    method: 'post',
    body: JSON.stringify({ username: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const body = await response.json();

  if (response.ok) {
    console.log("Logged in successfully");
    localStorage.setItem('user', JSON.stringify({ userName: userName, email: body.email }));
    localStorage.setItem('avatar', JSON.stringify(body.avatar));
    window.location.href = "index.html";
    return true;
  } else {
    console.log("Error loggin in");
    const errorEl = document.querySelector('#loginError');
    errorEl.textContent = `⚠ Error: ${body.msg}`;
    return false;
  }

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
    localStorage.setItem('user', JSON.stringify({ userName: userName, email: email }));
    localStorage.setItem('avatar', 'null');
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