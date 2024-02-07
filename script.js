// Function to validate the form fields
function validateForm(e) {
    e.preventDefault();
    // console.log("validate function called");
    // Reset error messages
    document.getElementById("firstNameError").style.display = "none";
    document.getElementById("secondNameError").style.display = "none";
    document.getElementById("emailError").style.display = "none";
    document.getElementById("invalidEmailError").style.display = "none";
    document.getElementById("messageError").style.display = "none";
    document.getElementById("messageLengthError").style.display = "none";

    // Validate name
    var firstName = document.getElementById("firstName").value.trim();
    var secondName = document.getElementById("secondName").value.trim();
    if( firstName.trim() === "") {
        document.getElementById("firstNameError").style.display = "block";
        return false;
    }
    if(secondName.trim() === ""){
        document.getElementById("secondNameError").style.display = "block";
        return false;
    }

    // Validate email
    var email = document.getElementById("email").value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.trim() === " "){
        document.getElementById("emailError").style.display = "block";
        return false;
    }
    if(!emailPattern.test(email)) {
        document.getElementById("invalidEmailError").style.display = "block";
        return false;
    }

    // Validate message
    var message = document.getElementById("message").value.trim();
    if(message === ""){
        document.getElementById("messageError").style.display = "block";
        return false;
    }
    if(message.split(/\s+/).length > 500){
        document.getElementById("messageLengthError").style.display = "block";
        return false;
    }

    // if all validation pass, form submit to the server
    return true;

}

//  Function to update date
const dateUpdate = document.querySelector(".date-info");
const year = new Date().getFullYear();
dateUpdate.textContent = year;

// Function to update toogle menu
const openIcon = document.getElementById('openBtn');
const closeIcon = document.getElementById('closeBtn');
const containerDom = document.querySelector('.nav-lists');

openIcon.addEventListener('click', () => {
    containerDom.classList.add('showMenu');
});
closeIcon.addEventListener('click', () => {
    containerDom.classList.remove('showMenu');
});

//  Function for swiping functionality

let currentIndex = 0;
const portfolioImages = document.querySelectorAll('.portfolio-info');
const dotContainer = document.querySelector('.dot-container');

// Function to show the current image and active dot
function showImage(index) {
    portfolioImages.forEach((image, i) => {
        image.classList.remove('active');
        if (i === index) {
            image.classList.add('active');
        }
    });

    // Update active dot
    const dot = document.querySelectorAll('.dot');
    dot.forEach((dot, i) => {
        dot.classList.remove('active-dot');
        if (i === index) {
            dot.classList.add('active-dot');
        }
    });
}

// Function to handle the next image
function showNext() {
    currentIndex = (currentIndex + 1) % portfolioImages.length;
    showImage(currentIndex);
}

// Function to handle the previous image
function showPrev() {
    currentIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
    showImage(currentIndex);
}

// Initialize dots
portfolioImages.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => showImage(i));
    dotContainer.appendChild(dot);
});

// Show the initial image
showImage(currentIndex);

// Function for swiping image with hand
let touchStartX = 0;
let touchEndX = 0;

// event listener for touch event
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}
function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
}

//Function to handle swipe and navigate images
function handleSwipe(){
    const swipeThreshold = 6;

    if(touchStartX - touchEndX > swipeThreshold){
        currentIndex = (currentIndex + 1) % portfolioImages.length;
    } else if(touchEndX - touchStartX > swipeThreshold) {
        currentIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
    }

    // show the new image
    showImage(currentIndex)
}
// to add event listener for swipe detection
document.addEventListener('touchend', handleSwipe, false);
