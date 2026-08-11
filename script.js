const music=document.getElementById("music"), musicBtn=document.getElementById("musicBtn"), pill=document.getElementById("musicPill");
function toggleMusic(){
  if(music.paused){music.play().then(()=>{pill.innerHTML="♫ <span>sound on</span>"; musicBtn.innerHTML="♫ <span>pause the soundtrack</span>"}).catch(()=>{});}
  else{music.pause();pill.innerHTML="♪ <span>sound off</span>";musicBtn.innerHTML="♪ <span>play the little soundtrack</span>"}
}
musicBtn.addEventListener("click",toggleMusic); pill.addEventListener("click",toggleMusic);
document.getElementById("openBtn").addEventListener("click",()=>document.getElementById("memories").scrollIntoView({behavior:"smooth"}));

const roll=document.getElementById("cameraRoll");let down=false,start=0,base=0;
roll.addEventListener("pointerdown",e=>{down=true;start=e.clientX;base=roll.scrollLeft;roll.setPointerCapture(e.pointerId);roll.style.animationPlayState="paused"});
roll.addEventListener("pointermove",e=>{if(!down)return;roll.style.transform=`translateX(${Math.min(0,-(e.clientX-start))}px)`});
roll.addEventListener("pointerup",()=>down=false);roll.addEventListener("pointercancel",()=>down=false);

function petal(){
 const p=document.createElement("span");p.className="petal";p.textContent=["✿","❀","·","♡"][Math.floor(Math.random()*4)];
 p.style.left=Math.random()*100+"vw";p.style.fontSize=(10+Math.random()*15)+"px";p.style.setProperty("--x",(Math.random()*180-90)+"px");
 p.style.animationDuration=(5+Math.random()*6)+"s";document.querySelector(".petals").appendChild(p);setTimeout(()=>p.remove(),12000);
}
setInterval(petal,850);
