const getSongs = async function () {
    try {
        let res = await fetch(
            'https://striveschool-api.herokuapp.com/api/deezer/search?q=I%20prevail'
        );  
        if (res.ok) {
            let data = await res.json()
            jsonArray = data.data
            const prevailSongs = jsonArray.slice(0, 19);
            console.log(prevailSongs)
            const previewSongs = prevailSongs.slice(0,4);
            // MAIN
            let songContainer = document.getElementById("songContainer");
            previewSongs.forEach((song) => {
                songContainer.innerHTML =
                  songContainer.innerHTML +
                `<div class="col-12 col-md-6 d-flex justify-content-center mb-4">
                    <div class="card" style="background-image: url(${song.album.cover_big});">
                            <div class="card-body d-flex align-items-center flex-column justify-content-between">
                                <h3 class="card-title shadowWht">${song.title}</h3>
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
              let favSongContainer = document.getElementById("favSongContainer");
              favSongContainer.innerHTML =
              favSongContainer.innerHTML + 
              `<div class="card mb-3 px-0 col-12">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="${prevailSongs[0].album.cover_big}" class="img-fluid rounded">
                            </div>
                            <div class="col-md-8 d-flex justify-content-center align-items-center">
                                <div class="text-center d-flex flex-column">
                                    <h5 class="card-title">${prevailSongs[0].title}</h5>
                                    <figure>
                                    <audio class="songPreview"
                                        controls
                                        src="${prevailSongs[0].preview}">
                                    </audio>
                                </figure>
                                <a href="${prevailSongs[0].link}" target="_blank" class="btn btn-secondary">To song</a>
                            </div>
                        </div>
                    </div>
                </div>`

        } 
    }
    catch (error) {
        console.log(error)
    }
};

getSongs()
