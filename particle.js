particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' }, // Set the color to white
        shape: { type: 'circle' }, // Use circles as the shape
        opacity: { value: 1, random: false, anim: { enable: false } }, // Set opacity to 1 (fully visible)
        size: { value: 2, random: true, anim: { enable: false } }, // Adjust the size as needed
        line_linked: { enable: false }, // Disable the lines between particles
        move: { enable: true, speed: 1, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false },
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true }, onclick: { enable: false }, resize: true },
    },
    retina_detect: true,
});
