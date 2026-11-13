const menu = document.getElementById("menu-principal");
const video = document.querySelector(".hero__video");

menu?.addEventListener("click", (event) => {
  if (event.target.closest("a") && menu.matches(":popover-open")) {
    menu.hidePopover();
  }
});

if (video && matchMedia("(prefers-reduced-motion: reduce)").matches) {
  video.pause();
}
