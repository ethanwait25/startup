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

var index = getRandomInt(musicDescriptions.length);
var controller = new musicController(musicDescriptions[index], index);
updateName(musicDescriptions[index].name);

function toggleMusic() {
    var toggleMusicEl = document.querySelector("#toggleMusic");
    if (toggleMusicEl.src.split("/").pop() == "play.svg") {
        toggleMusicEl.src = "assets/images/mute.svg";
    } else {
        toggleMusicEl.src = "assets/images/play.svg";
    }

    controller.toggle();
}

function skipTrack() {
    var name = controller.skip();
    updateName(name);
}

function updateName(name) {
    const trackNameEl = document.querySelector("#trackName");
    trackNameEl.textContent = `\"${name}\"`;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }