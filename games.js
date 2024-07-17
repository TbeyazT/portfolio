const games = [
    {
        title: "BloodEngine",
        link: "https://www.roblox.com/games/13488637865/FREE-GUN-Blood-Engine",
        image: "Images/be.webp",
        description: "Made an teleport system for admins and a lot more things (fucking owner scammed me)"
    },
    {
        title: "Super Power Evolution Simulator",
        link: "https://www.roblox.com/games/12585099889/Super-Power-Evolution-Simulator",
        image: "Images/spes.webp",
        description: "Ore system - Fixed some bugs - a lot more things"
    },
    {
        title: "Bronx Streets 2",
        link: "https://www.roblox.com/games/17322605921/SCAMMING-Bronx-Streets-2",
        image: "Images/bronx.webp",
        description: "Gore System - Gun Fixes - A Lot More Things"
    },
];

document.addEventListener("DOMContentLoaded", () => {
    const gamesContainer = document.querySelector(".games");

    games.forEach(game => {
        const gameElement = document.createElement("div");
        gameElement.classList.add("game", "fade-in");

        gameElement.innerHTML = `
            <h3><a href="${game.link}" target="_blank">${game.title}</a></h3>
            <img src="${game.image}" alt="${game.title}" class="game-img">
            <p>${game.description}</p>
        `;

        gamesContainer.appendChild(gameElement);
    });
});
