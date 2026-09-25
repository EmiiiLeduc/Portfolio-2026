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



/* ========================================
   CHANGEMENT DE LANGUE FR / EN
======================================== */

const buttonFR = document.getElementById("lang-fr");
const buttonEN = document.getElementById("lang-en");


function changeLanguage(language) {

  // Cherche tous les textes qui possèdent
  // une version française ET anglaise
  const elements = document.querySelectorAll("[data-fr][data-en]");


  elements.forEach((element) => {

    element.textContent = element.dataset[language];

  });


  // Change la langue indiquée dans le HTML
  document.documentElement.lang = language;


  // Mémorise la langue choisie
  localStorage.setItem("language", language);


  // Indique visuellement quelle langue est active

  if (buttonFR) {
    buttonFR.classList.toggle("active", language === "fr");
  }

  if (buttonEN) {
    buttonEN.classList.toggle("active", language === "en");
  }

}



/* ========================================
   CLIC SUR FR
======================================== */

if (buttonFR) {

  buttonFR.addEventListener("click", () => {

    changeLanguage("fr");

  });

}



/* ========================================
   CLIC SUR EN
======================================== */

if (buttonEN) {

  buttonEN.addEventListener("click", () => {

    changeLanguage("en");

  });

}



/* ========================================
   LANGUE MÉMORISÉE
======================================== */

// Si le visiteur a déjà choisi une langue,
// le site garde cette langue.
//
// Sinon le français est utilisé par défaut.

const savedLanguage = localStorage.getItem("language") || "fr";

changeLanguage(savedLanguage);