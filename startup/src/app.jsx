import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import './home/home.css';

export default function App() {
  return (
    <div className="container">
        <header>
            <div className="userHeader">
            <div className="userAvatar playControls">
                <img id="userAvatar" alt="placeholder" src="assets/images/default-user.jpg"></img>
            </div>
            <div className="userStats playControls">
                <p className="userName">User Synth</p>
                <p className="userByte">Byte</p>
            </div>
            </div>

            <a href="index.html"><img className="logo" src="assets/images/logo.png"></img></a>

            <div className="menu">
            <ul className="main-menu">
                <li className="main-menu-item"><a href="index.html">Home</a></li>
                <li className="main-menu-item playControls"><a href="battle.html">Fight</a></li>
                <li className="main-menu-item playControls"><a href="playground.html">Playground</a></li>
                <li className="main-menu-item"><a href="about.html">About</a></li>
                <li className="main-menu-item loginControls"><a href="login.html">Login</a></li>
                <li className="main-menu-item playControls"><a className="pointer" href="www.google.com">Logout</a></li>
                {/* <li className="main-menu-item playControls"><a className="pointer" onClick="logout()">Logout</a></li> */}
            </ul>
            </div>

            <div className="padding"></div>

        </header>

        <main>Components go here</main>

        <div className="footerContainer">
            <footer>
                <p>Created by Ethan Wait</p>
                <a href="https://github.com/ethanwait25/startup">GitHub</a>
            </footer>
        </div>
    </div>
  );
}