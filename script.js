/* =========================
   2007.EXE
========================= */

let bootPercent = 0;

const bootMessages = [
  "INITIALIZING...",
  "LOADING SYSTEM FILES...",
  "RESTORING USER PROFILE...",
  "CONNECTING TO NETWORK...",
  "CHECKING CHAT LOGS...",
  "LOADING MUSIC...",
  "SYSTEM READY."
];

const bootInterval = setInterval(() => {

  bootPercent += 2;

  document.getElementById("bootProgress").style.width =
    bootPercent + "%";

  const index = Math.floor(
    bootPercent / (100 / bootMessages.length)
  );

  document.getElementById("bootStatus").textContent =
    bootMessages[Math.min(index, bootMessages.length - 1)];

  if (bootPercent >= 100) {

    clearInterval(bootInterval);

    setTimeout(() => {

      document.getElementById("bootScreen").style.display = "none";
      document.getElementById("desktop").style.display = "block";

    }, 700);

  }

}, 55);


/* =========================
   WINDOWS
========================= */

function openWindow(id) {

  const windowElement = document.getElementById(id);

  windowElement.style.display = "block";

  windowElement.style.zIndex = Date.now();

}

function closeWindow(id) {

  document.getElementById(id).style.display = "none";

}

function minimizeWindow(id) {

  document.getElementById(id).style.display = "none";

}


/* =========================
   START MENU
========================= */

document.querySelector(".startButton").addEventListener(
  "click",
  () => {

    const menu = document.getElementById("startMenu");

    menu.style.display =
      menu.style.display === "block"
        ? "none"
        : "block";

  }
);


/* =========================
   CLOCK
========================= */

function updateClock() {

  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;

  if (hours === 0) hours = 12;

  minutes = String(minutes).padStart(2, "0");

  document.getElementById("systemTime").textContent =
    `${hours}:${minutes} ${ampm}`;

}

setInterval(updateClock, 1000);

updateClock();


/* =========================
   FILES
========================= */

function showFile(name) {

  document.getElementById("fileMessage").textContent =
    `OPENED: ${name.toUpperCase()} — EMPTY`;

}

function systemFile() {

  document.getElementById("fileMessage").innerHTML =
    `
    <strong>SYSTEM WARNING</strong><br><br>
    This directory contains files that should not be modified.
    <br><br>
    Last modified: 08/24/2007 03:17 AM
    `;

}

function unknownFile() {

  const unlocked =
    localStorage.getItem("unknownUnlocked");

  if (unlocked === "true") {

    document.getElementById("fileMessage").innerHTML =
      `
      <strong>UNKNOWN.EXE</strong><br><br>
      YOU FOUND IT.<br><br>
      USER: GUEST<br>
      LOGIN: 08/24/2007<br>
      STATUS: ONLINE
      `;

    return;

  }

  const password = prompt(
    "UNKNOWN FOLDER\n\nPASSWORD REQUIRED:"
  );

  if (password &&
      password.toLowerCase() === "nightline") {

    localStorage.setItem(
      "unknownUnlocked",
      "true"
    );

    document.getElementById("fileMessage").innerHTML =
      `
      ACCESS GRANTED.<br><br>
      UNKNOWN.EXE HAS BEEN UNLOCKED.
      `;

  } else {

    document.getElementById("fileMessage").textContent =
      "ACCESS DENIED.";

  }

}


/* =========================
   INTERNET
========================= */

function loadWebsite() {

  const url =
    document.getElementById("urlInput").value;

  document.getElementById("browserPage").innerHTML =
    `
    <h1>404</h1>
    <p>
      The requested website could not be found.
    </p>
    <p>
      ${url}
    </p>
    `;

}

function website(site) {

  const page =
    document.getElementById("browserPage");

  if (site === "nightwire") {

    page.innerHTML = `
      <h1>NIGHTWIRE</h1>
      <p>Late night news for people who aren't sleeping.</p>
      <hr>
      <p>03:17 AM — Strange signal detected downtown.</p>
      <p>03:21 AM — Train station temporarily closed.</p>
      <p>03:24 AM — Unknown broadcast heard on 104.7 FM.</p>
    `;

  }

  if (site === "tokyo") {

    page.innerHTML = `
      <h1>TOKYO-NIGHTS</h1>
      <p>City photographs / music / nightlife</p>
      <hr>
      <p>SHIBUYA</p>
      <p>SHINJUKU</p>
      <p>ROPPONGI</p>
      <p>IKBUKURO</p>
    `;

  }

  if (site === "mp3") {

    page.innerHTML = `
      <h1>MP3-VAULT</h1>
      <p>FREE MP3 ARCHIVE</p>
      <hr>
      <p>01_NIGHT_DRIVE.mp3</p>
      <p>02_AFTER_MIDNIGHT.mp3</p>
      <p>03_TOKYO_RAIN.mp3</p>
      <p>04_UNKNOWN.mp3</p>
    `;

  }

  if (site === "chat") {

    page.innerHTML = `
      <h1>NIGHTLINE CHATROOM</h1>
      <p>[03:21] neonboy: anyone awake?</p>
      <p>[03:22] angel.exe: yeah</p>
      <p>[03:23] neonboy: something is wrong with the clock.</p>
    `;

  }

  if (site === "lost") {

    page.innerHTML = `
      <h1>LOST & FOUND</h1>
      <p>FOUND:</p>
      <hr>
      <p>Digital camera — found near train station.</p>
      <p>Date: 08/24/2007</p>
      <p>Time: 03:17 AM</p>
    `;

  }

}


/* =========================
   MUSIC PLAYER
========================= */

const songs = [

  {
    title: "NIGHT DRIVE.mp3",
    artist: "UNKNOWN ARTIST"
  },

  {
    title: "AFTER MIDNIGHT.mp3",
    artist: "NIGHTLINE"
  },

  {
    title: "TOKYO RAIN.mp3",
    artist: "UNKNOWN"
  },

  {
    title: "UNKNOWN.mp3",
    artist: "???"
  }

];

let currentSong = 0;
let playing = false;
let musicProgress = 0;

function selectSong(index) {

  currentSong = index;

  document.getElementById("songName").textContent =
    songs[index].title;

  document.getElementById("artistName").textContent =
    songs[index].artist;

  musicProgress = 0;

}

function toggleMusic() {

  playing = !playing;

  document.getElementById("playButton").textContent =
    playing ? "Ⅱ" : "▶";

}

function nextSong() {

  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  selectSong(currentSong);

}

function previousSong() {

  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  selectSong(currentSong);

}

setInterval(() => {

  if (!playing) return;

  musicProgress += .4;

  if (musicProgress >= 100) {

    musicProgress = 0;
    nextSong();

  }

  document.getElementById(
    "musicProgress"
  ).style.width = musicProgress + "%";

}, 100);


/* =========================
   MSN
========================= */

const chats = {

  "neonboy": [
    "anyone awake?",
    "you there?",
    "did you hear that?",
    "the clock hasn't moved."
  ],

  "angel.exe": [
    "hi",
    "don't open the unknown folder.",
    "seriously."
  ],

  "tokyo_97": [
    "hey",
    "i'm at the station",
    "there's nobody here."
  ],

  "offline": [
    "USER IS OFFLINE."
  ],

  "unknown": [
    "..."
  ]

};

let currentChat = "";

function openChat(user) {

  currentChat = user;

  document.getElementById("chatTitle").textContent =
    user;

  const messages =
    document.getElementById("messages");

  messages.innerHTML = "";

  chats[user].forEach(message => {

    const p = document.createElement("div");

    p.className = "message";

    p.innerHTML =
      `<b>${user}:</b> ${message}`;

    messages.appendChild(p);

  });

}

function sendMessage() {

  if (!currentChat) return;

  const input =
    document.getElementById("messageInput");

  const text = input.value.trim();

  if (!text) return;

  const messages =
    document.getElementById("messages");

  const userMessage =
    document.createElement("div");

  userMessage.className = "message";

  userMessage.innerHTML =
    `<b>you:</b> ${text}`;

  messages.appendChild(userMessage);

  input.value = "";

  setTimeout(() => {

    const reply =
      document.createElement("div");

    reply.className = "message";

    if (currentChat === "unknown") {

      reply.innerHTML =
        `<b>unknown_user:</b> I can see you.`;

    } else {

      reply.innerHTML =
        `<b>${currentChat}:</b> ...`;

    }

    messages.appendChild(reply);

    messages.scrollTop =
      messages.scrollHeight;

  }, 1200);

}


/* =========================
   CAMERA
========================= */

let photoNumber = 0;

function takePhoto() {

  photoNumber++;

  document.getElementById("photoMessage").textContent =
    `PHOTO_00${photoNumber}.JPG SAVED`;

}


/* =========================
   GAMES
========================= */

function startSnake() {

  document.getElementById("gameScreen").innerHTML =
    `
    <h2>SNAKE</h2>
    <p>Coming soon...</p>
    <p>High Score: 2007</p>
    `;

}

function startMinesweeper() {

  document.getElementById("gameScreen").innerHTML =
    `
    <h2>MINESWEEPER</h2>
    <p>10 × 10 GRID</p>
    <p>MINES: 10</p>
    <button onclick="alert('BOOM.')">
      START
    </button>
    `;

}

function startMysteryGame() {

  document.getElementById("gameScreen").innerHTML =
    `
    <h2>UNKNOWN.EXE</h2>
    <p>Loading...</p>
    `;

  setTimeout(() => {

    document.getElementById("gameScreen").innerHTML =
      `
      <h2>UNKNOWN.EXE</h2>
      <p>WHY ARE YOU PLAYING THIS?</p>
      <p>USER DETECTED.</p>
      <p>CONNECTION ESTABLISHED.</p>
      `;

  }, 1500);

}


/* =========================
   SHUTDOWN
========================= */

function shutdown() {

  document.getElementById("desktop").style.display =
    "none";

  document.getElementById("bootScreen").style.display =
    "flex";

  document.getElementById("bootStatus").textContent =
    "SYSTEM SHUTDOWN...";

}


/* =========================
   WINDOW CLICK FOCUS
========================= */

document.querySelectorAll(".window").forEach(windowElement => {

  windowElement.addEventListener("mousedown", () => {

    windowElement.style.zIndex = Date.now();

  });

});
