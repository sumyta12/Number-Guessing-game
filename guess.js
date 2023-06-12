const btnel = document.querySelector(".btn-el");
const input = document.querySelector("input");
const pel = document.querySelector(".p-el");
const resultel = document.querySelector(".result-el");
const arr = [];
const player = 3;
let counter = 1;
let take = 5;
let result;
function playername(number) {
  resultel.textContent = number;
}
playername(counter);
const winner = [];
function btnclick() {
  const pl = {};
  if (input.value > 0 && input.value < 10) {
    if (counter === 1) result = parseInt(input.value);

    if (counter > 1 && counter < 4) {
      if (parseInt(result) !== parseInt(input.value)) {
        take -= 1;
        if (take === 0) {
          if (counter < 4) {
            counter = counter + 1;
            playername(counter);
          }
        }

        // pl[counter] = parseInt(input.value);
        // arr.push(pl);
        // counter = counter + 1;
        // playername(counter);
      } else {
        winner.push(counter);
        counter = counter + 1;
        playername(counter);
      }
      console.log(winner);
    }
    if (counter === 1) {
      pl[counter] = parseInt(input.value);
      arr.push(pl);
      counter = counter + 1;
      playername(counter);
    }
  }
  input.value = "";
}
