const defaultUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const favSongsUrl = "I prevail";
const albumsUrl = ["Trauma I Prevail", "Transmissions", "Direction Solence"];

const getSongsByQuery = async function (url) {
  try {
    let res = await fetch(defaultUrl + url);
    if (res.ok) {
      let data = await res.json();
      jsonArray = data.data;
      return jsonArray;
    }
  } catch (error) {
    console.log(error);
  }
};

const favSongs = async function (url) {
  let songs = await getSongsByQuery(url);
  const prevailSongs = songs.slice(0, 19);
  console.log(prevailSongs);
  const favSong = prevailSongs.slice(0, 1);
  /* console.log(favSong); */
  sessionStorage.setItem("favsong", JSON.stringify(favSong));
  const selectedSongs = prevailSongs.slice(0, 4);
  /* console.log(selectedSongs); */

  let songContainer = document.getElementById("songContainer");
  selectedSongs.forEach((song) => {
    songContainer.innerHTML =
      songContainer.innerHTML +
      `<div class="col-12 col-md-6 d-flex justify-content-center mb-4">
                <div class="card" style="background-image: url(${song.album.cover_big})">
                        <div class="card-body d-flex align-items-center flex-column justify-content-between">
                            <h3 class="card-title shadowWht" songrank="${song.rank}">${song.title} - ${song.album.title}</h3>
                            <h5 class="card-title shadowWht">${favSong[0].artist.name}</h5>
                            <div class="text-center mt-2">
                            <figure>
                                <audio class="songPreview"
                                    controls
                                    src="${song.preview}">
                                </audio>
                            </figure>
                            <a href="${song.link}" target="_blank" class="btn btn-secondary">To song</a>
                        </div>
                </div>
            </div>
                `;
  });
};

const drawFavSong = async function () {
  let favSongString = sessionStorage.getItem("favsong");
  let favSong = JSON.parse(favSongString);
  /* console.log(favSong); */
  let favSongContainer = document.getElementById("favSongContainer");
  favSongContainer.innerHTML =
    favSongContainer.innerHTML +
    `<div class="card mb-3 px-0 col-12">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${favSong[0].album.cover_big}" class="img-fluid rounded">
                        </div>
                        <div class="col-md-8 d-flex justify-content-center align-items-center">
                            <div class="text-center d-flex flex-column">
                                <h1 class="card-title">${favSong[0].title} - ${favSong[0].artist.name}</h1>
                                <figure>
                                <audio class="songPreview"
                                    controls
                                    src="${favSong[0].preview}">
                                </audio>
                            </figure>
                            <a href="${favSong[0].link}" target="_blank" class="btn btn-secondary">To song</a>
                        </div>
                    </div>
                </div>
            </div>`;
};

class AlbumCopy {
  constructor(target) {
    this.albumTitle = target.album.title;
    this.title = target.title;
    this.artist = target.artist.name;
    this.cover = target.album.cover_big;
    this.rank = target.rank;
  }
}

const albumArray = [];

const getAlbums = async function (url) {
  let albums = await getSongsByQuery(url);
  /* console.log(albums); */
  albumArray.push(new AlbumCopy(albums[2]));
  drawAlbums(albumArray);
};
const drawAlbums = function (givenArray) {
  let carouselContainer = document.getElementById("carouselContainer");
  if (givenArray.length === 3) {
    /* console.log(givenArray); */
    albumArray.reverse();
    for (let i = 0; i < givenArray.length; i++) {
      if (i > 0) {
        carouselItem = `
              <div class="carousel-item">
                  <div class="carousel-pic" style="background-image: url(${givenArray[i].cover})" "></div>
                      <img src="">
                      <div class="carousel-caption d-md-block">
                          <h3 class="shadowWht" songrank="${givenArray[i].rank}">${givenArray[i].title} - ${givenArray[i].albumTitle}</h3>
                          <h4 class="shadowWht">${givenArray[i].artist}</h4>
                      </div>
                  </a>
              </div> 
          `;
      } else {
        carouselItem = `
              <div class="carousel-item active">
                  <div class="carousel-pic" style="background-image: url(${givenArray[i].cover})" "></div>
                      <img src="">
                      <div class="carousel-caption d-md-block">
                          <h3 class="shadowWht" songrank="${givenArray[i].rank}">${givenArray[i].title} - ${givenArray[i].albumTitle}</h3>
                          <h4 class="shadowWht">${givenArray[i].artist}</h4>
                      </div>
                  </a>
              </div> 
          `;
      }
      carouselContainer.innerHTML = carouselContainer.innerHTML + carouselItem;
    }
  }
};

const arrayRanks = () => {
  let h3 = document.querySelectorAll("h3");
  let titles = [];
  h3.forEach((element) => {
    titles.push({
      title: element.innerText,
      rank: Number(element.getAttribute("songrank")),
    });
  });
  return titles;
};

const rankedTitles = () => {
  let songs = arrayRanks();
  let sortedSongs = songs.sort((a, b) => {
    return a.rank - b.rank;
  });

  let alert = document.querySelector(".alert");
  alert.innerHTML = "";
  sortedSongs.forEach((song) => {
    alert.innerHTML += `<li class="list-group-item">
    ${song.title} | ${song.rank}`;
  });
  return alert;
};

window.onload = favSongs(favSongsUrl);
window.onload = drawFavSong();
for (let i = 0; i < albumsUrl.length; i++) {
  getAlbums(albumsUrl[i]);
}

function CustomAlert() {
  this.alert = function (message, title) {
    document.body.innerHTML =
      document.body.innerHTML +
      '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

    let dialogoverlay = document.getElementById("dialogoverlay");
    let dialogbox = document.getElementById("dialogbox");

    let winH = window.innerHeight;
    dialogoverlay.style.height = winH + "px";

    dialogbox.style.top = "100px";

    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";

    document.getElementById("dialogboxhead").style.display = "block";

    if (typeof title === "undefined") {
      document.getElementById("dialogboxhead").style.display = "none";
    } else {
      document.getElementById("dialogboxhead").innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
    }
    document.getElementById("dialogboxbody").innerHTML = message;
    document.getElementById("dialogboxfoot").innerHTML =
      '<button class="pure-material-button-contained active" onclick="customAlert.ok()">OK</button>';
  };

  this.ok = function () {
    document.getElementById("dialogbox").style.display = "none";
    document.getElementById("dialogoverlay").style.display = "none";
  };
}
let customAlert = new CustomAlert();

const getAndPrintRanks = () => {
  rankedTitles();
  let alert = document.querySelector(".alert").innerHTML;
  customAlert.alert(alert);
};

const justTitles = () => {
  let h3 = document.querySelectorAll("h3");
  let titles = [];
  h3.forEach((element) => {
    titles.push({
      title: element.innerText,
    });
  });
  return titles;
};

const addSongsToModal = () => {
  let titles = justTitles();
  console.log(titles);
  const modalTitle = document.getElementById("exampleModalLabel");
  const modalBody = document.getElementById("modalBody");
  modalTitle.innerText = "Here's all the songs and their albums";
  modalBody.innerHTML = "";
  titles.forEach((title) => {
    modalBody.innerHTML += `<li class="list-group-item">
  ${title.title}`;
  });
};
