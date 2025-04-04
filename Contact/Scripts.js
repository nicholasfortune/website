document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(headerManager);
    fetch("/Shared/Footer.html")
        .then(response => response.text())
        .then(html => document.getElementById("footer").innerHTML = html)
        .catch(error => console.error("Error loading footer:", error));
});

function headerManager() {
    const heroContainer = document.getElementById("heroContainer");
    const heroImg = document.getElementById("heroImage");
    const heroText = document.getElementById("heroText");
    const header = document.getElementById("header");
    if (!heroImg) return;
    var heroImgHeight = parseInt(window.getComputedStyle(heroImg).height)
    var heroContainerHeight = parseInt(window.getComputedStyle(heroContainer).height)
    var textTransform = (window.scrollY+parseInt(window.getComputedStyle(header).height, 10))/2
    heroImg.style.width = window.innerWidth+((window.innerHeight-(-1*(window.scrollY-innerHeight)))/5)+"px"
    if (heroContainerHeight>heroImgHeight) {
        heroText.style.top = (heroImgHeight/2)+"px"
        heroImg.style.transform = "translate("+(-1*(parseInt(window.getComputedStyle(heroImg).width)/2))+"px, "+((window.scrollY-heroContainerHeight)/2)+"px)"
    } else {
        heroText.style.top = (heroContainerHeight/2)+"px"
        heroImg.style.transform = "translate("+(-1*(parseInt(window.getComputedStyle(heroImg).width)/2))+"px, "+((window.scrollY-heroImgHeight)/2)+"px)"
    }
    heroText.style.transform = "translate(0px, "+(textTransform-parseInt(window.getComputedStyle(heroText).fontSize, 10)/2)+"px)"
    heroImg.style.filter = "blur("+((window.innerHeight-(-1*(window.scrollY-window.innerHeight)))/50)+"px)"
    requestAnimationFrame(headerManager);
}