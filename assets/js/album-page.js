const params = new URLSearchParams(window.location.search);

const id = params.get("search") || "Billie eilish";
console.log("id:", id);

const URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${id}`;
const API_KEY = "fab328e384msh921008f1a65af16p1061ebjsne15bd95c0462";

//ARROW-STYLE
const arrowStyle = (str, add, value) => {
  str.addEventListener(add, () => {
    str.style.opacity = value;
    str.style.transition = "0.8s";
  });
};

let profile; // Dichiara profile come variabile globale

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

      const background = document.createElement("div");

      background.style.backgroundImage = ` linear-gradient(180deg, rgba(221,191,78,0) 0%, rgba(18,18,18,1) 45%),url('${dataAlbum.data[0].album.cover_xl}')`;
      background.style.backgroundSize = "cover";
      background.style.backgroundPosition = "bottom";

      background.style.backgroundRepeat = "no-repeat";
      background.style.minHeight = "100vh";
      background.style.marginBottom = "60px";
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
      const buttonArrowLeft = document.createElement("button");
      buttonArrowLeft.style.border = "none";
      buttonArrowLeft.style.backgroundColor = "transparent";
      const hrefArrowLeft = document.createElement("a");
      hrefArrowLeft.href = "./index.html";

      const arrowLeft = document.createElement("i");
      arrowLeft.className = "d-none d-sm-block bi bi-arrow-left-circle-fill";
      arrowLeft.style.color = "black";
      arrowLeft.style.fontSize = "30px";
      arrowLeft.style.opacity = "0.3";
      arrowStyle(arrowLeft, "mouseenter", "0.8");
      arrowStyle(arrowLeft, "mouseleave", "0.3");

      //P-ARROW-RIGHT
      const buttonArrowRight = document.createElement("button");
      buttonArrowRight.style.border = "none";
      buttonArrowRight.style.backgroundColor = "transparent";
      const hrefArrowRight = document.createElement("a");
      hrefArrowRight.href = "./artist-page.html";
      const pRight = document.createElement("p");

      //ARROW-RIGHT
      const arrowRight = document.createElement("i");
      arrowRight.className = "d-none d-sm-block bi bi-arrow-right-circle-fill";
      arrowRight.style.color = "black";
      arrowRight.style.fontSize = "30px";
      arrowRight.style.opacity = "0.3";
      arrowStyle(arrowRight, "mouseenter", "0.8");
      arrowStyle(arrowRight, "mouseleave", "0.3");
      //PROFILE
      profile = document.createElement("div"); // Assegna il valore a profile
      profile.className =
        "ms-auto profile me-2 d-flex justify-content-around align-items-center";
      const bgProfile = document.createElement("div");
      bgProfile.className =
        "d-none d-sm-inline-flex align-items-center bg-dark text-white px-2 py-1";
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
      containerInfo.className =
        "d-flex flex-column align-items-center container-fluid mt-2 ms-md-2 flex-md-row align-items-end";
      //CONTAINER-ALBUM-FLEX
      const containerInfoFlex = document.createElement("div");
      containerInfoFlex.className = "d-flex";
      //ICON-MOBILE-ALBUM
      const buttonAlbumMobile = document.createElement("button");
      buttonAlbumMobile.style.border = "none";
      buttonAlbumMobile.style.backgroundColor = "transparent";
      buttonAlbumMobile.addEventListener("click", () => {
        window.location.assign(`index.html`);
      });

      buttonAlbumMobile.classList.add("d-flex");
      buttonAlbumMobile.classList.add("d-sm-none");
      buttonAlbumMobile.classList.add("m-0");
      const containerIconMobile = document.createElement("i");
      containerIconMobile.className =
        "d-block d-sm-none bi bi-arrow-left text-white ";

      //ICON-MOBILE-ALBUM-ARTIST PAGE

      const buttonAlbumMobileRight = document.createElement("button");
      buttonAlbumMobileRight.style.border = "none";
      buttonAlbumMobileRight.style.backgroundColor = "transparent";
      buttonAlbumMobileRight.addEventListener("click", () => {
        window.location.assign(`artist-page.html`);
      });

      buttonAlbumMobileRight.classList.add("d-flex");
      buttonAlbumMobileRight.classList.add("d-sm-none");
      buttonAlbumMobileRight.classList.add("m-0");
      const containerIconMobileRight = document.createElement("i");
      containerIconMobileRight.className =
        "d-block d-sm-none bi bi-arrow-right text-white ";

      buttonAlbumMobile.append(containerIconMobile);
      buttonAlbumMobileRight.appendChild(containerIconMobileRight);
      //ALBUM-IMG
      const containerImgDiv = document.createElement("div");
      containerImgDiv.className = "d-flex";
      const containerImg = document.createElement("img");
      containerImg.style.width = "200px";
      containerImg.src = item.album.cover_xl;
      containerImg.alt = item.name;

      containerImg.style.maxWidth = "300px";
      containerImg.style.boxShadow = "-2px 0px 23px 3px rgba(0, 0, 0, 0.63)";
      containerImgDiv.append(
        buttonAlbumMobile,
        containerImg,
        buttonAlbumMobileRight
      );

      //DESCRIPTION-ALBUM
      const descriptionContainer = document.createElement("div");
      descriptionContainer.className =
        "d-flex flex-column d-sm-flex container-d-flex ms-2";
      //P-DESCRIPTION
      const pDescription = document.createElement("p");
      pDescription.className = "mb-0 text-center text-md-start fw-bold ";
      pDescription.innerHTML = "Album";
      //H1-DESCRIPTION
      const h1Description = document.createElement("h1");
      h1Description.className =
        "d-none d-sm-flex fw-bold display-4  justify-content-center justify-content-md-start display-md-3 display-lg-1";
      h1Description.textContent = item.album.title;
      //SUB-DESCRIPTION
      const subDescriptionTitle = document.createElement("p");
      subDescriptionTitle.className =
        "d-flex d-sm-none justify-content-center my-2 fw-bold";
      subDescriptionTitle.innerHTML = item.album.title;
      const subDescriptionArtist = document.createElement("p");
      subDescriptionArtist.className =
        "d-flex d-sm-none justify-content-center fw-bold";
      subDescriptionArtist.innerHTML = item.artist.name;
      const titleAndArtist = document.createElement("p");
      titleAndArtist.className = "d-none d-sm-flex mb-0 mt-4 fw-bold";
      console.log(dataAlbum.data);

      const duration = dataAlbum.data
        .slice(0, 10)
        .reduce((acc, curr) => acc + curr.duration, 0);

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
      const buttonPlayer = document.createElement("button");
      const buttonPlayerPause = document.createElement("button");
      buttonPlayer.style.background = "transparent";
      buttonPlayer.style.border = "none";
      buttonPlayerPause.style.background = "transparent";
      buttonPlayerPause.style.border = "none";
      buttonPlayerPause.className = "d-none";
      const iconTrack = document.createElement("i");
      const iconTrackPause = document.createElement("i");
      iconTrack.className = "bi bi-play-circle-fill";
      iconTrack.className = "bi bi-play-circle-fill";
      iconTrackPause.className = "bi bi-pause-circle-fill";
      iconTrackPause.style.color = "#1ed760";
      iconTrackPause.style.fontSize = "45px";
      iconTrack.style.color = "#1ed760";
      iconTrack.style.fontSize = "45px";

      const buttonSong = (play, pause) => {
        play.addEventListener("click", () => {
          audio.play();
          play.classList.add("d-none");
          pause.classList.remove("d-none");
          pause.addEventListener("click", () => {
            audio.pause();
            play.classList.remove("d-none");
            pause.classList.add("d-none");
          });
        });
      };

      let audio = new Audio(dataAlbum.data[0].preview);

      buttonSong(buttonPlayer, buttonPlayerPause);

      //CONTAINER PLAYER-ARTIST AND ALBUM

      const photoAlbum = document.getElementById("album-photo");
      const imgAlbum = document.createElement("img");
      imgAlbum.src = dataAlbum.data[0].album.cover;
      imgAlbum.className = "me-2";

      const albumArtist = document.getElementById("album-artist");

      const nameAlbum = document.createElement("div");
      nameAlbum.innerHTML = dataAlbum.data[0].album.title;
      const nameArtist = document.createElement("div");
      nameArtist.innerHTML = dataAlbum.data[0].artist.name;

      const iconHeartPlayer = document.createElement("i");
      iconHeartPlayer.className = "ms-4 bi bi-heart";

      albumArtist.append(nameAlbum, nameArtist);
      photoAlbum.append(imgAlbum, albumArtist, iconHeartPlayer);

      //CONTAINER PLAYER-ARTIST AND ALBUM RESPONSIVE

      const divAlbumResponsive = document.getElementById(
        "album-photo-responsive"
      );
      const imgResponsiveAlbum = document.createElement("img");
      imgResponsiveAlbum.src = dataAlbum.data[0].album.cover_small;

      const trackText = document.querySelector(".track-text");
      const spanTitle = document.createElement("span");
      const spanArtist = document.createElement("span");
      spanTitle.className = "track-title ms-2";
      spanTitle.innerHTML = dataAlbum.data[0].album.title;
      spanArtist.className = "track-artist ms-2";
      spanArtist.innerHTML = dataAlbum.data[0].artist.name;

      const iconsResponsive = document.querySelector(".icons");

      const iconHeartContainer = document.createElement("button");
      iconHeartContainer.className = "icon-btn";
      const heartIcon = document.createElement("i");
      heartIcon.className = "bi bi-heart";
      const iconPcContainer = document.createElement("button");
      iconPcContainer.className = "icon-btn";
      const pcIcon = document.createElement("i");
      pcIcon.className = "bi bi-pc-display";
      const iconPlayContainer = document.createElement("button");
      iconPlayContainer.className = "icon-btn";
      const playIconFill = document.createElement("i");
      playIconFill.className = "bi bi-play-fill";

      iconHeartContainer.appendChild(heartIcon);
      iconPcContainer.appendChild(pcIcon);
      iconPlayContainer.appendChild(playIconFill);

      iconsResponsive.append(
        iconHeartContainer,
        iconPcContainer,
        iconPlayContainer
      );
      trackText.append(spanTitle, spanArtist);
      divAlbumResponsive.append(imgResponsiveAlbum, trackText, iconsResponsive);
      //CONTAINER PLAYER

      const containerControlsPlayer = document.getElementById("controls-audio");

      //SHUFFLE
      const playerIconShuffle = document.createElement("i");
      playerIconShuffle.className = "bi bi-shuffle pointer-hover";
      //BACKWARD
      const playerIconBackward = document.createElement("i");
      playerIconBackward.className =
        "bi bi-skip-backward-fill fs-5 pointer-hover";
      //PLAY
      const playerIconPlay = document.createElement("i");
      playerIconPlay.className = "bi bi-play-circle-fill fs-2 pointer-hover";
      playerIconPlay.style.color = "#1ed760";
      //PAUSE
      const playerIconPause = document.createElement("i");
      playerIconPause.className = "bi bi-pause-circle-fill fs-2 d-none";
      playerIconPause.style.color = "#1ed760";

      //SKIP
      const playerIconSkip = document.createElement("i");
      playerIconSkip.className = "bi bi-skip-forward-fill fs-5 pointer-hover";
      //REPEAT
      const playerIconRepeat = document.createElement("i");
      playerIconRepeat.className = "bi bi-repeat pointer-hover";
      buttonSong(playerIconPlay, playerIconPause);

      containerControlsPlayer.append(
        playerIconShuffle,
        playerIconBackward,
        playerIconPlay,
        playerIconPause,
        playerIconSkip,
        playerIconRepeat
      );

      //CONTAINER CONTROLS PLAYER

      const timeSong = (num) => {
        let song = (audio.currentTime =
          num < 60 && num != 0 ? `0.${num}` : num);
        return song;
      };

      const containerAvanzamento = document.getElementById(
        "controls-avanzamento"
      );

      const smallStart = document.createElement("small");
      smallStart.innerHTML = timeSong(0);

      const containerBarra = document.getElementById("barra-avanzamento");

      const divBarra = document.createElement("div");
      divBarra.className = "bg-white";
      divBarra.style.width = "25%";
      divBarra.style.height = "100%";

      const smallEnd = timeSong(30);
      containerBarra.appendChild(divBarra);
      containerAvanzamento.append(smallStart, containerBarra, smallEnd);

      buttonPlayerPause.appendChild(iconTrackPause);
      buttonPlayer.appendChild(iconTrack);
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
      const containerSongRow = document.createElement("div");
      containerSongRow.className = "row d-flex align-items-center";
      containerSongRow.style.color = "#9a9998";

      let audios = new Audio(dataAlbum.data);

      dataAlbum.data.slice(0, 10).forEach((item, index) => {
        const containerSong = document.createElement("div");
        containerSong.className =
          "col-12 col-md-8 d-flex align-items-center mt-4";
        const pSong = document.createElement("p");
        pSong.className = "me-3";
        pSong.innerHTML = index + 1;
        const containerTitleSong = document.createElement("div");
        containerTitleSong.className = "container d-flex flex-column";

        const titleSong = document.createElement("p");
        const span = document.createElement("span");
        span.style.marginLeft = "10px";

        const iconSpan = document.createElement("i");
        iconSpan.className = "bi bi-volume-up-fill d-none";
        iconSpan.style.color = "#1ed760";
        iconSpan.style.fontSize = "16px";

        titleSong.className = "m-0 text-white d-flex align-items-center";
        titleSong.style.fontSize = "13px";
        titleSong.innerHTML = item.title;

        titleSong.appendChild(span);
        span.appendChild(iconSpan);

        titleSong.addEventListener("mouseover", () => {
          titleSong.style.cursor = "pointer";
          titleSong.style.textDecoration = "underline";
        });

        titleSong.addEventListener("click", () => {
          if (audios.paused) {
            audios.src = item.preview;
            audios.play();
            iconSpan.classList.remove("d-none");
          } else {
            audios.pause();
            iconSpan.classList.add("d-none");
          }
          audios.addEventListener("ended", () => {
            iconSpan.classList.add("d-none");
          });
        });

        titleSong.addEventListener("mouseleave", () => {
          titleSong.style.textDecoration = "none";
        });

        // Collega lo slider del volume alla regolazione del volume dell'audio
        const volumeSlider = document.querySelector(".volume-slider");
        volumeSlider.addEventListener("input", (event) => {
          audio.volume = event.target.value; // Imposta il volume in base al valore dello slider
        });

        // Imposta il valore iniziale dello slider in base al volume corrente dell'audio
        volumeSlider.value = audio.volume;

        const artistTitle = document.createElement("p");
        artistTitle.style.fontSize = "13px";
        artistTitle.className = "mt1";
        artistTitle.innerHTML = item.artist.name;

        artistTitle.addEventListener("click", () => {
          window.location.assign(`artist-page.html?artist=${item.artist.name}`);
        });

        
        


        artistTitle.addEventListener("mouseover", () => {
          artistTitle.style.textDecoration = "underline";
          artistTitle.style.cursor = "pointer";
        });
        artistTitle.addEventListener("mouseleave", () => {
          artistTitle.style.textDecoration = "none";
        });

        //DIV-RANK
        const containerRank = document.createElement("div");
        containerRank.className = "d-none d-md-flex col-md-3 d-flex";
        const pRank = document.createElement("p");
        pRank.className = "m-0";
        const formatNumber = item.rank;
        const format = formatNumber.toLocaleString();
        pRank.style.fontSize = "13px";
        pRank.innerHTML = format;

        //DIV-TIME
        const containerTime = document.createElement("div");
        containerTime.className = "d-none d-md-flex col-md-1 d-flex";
        const timeP = document.createElement("p");
        timeP.className = "m-0";
        timeP.style.fontSize = "13px";

        const durationSongs = item.duration;

        const minutesSong = Math.floor(durationSongs / 60);
        const secondsSong = durationSongs % 60;

        const secondi = secondsSong < 10 ? `0${secondsSong}` : secondsSong;

        timeP.innerHTML = `${minutesSong}:${secondi}`;

        containerTitleSong.append(titleSong, artistTitle);
        containerSong.append(pSong, containerTitleSong);
        containerRank.append(pRank);
        containerTime.appendChild(timeP);
        containerSongRow.append(containerSong, containerRank, containerTime);
      });

      containerSongs.appendChild(containerSongRow);

      containerIconListRight.appendChild(iconRightSong);
      songList.append(pTrackList, pTitleTrackList);
      containerListRight.append(pListRight);
      containerRowList.append(
        songList,
        containerListRight,
        containerIconListRight
      );

      containerPTrackList.append(buttonPlayer, buttonPlayerPause);
      containerIconTrack.append(
        containerPTrackList,
        iconHeart,
        iconArrow,
        iconDots
      );

      containerTrackList.append(
        containerIconTrack,
        containerRowList,
        containerSongRow
      );
      descriptionContainer.append(
        pDescription,
        h1Description,
        subDescriptionTitle,
        subDescriptionArtist,
        titleAndArtist
      );
      spanProfile.appendChild(iProfile);
      bgProfile.append(spanProfile, profileImg);
      profile.appendChild(bgProfile);
      hrefArrowLeft.appendChild(arrowLeft);
      buttonArrowLeft.append(hrefArrowLeft);
      hrefArrowRight.appendChild(arrowRight);
      buttonArrowRight.appendChild(hrefArrowRight);
      containerArrow.append(pLeft, buttonArrowLeft, pRight, buttonArrowRight);
      containerNav.append(containerArrow, profile);
      background.append(
        containerNav,
        containerInfo,
        containerTrackList,
        containerSong
      );
      containerInfoFlex.append(containerImgDiv, descriptionContainer);
      containerInfo.append(containerInfoFlex, descriptionContainer);
      containerAlbum.append(background, containerSongs);
      console.log(containerAlbum);

      // Seleziona l'input del volume esistente nella playbar
      const volumeSlider = document.querySelector(".volume-slider");

      // Collega l'input al volume dell'audio
      volumeSlider.addEventListener("input", (event) => {
        audio.volume = event.target.value; // Imposta il volume in base al valore dell'input
      });

      // Imposta il valore iniziale del volume
      volumeSlider.value = audio.volume;
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  albumPage();
};

const homeBtn = document.getElementById("home-button");
homeBtn.addEventListener("click", () => {
  window.location.assign(`index.html`);
});

document.addEventListener("DOMContentLoaded", () => {
  const micBtn = document.getElementById("mic-btn");
  const listBtn = document.getElementById("list-btn");
  const pcBtn = document.getElementById("pc-btn");
  const volumeBtn = document.querySelector(".volume-btn");
  const volumeSlider = document.querySelector(".volume-slider");

  volumeBtn.addEventListener("click", () => {
    volumeSlider.classList.toggle("d-none");
    micBtn.classList.toggle("d-none");
    listBtn.classList.toggle("d-none");
    pcBtn.classList.toggle("d-none");
  });

  const closeWindowBtn = document.getElementById("close-window");
  const friendsBlocks = document.querySelectorAll(".friends-block");
  const friendsSection = document.getElementById("friends-section");
  const leftColumn = document.getElementById("left-column");

  closeWindowBtn.addEventListener("click", () => {
    friendsBlocks.forEach((block) => {
      block.classList.add("d-none"); // Aggiunge la classe d-none a ogni elemento
    });
    friendsSection.classList.add("d-none");
    leftColumn.classList.remove("col-1");
    const openWindow = document.createElement("i");
    openWindow.className = "bi bi-caret-left-square-fill text-secondary ms-2";
    profile.appendChild(openWindow);

    openWindow.addEventListener("click", () => {
      friendsBlocks.forEach((block) => {
        block.classList.remove("d-none");
      });
      friendsSection.classList.remove("d-none");
      leftColumn.classList.add("col-1");
      openWindow.classList.add("d-none");
    });
  });
});
