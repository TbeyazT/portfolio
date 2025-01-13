let slider = document.querySelector(".slider");
let scrollAmount = 0;
let scrollStep = 1;
let maxScroll = slider.scrollWidth - slider.clientWidth;

function scroll() {
    scrollAmount += scrollStep;

    slider.scrollLeft = scrollAmount;

    if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
    }
}

window.addEventListener("resize", () => {
    maxScroll = slider.scrollWidth - slider.clientWidth;
});

setInterval(scroll, 30);
