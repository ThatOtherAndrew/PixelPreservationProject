'use strict';

/**
 * @param {string} string
 * @returns {string}
 */
function colourHash(string) {
    let hash = string
        .split('')
        .reduce((acc, val) => acc + val.charCodeAt(0), 0);
    hash *= 1337;

    const hue = hash % 360;
    return `hsl(${hue}, 100%, 80%)`;
}

/**
 * @param {Game} game
 * @returns {HTMLLIElement}
 */
function buildGameEntry(game) {
    const template = document.getElementById('game-entry');
    const clone = template.content.cloneNode(true);

    const title = clone.querySelector('.title');
    const genre = clone.querySelector('.genre');
    const platform = clone.querySelector('.platform');
    const description = clone.querySelector('.description');

    // Insert text content
    title.innerText = game.title;
    genre.innerText = game.genre;
    platform.innerText = game.platform;
    description.innerText = game.description;

    // Set tag colours
    genre.style.backgroundColor = colourHash(game.genre);
    platform.style.backgroundColor = colourHash(game.platform);

    return clone.children[0];
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
