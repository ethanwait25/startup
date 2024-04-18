//  import React from 'react';
//  import './battle.css';

//  export function Fight() {

//  return (
//      <main>
//        <h1 id="battleTitle"></h1>
//        <div className="battleHeaders">
//          <div className="userBox">
//            <div className="userAvatarBattle">
//              <img id="userAvatar" alt="User Avatar" src="assets/images/default-user.jpg" />
//            </div>
//            <div className="userStats">
//              <p className="userName"></p>
//              <p className="userByte"></p>
//            </div>
//          </div>
//          <div className="dialogueBox">
//            <h1 className="dialogue">VS</h1>
//          </div>
//          <div className="chalBox">
//            <div className="chalAvatarBattle">
//              <img id="chalAvatar" alt="Challenger!" src="assets/images/default-user.jpg" />
//            </div>
//            <div className="chalStats">
//              <p className="chalName">&nbsp;</p>
//              <p className="chalByte">&nbsp;</p>
//            </div>
//          </div>
//        </div>
//        <div className="forfeitButton">
//          <a className="forfeit" href="/">Leave Arena</a>
//        </div>
//        <div class="musicBox">
//            <p id="trackName"></p>
//            <div class="musicControls">
//                <img alt="play" id="toggleMusic" src="assets/images/play.svg" onClick="toggleMusic()"></img>
//                <img alt="skip" id="skipMusic" src="assets/images/skip.svg" onClick="skipTrack()"></img>
//            </div>
//        </div>
//      </main>
//    );
//  }

import React, { useEffect, useState } from 'react';
import './battle.css';

const musicDescriptions = [
    { file: "syntheticshowdown.mp3", name: "Synthetic Showdown" },
    { file: "amotherslove.mp3", name: "Point of No Return" },
    { file: "toreador.mp3", name: "Toreador March" },
    { file: "griptape.mp3", name: "Griptape" },
];

class musicController {
  constructor(description, index) {
      this.index = index;
      this.track = this.loadTrack(description.file);
      this.name = description.name;
      
      this.track.loop = true;

      this.playTrack();
  }

  toggle() {
      if (this.track.muted) {
          this.track.muted = false;
      }
      else {
          this.track.muted = true;
      }

  }

  skip() {
      var newIndex = getRandomInt(musicDescriptions.length);
      while (newIndex == this.index) {
          newIndex = getRandomInt(musicDescriptions.length);
      }
      var newDescription = musicDescriptions[newIndex];
      this.index = newIndex;
      this.track.pause();
      this.track.remove();
      this.track = this.loadTrack(newDescription.file);
      this.track.loop = true;
      this.name = newDescription.name;

      this.playTrack();
      return this.name;
  }
  
  playTrack() {
      this.track.play();
  }
  
  loadTrack(filename) {
      return new Audio('assets/audio/' + filename);
  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function useMusicController() {
    const [index, setIndex] = useState(getRandomInt(musicDescriptions.length));
    const [name, setName] = useState(musicDescriptions[index].name);
    const [track, setTrack] = useState(null);

    useEffect(() => {
        const controller = new musicController(musicDescriptions[index], index);
        setTrack(controller);
        updateName(name);
        return () => {
            controller.track.pause();
        };
    }, [index, name]);

    function toggleMusic() {
        if (track.track.muted) {
            track.track.muted = false;
        } else {
            track.track.muted = true;
        }
    }

    function skipTrack() {
        const newIndex = getRandomInt(musicDescriptions.length);
        while (newIndex === index) {
            newIndex = getRandomInt(musicDescriptions.length);
        }
        setIndex(newIndex);
        setName(musicDescriptions[newIndex].name);
    }

    function updateName(name) {
      const trackNameEl = document.querySelector("#trackName");
      trackNameEl.textContent = `\"${name}\"`;
  }

    return { toggleMusic, skipTrack };
}

export function Fight() {
    const { toggleMusic, skipTrack } = useMusicController();

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
              <a className="forfeit" href="/">Leave Arena</a>
            </div>
            <div className="musicBox">
                <p id="trackName"></p>
            </div>
            <div className="musicControls">
                <img alt="play" id="toggleMusic" src="assets/images/play.svg" onClick={toggleMusic}></img>
                <img alt="skip" id="skipMusic" src="assets/images/skip.svg" onClick={skipTrack}></img>
            </div>
        </main>
    );
}