const params = new URLSearchParams(window.location.search);
const id = params.get("search");

const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=dua%20lipa";
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
      console.log(containerAlbum);

      dataAlbum.data.forEach((item) => {
        console.log(item.artist.picture);
        //BACKGROUND-ALBUM
        const background = document.createElement("div");
        background.style.background = "#ddbf4e";
        background.style.background =
          "linear-gradient(180deg, rgba(221,191,78,1)0%, rgba(18,18,18,1)50%)";
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
        arrowRight.className =
          "d-none d-sm-block bi bi-arrow-right-circle-fill";
        arrowRight.style.color = "black";
        arrowRight.style.fontSize = "30px";
        arrowRight.style.opacity = "0.3";
        //PROFILE
        const profile = document.createElement("div");
        profile.className = "ms-auto profile me-2";
        const bgProfile = document.createElement("div");
        bgProfile.className =
          "d-none d-sm-inline-flex align-items-center bg-dark text-white px-2 py-1";
        bgProfile.style.borderRadius = "50px";
        //PROFILE-IMG
        const profileImg = document.createElement("img");
        profileImg.src = `${item.artist.picture}`;
      });
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  albumPage();
};
