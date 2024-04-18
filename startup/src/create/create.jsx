import React from 'react';

export function Create() {
  return (
    <main>
      <h2>Create a Synth</h2>
      <p>Let your mind run wild! (Appropriate entries only, please.)</p>
      <div class="avatarGeneration">
        <img alt="Avatar" id="avatar" src="assets/images/default-user.jpg" />
      </div>
      <div id="creationLine">
        <div>
          <input type="text" id="prompt" placeholder="Describe your character!" />
          <button type="submit" onclick="create()">Generate</button>
        </div>
      </div>
    </main>
  );
}