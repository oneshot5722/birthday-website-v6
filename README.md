<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Happy Birthday, Chotu ♡</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500&family=Parisienne&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="grain"></div><div id="petals"></div>

<section class="hero" id="home">
  <span class="tiny top">A LITTLE SOMETHING FOR YOU</span>
  <span class="flower f1">✿</span><span class="flower f2">❀</span>
  <div class="hero-center">
    <p class="eyebrow">for my favourite twin</p>
    <h1>Happy Birthday,<br><em>Chotu ♡</em></h1>
    <p class="sub">some memories, a little letter,<br>and a whole lot of love.</p>
    <button id="start">OPEN THIS <b>↗</b></button>
  </div>
  <span class="tiny bottom">scroll slowly · there is no rush</span>
</section>

<section class="memories" id="memories">
  <div class="head">
    <span class="label">01 / MEMORIES</span>
    <h2>from then<br><em>to now.</em></h2>
    <p>temporary memories for now.<br>real photos will replace these later.</p>
  </div>

  <div class="roll-area">
    <div class="roll-title">CAMERA ROLL · 2010 — 2026</div>
    <div class="roll" id="roll">
      <figure><img src="assets/photo-01.svg"><figcaption>2010 · tiny you</figcaption></figure>
      <figure><img src="assets/photo-02.svg"><figcaption>2012 · growing up</figcaption></figure>
      <figure><img src="assets/photo-03.svg"><figcaption>2014 · classic chotu</figcaption></figure>
      <figure><img src="assets/photo-04.svg"><figcaption>2016 · school days</figcaption></figure>
      <figure><img src="assets/photo-05.svg"><figcaption>2018 · the chaos</figcaption></figure>
      <figure><img src="assets/photo-06.svg"><figcaption>2020 · still you</figcaption></figure>
      <figure><img src="assets/photo-07.svg"><figcaption>2022 · good days</figcaption></figure>
      <figure><img src="assets/photo-08.svg"><figcaption>2024 · another one</figcaption></figure>
      <figure><img src="assets/photo-09.svg"><figcaption>2026 · my favourite</figcaption></figure>
    </div>
    <div class="drag">← DRAG / SWIPE →</div>
  </div>
</section>

<section class="letter">
  <div class="paper">
    <span class="label">02 / THE LETTER</span>
    <div class="paper-flower">❀</div>
    <p class="date">11 · 08 · 2026</p>
    <p class="dear">Dear Chotu,</p>
    <div class="letter-text">
      <p>[YOUR BIRTHDAY LETTER GOES HERE]</p>
      <p>[We'll write the real one together later.]</p>
      <p class="love">I love you, Chotu.</p>
      <p>Stay goated. Enjoy your birthday, twin. ♡</p>
    </div>
    <p class="sign">— your twin</p>
  </div>
</section>

<section class="cake" id="cake">
  <span class="label">03 / MAKE A WISH</span>
  <div class="bunny" id="bunny">
    <div class="ears"><i></i><i></i></div><div class="face"><span>•ᴗ•</span></div>
  </div>
  <div class="cake-art"><div class="candles"><i></i><i></i><i></i></div><div class="cake-top"></div><div class="cake-body"></div></div>
  <h2 id="cakeText">Chotu, blow out the candles.</h2>
  <button id="blow">BLOW THE CANDLES</button>
  <div id="countdown"></div>
</section>

<section class="finale" id="finale">
  <div id="poppers"></div>
  <span class="label">04 / THAT'S ALL</span>
  <h2>Happiest Birthday<br><em>Weirdo.</em></h2>
  <p>stay goated, twin. ♡</p>
  <button id="musicToggle">♫ <span>play Harvey</span></button>
  <p class="end">I love you. · The End.</p>
</section>

<audio id="music" src="harvey.mp3" preload="auto"></audio>
<div class="music-pill" id="pill">♫ HARVEY · OFF</div>
<script src="script.js"></script>
</body>
</html>