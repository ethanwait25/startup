var builtIn = [
    { prompt: "Dog with a Jetpack", byte: 25, image: "assets/images/builtInOpps/dog-jetpack.png" },
    { prompt: "Very Patriotic Turtle", byte: 25, image: "assets/images/builtInOpps/patriotic-turtle.png" },
    { prompt: "Gordon Ramsay as a Nun", byte: 25, image: "assets/images/builtInOpps/gordon-ramsay-nun.png" },
    { prompt: "Randy the Construction Worker", byte: 25, image: "assets/images/builtInOpps/randy-worker.png" },
    { prompt: "Kermit the Frog", byte: 25, image: "assets/images/builtInOpps/kermit.png" },
    { prompt: "Time Itself", byte: 25, image: "assets/images/builtInOpps/time.png" },
    { prompt: "Someone Who Eats Their Vegetables", byte: 25, image: "assets/images/builtInOpps/eats-vegetables.png" },
    { prompt: "Bobby McTobby", byte: 25, image: "assets/images/builtInOpps/bobby-mctobby.png" },
];

var challengers = [];

(async () => {
    const response = await fetch("/api/active", {
        method: 'get',
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        var online = await response.json();
        challengers = online.concat(builtIn);
    } else {
        console.log("Error getting challengers");
    }

    const container = document.querySelector("#chalsContainer");

    var avatarJson = localStorage.getItem("avatar");
    var userImage = JSON.parse(avatarJson).image;
    challengers.forEach((item, index) => {
        if (item.image == userImage) {
            return;
        }

        const div = document.createElement("div");
        div.classList.add("chal");
        div.id = `c${index + 1}`;

        div.innerHTML = `
        <div class="chalAvatar">
            <a href="battle.html"><img alt="Challenger!" src=${item.image} /></a>
        </div>
        <div class="chalStats">
            <p class="chalName">${item.prompt}</p>
            <p class="chalByte">${item.byte} Byte</p>
        </div>
        `;
        
        div.onclick = function() {
            localStorage.setItem("opponent", JSON.stringify(item));
        };

        container.appendChild(div);
    });

})();