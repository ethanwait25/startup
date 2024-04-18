import React from 'react';
import './home.css';
import { AuthState } from '../login/authState.js';

export function Home({authState, setAuthState}) {
  return (
    <main>
      <div className="contentArea">
        <h2>Welcome to AI Warriors!</h2>
        <p>May the most (artificially) intelligent win!</p>

        {authState === AuthState.Unauthenticated && (<div className="loginControls">
          <p>Login or create an account to get into the arena!</p>
        </div>)}

        {authState === AuthState.Authenticated && (<div className="playControls">
          <p>Join a quick fight by clicking "Fight", or browse the playground for a worthy opponent!</p>
        </div>)}
      </div>
    </main>
  );
}