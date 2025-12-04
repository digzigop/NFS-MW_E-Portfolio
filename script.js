/* ============================
   Digz E-Portfolio — script.js
   Shared by all pages
   ============================ */

/* ------------- ASSET PLACEHOLDERS -------------
   Edit these arrays/paths to point at your actual files.
   - musicList: list of song objects { src, art, title }
   - contactData: maps contact type to details
--------------------------------------------------*/

const musicList = [
  { src: "Do Ya Thing (feat. Young Dro) - P$C.mp3", art: "DoYaThingImg.jpg", title: "Do Ya Thing (feat. Young Dro) - P$C" },
  { src: "Fired Up - Hush.mp3", art: "FiredUpImg.jpg", title: "Fired Up - Hush" },
  { src: "Nine Thou (Grant Mohrman Superstars Remix) - Styles Of Beyond.mp3", art: "NineThouImg.jpg", title: "Nine Thou (Grant Mohrman Superstars Remix) - Styles Of Beyond" },
  { src: "Sets Go Up (feat. Wacko) - JUVENILE.mp3", art: "SetsGoUpImg.jpg", title: "Sets Go Up (feat. Wacko) - JUVENILE" },
  { src: "Tilted - Lupe Fiasco.mp3", art: "TiltedImg.jpg", title: "Tilted - Lupe Fiasco" },
];

/* Contacts modal content mapping (edit URLs, images, descriptions)
   For facebook.instagram.github.email you can edit profileUrl to link user to your profile.
*/
const contactData = {
  facebook: {
    carImg: "BMW M3 GTR.png",
    desc: "The BMW M3 GTR is Razor’s signature ride, combining precision handling with raw street dominance. Its lightweight chassis and high-revving inline-six engine make it perfect for weaving through Rockport’s tight corners while maintaining explosive acceleration. With a curb weight of around 3,400 pounds, it delivers razor-sharp handling and instant throttle response, allowing drivers to execute aggressive drifts and outrun both rivals and cops alike. This car is designed for those who want total control without sacrificing speed, making it one of the most balanced and formidable vehicles in the Blacklist.",
    profileImg: "PFP_FB.png",
    profileUrl: "https://facebook.com/dvaughn.babanto/"
  },
  instagram: {
    carImg: "Ford Mustang GT.png",
    desc: "Razor’s Ford Mustang GT represents pure American muscle, built for those who prefer raw power over finesse. Equipped with a large-block V8, this heavyweight machine produces brutal low-end torque and an unmistakable roar. The Mustang excels on long straights and rough urban roads, delivering aggressive acceleration and overwhelming force. Weighing significantly more than the M3 GTR, it is less nimble but dominates in raw speed and intimidation. This ride is perfect for tearing through traffic and making a statement on the streets of Rockport, embodying the unrefined fury of classic muscle cars.",
    profileImg: "PFP_IG&Git.png",
    profileUrl: "https://instagram.com/digidigz/"
  },
  github: {
    carImg: "Porsche Carrera GT.png",
    desc: "The Porsche Carrera GT is a mid-engine supercar built for precision, balance, and extreme speed. Its 5.7-liter V10 engine produces 605 horsepower and 435 lb-ft of torque, propelling the car from 0 to 60 mph in under 4 seconds with a top speed of around 205 mph. Lightweight at approximately 3,042 pounds, the Carrera GT offers razor-sharp handling, exceptional braking, and exhilarating cornering stability. Every drift, turn, and straightaway feels deliberate and controlled, making it one of the most formidable and versatile rides on Rockport streets.",
    profileImg: "PFP_IG&Git.png",
    profileUrl: "https://github.com/digzigop/"
  },
  email: {
    carImg: "Lamborghini Gallardo.png",
    desc: "Hector “Ming” Domingo’s Lamborghini Gallardo is a predator on wheels, blending Italian exotic style with brutal performance. Its 5.0-liter V10 produces over 500 horsepower, launching the car from 0 to 60 mph in roughly 4 seconds, with a top speed approaching 200 mph. Weighing around 3,460 pounds, the Gallardo offers a perfect balance of agility and power, making it capable of both tight-corner precision and long-straight dominance. With AWD stability and mid-engine balance, this car delivers thrilling control and style, making it ideal for high-stakes races or evading relentless police pursuits.",
    profileImg: "PFP_Gmail.jpg",
    profileUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=2501115796@student.buksu.edu.ph"
  }
};

/* -------------------- Utilities -------------------- */
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

/* SFX elements */
const sfxHover = $("#sfx-hover");
const sfxClick = $("#sfx-click");
const sfxOpen = $("#sfx-open");
const sfxClose = $("#sfx-close");

/* Play sfx helper with small volume and no overlap spam */
function playSfx(el) {
  try {
    if(!el) return;
    el.currentTime = 0;
    el.volume = 0.9;
    el.play().catch(()=>{ /* ignore autoplay exceptions */ });
  } catch(e){}
}

/* ------------------- NAVIGATION ------------------- */
function initNav() {
  // Desktop nav buttons
  $$(".nav-btn").forEach(btn => {
    btn.addEventListener("mouseenter", ()=> playSfx(sfxHover));
    btn.addEventListener("click", (e)=> {
      playSfx(sfxClick);
      const target = btn.dataset.target;
      if (target) window.location.href = target;
    });
  });

  // Mobile menu toggle
  const mobileToggle = $("#mobile-toggle");
  const mobileDropdown = $("#mobile-dropdown");
  if (mobileToggle && mobileDropdown) {
    mobileToggle.addEventListener("click", () => {
      mobileDropdown.classList.toggle("show");
      playSfx(sfxClick);
    });
    // mobile links
    $$(".mobile-link").forEach(link => {
      link.addEventListener("click", () => {
        const t = link.dataset.target;
        if (t) window.location.href = t;
      });
    });

    // close when tapping outside
    document.addEventListener("click", (ev) => {
      const target = ev.target;
      if (!mobileDropdown.contains(target) && target !== mobileToggle) {
        mobileDropdown.classList.remove("show");
      }
    });
  }
}

/* ------------------- OVERLAY CONTROLS ------------------- */
function initOverlayControls() {
  const range = $("#overlayRange");
  const value = $("#overlayValue");
  const overlay = $("#bgOverlay");
  // set initial overlay element style
  if(range && overlay){
    const apply = (v) => {
      value.textContent = `${v}%`;
      overlay.style.background = `rgba(0,0,0,${v/100})`;
    };
    apply(range.value);
    range.addEventListener("input", () => apply(range.value));
  }
}

/* ------------------- MODAL CONTROLS (generic) ------------------- */
function openModal(modalEl) {
  if(!modalEl) return;
  const backdrop = $("#modalBackdrop");
  backdrop.classList.add("active");
  modalEl.classList.add("active");
  modalEl.setAttribute("aria-hidden", "false");
  playSfx(sfxOpen);
}
function closeModal(modalEl) {
  if(!modalEl) return;
  const backdrop = $("#modalBackdrop");
  backdrop.classList.remove("active");
  modalEl.classList.remove("active");
  modalEl.setAttribute("aria-hidden", "true");
  playSfx(sfxClose);
}

/* Clicking outside to close */
function initModalBackdrop() {
  const backdrop = $("#modalBackdrop");
  if(!backdrop) return;
  backdrop.addEventListener("click", () => {
    // close all open modals
    $$(".modal.active").forEach(m => closeModal(m));
  });

  // close buttons
  $$(".modal .modal-close").forEach(btn => {
    btn.addEventListener("click", (ev)=>{
      const modal = btn.closest(".modal");
      closeModal(modal);
    });
  });

  // add hover/click sfx to interactive buttons
  $$(".big-action, .contact-card, .achievement-card, .nav-btn, .mobile-link, .big-action").forEach(el=>{
    el.addEventListener("mouseenter", ()=> playSfx(sfxHover));
    el.addEventListener("click", ()=> playSfx(sfxClick));
  });
}

/* ------------- HOME ACTION BUTTONS (open specific modals) ------------- */
function initHomeActions() {
  $$(".big-action").forEach(btn => {
    const modalId = btn.dataset.modal;
    const modal = modalId && $(`#${modalId}`);
    btn.addEventListener("click", ()=> openModal(modal));
  });
}

/* ------------- ACHIEVEMENTS GRID CLICK ------------- */
function initAchievements() {
  const cards = $$(".achievement-card");
  const achModal = $("#achievementModal");
  const achImg = $("#achModalImg");
  const achTitle = $("#achModalTitle");
  const achDesc = $("#achModalDesc");
  cards.forEach(card => {
    card.addEventListener("click", ()=>{
      const img = card.dataset.img || card.querySelector("img")?.src;
      const title = card.dataset.title || card.querySelector("h3")?.innerText || "Achievement";
      const desc = card.dataset.desc || card.querySelector("p")?.innerText || "";
      if (img) achImg.src = img;
      achTitle.textContent = title;
      achDesc.textContent = desc;
      openModal(achModal);
    });
  });
}

/* ------------- CONTACTS MODAL ------------- */
function initContacts() {
  const contactBtns = $$(".contact-card");
  const contactModal = $("#contactModal");
  const contactCarImg = $("#contactCarImg");
  const contactCarDesc = $("#contactCarDesc");
  const contactProfile = $("#contactProfile");
  const contactProfileImg = $("#contactProfileImg");

  contactBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const info = contactData[type] || {};
      contactCarImg.src = info.carImg || "assets/img/car-default.jpg";
      contactCarDesc.textContent = info.desc || "";
      contactProfileImg.src = info.profileImg || "assets/img/profile.png";
      // clicking profile should redirect to profileUrl
      contactProfile.onclick = () => {
        if (info.profileUrl) {
          window.open(info.profileUrl, "_blank");
        }
      };
      openModal(contactModal);
    });
  });
}

/* ------------- MUSIC PLAYER LOGIC ------------- */
function initMusicPlayer() {
  const audio = $("#musicAudio");
  const albumArt = $("#albumArt");
  const songTitle = $("#songTitle");
  const prevBtn = $("#prevBtn");
  const nextBtn = $("#nextBtn");
  const playBtn = $("#playBtn");

  if(!audio) return;

  /* localStorage keys */
  const LS_INDEX = "digz_currentIndex";
  const LS_HISTORY = "digz_history"; // array of indexes
  const LS_POS = "digz_pos"; // position in history pointer

  // Load persisted history if it exists
  let history = JSON.parse(localStorage.getItem(LS_HISTORY) || "[]");
  let pos = parseInt(localStorage.getItem(LS_POS) || "-1", 10);
  let currentIndex = parseInt(localStorage.getItem(LS_INDEX) || "-1", 10);

  // Helper to set current track
  function setTrack(index, pushHistory = true) {
    index = ((index % musicList.length) + musicList.length) % musicList.length;
    const track = musicList[index];
    if (!track) return;

    // Update UI
    albumArt.src = track.art || "assets/img/album1.png";
    songTitle.value = track.title || songTitle.value;

    audio.src = track.src;
    audio.load();

    // Manage history
    if (pushHistory) {
      // If pos is not at end of history, remove forward items
      if (pos < history.length - 1) {
        history = history.slice(0, pos + 1);
      }
      history.push(index);
      pos = history.length - 1;
    }

    currentIndex = index;
    persist();
    // Autoplay attempt
    audio.play().catch(()=>{ /* some browsers block autoplay; user gesture may be necessary */ });
    playBtn.textContent = "⏯";
  }

  // Save to localStorage
  function persist(){
    localStorage.setItem(LS_INDEX, currentIndex.toString());
    localStorage.setItem(LS_HISTORY, JSON.stringify(history));
    localStorage.setItem(LS_POS, pos.toString());
  }

  // Choose random index != current
  function randomDifferent() {
    if (musicList.length <= 1) return 0;
    let rand;
    do { rand = Math.floor(Math.random() * musicList.length); } while (rand === currentIndex);
    return rand;
  }

  // Initialize playback on load
  if (history.length && pos >= 0 && history[pos] !== undefined) {
    // restore last playing track
    setTrack(history[pos], false);
  } else {
    // pick a random track initially
    const rand = Math.floor(Math.random() * musicList.length);
    setTrack(rand, true);
  }

  // Controls
  prevBtn?.addEventListener("click", () => {
    // go back in the history pointer
    if (pos > 0) {
      pos = pos - 1;
      const idx = history[pos];
      setTrack(idx, false);
    } else {
      // wrap to last track in circular fashion as requested
      // If history empty, jump to last index
      const idx = (currentIndex - 1 + musicList.length) % musicList.length;
      setTrack(idx, true);
    }
  });

  nextBtn?.addEventListener("click", () => {
    // pick a random track not equal to current
    const rand = randomDifferent();
    setTrack(rand, true);
  });

  playBtn?.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(()=>{});
      playBtn.textContent = "⏯";
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  });

  // update title if user edits the input
  songTitle?.addEventListener("input", () => {
    // no persistence of custom title to the list (keeps original), but UI is updated
  });

  // auto-advance when track ends: pick random track (not same)
  audio.addEventListener("ended", () => {
    const rand = randomDifferent();
    setTrack(rand, true);
  });

  // ensure UI consistent after load
  persist();
}

/* ------------------- INIT all modules ------------------- */
function initAll() {
  initNav();
  initOverlayControls();
  initModalBackdrop();
  initHomeActions();

  // page-specific
  if (document.body.classList.contains("page-achievements")) {
    initAchievements();
  }
  if (document.body.classList.contains("page-contacts")) {
    initContacts();
  }

  initMusicPlayer();

  // Add hover sfx to many interactive items so they trigger the hover-sfx
  ["button", ".nav-btn", ".big-action", ".contact-card", ".achievement-card", ".player-btn"].forEach(sel=>{
    $$(sel).forEach(el=>{
      el.addEventListener("mouseenter", ()=> { playSfx(sfxHover); });
      el.addEventListener("click", ()=> { playSfx(sfxClick); });
    });
  });

  // Add open/close sfx on modal open/close handled in openModal/closeModal functions
}

document.addEventListener("DOMContentLoaded", initAll);
