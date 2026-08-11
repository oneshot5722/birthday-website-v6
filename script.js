
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const pre=$("#preloader"), count=$("#count"), line=document.querySelector(".loader-line i");
let n=0;
const loader=setInterval(()=>{n+=Math.floor(Math.random()*8)+2;if(n>=100){n=100;clearInterval(loader);setTimeout(()=>{pre.style.transition="opacity .8s";pre.style.opacity=0;setTimeout(()=>pre.remove(),850)},250)}count.textContent=String(n).padStart(2,"0");line.style.width=n+"%"},45);

const cursor=$("#cursor"),dot=$("#cursorDot");
window.addEventListener("pointermove",e=>{cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px";dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px"});
$$("a,button,.polaroid,.film-track figure").forEach(el=>{el.addEventListener("mouseenter",()=>document.body.classList.add("hovering"));el.addEventListener("mouseleave",()=>document.body.classList.remove("hovering"))});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
$$(".reveal,.section-label,.time-item,.polaroid,.music-card").forEach(e=>io.observe(e));

window.addEventListener("scroll",()=>{
  const h=document.documentElement.scrollHeight-innerHeight;
  $("#progress").style.width=(scrollY/h*100)+"%";
  document.documentElement.style.setProperty("--sy",scrollY);
});
function clock(){const d=new Date();$("#clock").textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(x=>String(x).padStart(2,"0")).join(":")}setInterval(clock,1000);clock();

const track=$("#filmTrack");let dragging=false,startX=0,startTx=0,tx=0;
function setTx(v){tx=v;track.style.transform=`translateX(${tx}px)`}
track.addEventListener("pointerdown",e=>{dragging=true;startX=e.clientX;startTx=tx;track.setPointerCapture(e.pointerId)});
track.addEventListener("pointermove",e=>{if(!dragging)return;setTx(startTx+(e.clientX-startX))});
track.addEventListener("pointerup",()=>dragging=false);track.addEventListener("pointercancel",()=>dragging=false);
let auto=true;
function filmAuto(){if(auto&&!dragging){setTx(tx-.22);if(Math.abs(tx)>track.scrollWidth*.65)tx=0}requestAnimationFrame(filmAuto)}filmAuto();
track.addEventListener("mouseenter",()=>auto=false);track.addEventListener("mouseleave",()=>auto=true);

$$(".magnetic").forEach(btn=>btn.addEventListener("pointermove",e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-(r.left+r.width/2))*.12}px,${(e.clientY-(r.top+r.height/2))*.12}px)`}));
$$(".magnetic").forEach(btn=>btn.addEventListener("pointerleave",()=>btn.style.transform=""));

const audio=$("#localAudio"), vinyl=$("#vinyl"), sound=$("#soundToggle"), enter=$("#enterBtn"), harvey=$("#harveyBtn");
let audioOn=false;
async function startLocal(){try{await audio.play();audioOn=true;vinyl.classList.add("playing");sound.innerHTML="SOUND <b>ON</b>"}catch(e){audioOn=false}}
enter.addEventListener("click",()=>{document.querySelector(".manifesto").scrollIntoView({behavior:"smooth"});startLocal()});
sound.addEventListener("click",()=>{if(audioOn){audio.pause();audioOn=false;vinyl.classList.remove("playing");sound.innerHTML="SOUND <b>OFF</b>"}else startLocal()});
harvey.addEventListener("click",()=>{
  // Official audio source; user can add their own legally obtained harvey.mp3 for local playback.
  window.open("https://www.youtube.com/watch?v=gaA7RAy5rYg","_blank","noopener,noreferrer");
});

const wall=$("#wall");
wall.addEventListener("pointermove",e=>{$$(".polaroid").forEach((p,i)=>{const r=p.getBoundingClientRect();const dx=(e.clientX-(r.left+r.width/2))/r.width;const dy=(e.clientY-(r.top+r.height/2))/r.height;if(!p.matches(":hover"))p.style.translate=`${dx*(i%2?4:-4)}px ${dy*(i%2?3:-3)}px`})});
wall.addEventListener("pointerleave",()=>$$(".polaroid").forEach(p=>p.style.translate=""));

$("#wishBtn").addEventListener("click",()=>{
  const box=$("#confetti");box.innerHTML="";
  for(let i=0;i<90;i++){const p=document.createElement("i");p.className="confetti-piece";p.style.left=(50+(Math.random()-.5)*12)+"%";p.style.top="50%";p.style.setProperty("--x",((Math.random()-.5)*1100)+"px");p.style.setProperty("--y",(Math.random()*800+200)+"px");p.style.background=["#e7c9b7","#fff1df","#a7463d","#c9a7a0","#d9d0b9"][i%5];p.style.transform=`rotate(${Math.random()*360}deg)`;p.style.animationDelay=(Math.random()*.35)+"s";box.appendChild(p)}
});
