const music = document.getElementById("music");
const pill = document.getElementById("pill");
const toggle = document.getElementById("musicToggle");

let playing = false;

/* =========================
   MUSIC
========================= */

function musicToggle() {
  if (music.paused) {
    music.play().then(() => {
      playing = true;

      pill.textContent = "♫ HARVEY · ON";
      toggle.innerHTML = "♫ <span>pause Harvey</span>";
    }).catch(() => {
      pill.textContent = "♫ CLICK TO PLAY";
    });

  } else {
    music.pause();

    playing = false;

    pill.textContent = "♫ HARVEY · OFF";
    toggle.innerHTML = "♫ <span>play Harvey</span>";
  }
}


/* =========================
   OPEN WEBSITE
========================= */

document.getElementById("start").addEventListener("click", () => {

  document.getElementById("memories").scrollIntoView({
    behavior: "smooth"
  });

  musicToggle();

});


/* =========================
   MUSIC BUTTONS
========================= */

toggle.addEventListener("click", musicToggle);
pill.addEventListener("click", musicToggle);


/* =========================
   CAMERA ROLL
========================= */

const roll = document.getElementById("roll");

let dragging = false;
let startX = 0;
let currentX = 0;

roll.addEventListener("pointerdown", (event) => {

  dragging = true;
  startX = event.clientX;

  roll.style.animationPlayState = "paused";
  roll.setPointerCapture(event.pointerId);

});


roll.addEventListener("pointermove", (event) => {

  if (!dragging) return;

  const difference = event.clientX - startX;

  currentX += difference;
  startX = event.clientX;

  roll.style.transform =
    `translateX(${currentX}px)`;

});


roll.addEventListener("pointerup", () => {

  dragging = false;

});


roll.addEventListener("pointercancel", () => {

  dragging = false;

});


/* =========================
   BIRTHDAY CAKE
========================= */

const blowButton = document.getElementById("blow");
const cake = document.querySelector(".cake");
const countdown = document.getElementById("countdown");

blowButton.addEventListener("click", () => {

  blowButton.disabled = true;

  cake.classList.add("blowing");

  let number = 3;

  countdown.textContent = number;

  const timer = setInterval(() => {

    number--;

    if (number > 0) {

      countdown.textContent = number;

    } else {

      clearInterval(timer);

      countdown.textContent = "";

      setTimeout(() => {

        cake.style.display = "none";

        document
          .getElementById("finale")
          .scrollIntoView({
            behavior: "smooth"
          });

        createPoppers();

      }, 500);

    }

  }, 700);

});


/* =========================
   PARTY POPPERS
========================= */

function createPoppers() {

  const container =
    document.getElementById("poppers");

  for (let i = 0; i < 100; i++) {

    const piece =
      document.createElement("i");

    piece.className = "pop";

    piece.style.left =
      (45 + Math.random() * 10) + "%";

    piece.style.top = "45%";

    const colors = [
      "#b76e67",
      "#e8c9b5",
      "#fff",
      "#d7b98c"
    ];

    piece.style.background =
      colors[i % colors.length];

    piece.style.setProperty(
      "--x",
      (Math.random() * 1000 - 500) + "px"
    );

    piece.style.setProperty(
      "--y",
      (Math.random() * 700 - 350) + "px"
    );

    piece.style.animationDelay =
      Math.random() * 0.3 + "s";

    container.appendChild(piece);

  }

}


/* =========================
   FLOATING FLOWERS
========================= */

function createPetal() {

  const petal =
    document.createElement("i");

  const symbols = [
    "✿",
    "❀",
    "♡"
  ];

  petal.textContent =
    symbols[
      Math.floor(
        Math.random() * symbols.length
      )
    ];

  petal.style.left =
    Math.random() * 100 + "vw";

  petal.style.setProperty(
    "--x",
    (Math.random() * 180 - 90) + "px"
  );

  petal.style.animationDuration =
    5 + Math.random() * 5 + "s";

  document
    .getElementById("petals")
    .appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 11000);

}

setInterval(createPetal, 1000);
