const playerdata = {
  1: {
    playername: 1,
    counter: 1,
    check: false,
    result: 1,
    description: "Start The Game First",
  },
  2: {
    playername: 2,
    counter: 5,
    check: false,
    result: 2,
    description: "",
  },
  3: {
    playername: 3,
    counter: 5,
    check: false,
    result: 3,
    description: "",
  },
};
const row = document.querySelector(".row");

let finalresultmatchnum;

function playerclass(data) {
  Object.assign(this, data);

  this.countertextchnage = ``;
  this.countchecker = 1;
  this.functionchecker = false;
  this.valuechekcer = (playerID, input) => {
    if (playerID == 1) {
      if (this.check === false) {
        this.result = input;
        finalresultmatchnum = this.result;
        this.counter = 0;
        this.check = true;
        this.countchecker = this.counter;
      }
    } else {
      if (finalresultmatchnum !== input && this.check === false) {
        if (this.counter > 1) {
          this.counter = this.counter - 1;
          this.descriptionrendertext(this.counter);
        } else {
          this.countertextchnage = `You Lost Your Chance`;
          this.counter = 0;
          this.countchecker = this.counter;
        }
      } else if (finalresultmatchnum === input) {
        this.counter = 0;
        this.result = input;
        this.check = true;
        this.functionchecker = this.check;
        this.countchecker = this.counter;
        this.countertextchnage = `Wait for your result`;
      }
    }

    return true;
  };
  this.descriptionrendertext = (counter) => {
    const { playername, description } = this;
    let text = ``;
    if (playername === 1) text = description;
    else {
      text = `You have only ${counter} chance`;
    }
    this.countertextchnage = text;
    return this.countertextchnage;
  };
  this.descirptionvaluerender = () => {
    return this.descriptionrendertext(this.counter);
  };
  this.playerhtml = () => {
    const { playername, countertextchnage } = this;

    return `
    <div class="col-sm-12 col-lg-4 mb-3 mb-sm-0 mt-5">
      <div class="card">
        <div class="card-body">
           <h5 class="card-title font-family-press font-bold">${countertextchnage}</h5>
             <p class='p-el-${playername} font-red-color font-family-patua font-medium'></p>
            <div class="d-flex mt-4">
             
               <input
                 type="email"
                 class="form-control"
                 placeholder="Put number between 1 - 9" />
                 <i class="ms-3 fa-solid fa-paper-plane" id="${playername}"></i>
             
             </div>
             <div class="mt-4">
             <p class="card-text text-center font-family-press ">Player : ${playername}</p>
             </div>
         </div>
         </div></div> `;
  };
}

const playerone = new playerclass(playerdata[1]);
const playertwo = new playerclass(playerdata[2]);
const playerthree = new playerclass(playerdata[3]);

playerone.descirptionvaluerender();
playertwo.descirptionvaluerender();
playerthree.descirptionvaluerender();

function render() {
  const text =
    playerone.playerhtml() + playertwo.playerhtml() + playerthree.playerhtml();
  row.innerHTML = text;
}

render();

const btn = document.querySelectorAll("i");
let valueoneinputcheck = false;

btn.forEach((btnitem) => {
  btnitem.addEventListener("click", (e) => {
    const playerID = e.target.id;

    const cardtitle = e.target.parentElement.parentElement.children[0];
    const getinputtext = e.target.parentElement.children[0];
    const input = parseInt(getinputtext.value);

    if (input > 10 || input < 0) {
      errormessage(playerID, "your input value need to (0 - 9)");
    } else if (input < 10 && input > 0) {
      errormessage(playerID, "");
      if (playerID === "1") {
        valueoneinputcheck = true;
        playerone.valuechekcer(playerID, input);
        if (playerone.check === true) {
          e.target.disabled = true;
          getinputtext.value = "Number Taken";
          getinputtext.disabled = true;
        }
      } else if (playerID === "2") {
        if (valueoneinputcheck === true) {
          errormessage(playerID, "");
          playertwo.valuechekcer(playerID, input);
          cardtitle.textContent = playertwo.countertextchnage;
          if (playertwo.countchecker === 0) {
            e.target.style.color = "red";
            getinputtext.disabled = true;
            getinputtext.value = "Number Taken";
            e.target.style.cursor = "not-allowed";
          }
        } else {
          errormessage(playerID, "Please First Need to play player : 1");
        }
      } else if (playerID === "3") {
        if (valueoneinputcheck === true) {
          playerthree.valuechekcer(playerID, input);
          cardtitle.textContent = playerthree.countertextchnage;
          if (playerthree.countchecker === 0) {
            e.target.style.color = "red";
            getinputtext.disabled = true;
            getinputtext.value = "Number Taken";
            e.target.style.cursor = "not-allowed";
          }
        } else {
          errormessage(playerID, "Please First Need to play player : 1");
        }
      }
    }
    winnerrenderchecker();
  });
});

function winnerrenderchecker() {
  if (
    playerone.countchecker === 0 &&
    playertwo.countchecker === 0 &&
    playerthree.countchecker === 0
  ) {
    if (playertwo.functionchecker && playerthree.functionchecker) {
      modalelementreturn("Player 2 & 3 is  Winner");
    } else if (playertwo.functionchecker) {
      modalelementreturn("Player 2 is  Winner");
    } else if (playerthree.functionchecker) {
      modalelementreturn("Player 3 is  Winner");
    }else{
      modalelementreturn("Player 1 is  Winner");
    }
  }
}

function errormessage(playerID, err) {
  return (document.querySelector(".p-el-" + playerID).textContent = err);
}
function modalelementreturn(winner) {
  const modalelement = document.querySelector(".modal-element");
  return (modalelement.innerHTML = `
  <div class="modal-custome-design">
      <div class="container">
        <div>
          <div class="card border-warning mb-3 text-center" >
            <div class="card-body">
              <h5 class="card-title font-family-press font-extra-bold mt-5">Winner</h5>
              <p class="card-text font-extra-bold">
                🎉🎊🎉
              </p>
              <p class="winner-el font-family-press font-extra-bold mt-5">${winner}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
}
