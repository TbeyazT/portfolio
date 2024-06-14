// videoPlayer.js
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('backgroundVideo');

    if (video) {
        video.play().catch(error => {
            console.error('Error attempting to play', error);
        });
    }
});
