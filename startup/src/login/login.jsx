import React from 'react';
import './login.css';

export function Login() {

  async function login(event) {

    event.preventDefault();
    
    const userName = document.querySelector('#username')?.value;
    const password = document.querySelector('#password')?.value;
    const response = await fetch("/api/auth/login", {
      method: 'post',
      body: JSON.stringify({ username: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    const body = await response.json();
  
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify({ userName: userName, email: body.email }));
      localStorage.setItem('avatar', JSON.stringify(body.avatar));
      window.location.href = "/";
      return true;
    } else {
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
    const response = await fetch("/api/auth/create", {
      method: 'post',
      body: JSON.stringify({ email: email, username: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify({ userName: userName, email: email }));
      localStorage.setItem('avatar', 'null');
      window.location.href = "create.html";
      return true;
    } else {
      const body = await response.json();
      const errorEl = document.querySelector('#registerError');
      errorEl.textContent = `⚠ Error: ${body.msg}`;
      return false;
    }
  
  }

  return (
    <main>
      <div className="container">
        <div className="entryBox">
          <h2>Login</h2>
          
          <form onSubmit={() => login(event)}>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" required />
              <br/>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required />
              <br/>
              <div id="loginError"></div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>

        <div className="entryBox">
          <h2>Register</h2>
          
          <form onSubmit={() => register(event)}>
            <div>
              <label htmlFor="email">Email&nbsp;&nbsp;&nbsp;</label>
              <input type="text" id="email" required />
              <br/>
              <label htmlFor="username">Username</label>
              <input type="text" id="usernameRegister" required />
              <br/>
              <label htmlFor="password">Password</label>
              <input type="password" id="passwordRegister" required />
              <br/>
              <div id="registerError"></div>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>

    </main>
  );
}