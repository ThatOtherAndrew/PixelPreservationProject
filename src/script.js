'use strict';

let currentSortBy = 'title';

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
 * @returns {boolean}
 */
function isGameEntryValid(game) {
    const validPlatforms = ['NES', 'SNES', 'PS1', 'PC', 'AMIGA'];

    // yes this is a crazy condition but it's concise and efficient
    // prettier-ignore
    return (
        typeof game.title === 'string' &&
        game.title.trim().length > 0 &&
        game.title.length <= 40 &&

        typeof game.platform === 'string' &&
        game.platform.trim().length > 0 &&
        validPlatforms.includes(game.platform) &&

        typeof game.genre === 'string' &&
        game.genre.trim().length > 0 &&
        game.genre.length <= 20 &&

        typeof game.description === 'string' &&
        game.description.trim().length > 0 &&
        game.description.length <= 200
    );
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

    // Add button handlers
    const li = clone.children[0];
    const deleteButton = clone.querySelector('.button.danger');
    const editButton = clone.querySelector('.button:not(.danger)');

    deleteButton.addEventListener('click', () => {
        const index = games.indexOf(game);
        if (index > -1) {
            games.splice(index, 1);
            renderGames(currentSortBy);
        }
    });

    editButton.addEventListener('click', () => {
        const editLi = buildEditGameEntry(game);
        li.replaceWith(editLi);
    });

    return li;
}

/**
 * @param {Game} game
 * @returns {HTMLLIElement}
 */
function buildEditGameEntry(game) {
    const template = document.getElementById('game-entry');
    const clone = template.content.cloneNode(true);

    const title = clone.querySelector('.title');
    const genre = clone.querySelector('.genre');
    const platform = clone.querySelector('.platform');
    const description = clone.querySelector('.description');

    // Insert text content and make editable
    title.innerText = game.title;
    title.contentEditable = 'true';

    genre.innerText = game.genre;
    genre.contentEditable = 'true';

    platform.innerText = game.platform;
    platform.contentEditable = 'true';

    description.innerText = game.description;
    description.contentEditable = 'true';

    // Set tag colours
    genre.style.backgroundColor = colourHash(game.genre);
    platform.style.backgroundColor = colourHash(game.platform);

    // Replace button icons
    const li = clone.children[0];
    const buttons = clone.querySelector('.buttons');
    const editButtonsTemplate = document.getElementById('edit-game-buttons');
    const editButtonsClone = editButtonsTemplate.content.cloneNode(true);
    buttons.innerHTML = '';
    buttons.appendChild(editButtonsClone);

    // Add new button functionality
    const discardButton = buttons.querySelector('.button.danger');
    const saveButton = buttons.querySelector('.button:not(.danger)');

    discardButton.addEventListener('click', () => {
        renderGames(currentSortBy);
    });

    saveButton.addEventListener('click', () => {
        // Get edited values
        const editedGame = {
            title: title.innerText.trim(),
            genre: genre.innerText.trim(),
            platform: platform.innerText.trim(),
            description: description.innerText.trim(),
        };

        // Validate
        if (!isGameEntryValid(editedGame)) {
            alert('Invalid game data. Please check your inputs.');
            return;
        }

        // Update the game object
        game.title = editedGame.title;
        game.genre = editedGame.genre;
        game.platform = editedGame.platform;
        game.description = editedGame.description;

        // Re-render
        renderGames(currentSortBy);
    });

    return li;
}

/**
 * @param {string} sortBy
 */
function renderGames(sortBy) {
    currentSortBy = sortBy;

    // Sort games
    const sortedGames = [...games].sort((a, b) => {
        return a[sortBy].localeCompare(b[sortBy]);
    });

    // Clear existing game entries (except the add button)
    const gamesList = document.getElementById('games');
    const addButton = document.getElementById('add-game-entry');
    gamesList.innerHTML = '';
    gamesList.appendChild(addButton);

    // Render game entries
    for (const game of sortedGames) {
        if (isGameEntryValid(game)) {
            gamesList.appendChild(buildGameEntry(game));
        } else {
            console.warn('Invalid game entry skipped:', game);
        }
    }
}

function onPageLoad() {
    // Initial render
    renderGames('title');

    // Add sort event listener
    const sorter = document.getElementById('sort-select');
    sorter.addEventListener('change', (e) => {
        renderGames(e.target.value);
    });
}

onPageLoad();
