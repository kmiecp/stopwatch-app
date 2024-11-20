const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
const delateBtn = document.querySelector(".exit");
const timer = document.querySelector(".timer");
const info = document.querySelector(".info");
const archBtn = document.querySelector(".arch-btn");
const archContainer = document.querySelector(".archive");
const modalShadowContainer = document.querySelector(".modal-shadow");
const modalContainer = document.querySelector(".modal");
const infoBtn = document.querySelector(".info-btn");
const closeBtn = [...document.querySelectorAll(".close")];
const archList = document.querySelector(".list");
const editBtn = document.querySelector(".edit");
const colors = [...document.querySelectorAll(".color")];

let isOnInterval = false;
let countInterval;
const stoper = {
  miliSec: 0,
  sec: 0,
  min: 0,
  times: [],
};
const countTimer = () => {
  if (!isOnInterval) {
    isOnInterval = !isOnInterval;
    countInterval = setInterval(() => {
      stoper.miliSec++;
      if (stoper.miliSec > 9) {
        stoper.sec += 1;
        stoper.miliSec = 0;
      } else if (stoper.sec > 59) {
        stoper.sec = 0;
        stoper.min += 1;
      }
      showtimer();
    }, 100);
  }
};
const showtimer = () => {
  const sec = stoper.sec < 10 ? "0" + stoper.sec.toString() : stoper.sec;
  const min = stoper.min < 10 ? "0" + stoper.min.toString() : stoper.min;
  timer.textContent = `${min}:${sec}.${stoper.miliSec}`;
};
const clear = () => {
  isOnInterval = !isOnInterval;
  clearInterval(countInterval);
};

const reset = () => {
  clear();
  pushTimeToArch();
  cleanStoperData();
  info.textContent = `Twój ostatni czas ${
    stoper.times[stoper.times.length - 1]
  }`;
  showtimer();
  console.log(isOnInterval);
};
const cleanStoperData = () => {
  stoper.miliSec = 0;
  stoper.sec = 0;
  stoper.min = 0;
};
const delateAllData = () => {
  archList.textContent = "";
  cleanStoperData();
  clear();
};
const pushTimeToArch = () => {
  archList.textContent = "";
  if (stoper.min > 0 || stoper.sec > 0 || stoper.miliSec > 0) {
    console.log(stoper.min, stoper.sec, stoper.miliSec);
    stoper.times.push(`${stoper.min}:${stoper.sec}.${stoper.miliSec}`);
    stoper.times.forEach((time, index) => {
      const newTime = document.createElement("p");
      newTime.textContent = `${index + 1}. ${time}`;
      archList.appendChild(newTime);
    });
  }
};
const showArchOrHelpContainer = function () {
  modalShadowContainer.classList.remove("hidden");
  console.log(this.classList.value);
  if (this.classList.value == "arch-btn") {
    archContainer.classList.remove("hidden");
  } else {
    modalContainer.classList.remove("hidden");
  }
};
const closeArchOrHelpContainer = function () {
  modalShadowContainer.classList.add("hidden");
  archContainer.classList.add("hidden");
  modalContainer.classList.add("hidden");
};
playBtn.addEventListener("click", countTimer);
pauseBtn.addEventListener("click", clear);
stopBtn.addEventListener("click", reset);
closeBtn.forEach((btn) => {
  btn.addEventListener("click", closeArchOrHelpContainer);
});
infoBtn.addEventListener("click", showArchOrHelpContainer);
archBtn.addEventListener("click", showArchOrHelpContainer);
editBtn.addEventListener("click", () => {
  const divColorsContainer = document.querySelector(".colors");
  divColorsContainer.classList.toggle("hidden");
});
colors.forEach((color) => {
  color.addEventListener("click", () => {
    console.log("klik");
    console.log(color.classList.contains("color-red"));
    if (color.classList.contains("color-red")) {
      console.log(color);
      document.documentElement.style.setProperty(
        "--active-color",
        "var(--active-color-red)"
      );
    } else if (color.classList.contains("color-blue")) {
      console.log(color);
      document.documentElement.style.setProperty(
        "--active-color",
        "var(--active-color-blue)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--active-color",
        "var(--active-color-green)"
      );
    }
  });
});
