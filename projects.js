const projects = [
    {
      title: "Project 1",
      videoSrc: "videos/project1.mp4",
    },
    {
      title: "Project 2",
      videoSrc: "videos/project2.mp4",
    },
    {
      title: "Project 3",
      videoSrc: "videos/project3.mp4",
    },
];
  
function loadProjectVideos() {
    const projectContainer = document.getElementById("projectVideos");
  
    projects.forEach((project) => {
      const videoCard = document.createElement("div");
      videoCard.classList.add("video-card");
  
      videoCard.innerHTML = `
        <video controls>
          <source src="${project.videoSrc}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <p>${project.title}</p>
      `;
  
      projectContainer.appendChild(videoCard);
  });
}
  
document.addEventListener("DOMContentLoaded", loadProjectVideos);
