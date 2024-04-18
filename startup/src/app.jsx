import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { About } from './about/about.jsx';
import { Create } from './create/create.jsx';
import { Fight } from './fight/fight.jsx';
import { Home } from './home/home.jsx';
import { Login } from './login/login.jsx';
import { Playground } from './playground/playground.jsx';
import { AuthState } from './login/authState.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './app.css';
import './home/home.css';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
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

            <NavLink to=""><img className="logo" src="assets/images/logo.png"></img></NavLink>

            <div className="menu">
            <ul className="main-menu">
                <li className="main-menu-item"><NavLink to="">Home</NavLink></li>
                <li className="main-menu-item playControls"><NavLink to="fight">Fight</NavLink></li>
                <li className="main-menu-item playControls"><NavLink to="playground">Playground</NavLink></li>
                <li className="main-menu-item"><NavLink to="about">About</NavLink></li>
                <li className="main-menu-item loginControls"><NavLink to="login">Login</NavLink></li>
                <li className="main-menu-item playControls"><NavLink to="https://www.google.com">Logout</NavLink></li>
                {/* <li className="main-menu-item playControls"><NavLink className="pointer" onClick="logout()">Logout</NavLink></li> */}
            </ul>
            </div>

            <div className="padding"></div>

        </header>

        <main>Components go here</main>

        <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/fight' element={<Fight />} />
            <Route path='/playground' element={<Playground />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <div className="footerContainer">
            <footer>
                <p>Created by Ethan Wait</p>
                <NavLink to="https://github.com/ethanwait25/startup">GitHub</NavLink>
            </footer>
        </div>
    </BrowserRouter>
  );

  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
}