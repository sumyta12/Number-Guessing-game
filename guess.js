const players = [
  {
    player: 1,
    click: false,
    count: 1,
    discription: "Game Started From here",
  },
  {
    player: 2,
    click: false,
    count: 5,
    discription: "",
  },
  {
    player: 3,
    click: false,
    count: 5,
    discription: "",
  },
];
let player = players.map((item) => {
  return { ...item };
});

const input = document.querySelector("input");
const resultel = document.querySelector(".result-el");
const pel = document.querySelector(".p-el");
let link = false;
let i = 0;
let track = false;
function btnclick() {
  if (input.value.trim()) {
    const playerchecker = parseInt(resultel.textContent.split(" ")[2]);
    if (playerchecker === 1) {
      if (player[i].click === false) {
        player[i].click = true;
        player[i].result = parseInt(input.value);
        input.value = "";
        track = true;
        player[i].count = 0;
        i++;
        render(i);
      }
    } else {
      if (player[i].count > 0 && player[i].click === false) {
        if (player[0].result === parseInt(input.value)) {
          player[i].click = true;
          player[i].result = parseInt(input.value);
          input.value = "";
          player[i].count = 0;
          if (i < 2) {
            i++;
            render(i);
          }
        } else {
          player[i].count--;
          input.value = "";
          if (player[i].count === 0) {
            player[i].click = true;

            if (i < 2) {
              i++;
              render(i);
            }
          }
        }
      }
    }
    pel.textContent = `You have now ${player[i].count} chance`;
    winnerChecker();
  }
}

function render(number) {
  resultel.textContent = "player : " + player[number].player;
  if (player[number].player === 1) {
    pel.textContent = player[number].discription;
  }
}

render(0);

document.querySelector(".resfresh").addEventListener("click", () => {
  console.log("click");
  input.style.display = "block";
  document.querySelector(".btn-el").style.display = "block";
  resultel.style.display = "block";
  pel.setAttribute("style", "text-align:start ; font-size:19px");
  player = players.map((item) => {
    return { ...item };
  });
  link = false;
  i = 0;
  track = false;
  render(i);
});

function winnerChecker() {
  if (player[0].count === 0 && player[1].count === 0 && player[2].count === 0) {
    input.style.display = "none";
    document.querySelector(".btn-el").style.display = "none";
    resultel.style.display = "none";
    pel.setAttribute("style", "text-align:center ; font-size:3rem");
    if (
      player[0].result === player[1].result &&
      player[0].result === player[2].result
    ) {
      pel.textContent = "Player 2 & 3 is winner";
    } else if (
      player[0].result !== player[1].result &&
      player[0].result !== player[2].result
    ) {
      pel.textContent = "Player 1 is winner";
    } else if (player[0].result === player[1].result) {
      pel.textContent = "Player 2 is winner";
    } else {
      pel.textContent = "Player 3 is winner";
    }
    player = [];
  }
}
