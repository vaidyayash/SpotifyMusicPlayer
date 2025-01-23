alert(
  "Please ensure the backend server is running locally before interacting with the Spotify Clone. Without it, some features may not work."
);

let audio = new Audio();
let state = {
  currentSongIndex: 0,
  currentAlbum: null,
  currentSongFileName: null,
};

let hamburger = document.querySelector(".right .header .hamburger");
let close = document.querySelector(".left .spotifyLogo .close");
let left = document.querySelector(".left");
let container = document.querySelector(".right .playlists .container");
let songList = document.querySelector(".bottom .songList");
let songListUL = document.querySelector(".bottom .songList ul");
let prevButton = document.querySelector(".playlists .playbar #prev-button");
let playButton = document.querySelector(".playlists .playbar #play-button");
let nextButton = document.querySelector(".playlists .playbar #next-button");
const songTimeElement = document.querySelector(".playbar .currentTime");
const songNameElement = document.querySelector(".playbar .songName");

hamburger.addEventListener("click", () => {
  left.style.left = "0";
});

close.addEventListener("click", () => {
  left.style.left = "-100%";
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
  }`;
}

async function hamburgAndClose() {
  let hamburger = document.querySelector(".right .header .nav .hamburger");
  hamburger.addEventListener("click", () => {
    let left = document.querySelector(".left");
    left.style.left = "0%";
  });

  let close = document.querySelector(".left .spotifyLogo .close");
  close.addEventListener("click", () => {
    let left = document.querySelector(".left");
    left.style.left = "-100%";
  });
}

prevButton.addEventListener("click", () => {
  if (state.currentAlbum) {
    state.currentSongIndex =
      (state.currentSongIndex - 1 + state.currentAlbum.songs.length) %
      state.currentAlbum.songs.length;
    playSong(state.currentAlbum.songs[state.currentSongIndex]);
  }
});

nextButton.addEventListener("click", () => {
  if (state.currentAlbum) {
    state.currentSongIndex =
      (state.currentSongIndex + 1) % state.currentAlbum.songs.length;
    playSong(state.currentAlbum.songs[state.currentSongIndex]);
  }
});

playButton.addEventListener("click", () => {
  if (audio.paused) {
    if (!audio.src) {
      console.warn("No song selected to play.");
      return;
    }
    audio.play();
  } else {
    audio.pause();
  }
  updatePlayButtonUI();
  updateSongListUI();
});

songList.addEventListener("click", (event) => {
  const playNowButton = event.target.closest("img");
  if (!playNowButton) return;

  const listItem = playNowButton.closest("li");
  if (!listItem) return;

  const index = [...songList.querySelectorAll("li")].indexOf(listItem);
  if (index === -1) return;

  const newSongFileName = listItem.getAttribute("data-file-name");

  if (state.currentSongFileName === newSongFileName && !audio.paused) {
    audio.pause();
  } else {
    state.currentSongIndex = index;
    state.currentSongFileName = newSongFileName;
    audio.src = `./songs/${newSongFileName}`;
    audio.play();
    songNameElement.innerHTML = listItem.querySelector(".songName").innerText;
  }
  updatePlayButtonUI();
  updateSongListUI();
});

async function playSong(song) {
  if (!song || !song.fileName) {
    console.warn("Invalid song data:", song);
    return;
  }

  state.currentSongFileName = song.fileName;
  audio.src = `./songs/${song.fileName}`;
  audio.play();
  songNameElement.innerHTML = song.songName;
  updatePlayButtonUI();
  updateSongListUI();
}

function updatePlayButtonUI() {
  playButton.setAttribute(
    "src",
    audio.paused ? "img/play.svg" : "img/pause.svg"
  );
}

function updateSongListUI() {
  document.querySelectorAll(".songList .playNow").forEach((btn, index) => {
    btn.setAttribute(
      "src",
      index === state.currentSongIndex && !audio.paused
        ? "img/pause.svg"
        : "img/play.svg"
    );
  });
}

async function createYourLibrary(songs) {
  songList = document.querySelector(".bottom .songList");
  songList.innerHTML = "";
  songList.style.display = "block";

  let ul = document.createElement("ul");
  songs.forEach((song, index) => {
    let li = document.createElement("li");
    li.setAttribute("data-file-name", song.fileName);

    let musicIcon = document.createElement("img");
    musicIcon.src = "img/music.svg";
    musicIcon.alt = "music";

    let info = document.createElement("div");
    info.className = "info";

    let songName = document.createElement("div");
    songName.className = "songName";
    songName.innerHTML = song.songName;

    let songArtist = document.createElement("div");
    songArtist.className = "artistName";
    songArtist.innerHTML = song.artistName;

    let playNow = document.createElement("img");
    playNow.src =
      index === state.currentSongIndex ? "img/pause.svg" : "img/play.svg";
    playNow.alt = "play music";
    playNow.className = "playNow";

    info.appendChild(songName);
    info.appendChild(songArtist);
    li.appendChild(musicIcon);
    li.appendChild(info);
    li.appendChild(playNow);
    ul.appendChild(li);
  });

  songList.appendChild(ul);
  hamburger.click();
}

async function createAlbums(albums) {
  let container = document.querySelector(".playlists .container");
  container.innerHTML = "";

  albums.forEach((album) => {
    if (
      !album.coverImage ||
      !album.albumName ||
      !album.artistName ||
      !album.songs
    ) {
      console.warn("Invalid album data:", album);
      return;
    }

    let card = document.createElement("div");
    card.className = "card";

    let cardImage = document.createElement("img");
    cardImage.className = "cardImage";
    cardImage.src = album.coverImage;

    let albumName = document.createElement("div");
    albumName.className = "title";
    albumName.innerHTML = album.albumName;

    let artistName = document.createElement("div");
    artistName.className = "description";
    artistName.innerHTML = album.artistName;

    card.appendChild(cardImage);
    card.appendChild(albumName);
    card.appendChild(artistName);
    container.appendChild(card);

    card.addEventListener("click", () => {
      state.currentAlbum = album;
      state.currentSongIndex = 0;
      createYourLibrary(album.songs);
      left.click();
      container.style.maxHeight = "65vh";
      playSong(album.songs[0]);
      let playbar = document.querySelector(".playlists .playbar");
      playbar.style.display = "flex";
    });
  });
}

async function seekbarEvents() {
  const seekbar = document.querySelector(".playlists .playbar .seekbar");

  seekbar.addEventListener("click", (event) => {
    const rect = seekbar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;

    audio.currentTime = percentage * audio.duration;
  });

  let isDragging = false;
  const circle = document.querySelector(".playlists .playbar .seekbar .circle");

  circle.addEventListener("mousedown", () => {
    isDragging = true;
  });

  document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    const rect = seekbar.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.min(Math.max(mouseX / width, 0), 1);

    audio.currentTime = percentage * audio.duration;
    circle.style.left = `${percentage * 100}%`;
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) isDragging = false;
  });

  audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration) && !isNaN(audio.currentTime)) {
      const currentTimeFormatted = formatTime(audio.currentTime);
      const durationFormatted = formatTime(audio.duration);
      songTimeElement.innerHTML = `${currentTimeFormatted} / ${durationFormatted}`;

      const percentage = (audio.currentTime / audio.duration) * 100;
      circle.style.left = `${percentage}%`;
    }
  });
}

async function main() {
  try {
    const response = await fetch("http://localhost:3000/albums");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const albums = await response.json();
    if (albums.length === 0) {
      console.warn("No albums available.");
      return;
    }
    createAlbums(albums);
    seekbarEvents();
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
}

main();
