const music = document.getElementById("harveyMusic");
const musicButton = document.getElementById("musicButton");
const musicText = document.getElementById("musicText");

const enterButton = document.getElementById("enterButton");
const wishButton = document.getElementById("wishButton");
const finalMusicButton = document.getElementById("finalMusicButton");

const pages = [
  document.getElementById("introPage"),
  document.getElementById("archivePage"),
  document.getElementById("letterPage"),
  document.getElementById("wishPage"),
  document.getElementById("finalePage")
];

let currentPage = 0;
let musicOn = false;
let changingPage = false;


/* =====================================================
   LOADER
===================================================== */

let progress = 0;

const loader = document.getElementById("loader");
const loaderNumber = document.getElementById("loaderNumber");
const loaderBar = document.getElementById("loaderBar");

const loaderTimer = setInterval(() => {

  progress += Math.floor(Math.random() * 8) + 5;

  if (progress >= 100) {

    progress = 100;

    clearInterval(loaderTimer);

    setTimeout(() => {
      loader.classList.add("hidden");
    }, 350);
  }

  loaderNumber.textContent =
    String(progress).padStart(2, "0");

  loaderBar.style.width =
    progress + "%";

}, 90);


/* =====================================================
   PAGE SYSTEM
===================================================== */

function showPage(index) {

  if (
    index < 0 ||
    index >= pages.length ||
    index === currentPage ||
    changingPage
  ) {
    return;
  }

  changingPage = true;

  const oldPage = pages[currentPage];
  const newPage = pages[index];

  oldPage.classList.remove("active");
  oldPage.classList.add("page-out");

  newPage.classList.add("active");

  currentPage = index;

  setTimeout(() => {

    oldPage.classList.remove("page-out");

    changingPage = false;

  }, 900);
}


/* =====================================================
   ENTER
===================================================== */

enterButton.addEventListener("click", async (event) => {

  event.preventDefault();
  event.stopPropagation();

  /* Start music directly from the user's click */
  try {

    music.volume = 0.65;

    await music.play();

    musicOn = true;

    musicText.textContent =
      "HARVEY · PLAYING";

    musicButton.classList.add("playing");

  } catch (error) {

    console.log("Music blocked:", error);

    musicText.textContent =
      "TAP ♫ TO PLAY";

  }

  /* Move to archive */
  showPage(1);

});


/* =====================================================
   MUSIC BUTTON
===================================================== */

musicButton.addEventListener("click", async (event) => {

  event.preventDefault();
  event.stopPropagation();

  if (musicOn) {

    music.pause();

    musicOn = false;

    musicText.textContent =
      "PLAY HARVEY";

    musicButton.classList.remove("playing");

  } else {

    try {

      await music.play();

      musicOn = true;

      musicText.textContent =
        "HARVEY · PLAYING";

      musicButton.classList.add("playing");

    } catch (error) {

      console.log(error);

    }

  }

});


/* =====================================================
   CAMERA ROLL
===================================================== */

const cameraWindow =
  document.querySelector(".camera-window");

const cameraTrack =
  document.getElementById("cameraTrack");

let dragging = false;
let startX = 0;
let startPosition = 0;

cameraWindow.addEventListener("pointerdown", event => {

  dragging = true;

  startX = event.clientX;

  startPosition =
    cameraTrack.getBoundingClientRect().left;

  cameraTrack.style.animationPlayState =
    "paused";

  cameraWindow.setPointerCapture(
    event.pointerId
  );

});


cameraWindow.addEventListener("pointermove", event => {

  if (!dragging) return;

  const difference =
    event.clientX - startX;

  cameraTrack.style.transform =
    `translateX(${difference}px)`;

});


cameraWindow.addEventListener("pointerup", () => {

  dragging = false;

});


/* =====================================================
   WISH BUTTON
===================================================== */

let wishStarted = false;

wishButton.addEventListener("click", event => {

  event.preventDefault();

  if (wishStarted) return;

  wishStarted = true;

  const heading =
    document.getElementById("wishHeading");

  const text =
    document.getElementById("wishText");

  const flames =
    document.querySelectorAll(".flames i");

  const numbers = ["3", "2", "1"];

  let i = 0;

  wishButton.style.pointerEvents =
    "none";


  function next() {

    if (i < numbers.length) {

      heading.textContent =
        numbers[i];

      text.textContent =
        i === 0
          ? "MAKE A WISH."
          : i === 1
            ? "ALMOST..."
            : "BLOW.";

      heading.animate(
        [
          {
            transform: "scale(.4)",
            opacity: 0
          },
          {
            transform: "scale(1)",
            opacity: 1
          }
        ],
        {
          duration: 500,
          easing: "cubic-bezier(.16,1,.3,1)"
        }
      );

      i++;

      setTimeout(next, 850);

      return;
    }


    /* Blow candles */

    flames.forEach(flame => {

      flame.animate(
        [
          {
            opacity: 1,
            transform: "scale(1)"
          },
          {
            opacity: 0,
            transform:
              "translateY(-35px) scale(.1)"
          }
        ],
        {
          duration: 500,
          fill: "forwards"
        }
      );

    });


    heading.textContent = "♡";
    text.textContent = "WISH GRANTED.";

    createConfetti();


    /* BIG SCREEN CHANGE */

    setTimeout(() => {

      showPage(4);

      wishStarted = false;

      wishButton.style.pointerEvents =
        "auto";

    }, 1000);

  }

  next();

});


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

  const container =
    document.getElementById("confetti");

  container.innerHTML = "";

  for (let i = 0; i < 120; i++) {

    const piece =
      document.createElement("span");

    piece.className =
      "confetti-piece";

    const angle =
      Math.random() *
      Math.PI * 2;

    const distance =
      200 + Math.random() * 650;

    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;

    piece.style.setProperty(
      "--x",
      `${x}px`
    );

    piece.style.setProperty(
      "--y",
      `${y}px`
    );

    piece.style.setProperty(
      "--r",
      `${Math.random() * 1000}deg`
    );

    container.appendChild(piece);

  }

}


/* =====================================================
   FINAL MUSIC
===================================================== */

finalMusicButton.addEventListener("click", async () => {

  if (musicOn) {

    music.pause();

    musicOn = false;

    finalMusicButton.innerHTML =
      "♫ <span>PLAY HARVEY AGAIN</span>";

  } else {

    try {

      await music.play();

      musicOn = true;

      finalMusicButton.innerHTML =
        "♫ <span>HARVEY · PLAYING</span>";

    } catch (error) {

      console.log(error);

    }

  }

});


/* =====================================================
   CURSOR
===================================================== */

const cursor =
  document.querySelector(".cursor");

const cursorRing =
  document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


window.addEventListener("mousemove", event => {

  mouseX = event.clientX;
  mouseY = event.clientY;

  cursor.style.left =
    mouseX + "px";

  cursor.style.top =
    mouseY + "px";

});


function cursorLoop() {

  ringX +=
    (mouseX - ringX) * .12;

  ringY +=
    (mouseY - ringY) * .12;

  cursorRing.style.left =
    ringX + "px";

  cursorRing.style.top =
    ringY + "px";

  requestAnimationFrame(cursorLoop);

}

cursorLoop();


document.querySelectorAll(
  "button, .photo-card"
).forEach(element => {

  element.addEventListener(
    "mouseenter",
    () => {
      document.body.classList.add("hovering");
    }
  );

  element.addEventListener(
    "mouseleave",
    () => {
      document.body.classList.remove("hovering");
    }
  );

});


/* =====================================================
   KEYBOARD — NO MORE WHEEL FIGHTING
===================================================== */

document.addEventListener("keydown", event => {

  if (
    event.target.tagName === "INPUT" ||
    event.target.tagName === "TEXTAREA"
  ) {
    return;
  }

  if (event.key === "ArrowDown") {

    event.preventDefault();

    showPage(
      Math.min(
        currentPage + 1,
        pages.length - 1
      )
    );

  }

  if (event.key === "ArrowUp") {

    event.preventDefault();

    showPage(
      Math.max(
        currentPage - 1,
        0
      )
    );

  }

});


/* =====================================================
   START
===================================================== */

pages.forEach((page, index) => {

  page.classList.remove(
    "active",
    "page-out"
  );

  if (index === 0) {
    page.classList.add("active");
  }

});

console.log("♡ BIRTHDAY EXPERIENCE READY");
