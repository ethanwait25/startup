import React from 'react';
import './battle.css';

export function Fight() {
  return (
    <main>
      <h1 id="battleTitle"></h1>
      <div className="battleHeaders">
        <div className="userBox">
          <div className="userAvatarBattle">
            <img id="userAvatar" alt="User Avatar" src="assets/images/default-user.jpg" />
          </div>
          <div className="userStats">
            <p className="userName"></p>
            <p className="userByte"></p>
          </div>
        </div>
        <div className="dialogueBox">
          <h1 className="dialogue">VS</h1>
        </div>
        <div className="chalBox">
          <div className="chalAvatarBattle">
            <img id="chalAvatar" alt="Challenger!" src="assets/images/default-user.jpg" />
          </div>
          <div className="chalStats">
            <p className="chalName">&nbsp;</p>
            <p className="chalByte">&nbsp;</p>
          </div>
        </div>
      </div>
      <div className="forfeitButton">
        <a className="forfeit">Leave Arena</a>
        {/* <a className="forfeit" style="cursor: pointer" onclick="forfeit()">Leave Arena</a> */}
      </div>
    </main>
  );
}