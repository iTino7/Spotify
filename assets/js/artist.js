document.addEventListener("DOMContentLoaded", function () {
    const albumData = {
      cover: "./assets/imgs/main/image-16.jpg",
      title: "Fat Funny Friend - EP",
      artist: "Maddie Zahm",
      year: 2023,
      tracks: [
        { title: "Fat Funny Friend", duration: "3:45" },
        { title: "You Might Not Like Her", duration: "3:18" },
        { title: "Where Do All The Good Kids Go?", duration: "2:59" },
        { title: "Blind Spot", duration: "3:22" }
      ]
    };
  
    const container = document.getElementById("container-album");
  
    const albumHTML = `
      <div class="d-flex align-items-end mb-4">
        <img src="${albumData.cover}" alt="Copertina Album" class="me-3" style="width: 180px; height: 180px;" />
        <div>
          <h2 class="mb-0">${albumData.title}</h2>
          <p class="mb-1">${albumData.artist}</p>
          <small class="text-secondary">${albumData.year}</small>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        ${albumData.tracks.map((track, index) => `
          <li class="list-group-item bg-transparent text-white d-flex justify-content-between align-items-center border-secondary">
            <span>${index + 1}. ${track.title}</span>
            <span>${track.duration}</span>
          </li>
        `).join("")}
      </ul>
    `;
  
    container.innerHTML = albumHTML;
  });
  