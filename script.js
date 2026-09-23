const cards = document.querySelectorAll(".project-card");

cards.forEach((card) => {
  card.style.cursor = "pointer";
});


window.addEventListener("load", () => {

  const videos = document.querySelectorAll(".vertical-videos video");

  if (videos.length === 0) {
    return;
  }


  // Quand une vidéo se termine
  videos.forEach((video, index) => {

    video.addEventListener("ended", () => {

      const nextIndex = (index + 1) % videos.length;

      videos[nextIndex].currentTime = 0;

      videos[nextIndex].play().catch(() => {
        // Si Safari bloque la lecture,
        // les vidéos restent simplement visibles.
      });

    });

  });


  // On attend que la première vidéo soit prête
  const firstVideo = videos[0];

  firstVideo.addEventListener("canplay", () => {

    firstVideo.play().catch(() => {
      // Safari peut bloquer l'autoplay.
      // Dans ce cas la vidéo reste visible.
    });

  }, { once: true });


  firstVideo.load();

});