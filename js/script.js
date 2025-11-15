startConfetti();

const playBtn = document.querySelector(".btn-intro");
const welcome = document.getElementById("welcome-screen");
const main = document.getElementById("main-screen");
const popupMusic = document.getElementById("popup-music");

playBtn.addEventListener("click", () => {
  welcome.classList.add("hide-screen");

  setTimeout(() => {
    main.classList.add("show-screen");

    setTimeout(
      () => document.querySelector(".main-title").classList.add("show"),
      100
    );
    setTimeout(
      () => document.querySelector(".main-paragraph").classList.add("show"),
      250
    );
    setTimeout(
      () => document.querySelector(".box-1").classList.add("show"),
      400
    );
    setTimeout(
      () => document.querySelector(".box-2").classList.add("show"),
      550
    );
    setTimeout(
      () => document.querySelector(".box-3").classList.add("show"),
      700
    );
  }, 350);
});

const popupOverlay = document.getElementById("popup-overlay");
const popupCard = document.getElementById("popup-card");
const popupClose = document.getElementById("popup-close");

const box1 = document.querySelector(".box-1");
const box2 = document.querySelector(".box-2");
const box3 = document.querySelector(".box-3");

function openPopup(imageSrc, titleText, bgColor, number) {
  resetPopupHTML();

  if (bgColor)
    popupCard.querySelector("#popup-content").style.backgroundColor = bgColor;
  if (imageSrc) popupCard.querySelector("img.main-img").src = imageSrc;
  if (titleText) {
    popupCard.querySelector("h2").innerHTML = titleText.replace(
      "✨",
      `<span class="emoji">✨</span>`
    );
    if (number)
      popupCard.querySelector("h2").classList.add(`popup-title-${number}`);
  }

  popupOverlay.classList.add("popup-show");
  popupCard.classList.add("popup-show");

  document.getElementById("popup-close").addEventListener("click", closePopup);
}

function closePopup() {
  popupOverlay.classList.remove("popup-show");
  popupCard.classList.remove("popup-show");
  if (popupCard.querySelector("h2").classList.contains("popup-title-1")) {
    popupCard.querySelector("h2").classList.remove("popup-title-1");
  }
  if (popupCard.querySelector("h2").classList.contains("popup-title-2")) {
    popupCard.querySelector("h2").classList.remove("popup-title-2");
  }
  popupMusic.pause();
  popupMusic.currentTime = 0;
}

let __countdownInterval = null;

function startCountdown(targetTime) {
  if (__countdownInterval) {
    clearInterval(__countdownInterval);
    __countdownInterval = null;
  }

  function setTime(d, h, m, s) {
    const elD = document.getElementById("cd-days");
    const elH = document.getElementById("cd-hours");
    const elM = document.getElementById("cd-mins");
    const elS = document.getElementById("cd-secs");

    if (!elD || !elH || !elM || !elS) {
      console.warn("Countdown elements not found yet.");
      return false;
    }

    elD.innerText = String(d).padStart(2, "0");
    elH.innerText = String(h).padStart(2, "0");
    elM.innerText = String(m).padStart(2, "0");
    elS.innerText = String(s).padStart(2, "0");
    return true;
  }

  function updateCountdown() {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      setTime(0, 0, 0, 0);
      if (__countdownInterval) {
        clearInterval(__countdownInterval);
        __countdownInterval = null;
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    setTime(days, hours, mins, secs);
  }

  updateCountdown();

  __countdownInterval = setInterval(updateCountdown, 1000);

  return __countdownInterval;
}

function stopCountdown() {
  if (__countdownInterval) {
    clearInterval(__countdownInterval);
    __countdownInterval = null;
  }
}

popupOverlay.addEventListener("click", closePopup);
popupClose.addEventListener("click", closePopup);

document.querySelector("#box-1").addEventListener("click", () => {
  openPopup(
    "images/popup-1.png",
    "An Essential for Your Skripsi Journey ✨",
    "#DCC5E6",
    1
  );
});

document.querySelector("#box-2").addEventListener("click", () => {
  openPopup(
    "images/popup-2.png",
    "Open when the mid-month blues arrive🌙",
    "#32183D",
    2
  );
});

document.querySelector("#box-3").addEventListener("click", () => {
  popupMusic.currentTime = 0;
  popupMusic.play().catch(() => {});
  document.querySelector("#popup-content").innerHTML = `
    <button
      id="popup-close"
      class="absolute -top-3 -right-3 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-3xl hover:scale-110 transition"
    >
      <img src="images/material-symbols-close-rounded.svg" alt="Close" />
    </button>

    <div class="popup-3-gradient rounded-2xl p-6 pt-10 pb-10 text-center">

      <h2 class="text-xl font-semibold leading-[28px] tracking-[1px] popup-title-3">
        Oopsie, not yet!
      </h2>

      <p class="mt-5 text-xl text-[#7B4CA0] font-semibold leading-[28px] tracking-[1px]">
        Come back when it's officially your day 
        <span class="emoji">🥳</span>
      </p>

      <div class="flex justify-center gap-2 mt-8">

        <div class="timer-box">
          <div id="cd-days" class="timer-number">00</div>
          <div class="timer-label">DAYS</div>
        </div>

        <div class="timer-box">
          <div id="cd-hours" class="timer-number">00</div>
          <div class="timer-label">HOURS</div>
        </div>

        <div class="timer-box">
          <div id="cd-mins" class="timer-number">00</div>
          <div class="timer-label">MINS</div>
        </div>

        <div class="timer-box">
          <div id="cd-secs" class="timer-number">00</div>
          <div class="timer-label">SECS</div>
        </div>

      </div>
    </div>
  `;

  const targetDate = new Date("2025-11-20 00:00:00").getTime();
  startCountdown(targetDate, true);

  popupOverlay.classList.add("popup-show");
  popupCard.classList.add("popup-show");

  document.getElementById("popup-close").addEventListener("click", () => {
    closePopup();
  });
});

function resetPopupHTML() {
  document.querySelector("#popup-content").innerHTML = `
    <button
      id="popup-close"
      class="absolute -top-3 -right-3 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-3xl hover:scale-110 transition"
    >
      <img src="images/material-symbols-close-rounded.svg" alt="Close" />
    </button>

    <div class="rounded-t-2xl overflow-hidden">
      <img src="#" class="w-full main-img" />
    </div>

    <div class="pb-10">
      <h2 class="text-center font-semibold text-xl tracking-[1px] leading-[28px] max-w-[235px] mx-auto"></h2>
    </div>
  `;
}
