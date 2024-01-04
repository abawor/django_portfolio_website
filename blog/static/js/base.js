const hamburgerBtn = document.querySelector(".hamburger");
const navBarLinks = document.querySelector(".nav_bar_links");
const closeMark = document.querySelector(".close-mark");

hamburgerBtn.addEventListener("click", () => {
    navBarLinks.classList.toggle("active")
    hamburgerBtn.style.display = "none"
    closeMark.style.display = "flex"
    const navBarLinksList = document.getElementsByClassName("nav_bar_link")
    for (let i = 0; i < navBarLinksList.length; i++) {
        navBarLinksList[i].addEventListener("click", () => {
            closeMark.click()
        })
    }
});

closeMark.addEventListener("click", () => {
    navBarLinks.classList.remove("active")
    hamburgerBtn.style.display = "flex"
    closeMark.style.display = "none"
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1000 ) {
        navBarLinks.style.display = "flex"
        hamburgerBtn.style.display = "none"
        closeMark.style.display = "none"
    } else {
        hamburgerBtn.style.display = "flex"
        navBarLinks.style.display = "block"
    }
});