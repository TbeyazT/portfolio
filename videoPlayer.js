document.addEventListener('DOMContentLoaded', function () {
    const videoContainer = document.getElementById('backgroundVideo');
    const videoSources = [
        'Videos/video1.mp4',
        'Videos/video2.mp4',
        'Videos/video3.mp4',
        // Add more video paths as needed
    ];

    // Play the first video
    playRandomVideo();

    // Function to play a random video
    function playRandomVideo() {
        // Generate a random index
        const randomIndex = Math.floor(Math.random() * videoSources.length);
        // Set the source of the video element to the randomly selected video
        videoContainer.innerHTML = `<source src="${videoSources[randomIndex]}" type="video/mp4">`;
        // Play the video
        videoContainer.play();
    }

    // Play a new random video when the current one ends
    videoContainer.addEventListener('ended', playRandomVideo);
});
