const challengers = [
    { name: "Challenger 1", byte: "47 Byte", image: "https://fakeimg.pl/200x200?text=1" },
    { name: "Challenger 2", byte: "31 Byte", image: "https://fakeimg.pl/200x200?text=2" },
    { name: "Challenger 3", byte: "11 Byte", image: "https://fakeimg.pl/200x200?text=3" },
    { name: "Challenger 4", byte: "16 Byte", image: "https://fakeimg.pl/200x200?text=4" },
    { name: "Challenger 5", byte: "36 Byte", image: "https://fakeimg.pl/200x200?text=5" }
];

const container = document.querySelector("#chalsContainer");

console.log(container);

challengers.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("chal");
    div.id = `c${index + 1}`;

    div.innerHTML = `
      <div class="chalAvatar">
        <a href="battle.html"><img alt="Challenger!" src=${item.image} /></a>
      </div>
      <div class="chalStats">
        <p class="chalName">${item.name}</p>
        <p class="chalByte">${item.byte}</p>
      </div>
    `;

    console.log(div);

    container.appendChild(div);
  });