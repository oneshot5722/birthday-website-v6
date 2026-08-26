/* =========================================================
   BIRTHDAY WEBSITE — INTERACTION ENGINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const enterBtn = document.querySelector("#enterBtn");
  const wishBtn = document.querySelector("#wishBtn");
  const musicBtn = document.querySelector("#musicBtn");
  const music = document.querySelector("#birthdayMusic");

  const intro = document.querySelector("#intro");
  const main = document.querySelector("#main");
  const wishPage = document.querySelector("#wishPage");

  /* ---------------- MUSIC ---------------- */

  let playing = false;

  if (musicBtn && music) {
    musicBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      try {
        if (!playing) {
          await music.play();
          playing = true;
          musicBtn.classList.add("playing");
          musicBtn.innerHTML = "♫ MUSIC ON";
        } else {
          music.pause();
          playing = false;
          musicBtn.classList.remove("playing");
          musicBtn.innerHTML = "♫ MUSIC";
        }
      } catch (error) {
        console.log("Music could not start:", error);
        musicBtn.innerHTML = "CLICK AGAIN ♫";
      }
    });
  }

  /* ---------------- PAGE TRANSITION ---------------- */

  function openMain() {
    if (!intro || !main) return;

    intro.classList.add("leave");

    setTimeout(() => {
      intro.style.display = "none";
      main.classList.add("active");
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });
    }, 700);
  }

  if (enterBtn) {
    enterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openMain();
    });
  }

  /* ---------------- WISH PAGE ---------------- */

  if (wishBtn) {
    wishBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (!wishPage) return;

      wishPage.classList.add("show");

      setTimeout(() => {
        wishPage.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 50);
    });
  }

  /* ---------------- SCROLL INDICATOR ---------------- */

  const scrollText = document.querySelector(".scroll-text");

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollText) return;

      if (window.scrollY > 100) {
        scrollText.style.opacity = "0";
      } else {
        scrollText.style.opacity = "1";
      }
    },
    { passive: true }
  );

  /* ---------------- PHOTO PARALLAX ---------------- */

  const photos = document.querySelectorAll(".memory-photo");

  window.addEventListener(
    "scroll",
    () => {
      photos.forEach((photo) => {
        const rect = photo.getBoundingClientRect();
        const center = window.innerHeight / 2;
        const distance = rect.top + rect.height / 2 - center;

        if (Math.abs(distance) < window.innerHeight) {
          photo.style.transform =
            `translateY(${distance * -0.025}px)`;
        }
      });
    },
    { passive: true }
  );

  /* ---------------- FLOATING PARTICLES ---------------- */

  const particleContainer =
    document.querySelector(".particles");

  if (particleContainer) {
    for (let i = 0; i < 28; i++) {
      const particle = document.createElement("span");

      particle.className = "particle";

      particle.style.left =
        Math.random() * 100 + "%";

      particle.style.animationDelay =
        Math.random() * 8 + "s";

      particle.style.animationDuration =
        7 + Math.random() * 8 + "s";

      particleContainer.appendChild(particle);
    }
  }

  /* ---------------- CAKE COUNTDOWN ---------------- */

  const cakeBtn = document.querySelector("#cakeBtn");
  const countdown = document.querySelector("#countdown");
  const celebration = document.querySelector("#celebration");

  if (cakeBtn) {
    cakeBtn.addEventListener("click", () => {
      cakeBtn.disabled = true;

      let count = 3;

      if (countdown) {
        countdown.classList.add("visible");
        countdown.textContent = count;
      }

      const timer = setInterval(() => {
        count--;

        if (count > 0) {
          if (countdown) countdown.textContent = count;
        } else {
          clearInterval(timer);

          if (countdown) {
            countdown.textContent = "🎉";
          }

          if (celebration) {
            celebration.classList.add("explode");
          }

          createConfetti();

          setTimeout(() => {
            if (countdown) {
              countdown.textContent =
                "HAPPIEST BIRTHDAY, WEIRDO ♡";
            }
          }, 700);
        }
      }, 1000);
    });
  }

  /* ---------------- CONFETTI ---------------- */

  function createConfetti() {
    const symbols = ["✦", "♡", "✿", "•", "★"];

    for (let i = 0; i < 80; i++) {
      const piece = document.createElement("span");

      piece.className = "confetti";
      piece.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      piece.style.left =
        Math.random() * 100 + "vw";

      piece.style.top =
        "-20px";

      piece.style.animationDelay =
        Math.random() * 0.8 + "s";

      piece.style.animationDuration =
        2 + Math.random() * 3 + "s";

      document.body.appendChild(piece);

      setTimeout(() => {
        piece.remove();
      }, 5000);
    }
  }

  /* ---------------- KEYBOARD ENTER ---------------- */

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (intro && !intro.classList.contains("leave")) {
        openMain();
      }
    }
  });

});
