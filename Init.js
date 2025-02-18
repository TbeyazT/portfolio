AOS.init({
    duration: 1000,
    once: true
});

const Texts = ["Web Developer", "Designer", "Freelancer", "A Fool"];
const Sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const modal = document.querySelector('.project-modal');
        const video = document.getElementById('projectVideo');
        const title = document.getElementById('modalTitle');
        const description = document.getElementById('modalDescription');
        
        const projectData = {
            videoSrc: card.dataset.video,
            title: card.dataset.title,
            description: card.dataset.description
        };

        video.src = projectData.videoSrc;
        title.textContent = projectData.title;
        description.textContent = projectData.description;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelector('.close-modal').addEventListener('click', () => {
    const modal = document.querySelector('.project-modal');
    const video = document.getElementById('projectVideo');
    
    modal.classList.remove('active');
    video.pause();
    document.body.style.overflow = 'auto';
});

document.querySelector('.project-modal').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.project-modal')) {
        document.querySelector('.project-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.getElementById("Date").innerHTML = new Date().getFullYear();

function typeWrite(element, text, i, fnCallback) {
    if (i < (text.length)) {
        document.getElementById(element).innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        i++;
        Sleep(100).then(() => {
            typeWrite(element, text, i, fnCallback);
        });
    } else if (typeof fnCallback == 'function') {
        Sleep(700).then(fnCallback);
    }
}

function StartTextAnimation(i) {
    if (typeof Texts[i] == 'undefined') {
        Sleep(1000).then(() => {
            StartTextAnimation(0);
        });
    } else if (i < Texts.length) {
        typeWrite("DevText", Texts[i], 0, function () {
            StartTextAnimation(i + 1);
        });
    } else {
        StartTextAnimation(0);
    }
}

StartTextAnimation(0);
