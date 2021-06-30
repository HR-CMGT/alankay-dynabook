const navButtons = document.querySelectorAll("nav>div")
const sectionTitles = document.querySelectorAll("section.blue")
const sectionsArray = Array.from(sectionTitles) // to use indexOf
const sectionImages = document.querySelectorAll("section img")
const navbar = document.querySelector("nav")
const header = document.querySelector("header")
const startPosition = navbar.offsetTop
const observer = new IntersectionObserver(entries => adjustVisibility(entries))


function init() {
    // nav button click listeners
    for(let [i, btn] of navButtons.entries()){
        btn.addEventListener("click", ()=> {
            sectionTitles[i].scrollIntoView({ behavior: "smooth", block: "start"})
        })
    }
    // for sticky navbar
    observer.observe(header)

    // to fade in images after scrolling
    for (let img of sectionImages) {
        observer.observe(img)
    }

    // to highlight the button for the current article
    for (let title of sectionTitles) {
        observer.observe(title)
    }
}


// observer callback
function adjustVisibility(entries) {
    //console.log('entry:', entry);
    for(let entry of entries){
        // fixed navbar once header is not visible anymore (todo extra room below header)
        if (entry.target.nodeName === "HEADER") {
            if (entry.intersectionRatio > 0) {
                removeSelected()
                navbar.classList.remove("sticky")
            } else {
                navbar.classList.add("sticky")
            }
        }
        // fade in images from the right
        if (entry.target.nodeName === "IMG" && entry.intersectionRatio > 0){
            entry.target.classList.add("fadeIn")
            observer.unobserve(entry.target)
        }
        // highlight the corresponding nav button for a section
        if (entry.target.nodeName === "SECTION") {
            let i = sectionsArray.indexOf(entry.target)
            if (entry.intersectionRatio > 0) {
                removeSelected()
                navButtons[i].classList.add("selected")
            }
        }
    }
}

// set all buttons unselected
function removeSelected() {
    for (let btn of navButtons) {
        btn.classList.remove("selected")
    }
}

init()