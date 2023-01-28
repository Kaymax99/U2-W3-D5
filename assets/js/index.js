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
  /* console.log(prevailSongs); */
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
                            <h3 class="card-title shadowWht" songrank="${song.rank}">${song.title}</h3>
                            <h5 class="card-title shadowWht">${song.album.title}</h5>
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
                                <h6 class="card-title">${favSong[0].title} - ${favSong[0].artist.name}</h6>
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
                          <h3 class="shadowWht" songrank="${givenArray[i].rank}">${givenArray[i].title}</h3>
                          <h5 class="shadowWht">${givenArray[i].artist}</h5>
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
                          <h3 class="shadowWht" songrank="${givenArray[i].rank}">${givenArray[i].title}</h3>
                          <h5 class="shadowWht">${givenArray[i].artist}</h5>
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
  let h6 = document.querySelectorAll("h3");
  let titles = [];
  h6.forEach((element) => {
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

  /*   let alert = document.querySelector(".alert");
  alert.innerHTML = "";
  sortedSongs.forEach((song) => {
    alert.innerHTML += `<li class="list-group-item">
    ${song.title} - ${song.rank}`;
  }); */
};

window.onload = favSongs(favSongsUrl);
window.onload = drawFavSong();
for (let i = 0; i < albumsUrl.length; i++) {
  getAlbums(albumsUrl[i]);
}
