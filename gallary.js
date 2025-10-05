window.onload = function() {
    addTabIndex();
    console.log("Page loaded and tab indexes added.");
};

function addTabIndex() {
    const images = document.querySelectorAll(".gallery img");
    const overlay = document.getElementById("lightboxOverlay");
    const overlayImg = overlay.querySelector("img");
    const overlayCaption = overlay.querySelector("p");
    let currentIndex = 0;

    for (let i = 0; i < images.length; i++) {
        images[i].setAttribute("tabindex", "0");

        // Mouse hover/focus
        images[i].onmouseover = () => images[i].style.border = "3px solid blue";
        images[i].onmouseleave = () => images[i].style.border = "none";
        images[i].onfocus = () => images[i].style.border = "3px solid green";
        images[i].onblur = () => images[i].style.border = "none";

        // Click -> open lightbox
        images[i].onclick = () => openLightbox(i);
    }

    function openLightbox(index) {
        currentIndex = index;
        overlay.style.display = "flex";
        overlayImg.src = images[index].src;
        overlayImg.alt = images[index].alt;
        overlayCaption.textContent = images[index].nextElementSibling.textContent;
        console.log("Lightbox opened for image:", index);
    }

    function closeLightbox() {
        overlay.style.display = "none";
        overlayImg.src = "";
        overlayCaption.textContent = "";
    }

    // Close on click outside image
    overlay.onclick = (e) => {
        if (e.target === overlay) closeLightbox();
    };

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (overlay.style.display === "flex") {
            if (e.key === "ArrowRight") {
                currentIndex = (currentIndex + 1) % images.length;
                overlayImg.src = images[currentIndex].src;
                overlayImg.alt = images[currentIndex].alt;
                overlayCaption.textContent = images[currentIndex].nextElementSibling.textContent;
            } else if (e.key === "ArrowLeft") {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                overlayImg.src = images[currentIndex].src;
                overlayImg.alt = images[currentIndex].alt;
                overlayCaption.textContent = images[currentIndex].nextElementSibling.textContent;
            } else if (e.key === "Escape") {
                closeLightbox();
            }
        }
    });
}
