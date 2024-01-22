document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.querySelector(".hamburger");
    const navBarLinks = document.querySelector(".nav_bar_links");
    const closeMark = document.querySelector(".close-mark");
    const submitBtn = document.querySelector(".submit_button")
    const formFields = document.querySelectorAll("#contact-me input[type='text'], #contact-me textarea");
    const portfolioItem = document.querySelectorAll(".portfolio_item")
    const portfolioItemDesc = document.querySelectorAll(".portfolio_item_desc")
    const closeBtns = document.querySelectorAll(".close_portfolio_item_desc")

    for (let i = 0; i < portfolioItem.length; i++) {
        portfolioItemDescClickHandler(portfolioItem[i], portfolioItemDesc[i], closeBtns[i])
    }

    function portfolioItemDescClickHandler(portfolioItem, portfolioItemDesc, closeBtn) {
        portfolioItem.addEventListener("click", () => {
            portfolioItemDesc.style.display = "flex"
        })
        closeBtn.addEventListener("click", (event) => {
            event.stopPropagation()
            portfolioItemDesc.style.display = "none"
        })
    }

 

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

    function isFormEmpty() {
        let empty = false
        formFields.forEach(function (input) {
            if (input.value.trim() === "") {
                empty = true
            }
        })
        return empty
    };

    function updateSubmitButtonState() {
        if (isFormEmpty()) {
            submitBtn.disabled = true
        } else {
            submitBtn.disabled = false

        }
    };

    Array.from(formFields).forEach(function (input) {
        input.addEventListener("change", updateSubmitButtonState);
    });

    document.getElementById('contact-me').addEventListener('submit', function(event) {
        event.preventDefault()
    
        submitBtn.disabled = true

        const url = this.dataset.url

        fetch(url, {
            method: 'POST',
            body: new FormData(this),
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Error sending email')
            }
        })
        .then(data => {
            if (data.status === 'success') {
                alert(data.message)
            } else {
                submitBtn.disabled = false
                alert('Error sending email: ' + data.message)
            }
        })
        .catch(error => {
            console.error('Error:', error)
        })
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 800 ) {
            navBarLinks.style.display = "flex"
            hamburgerBtn.style.display = "none"
            closeMark.style.display = "none"
        } else {
            hamburgerBtn.style.display = "flex"
            navBarLinks.style.display = "block"
        }
    });
});

