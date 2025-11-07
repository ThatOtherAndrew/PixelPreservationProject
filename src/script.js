"use strict";

/**
 * @param {Game} game
 * @returns {HTMLLIElement}
 */
function buildGameEntry(game) {
    const li = document.createElement("li");
    li.innerText = game.title;
    return li;
}

function onPageLoad() {
    const gamesList = document.getElementById("games");
    for (const game of games) {
        console.log(game);
        gamesList.appendChild(buildGameEntry(game));
    }
}

onPageLoad();
