const params = new URLSearchParams(window.location.search);
const id = params.get("search") || "dua lipa";

console.log("SEARCH PARAM:", params.get("search"));

const URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${id}`;
const API_KEY = "fab328e384msh921008f1a65af16p1061ebjsne15bd95c0462";

const albumPage = () => {
  fetch(URL, {
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("errore");
      }
      return resp.json();
    })
    .then((dataAlbum) => {
      const containerAlbum = document.getElementById("container-album");

      console.log(dataAlbum);

      const background = document.createElement("div");
      background.style.background = "#ddbf4e";
      background.style.background = "linear-gradient(180deg, rgba(221,191,78,1)0%, rgba(18,18,18,1)50%)";
      background.style.height = "100vh";
      //CONTAINER-NAV
      const containerNav = document.createElement("div");
      containerNav.className = "containerNav d-flex w-100 align-items-center";
      //ARROW D-FLEX
      const containerArrow = document.createElement("div");
      containerArrow.className = "arrow d-flex";
      //P-ARROW-LEFT
      const pLeft = document.createElement("p");
      pLeft.className = "ms-1 m-0";
      // ARROW-LEFT
      const arrowLeft = document.createElement("i");
      arrowLeft.className = "d-none d-sm-block bi bi-arrow-left-circle-fill";
      arrowLeft.style.color = "black";
      arrowLeft.style.fontSize = "30px";
      arrowLeft.style.opacity = "0.8";
      //P-ARROW-RIGHT
      const pRight = document.createElement("p");
      pRight.className = "ms-2";
      //ARROW-RIGHT
      const arrowRight = document.createElement("i");
      arrowRight.className = "d-none d-sm-block bi bi-arrow-right-circle-fill";
      arrowRight.style.color = "black";
      arrowRight.style.fontSize = "30px";
      arrowRight.style.opacity = "0.3";
      //PROFILE
      const profile = document.createElement("div");
      profile.className = "ms-auto profile me-2";
      const bgProfile = document.createElement("div");
      bgProfile.className = "d-none d-sm-inline-flex align-items-center bg-dark text-white px-2 py-1";
      bgProfile.style.borderRadius = "50px";
      //PROFILE-IMG
      const profileImg = document.createElement("img");
      profileImg.src = "./assets/imgs/search/image-32.jpg";
      profileImg.alt = "";
      profileImg.style.height = "auto";
      profileImg.style.borderRadius = "50%";
      profileImg.style.width = "20px";
      //SPAN-PROFILE
      const spanProfile = document.createElement("span");
      const iProfile = document.createElement("i");
      spanProfile.innerHTML = "Lidia Nautilus...";
      iProfile.className = "bi bi-caret-down-fill ms-1";

      const item = dataAlbum.data[0];

      const containerInfo = document.createElement("div");
      containerInfo.className = "d-flex flex-column align-items-center container-fluid mt-2 ms-md-2 flex-md-row align-items-end";
      //CONTAINER-ALBUM-FLEX
      const containerInfoFlex = document.createElement("div");
      containerInfoFlex.className = "d-flex";
      //ICON-MOBILE-ALBUM
      const containerIconMobile = document.createElement("i");
      containerIconMobile.className = "d-block d-sm-none bi bi-arrow-left me-2";
      //ALBUM-IMG
      const containerImg = document.createElement("img");
      containerImg.src = item.album.cover_big;
      containerImg.alt = item.name;

      containerImg.style.maxWidth = "300px";
      containerImg.style.boxShadow = "-2px 0px 23px 3px rgba(0, 0, 0, 0.63)";
      containerImg.className = "w-75 w-sm-100";

      //DESCRIPTION-ALBUM
      const descriptionContainer = document.createElement("div");
      descriptionContainer.className = "d-flex flex-column d-sm-flex container-d-flex ms-2";
      //P-DESCRIPTION
      const pDescription = document.createElement("p");
      pDescription.className = "mb-0";
      pDescription.innerHTML = "Album";
      //H1-DESCRIPTION
      const h1Description = document.createElement("h1");
      h1Description.className = "d-none d-sm-flex fw-bold display-4 display-md-3 display-lg-1";
      h1Description.textContent = item.album.title;
      //SUB-DESCRIPTION
      const subDescriptionTitle = document.createElement("p");
      subDescriptionTitle.className = "d-flex d-sm-none b-0";
      subDescriptionTitle.innerHTML = item.album.title;
      const subDescriptionArtist = document.createElement("p");
      subDescriptionArtist.className = "d-flex d-sm-none";
      subDescriptionArtist.innerHTML = item.artist.name;
      const titleAndArtist = document.createElement("p");
      titleAndArtist.className = "d-none d-sm-flex mb-0 mt-4 fw-bold";
      const duration = dataAlbum.data.reduce((acc, curr) => acc + curr.duration, 0);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      titleAndArtist.innerHTML = `${item.artist.name} ● ${item.album.title} ● Album, ${minutes} min, ${seconds}sec. `;

      //TRACK-LIST
      const containerTrackList = document.createElement("div");
      containerTrackList.className = "container-fluid mt-3";
      containerAlbum.style.backgroundColor = "#0000001a";
      //TRACK-LIST-ICON
      const containerIconTrack = document.createElement("div");
      containerIconTrack.className = "containerSong d-flex align-items-center";
      //TRACK-LIST-P
      const containerPTrackList = document.createElement("p");
      containerPTrackList.className = "m-0";
      //TRACK-LIST-ICON
      const iconTrack = document.createElement("i");
      iconTrack.className = "bi bi-play-circle-fill";
      iconTrack.style.color = "#1ed760";
      iconTrack.style.fontSize = "45px";

      //CONTAINER-ICON-TRACKLIST
      const iconHeart = document.createElement("i");
      iconHeart.className = "bi bi-heart mx-4 fs-4";
      const iconArrow = document.createElement("i");
      iconArrow.className = "bi bi-arrow-down me-2 fs-4";
      const iconDots = document.createElement("i");
      iconDots.className = "bi bi-three-dots fs-4";

      //SONG-LIST
      const containerSong = document.createElement("div");
      containerSong.className = "container-fluid mt-1";

      const containerRowList = document.createElement("div");
      containerRowList.className = "row d-flex";
      containerRowList.style.color = "#9a9998";
      containerRowList.style.borderBottom = "1px solid rgba(128,128,128,0.288)";
      const songList = document.createElement("div");
      songList.className = "col-12 col-md-8 d-flex mt-2";
      const pTrackList = document.createElement("p");
      pTrackList.className = "m-0 me-3";
      pTrackList.style.fontSize = "12px";
      pTrackList.innerHTML = "#";
      const pTitleTrackList = document.createElement("p");
      pTitleTrackList.className = "mb-0";
      pTitleTrackList.style.fontSize = "12px";
      pTitleTrackList.innerHTML = "TITOLO";
      //CONTAINER-LIST-RIGHT
      const containerListRight = document.createElement("div");
      containerListRight.className = "d-none d-md-flex col-md-3 d-flex";
      const pListRight = document.createElement("p");
      pListRight.style.fontSize = "12px";
      pListRight.innerHTML = "RIPRODUZIONI";
      const containerIconListRight = document.createElement("div");
      containerIconListRight.className = "d-none d-md-flex col-md-1 d-flex";
      const iconRightSong = document.createElement("i");
      iconRightSong.className = "bi bi-clock";

      const containerSongs = document.createElement("div");
      containerSongs.className = "container-fluid";
      dataAlbum.data.slice(0, 4).forEach((item, index) => {
        const containerSong = document.createElement("div");
        containerSong.className = "col-12 col-md-8 d-flex align-items-center mt-4";
        const pSong = document.createElement("p");
        pSong.className = "me-3";
        pSong.innerHTML = index + 1;
        const containerTitleSong = document.createElement("div");
        containerTitleSong.className = "container d-flex flex-column";
        const titleSong = document.createElement("p");
        titleSong.className = "m-0 text-white";
        titleSong.style.fontSize = "13px";
        titleSong.innerHTML = item.title;
        const artistTitle = document.createElement("p");
        artistTitle.style.fontSize = "13px";
        artistTitle.className = "mt1";
        artistTitle.innerHTML = item.artist.name;
        containerTitleSong.append(titleSong, artistTitle);
        containerSong.append(pSong, containerTitleSong);
        containerSongs.appendChild(containerSong);
      });

      containerIconListRight.appendChild(iconRightSong);
      songList.append(pTrackList, pTitleTrackList);
      containerListRight.append(pListRight);
      containerRowList.append(songList, containerListRight, containerIconListRight);

      containerPTrackList.appendChild(iconTrack);
      containerIconTrack.append(containerPTrackList, iconHeart, iconArrow, iconDots);
      containerTrackList.append(containerIconTrack, containerRowList, containerSongs);
      descriptionContainer.append(pDescription, h1Description, subDescriptionTitle, subDescriptionArtist, titleAndArtist);
      spanProfile.appendChild(iProfile);
      bgProfile.append(spanProfile, profileImg);
      profile.appendChild(bgProfile);
      containerArrow.append(pLeft, arrowLeft, pRight, arrowRight);
      containerNav.append(containerArrow, profile);
      background.append(containerNav, containerInfo, containerTrackList, containerSong);
      containerInfoFlex.append(containerIconMobile, containerImg, descriptionContainer);
      containerInfo.append(containerInfoFlex, descriptionContainer);
      containerAlbum.append(background);
      console.log(containerAlbum);
    })
    .catch((error) => console.log(error));
};

const homeBtn = document.getElementById("home-button");
homeBtn.addEventListener("click", () => {
  window.location.assign(`index.html`);
});

window.onload = () => {
  albumPage();
};
