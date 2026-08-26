/* =========================================================
   BIRTHDAY WEBSITE — INTERACTION ENGINE
========================================================= */

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
const musicStatus = document.querySelector(".music-status");
const openButton = document.getElementById("openButton");

let musicPlaying = false;


/* =========================================================
   LOADER
========================================================= */

let load = 0;

const loadNumber = document.getElementById("loadNumber");
const loadBar = document.querySelector(".loader-line span");

const loaderInterval = setInterval(() => {

  load += Math.floor(Math.random() * 8) + 3;

  if (load >= 100) {
    load = 100;
    clearInterval(loaderInterval);

    setTimeout(() => {

      document.body.classList.add("loaded");

      document.getElementById("loader").classList.add("hide");

    }, 350);
  }

  loadNumber.textContent = String(load).padStart(2, "0");
  loadBar.style.width = `${load}%`;

}, 80);


/* =========================================================
   CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const trail = document.querySelector(".cursor-trail");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let trailX = mouseX;
let trailY = mouseY;

window.addEventListener("mousemove", e => {

  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;

});

function animateCursor() {

  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;

  trail.style.left = `${trailX}px`;
  trail.style.top = `${trailY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();


document.querySelectorAll(
  "button, a, .memory-card, .magnetic"
).forEach(element => {

  element.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-hover");
  });

  element.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-hover");
  });

});


/* =========================================================
   MUSIC
========================================================= */

async function toggleMusic() {

  try {

    if (!musicPlaying) {

      await music.play();

      musicPlaying = true;

      musicStatus.textContent = "SOUND ON";

      musicButton.classList.add("playing");

    } else {

      music.pause();

      musicPlaying = false;

      musicStatus.textContent = "SOUND OFF";

      musicButton.classList.remove("playing");

    }

  } catch (error) {

    console.log(
      "Music could not start:",
      error
    );

    musicStatus.textContent = "TAP AGAIN";

  }

}


musicButton.addEventListener(
  "click",
  toggleMusic
);


/* =========================================================
   HERO ENTER BUTTON
========================================================= */

openButton.addEventListener("click", () => {

  document.querySelector(".intro-section")
    .scrollIntoView({
      behavior: "smooth"
    });

  if (!musicPlaying) {
    toggleMusic();
  }

});


/* =========================================================
   FINAL MUSIC BUTTON
========================================================= */

const finalMusic =
  document.getElementById("finalMusic");

finalMusic.addEventListener("click", () => {

  if (!musicPlaying) {

    music.play();

    musicPlaying = true;

    musicStatus.textContent = "SOUND ON";

  } else {

    music.pause();

    musicPlaying = false;

    musicStatus.textContent = "SOUND OFF";

  }

});


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

document.querySelectorAll(".magnetic").forEach(button => {

  button.addEventListener("mousemove", e => {

    const rect =
      button.getBoundingClientRect();

    const x =
      e.clientX -
      rect.left -
      rect.width / 2;

    const y =
      e.clientY -
      rect.top -
      rect.height / 2;

    button.style.transform =
      `translate(${x * 0.18}px, ${y * 0.18}px)`;

  });

  button.addEventListener("mouseleave", () => {

    button.style.transform =
      "translate(0, 0)";

  });

});


/* =========================================================
   CAMERA ROLL — DRAG
========================================================= */

const cameraWrap =
  document.querySelector(".camera-wrap");

const cameraTrack =
  document.getElementById("cameraTrack");

let dragging = false;
let startX = 0;
let currentTranslate = 0;
let previousTranslate = 0;


cameraWrap.addEventListener(
  "pointerdown",
  e => {

    dragging = true;

    startX = e.clientX;

    cameraWrap.setPointerCapture(e.pointerId);

    cameraTrack.style.animationPlayState =
      "paused";

  }
);


cameraWrap.addEventListener(
  "pointermove",
  e => {

    if (!dragging) return;

    const movement =
      e.clientX - startX;

    currentTranslate =
      previousTranslate + movement;

    cameraTrack.style.transform =
      `translateX(${currentTranslate}px)`;

  }
);


cameraWrap.addEventListener(
  "pointerup",
  () => {

    dragging = false;

    previousTranslate =
      currentTranslate;

  }
);


cameraWrap.addEventListener(
  "pointercancel",
  () => {

    dragging = false;

  }
);


/* =========================================================
   SCROLL PARALLAX
========================================================= */

const heroTitle =
  document.querySelector(".hero-title");

const heroOrbit =
  document.querySelector(".orbit-one");

window.addEventListener(
  "scroll",
  () => {

    const scroll =
      window.scrollY;

    if (scroll < window.innerHeight) {

      heroTitle.style.transform =
        `translateY(${scroll * 0.12}px)`;

      heroOrbit.style.transform =
        `rotate(${scroll * 0.03}deg) translateY(${scroll * 0.04}px)`;

    }

  },
  { passive: true }
);


/* =========================================================
   PARTICLES
========================================================= */

const particleContainer =
  document.getElementById("particles");

for (let i = 0; i < 35; i++) {

  const particle =
    document.createElement("span");

  particle.className =
    "particle";

  particle.style.left =
    `${Math.random() * 100}%`;

  particle.style.animationDuration =
    `${12 + Math.random() * 18}s`;

  particle.style.animationDelay =
    `${Math.random() * -20}s`;

  particle.style.opacity =
    `${0.1 + Math.random() * 0.4}`;

  particleContainer.appendChild(
    particle
  );

}


/* =========================================================
   FLOATING PETALS
========================================================= */

const petals =
  document.getElementById("petals");

function createPetal() {

  const petal =
    document.createElement("span");

  petal.className =
    "petal";

  petal.textContent =
    Math.random() > 0.5
      ? "✦"
      : "·";

  petal.style.left =
    `${Math.random() * 100}%`;

  petal.style.fontSize =
    `${8 + Math.random() * 12}px`;

  petal.style.setProperty(
    "--x",
    `${-100 + Math.random() * 200}px`
  );

  petal.style.animationDuration =
    `${6 + Math.random() * 8}s`;

  petals.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 15000);

}

setInterval(createPetal, 1200);


/* =========================================================
   CAKE COUNTDOWN
========================================================= */

const blowButton =
  document.getElementById("blowButton");

const countdown =
  document.getElementById("countdown");

const wishTitle =
  document.getElementById("wishTitle");

const wishSub =
  document.getElementById("wishSub");

const flames =
  document.querySelectorAll(".candle span");

let countdownRunning = false;


blowButton.addEventListener(
  "click",
  () => {

    if (countdownRunning) return;

    countdownRunning = true;

    blowButton.disabled = true;

    let numbers =
      ["3", "2", "1"];

    let index = 0;


    function nextNumber() {

      if (index >= numbers.length) {

        flames.forEach(
          flame => {
            flame.style.display =
              "none";
          }
        );

        countdown.textContent =
          "✨";

        countdown.classList.remove(
          "show"
        );

        void countdown.offsetWidth;

        countdown.classList.add(
          "show"
        );

        setTimeout(
          createConfetti,
          350
        );

        setTimeout(
          () => {

            wishTitle.textContent =
              "HAPPIEST BIRTHDAY";

            wishSub.textContent =
              "WEIRDO. ♡";

            blowButton.textContent =
              "NOW MAKE A WISH";

            blowButton.disabled =
              false;

            countdownRunning =
              false;

          },
          800
        );

        return;
      }


      countdown.textContent =
        numbers[index];

      countdown.classList.remove(
        "show"
      );

      void countdown.offsetWidth;

      countdown.classList.add(
        "show"
      );

      index++;

      setTimeout(
        nextNumber,
        850
      );

    }


    nextNumber();

  }
);


/* =========================================================
   CONFETTI EXPLOSION
========================================================= */

function createConfetti() {

  const container =
    document.getElementById(
      "confetti"
    );

  container.innerHTML = "";

  for (let i = 0; i < 90; i++) {

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
      180 +
      Math.random() *
      600;

    const x =
      Math.cos(angle) *
      distance;

    const y =
      Math.sin(angle) *
      distance;

    const rotation =
      Math.random() * 1000;

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
      `${rotation}deg`
    );

    piece.style.left =
      "50%";

    piece.style.top =
      "50%";

    piece.style.animationDelay =
      `${Math.random() * .2}s`;

    piece.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    container.appendChild(
      piece
    );

  }

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal-heading, .intro-copy, .letter, .wish-section h2"
  );

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.style.opacity =
            "1";

          entry.target.style.transform =
            "translateY(0)";

        }

      });

    },
    {
      threshold: .15
    }
  );


revealElements.forEach(
  element => {

    element.style.transition =
      "opacity 1.2s cubic-bezier(.16,1,.3,1), transform 1.2s cubic-bezier(.16,1,.3,1)";

    element.style.opacity = "0";

    element.style.transform =
      "translateY(60px)";

    revealObserver.observe(
      element
    );

  }
);


/* =========================================================
   MEMORY CARD TILT
========================================================= */

document.querySelectorAll(
  ".memory-card"
).forEach(card => {

  card.addEventListener(
    "mousemove",
    e => {

      if (window.innerWidth < 800)
        return;

      const rect =
        card.getBoundingClientRect();

      const x =
        e.clientX -
        rect.left;

      const y =
        e.clientY -
        rect.top;

      const rotateX =
        ((y / rect.height) - .5) *
        -8;

      const rotateY =
        ((x / rect.width) - .5) *
        8;

      card.style.transform =
        `perspective(800px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         scale(1.035)`;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform =
        "";

    }
  );

});


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
  "keydown",
  e => {

    if (
      e.code === "Space" &&
      e.target.tagName !== "INPUT"
    ) {

      e.preventDefault();

      toggleMusic();

    }

  }
);


/* =========================================================
   MUSIC VISUAL FEEDBACK
========================================================= */

music.addEventListener(
  "play",
  () => {

    musicPlaying = true;

    musicStatus.textContent =
      "SOUND ON";

  }
);


music.addEventListener(
  "pause",
  () => {

    musicPlaying = false;

    musicStatus.textContent =
      "SOUND OFF";

  }
);


/* =========================================================
   EASTER EGG
========================================================= */

let typedKeys = "";

document.addEventListener(
  "keydown",
  e => {

    typedKeys +=
      e.key.toLowerCase();

    typedKeys =
      typedKeys.slice(-10);

    if (
      typedKeys.includes("chotu")
    ) {

      document.body.classList.add(
        "secret-mode"
      );

      createConfetti();

      typedKeys = "";

    }

  }
);


/* =========================================================
   DONE.
========================================================= */
