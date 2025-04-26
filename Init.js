const categories = document.querySelectorAll('.category-btn');
const projectCards = document.querySelectorAll('.project-card');

categories.forEach(btn => {
    btn.addEventListener('click', () => {
        categories.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;

        projectCards.forEach(card => {
            card.style.display = card.dataset.category === category || category === 'all'
                ? 'block'
                : 'none';
        });
    });
});

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
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = (x / rect.width - 0.5) * 20;
        const rotateX = (y / rect.height - 0.5) * -20;
    
        requestAnimationFrame(() => {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    card.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        });
    });
    

    card.addEventListener('click', () => {
        const modal = document.querySelector('.project-modal');
        const videoContainer = document.querySelector('.video-container');
        const title = document.getElementById('modalTitle');
        const description = document.getElementById('modalDescription');
        const tech_stack = document.querySelector(".tech-stack");

        const projectData = {
            videoSrc: card.dataset.video,
            title: card.dataset.title,
            description: card.dataset.description,
            languages: card.dataset.languages,
        };

        videoContainer.innerHTML = '';

        if (projectData.videoSrc.includes('youtube.com') || projectData.videoSrc.includes('youtu.be')) {
            const iframe = document.createElement('iframe');
            iframe.src = projectData.videoSrc + "?autoplay=1&mute=1";
            iframe.allow = "autoplay; encrypted-media";
            iframe.allowFullscreen = true;
            iframe.width = "100%";
            iframe.height = "515";
            videoContainer.appendChild(iframe);
        } else {
            const video = document.createElement('video');
            video.src = projectData.videoSrc;
            video.controls = true;
            video.autoplay = true;
            video.muted = true;
            videoContainer.appendChild(video);
        }

        title.textContent = projectData.title;
        description.textContent = projectData.description;

        const techStack = projectData.languages.split(',').map((lang, index) => {
            const span = document.createElement('span');
            span.textContent = lang;
            span.style.animationDelay = `${index * 0.1}s`;
            return span;
        });

        tech_stack.innerHTML = '';
        techStack.forEach(span => tech_stack.appendChild(span));

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.addEventListener('scroll', () => {
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    document.documentElement.style.setProperty('--scroll', scrolled);
});

document.querySelector('.close-modal').addEventListener('click', () => {
    const modal = document.querySelector('.project-modal');
    const videoContainer = document.querySelector('.video-container');

    modal.classList.remove('active');
    videoContainer.innerHTML = '';
    document.body.style.overflow = 'auto';
});

document.querySelector('.project-modal').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.project-modal')) {
        document.querySelector('.project-modal').classList.remove('active');
        document.querySelector('.video-container').innerHTML = '';
        document.body.style.overflow = 'auto';
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.skill-item, .project-card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
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
