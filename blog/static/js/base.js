const hamburgerBtn = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav_bar_links")
const closeMark = document.querySelector(".close-mark")


hamburgerBtn.addEventListener("click", () => {
    navLinks.style.display = "block"
    hamburgerBtn.style.display = "none"
    closeMark.style.display = "flex"
});

closeMark.addEventListener("click", () => {
    navLinks.style.display = "none"
    hamburgerBtn.style.display = "flex"
    closeMark.style.display = "none"
})

window.addEventListener("resize", function() {
    if (window.innerWidth >= 1000 ) {
        navLinks.style.display = "flex"
        hamburgerBtn.style.display = "none"
        closeMark.style.display = "none"
    } else {
        hamburgerBtn.style.display = "flex"
        navLinks.style.display = "none"
    }
})