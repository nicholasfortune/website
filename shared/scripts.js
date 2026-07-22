function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");        // remove leading #
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}
const rgb = hexToRgb("#ebf4f7");





const mobile = window.matchMedia("(max-aspect-ratio: 1/1)");

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(headerManager);
  fetch("/shared/footer.html")
    .then((response) => response.text())
    .then((html) => (document.getElementById("footer").innerHTML = html))
    .catch((error) => console.error("Error loading footer:", error));
  fetch("/shared/header.html")
    .then((response) => response.text())
    .then((html) => (document.getElementById("header").innerHTML = html))
    .catch((error) => console.error("Error loading header:", error));
});

function headerManager() {
  const heroContainer = document.getElementById("heroContainer");
  const heroImg = document.getElementById("heroImage");
  const heroImgAspectRatio = 16/9
  const heroText = document.getElementById("heroText");
  const header = document.getElementById("header");
  if (!heroImg || !heroContainer || !heroText || !header) return;
  const scrollY = window.scrollY;
  windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const heroImgHeight = parseInt(window.getComputedStyle(heroImg).height);
  const heroContainerHeight = heroContainer.offsetHeight;
  const fontSize = parseInt(getComputedStyle(heroText).fontSize, 10);
  headerHeight = 0;
  textTransform = 0;
  if (!mobile.matches) {
    const headerAlpha = scrollY / heroContainerHeight + 0.05;
    header.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${headerAlpha})`;
    headerHeight = 0;
  } else {
    header.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
    headerHeight = header.offsetHeight / 2;
    windowHeight = heroContainerHeight
  }
  textTransform = 0
  if (heroImgAspectRatio > windowWidth/windowHeight) {
    textTransform = scrollY / 2 + headerHeight;
    const newImgHeight = (windowHeight + (windowHeight - -1 * (scrollY - windowHeight)) / 5) + 2;
    heroImg.style.width = 'fit-content';
    heroImg.style.height = `${newImgHeight}px`;
    const heroCenter = heroContainerHeight > heroImgHeight ? heroImgHeight / 2 : heroContainerHeight / 2;
    heroText.style.top = `${heroCenter}px`;
    const translateY = (scrollY - heroCenter * 2) / 2;
    const imgTranslateY = (scrollY - heroImgHeight) / 2;
    const heroImgWidth = parseInt(window.getComputedStyle(heroImg).width);
    heroImg.style.transform = `translate(${-heroImgWidth / 2}px, ${imgTranslateY}px)`;
  } else {
    textTransform = scrollY / 2 + headerHeight;
    const newImgWidth = (windowWidth + (windowHeight - -1 * (scrollY - windowHeight)) / 5) + 2;
    heroImg.style.width = `${newImgWidth}px`;
    heroImg.style.height = `fit-content`;
    const heroCenter = heroContainerHeight > heroImgHeight ? heroImgHeight / 2 : heroContainerHeight / 2;
    heroText.style.top = `${heroCenter}px`;
    const translateY = (scrollY - heroCenter * 2) / 2;
    const imgTranslateY = (scrollY - heroImgHeight) / 2;
    heroImg.style.transform = `translate(${-newImgWidth / 2}px, ${imgTranslateY}px)`;
    heroText.style.transform = `translate(0px, ${textTransform - fontSize / 2}px)`;
    const blurAmount = (windowHeight - -1 * (scrollY - windowHeight)) / 50;
    heroImg.style.filter = `blur(${blurAmount}px)`;
  }

  heroText.style.transform = `translate(0px, ${textTransform - fontSize / 2}px)`;
  const blurAmount = (windowHeight - -1 * (scrollY - windowHeight)) / 50;
  heroImg.style.filter = `blur(${blurAmount}px)`;

  requestAnimationFrame(headerManager);
}
