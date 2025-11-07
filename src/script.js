"use strict";

/**
 * @param {Game} game
 * @returns {HTMLLIElement}
 */
function buildGameEntry(game) {
    const template = document.getElementById("game-entry");
    const clone = template.content.cloneNode(true);

    clone.querySelector(".title").innerText = game.title;
    clone.querySelector(".genre").innerText = game.genre;
    clone.querySelector(".platform").innerText = game.platform;

    return clone.querySelector("li");
}

function onPageLoad() {
    const gamesList = document.getElementById("games");
    for (const game of games) {
        console.log(game);
        gamesList.appendChild(buildGameEntry(game));
    }
}

onPageLoad();
