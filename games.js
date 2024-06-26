const games = [
    {
        title: "Super Power Evolution Simulator",
        link: "https://www.roblox.com/games/12585099889/Super-Power-Evolution-Simulator",
        image: "Images/spes.webp",
        description: "Ore system - Fixed some bugs - a lot more things"
    },
    {
        title: "Army Life Simulator",
        link: "https://www.roblox.com/games/10279525112/Turkish-Soldier-Simulator",
        image: "Images/teaf.webp",
        description: "Fixed A Lot Of Bugs - ReWritten Ui Scripts"
    },
    {
        title: "Bronx Streets 2",
        link: "https://www.roblox.com/games/17322605921/SCAMMING-Bronx-Streets-2",
        image: "Images/bronx.webp",
        description: "Gore System - Gun Fixes - A Lot More Things"
    },
    {
        title: "Soda Tycoon",
        link: "https://www.roblox.com/games/17700432018/Soda-Tycoon",
        image: "Images/soda.webp",
        description: "Added Drop System"
    },
    {
        title: "Preppy Con",
        link: "https://www.roblox.com/games/14656343876/Preppy-con",
        image: "Images/preppy.webp",
        description: "Made a lot of things bug fixes - anti cheat - Systems - and a lot more"
    }
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
            <button>Go To The Game</button>
        `;

        gamesContainer.appendChild(gameElement);
    });
});
