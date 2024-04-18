import React from 'react';
import './login.css';

export function Login() {
  return (
    <main>
      <div className="container">
        <div className="entryBox">
          <h2>Login</h2>
          
          <form onsubmit="return login(event)">
            <div>
              <label for="username">Username</label>
              <input type="text" id="username" required />
              <br/>
              <label for="password">Password</label>
              <input type="password" id="password" required />
              <br/>
              <div id="loginError"></div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>

        <div className="entryBox">
          <h2>Register</h2>
          
          <form onsubmit="return register(event)">
            <div>
              <label for="email">Email&nbsp&nbsp&nbsp</label>
              <input type="text" id="email" required />
              <br/>
              <label for="username">Username</label>
              <input type="text" id="usernameRegister" required />
              <br/>
              <label for="password">Password</label>
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