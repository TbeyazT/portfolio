document.addEventListener("DOMContentLoaded", () => {
    const gamesContainer = document.querySelector(".games");
    const games = [
        {
            title: "BloodEngine",
            link: "https://www.roblox.com/games/13488637865/FREE-GUN-Blood-Engine",
            image: "Images/be.webp",
            description: "Made a teleport system for admins and a lot more things (fucking owner scammed me)"
        },
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

    async function fetchRobloxData(game, gameElement) {
        try {
            const universeId = await getUniverseIdFromGameId(game.link.split('/').slice(-2, -1)[0]);
            const gameData = await fetchGameData(universeId);

            gameElement.innerHTML = `
                <h3><a href="${game.link}" target="_blank">${gameData.name}</a></h3>
                <img src="${game.image}" alt="${gameData.name}" class="game-img">
                <p>${game.description}</p>
                <p>Active Players: ${NumberConverter(gameData.playing, "norm")}</p>
                <p>Favorites: ${NumberConverter(gameData.favoritedCount, "norm")}</p>
                <p>Visits: ${NumberConverter(gameData.visits, "norm")}</p>
            `;

            gamesContainer.appendChild(gameElement);
        } catch (error) {
            console.error("Error fetching Roblox data:", error.message);
        }
    }

    games.forEach(game => {
        const gameElement = document.createElement("div");
        gameElement.classList.add("game", "fade-in");
        gamesContainer.appendChild(gameElement);
        fetchRobloxData(game, gameElement);
    });
});

async function getUniverseIdFromGameId(gameId) {
    const url = `https://apis.roproxy.com/universes/v1/places/${gameId}/universe`;

    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 429) {
                    const delay = Math.pow(2, retries) * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    retries++;
                    continue;
                } else {
                    throw new Error(`Failed to fetch data. Status code: ${response.status}`);
                }
            }

            const jsonData = await response.json();
            return jsonData.universeId;
        } catch (error) {
            retries++;
        }
    }

    throw new Error("Max retries reached. Unable to fetch data.");
}

async function fetchGameData(universeId) {
    const response = await fetch(`https://games.roproxy.com/v1/games?universeIds=${universeId}`);
    const data = await response.json();
    return data.data[0];
}

function NumberConverter(num, type) {
    if (type === "norm") {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num;
    }
    return num;
}
