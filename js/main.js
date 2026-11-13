/* Seul JavaScript du site (justifié dans le README). */
const menu = document.getElementById("menu-principal");
const video = document.querySelector(".hero__video");

/* Un lien d'ancre ne peut pas fermer un popover : on le referme au clic. */
menu?.addEventListener("click", (event) => {
  if (event.target.closest("a") && menu.matches(":popover-open")) {
    menu.hidePopover();
  }
});

/* CSS ne peut pas mettre une vidéo en pause : on respecte « réduire les animations ». */
if (video && matchMedia("(prefers-reduced-motion: reduce)").matches) {
  video.pause();
}
