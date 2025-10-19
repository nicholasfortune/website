document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(headerManager);
    fetch("/Shared/footer.html")
        .then(response => response.text())
        .then(html => document.getElementById("footer").innerHTML = html)
        .catch(error => console.error("Error loading footer:", error));
    console.log(document.getElementById("footer"));
    fetch("/Shared/header.html")
        .then(response => response.text())
        .then(html => document.getElementById("header").innerHTML = html)
        .catch(error => console.error("Error loading header:", error));
});

function headerManager() {
    const heroContainer = document.getElementById("heroContainer");
    const heroImg = document.getElementById("heroImage");
    const heroText = document.getElementById("heroText");
    const header = document.getElementById("header");
    if (!heroImg || !heroContainer || !heroText || !header) return;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const heroImgWidth = parseInt(window.getComputedStyle(heroImg).width)
    const heroImgHeight = parseInt(window.getComputedStyle(heroImg).height)
    const heroContainerHeight = heroContainer.offsetHeight;
    const headerHeight = header.offsetHeight;
    const fontSize = parseInt(getComputedStyle(heroText).fontSize, 10);
    const textTransform = (scrollY + headerHeight) / 2;
    const newImgWidth = windowWidth + ((windowHeight - (-1 * (scrollY - windowHeight))) / 5);
    heroImg.style.width = `${newImgWidth}px`;
    const heroCenter = heroContainerHeight > heroImgHeight ? heroImgHeight / 2 : heroContainerHeight / 2;
    heroText.style.top = `${heroCenter}px`;
    const translateY = (scrollY - heroCenter * 2) / 2;
    const imgTranslateY = (scrollY - heroImgHeight) / 2;
    heroImg.style.transform = `translate(${-newImgWidth / 2}px, ${imgTranslateY}px)`;
    heroText.style.transform = `translate(0px, ${textTransform - fontSize / 2}px)`;
    const blurAmount = (windowHeight - (-1 * (scrollY - windowHeight))) / 50;
    heroImg.style.filter = `blur(${blurAmount}px)`;

    requestAnimationFrame(headerManager);
}