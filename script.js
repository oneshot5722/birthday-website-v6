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


/* =====================================================
   LOADER
===================================================== */

let loading = 0;

const loader = document.getElementById("loader");
const loaderNumber = document.getElementById("loaderNumber");
const loaderBar = document.getElementById("loaderBar");

const loadingTimer = setInterval(() => {

  loading += Math.floor(Math.random() * 10) + 4;

  if (loading >= 100) {
    loading = 100;
    clearInterval(loadingTimer);

    setTimeout(() => {
      loader.classList.add("hidden");
    }, 400);
  }

  loaderNumber.textContent =
    String(loading).padStart(2, "0");

  loaderBar.style.width =
    `${loading}%`;

}, 80);


/* =====================================================
   PAGE TRANSITIONS
===================================================== */

function goToPage(number) {

  if (number < 0 || number >= pages.length) {
    return;
  }

  const oldPage = pages[currentPage];
  const newPage = pages[number];

  if (oldPage === newPage) {
    return;
  }

  oldPage.classList.remove("active");
  oldPage.classList.add("leaving");

  setTimeout(() => {
    oldPage.classList.remove("leaving");
  }, 1000);

  newPage.classList.add("active");

  currentPage = number;

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}


/* =====================================================
   MUSIC
===================================================== */

async function startMusic() {

  try {

    music.volume = 0.65;

    await music.play();

    musicOn = true;

    musicText.textContent =
      "HARVEY · PLAYING";

    musicButton.classList.add("playing");

  } catch (error) {

    console.log("Music needs another click.");

    musicText.textContent =
      "TAP TO PLAY";

  }
}


function stopMusic() {

  music.pause();

  musicOn = false;

  musicText.textContent =
    "PLAY HARVEY";

  musicButton.classList.remove(
    "playing"
  );
}


async function toggleMusic() {

  if (musicOn) {
    stopMusic();
  } else {
    await startMusic();
  }

}


musicButton.addEventListener(
  "click",
  toggleMusic
);


/* =====================================================
   ENTER EXPERIENCE
===================================================== */

enterButton.addEventListener(
  "click",
  async () => {

    /*
      IMPORTANT:
      This click is the user's interaction,
      so the browser allows audio playback here.
    */

    await startMusic();

    setTimeout(() => {
      goToPage(1);
    }, 350);

  }
);


/* =====================================================
   CAMERA ROLL DRAG
===================================================== */

const cameraWindow =
  document.querySelector(".camera-window");

const cameraTrack =
  document.getElementById("cameraTrack");

let dragging = false;
let dragStart = 0;
let savedPosition = 0;
let currentPosition = 0;


cameraWindow.addEventListener(
  "pointerdown",
  event => {

    dragging = true;

    dragStart = event.clientX;

    cameraWindow.setPointerCapture(
      event.pointerId
    );

    cameraTrack.style.animationPlayState =
      "paused";

  }
);


cameraWindow.addEventListener(
  "pointermove",
  event => {

    if (!dragging) return;

    const movement =
      event.clientX - dragStart;

    currentPosition =
      savedPosition + movement;

    cameraTrack.style.transform =
      `translateX(${currentPosition}px)`;

  }
);


function stopDragging() {

  if (!dragging) return;

  dragging = false;

  savedPosition =
    currentPosition;

}


cameraWindow.addEventListener(
  "pointerup",
  stopDragging
);

cameraWindow.addEventListener(
  "pointercancel",
  stopDragging
);


/* =====================================================
   SCROLL TO NEXT PAGE
===================================================== */

let wheelLocked = false;

window.addEventListener(
  "wheel",
  event => {

    if (wheelLocked) return;

    /*
      Only use the cinematic page navigation
      when the page itself isn't being dragged.
    */

    if (Math.abs(event.deltaY) < 20) {
      return;
    }

    wheelLocked = true;

    if (event.deltaY > 0) {

      goToPage(
        Math.min(
          currentPage + 1,
          pages.length - 1
        )
      );

    } else {

      goToPage(
        Math.max(
          currentPage - 1,
          0
        )
      );

    }

    setTimeout(() => {
      wheelLocked = false;
    }, 1000);

  },
  { passive: true }
);


/* =====================================================
   TOUCH SWIPE
===================================================== */

let touchStartY = 0;

window.addEventListener(
  "touchstart",
  event => {

    touchStartY =
      event.touches[0].clientY;

  },
  { passive: true }
);


window.addEventListener(
  "touchend",
  event => {

    const touchEndY =
      event.changedTouches[0].clientY;

    const difference =
      touchStartY - touchEndY;

    if (Math.abs(difference) < 60) {
      return;
    }

    if (difference > 0) {

      goToPage(
        Math.min(
          currentPage + 1,
          pages.length - 1
        )
      );

    } else {

      goToPage(
        Math.max(
          currentPage - 1,
          0
        )
      );

    }

  },
  { passive: true }
);


/* =====================================================
   WISH / CAKE
===================================================== */

let wishing = false;

wishButton.addEventListener(
  "click",
  () => {

    if (wishing) return;

    wishing = true;

    const heading =
      document.getElementById(
        "wishHeading"
      );

    const text =
      document.getElementById(
        "wishText"
      );

    const flames =
      document.querySelectorAll(
        ".flames i"
      );

    const numbers =
      ["3", "2", "1"];

    let index = 0;

    wishButton.disabled = true;

    function countdown() {

      if (index < numbers.length) {

        heading.textContent =
          numbers[index];

        text.textContent =
          index === 0
            ? "MAKE IT A GOOD ONE."
            : index === 1
              ? "ALMOST..."
              : "BLOW.";

        heading.style.transform =
          "scale(.7)";

        heading.style.opacity =
          "0";

        requestAnimationFrame(() => {

          heading.style.transition =
            "transform .45s ease, opacity .45s ease";

          heading.style.transform =
            "scale(1)";

          heading.style.opacity =
            "1";

        });

        index++;

        setTimeout(
          countdown,
          900
        );

        return;
      }


      /* BLOW OUT */

      flames.forEach(flame => {

        flame.style.transition =
          "opacity .35s, transform .35s";

        flame.style.opacity = "0";

        flame.style.transform =
          "translateY(-20px) scale(.2)";

      });


      heading.textContent =
        "♡";

      text.textContent =
        "WISH GRANTED.";


      createConfetti();


      /* FULL SCREEN OLD-STYLE CHANGE */

      setTimeout(() => {

        const wishPage =
          document.getElementById(
            "wishPage"
          );

        wishPage.style.transform =
          "scale(1.08)";

        wishPage.style.opacity =
          "0";

        wishPage.style.transition =
          "transform 1s cubic-bezier(.77,0,.18,1), opacity 1s";

        setTimeout(() => {

          wishPage.style.transform =
            "";

          wishPage.style.opacity =
            "";

          goToPage(4);

          wishing = false;

          wishButton.disabled =
            false;

        }, 850);

      }, 1200);

    }

    countdown();

  }
);


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

  const container =
    document.getElementById(
      "confetti"
    );

  container.innerHTML = "";

  for (let i = 0; i < 100; i++) {

    const piece =
      document.createElement(
        "span"
      );

    piece.className =
      "confetti-piece";

    const angle =
      Math.random() *
      Math.PI *
      2;

    const distance =
      150 +
      Math.random() *
      650;

    const x =
      Math.cos(angle) *
      distance;

    const y =
      Math.sin(angle) *
      distance;

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

    piece.style.width =
      `${4 + Math.random() * 6}px`;

    piece.style.height =
      `${7 + Math.random() * 12}px`;

    container.appendChild(
      piece
    );

  }
}


/* =====================================================
   FINALE MUSIC
===================================================== */

finalMusicButton.addEventListener(
  "click",
  async () => {

    if (musicOn) {

      stopMusic();

      finalMusicButton.innerHTML =
        "♫ <span>PLAY HARVEY AGAIN</span>";

    } else {

      await startMusic();

      finalMusicButton.innerHTML =
        "♫ <span>HARVEY IS PLAYING</span>";

    }

  }
);


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


window.addEventListener(
  "mousemove",
  event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left =
      `${mouseX}px`;

    cursor.style.top =
      `${mouseY}px`;

  }
);


function cursorAnimation() {

  ringX +=
    (mouseX - ringX) * .12;

  ringY +=
    (mouseY - ringY) * .12;

  cursorRing.style.left =
    `${ringX}px`;

  cursorRing.style.top =
    `${ringY}px`;

  requestAnimationFrame(
    cursorAnimation
  );

}

cursorAnimation();


document.querySelectorAll(
  "button, .photo-card"
).forEach(element => {

  element.addEventListener(
    "mouseenter",
    () => {
      document.body.classList.add(
        "hovering"
      );
    }
  );

  element.addEventListener(
    "mouseleave",
    () => {
      document.body.classList.remove(
        "hovering"
      );
    }
  );

});


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "ArrowDown") {

      goToPage(
        Math.min(
          currentPage + 1,
          pages.length - 1
        )
      );

    }

    if (event.key === "ArrowUp") {

      goToPage(
        Math.max(
          currentPage - 1,
          0
        )
      );

    }

    if (event.code === "Space") {

      event.preventDefault();

      toggleMusic();

    }

  }
);


/* =====================================================
   INITIAL STATE
===================================================== */

pages.forEach(
  (page, index) => {

    if (index === 0) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
);

console.log(
  "♡ CHOTU BIRTHDAY EXPERIENCE LOADED"
);
