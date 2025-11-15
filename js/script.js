startConfetti();

const playBtn = document.querySelector(".btn-intro");
const welcome = document.getElementById("welcome-screen");
const main = document.getElementById("main-screen");
const popupMusic = document.getElementById("popup-music");

const TARGET_DATE = new Date("2025-11-22 00:00:00").getTime();
const UNLOCK_VIDEO_CODE = "h4pyd4y";

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
  if (popupCard.querySelector("h2")?.classList.contains("popup-title-1")) {
    popupCard.querySelector("h2").classList.remove("popup-title-1");
  }
  if (popupCard.querySelector("h2")?.classList.contains("popup-title-2")) {
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

function isVideoUnlocked() {
  const params = new URLSearchParams(window.location.search);
  return params.get("unlock") === UNLOCK_VIDEO_CODE;
}

document.querySelector("#box-3").addEventListener("click", () => {
  if (isVideoUnlocked()) {
    popupVideo();
    return;
  }

  const now = Date.now();

  if (now < TARGET_DATE) {
    popupMusic.currentTime = 0;
    popupMusic.play().catch(() => {});
    popupNotYet();
    return;
  }

  popupVideo();
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

function popupVideo() {
  document.querySelector("#popup-content").innerHTML = `
    <button
      id="popup-close"
      class="absolute -top-4 -right-4 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition z-50"
    >
      <img src="images/material-symbols-close-rounded.svg" alt="Close" class="w-6" />
    </button>

    <div class="rounded-2xl overflow-hidden">
      <div class="relative w-full overflow-hidden rounded-2xl">
        <img src="images/video-thumb.png" class="w-full h-auto" />

        <div class="absolute inset-0 bg-black/40 backdrop-blur-[3px] z-10"></div>

        <button
          id="video-play-btn"
          class="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 bg-white/40 w-[72px] h-[72px] rounded-full shadow-md flex items-center justify-center backdrop-blur-md hover:scale-110 transition z-20"
        >
          <img src="images/mingcute_play-fill-white.svg" class="w-9" />
        </button>

        <p class="absolute left-1/2 top-[58%] -translate-x-1/2 text-white text-[11px] font-medium tracking-wide z-20">
          Play Me
        </p>

        <p class="absolute left-1/2 bottom-4 -translate-x-1/2 text-white text-xl font-semibold tracking-[1px] z-20 drop-shadow-lg">
          A Year of You💜
        </p>
      </div>
    </div>
  `;

  popupOverlay.classList.add("popup-show");
  popupCard.classList.add("popup-show");

  document.getElementById("popup-close").addEventListener("click", closePopup);

  const videoUrl =
    "https://is3.cloudhost.id/privatestar/your-special-day/videos/lv_0_20251112230752.mp4";
  document.getElementById("video-play-btn").addEventListener("click", () => {
    window.open(videoUrl, "_blank");
  });
}

function popupNotYet() {
  popupMusic.currentTime = 0;
  popupMusic.play().catch(() => {});

  document.querySelector("#popup-content").innerHTML = `
    <button
      id="popup-close"
      class="absolute -top-3 -right-3 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition"
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
        <div class="timer-box"><div id="cd-days" class="timer-number">00</div><div class="timer-label">DAYS</div></div>
        <div class="timer-box"><div id="cd-hours" class="timer-number">00</div><div class="timer-label">HOURS</div></div>
        <div class="timer-box"><div id="cd-mins" class="timer-number">00</div><div class="timer-label">MINS</div></div>
        <div class="timer-box"><div id="cd-secs" class="timer-number">00</div><div class="timer-label">SECS</div></div>
      </div>

    </div>
  `;

  startCountdown(TARGET_DATE);

  popupOverlay.classList.add("popup-show");
  popupCard.classList.add("popup-show");

  document.getElementById("popup-close").addEventListener("click", closePopup);
}
