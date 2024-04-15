var challengers = [];

(async () => {
    const response = await fetch("/api/active", {
        method: 'get',
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        challengers = await response.json();
    } else {
        console.log("Error getting challengers");
    }

    const container = document.querySelector("#chalsContainer");

    challengers.forEach((item, index) => {
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

        container.appendChild(div);
    });

})();