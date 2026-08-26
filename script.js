const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;


/* =========================
   MUSIC
========================= */

musicBtn.addEventListener("click", async () => {

  try {

    if (!musicPlaying) {

      await music.play();

      musicPlaying = true;

      musicBtn.textContent = "♫ HARVEY · PLAYING";
      musicBtn.classList.add("playing");

    } else {

      music.pause();

      musicPlaying = false;

      musicBtn.textContent = "♫ PLAY MUSIC";
      musicBtn.classList.remove("playing");

    }

  } catch (error) {

    console.log("Audio error:", error);

    musicBtn.textContent = "♫ TAP AGAIN";

  }

});


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(id) {

  const pages =
    document.querySelectorAll(".page");

  pages.forEach(page => {

    page.classList.remove("active");

  });

  const target =
    document.getElementById(id);

  if (!target) return;

  target.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

}


/* =========================
   CAMERA ROLL
========================= */

const roll =
  document.querySelector(".camera-roll");

let dragging = false;
let startX = 0;
let scrollStart = 0;

if (roll) {

  roll.addEventListener("pointerdown", e => {

    dragging = true;

    startX = e.clientX;

    scrollStart = roll.scrollLeft;

    roll.setPointerCapture(e.pointerId);

  });


  roll.addEventListener("pointermove", e => {

    if (!dragging) return;

    const distance =
      e.clientX - startX;

    roll.scrollLeft =
      scrollStart - distance;

  });


  roll.addEventListener("pointerup", () => {

    dragging = false;

  });


  roll.addEventListener("pointercancel", () => {

    dragging = false;

  });

}


/* =========================
   CAKE COUNTDOWN
========================= */

let counting = false;

function startCountdown() {

  if (counting) return;

  counting = true;

  const number =
    document.getElementById("countdown");

  const button =
    document.querySelector(".blow-btn");

  let count = 3;

  if (button) {
    button.disabled = true;
    button.textContent = "MAKE A WISH...";
  }

  number.textContent = count;

  const timer =
    setInterval(() => {

      count--;

      if (count > 0) {

        number.textContent = count;

      } else {

        clearInterval(timer);

        number.textContent = "💨";

        createConfetti();

        setTimeout(() => {

          showPage("final");

          counting = false;

        }, 1000);

      }

    }, 900);

}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

  const symbols = [
    "✦",
    "♡",
    "✿",
    "★",
    "•"
  ];

  for (let i = 0; i < 100; i++) {

    const piece =
      document.createElement("span");

    piece.className = "confetti";

    piece.textContent =
      symbols[
        Math.floor(
          Math.random() * symbols.length
        )
      ];

    piece.style.left =
      Math.random() * 100 + "vw";

    piece.style.animationDelay =
      Math.random() * .8 + "s";

    piece.style.animationDuration =
      2.5 + Math.random() * 2 + "s";

    document.body.appendChild(piece);

    setTimeout(() => {

      piece.remove();

    }, 5000);

  }

}


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", e => {

  if (e.code === "Space") {

    e.preventDefault();

    musicBtn.click();

  }

});
