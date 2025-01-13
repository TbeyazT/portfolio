const words = ["Website", "Game", "Software"];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

const targetWord = document.getElementById("textToChange");

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        targetWord.innerHTML = currentWord.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        targetWord.innerHTML = currentWord.substring(0, letterIndex + 1);
        letterIndex++;
    }

    if (!isDeleting && letterIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

typeEffect();
