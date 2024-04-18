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
    const userJson = localStorage.getItem('user') || '{}';
    const avatarJson = localStorage.getItem('avatar') || '{}';

    if (window.location.pathname !== '/create') {
        if (userJson != null && avatarJson == null || avatarJson == 'null') {
            window.location.href = "/create";
        }
    }
    const user = JSON.parse(userJson) || {};
    const avatar = JSON.parse(avatarJson) || {};
    const [userName, setUserName] = React.useState(user.userName || '');
    const [avatarName, setAvatarName] = React.useState(avatar.prompt || '');
    const [userByte, setUserByte] = React.useState(avatar.byte || '');
    const [userImage, setUserImage] = React.useState(avatar.image || 'assets/images/default-user.jpg');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <header>

                <div className="padding">
                {authState === AuthState.Authenticated && (
                    <div className="userHeader">
                        <div className="userAvatar playControls">
                            <img id="userAvatar" alt="avatar" src={userImage}></img>
                        </div>
                        <div className="userStats playControls">
                            <p className="userName">{avatarName}</p>
                            <p className="userByte">{userByte} Byte</p>
                        </div>
                    </div>
                )} 
                </div>

                <NavLink to=""><img className="logo" src="assets/images/logo.png"></img></NavLink>

                <div className="menu">
                <ul className="main-menu">
                    <li className="main-menu-item"><NavLink to="">Home</NavLink></li>
                    {authState === AuthState.Authenticated && (<li className="main-menu-item"><NavLink to="fight">Fight</NavLink></li>)}
                    {authState === AuthState.Authenticated && (<li className="main-menu-item"><NavLink to="playground">Playground</NavLink></li>)}
                    <li className="main-menu-item"><NavLink to="about">About</NavLink></li>
                    {authState === AuthState.Unauthenticated && (<li className="main-menu-item"><NavLink to="login">Login</NavLink></li>)}
                    {authState === AuthState.Authenticated && (<li className="main-menu-item"><NavLink onClick={logout}>Logout</NavLink></li>)}
                </ul>
                </div>

                <div className="padding"></div>

            </header>

            <Routes>
                <Route path='/' element={<Home authState={authState} setAuthState={setAuthState} />} exact />
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

    async function logout() {
        setAuthState(AuthState.Unauthenticated);
        localStorage.removeItem("user");
        localStorage.removeItem("avatar");
        await fetch("/api/auth/logout", {
        method: 'delete',
        }).then(() => window.location.href = "/");
    }
}