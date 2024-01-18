# AI Warriors
A startup application for BYU CS 260: Web Programming.

Notes for the course can be found [here](https://github.com/ethanwait25/startup/blob/main/notes.md).

## Specification

### Elevator Pitch
The recent explosion of interest in generative AI has raised a number of controversies and debates regarding data privacy violations, copyright issues, workplace replacement fears, and the spread of false information. But why worry about any of that? Let's just have fun!

AI Warriors is a multiplayer pseudo-RPG, all powered by generative AI. Users create an avatar (a "Synth") for which the sky's the limit! Would you like to play as a polar bear with chainsaw hands? How about a mug of root beer? Your choice of character will have a significant impact on its ability to survive in the arena. Go head-to-head with other Synths from across the globe to compete for ultimate power and glory! May the most (artificially) intelligent win!

### Design
![Home Page of AI Warriors](/assets/images/mockUI/home.png)
![Joining a Quick Fight and waiting for an opponent](/assets/images/mockUI/waitingforplayer.png)
![A player has joined our Quick Fight](/assets/images/mockUI/playerjoined.png)
![A battle rages on!](/assets/images/mockUI/battle.png)
![Tragedy... The battle has ended in defeat](/assets/images/mockUI/battlewon.png)

# Key Features
- Secure login over HTTPS
- Ability to create custom Synth
- Auto-generated avatar photo using DALL-E
- Ability to start a Quick Fight
- Ability to browse online players in the playground and request a battle
- Ability to receive battle requests and accept or decline them
- Three rounds of auto-generated battle dialogue using ChatGPT API
- User levels and avatar photos persistently stored
- Toggleable (and shufflable) soundtrack written by the developer

# Technologies
This project will utilize the following technologies:
- **HTML** - Project uses HTML for structure. Five HTML pages: Home, login, playground, battle, about, and help.
- **CSS** - Application styling that is consistent across pages. Easily readable text (good contrast between background and text). The background will be textured and move somehow. The fight background color will change.
- **JavaScript** - Provides login, playground user display, animations in battle, backend endpoint calls.
- **Service** - Backend service with endpoints for login, avatar photo generation, and battle dialogue generation. Endpoints will also be used to retrieve, update, and store player level.
- **Database** - Users, avatar photos, player level, etc. stored in the database. Register and login users, with credentials securely stored in the database. Users cannot play unless authenticated.
- **WebSocket** - Used to join the next ready player to an open Quick Fight. Also utilized to send battle requests to online users and to accept/decline them. May also possibly include a list of recent battle results on the playground page which updates in real-time.
- **React** - Application ported to use the React web framework.