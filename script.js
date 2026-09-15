//Contact Form Validation
const contactForm = document.querySelector(".contact-form");

const nameInput = 
document.querySelector("#name");
const emailInput = 
document.querySelector("#email");
const messageInput = 
document.querySelector("#message");

const formMessage =
document.querySelector(".form-message");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    if(name === "") {
        formMessage.textContent = "Please enter your name.";
        formMessage.className = "form-message error";
    }else if(email === "") {
        formMessage.textContent = "Please enter your email address.";
        formMessage.className = "form-message error";
    }else if(!email.includes("@") || !email.includes(".")) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.className = "form-message error";
    }else if(message === ""){
        formMessage.textContent = "Please enter your message.";
        formMessage.className = "form-message error";
    }else {
        formMessage.textContent = "✅ Message Sent Successfully!";
        formMessage.className = "form-message success";
        
        contactForm.reset();
    }
    setTimeout(function () {
    formMessage.className = "form-message";
    formMessage.textContent = "";
}, 3000);
});

//Newsletter email validation
const newsletterForm = 
document.querySelector(".news-form");
const newsEmailInput = 
document.querySelector("#newsletter-email");
const newsEmailMessage = 
document.querySelector(".news-message");

newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const newsEmail = newsEmailInput.value.trim();
    if(newsEmail ==="") {
        newsEmailMessage.textContent = "Please enter your email address.";
        newsEmailMessage.className = "form-message error";
    }else if(!newsEmail.includes("@") || !newsEmail.includes(".")) {
        newsEmailMessage.textContent = "Please enter a valid email address.";
        newsEmailMessage.className = "form-message error";
    }else {
        newsEmailMessage.textContent = "Thanks for subscribing!";
        newsEmailMessage.className = "form-message success";
        newsletterForm.reset();
    }
    setTimeout(function () {
        newsEmailMessage.className = "form-message";
        newsEmailMessage.textContent = "";
    },3000);
});

//Slide Drawer Menu
const menuToggle = 
document.querySelector(".menu-toggle");
const sideDrawer = 
document.querySelector(".side-drawer");
const drawerOverlay = 
document.querySelector(".drawer-overlay");
const drawerClose = 
document.querySelector(".drawer-close");
const drawerLinks = 
document.querySelectorAll(".drawer-links a");

function openDrawer() {
    sideDrawer.classList.add("active");
    drawerOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeDrawer() {
    sideDrawer.classList.remove("active");
    drawerOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

menuToggle.addEventListener("click", openDrawer);
drawerClose.addEventListener("click", closeDrawer);
drawerOverlay.addEventListener("click", closeDrawer);
drawerLinks.forEach(function (link) {
    link.addEventListener("click", closeDrawer);
})

document.addEventListener("keydown", 
    function (event) {
    if(event.key === "Escape") {
        closeDrawer();
    }
});
//Dark mode
const themeToggle = 
document.querySelector(".theme-toggle");
const themeIcon = 
themeToggle.querySelector("i");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    themeIcon.classList.toggle("fa-moon");
    themeIcon.classList.toggle("fa-sun");
});

//Search Toggle
const searchToggle = 
document.querySelector(".search-toggle");
const searchBar = 
document.querySelector(".search-bar");
const searchInput = 
document.querySelector(".search-input");
const searchClose = 
document.querySelector(".search-close");
const searchResults = 
document.querySelector(".search-results");
const allBookCards = 
document.querySelectorAll(".book-card");

function openSearch() {
    searchBar.classList.add("active");
    searchInput.focus();
}

function closeSearch() {
    searchBar.classList.remove("active");
    searchInput.value = "";
    searchResults.innerHTML = "";
}

searchToggle.addEventListener("click", function () {
    if(searchBar.classList.contains("active")) {
        closeSearch();
    }else {
        openSearch();
    }
});

searchClose.addEventListener("click", closeSearch);

searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = "";
    
    if(query === "") {
        return;
    }
    let matches = 0;
    
    allBookCards.forEach(function (card) {
        const title = 
        card.dataset.title.toLowerCase();
        const author = 
        card.dataset.author.toLowerCase();
        
        if(title.includes(query) || author.includes(query)) {
        matches++;
            const resultItem = 
            document.createElement("div");
            resultItem.className = "search-result-item";
            resultItem.innerHTML = "<span>" + card.dataset.title + "</span><span>" + card.dataset.author + "</span>";
            
            resultItem.addEventListener("click", 
                function () {
                closeSearch();
                card.scrollIntoView({behavior:"smooth", block:"center"});
            });
            searchResults.appendChild(resultItem);
        }
    });
    
    if(matches === 0) {
        searchResults.innerHTML = '<p class = "search-no-results">No books found matching "  '+ query +'"</p>'
    }
});

//Active Navigation on Scroll
const sections = 
document.querySelectorAll("main section[id]");
const desktopNavLinks = 
document.querySelectorAll(".nav-links a");
const drawerNavLinks = 
document.querySelectorAll(".drawer-links a");

function updateActiveNav() {
    let currentSectionId = "";
    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 120;
        if(window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute("id");
        }
    });
    
    [desktopNavLinks, drawerNavLinks].forEach(function (linkGroup){
    
        linkGroup.forEach(function (link) {
            link.classList.remove("active");
            if(link.getAttribute("href") === "#" + currentSectionId) {
                link.classList.add("active");
            }
        });
    });
}
window.addEventListener("scroll", updateActiveNav);

//Scroll Reveal Animation
const revealSelectors = ".book-card, .category-card, .why-card, .stat-box, .review-card, .contact-card, .contact-form, .section-title";
const revealElements = document.querySelectorAll(revealSelectors);

revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
        if(entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
},
{threshold: 0.15}
);
revealElements.forEach(function (element) {
    revealObserver.observe(element);
});

//Animated Counters
const counters = document.querySelectorAll(".counter");

function animateCounter(counterElement) {
    const target = parseFloat(counterElement.dataset.target);
    const suffix = counterElement.dataset.suffix || "";
    const isDecimal = counterElement.dataset.decimal ==="true";
    const duration = 1800;
    const startTime = performance.now();
    
    function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = target * progress;
        
        if(isDecimal) {
            counterElement.textContent = currentValue.toFixed(1) + suffix;
        }else {
            counterElement.textContent = Math.floor(currentValue).toLocaleString() + suffix;
        }
        if(progress < 1) {
          requestAnimationFrame(updateCount);
        }
    }
    requestAnimationFrame(updateCount);
}
const counterObserver = new IntersectionObserver(
    function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

counters.forEach(function (counter) {
    counterObserver.observe(counter);
});

//BACK TO TOP BUTTON
const backToTop = 
document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if(window.scrollY > 500) {
        backToTop.classList.add("show");
    }else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior:"smooth"
    });
});