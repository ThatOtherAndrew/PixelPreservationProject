'use strict';

/**
 * @param {Game} game
 * @returns {HTMLLIElement}
 */
function buildGameEntry(game) {
    const template = document.getElementById('game-entry');
    const clone = template.content.cloneNode(true);

    clone.querySelector('.title').innerText = game.title;
    clone.querySelector('.genre').innerText = game.genre;
    clone.querySelector('.platform').innerText = game.platform;
    clone.querySelector('.description').innerText = game.description;

    return clone.querySelector('li');
}

function onPageLoad() {
    // Sort by title
    games.sort((a, b) => a.title.localeCompare(b.title));

    // Render game entries
    const gamesList = document.getElementById('games');
    for (const game of games) {
        gamesList.appendChild(buildGameEntry(game));
    }
}

onPageLoad();
