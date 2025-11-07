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
 * @param {number} index
 * @returns {HTMLLIElement}
 */
function buildGameEntry(game, index) {
    const template = document.getElementById('game-entry');
    const clone = template.content.cloneNode(true);

    const li = clone.querySelector('li');
    const title = clone.querySelector('.title');
    const genre = clone.querySelector('.genre');
    const platform = clone.querySelector('.platform');
    const description = clone.querySelector('.description');

    // Store game index for event delegation
    li.dataset.gameIndex = index;

    // Insert text content
    title.innerText = game.title;
    genre.innerText = game.genre;
    platform.innerText = game.platform;
    description.innerText = game.description;

    // Set tag colours
    genre.style.backgroundColor = colourHash(game.genre);
    platform.style.backgroundColor = colourHash(game.platform);

    return li;
}

/**
 * @param {number|null} gameIndex - Index of game to edit, or null to create new game
 * @returns {HTMLLIElement}
 */
function buildEditGameEntry(gameIndex = null) {
    const template = document.getElementById('edit-game-entry');
    const clone = template.content.cloneNode(true);

    const li = clone.querySelector('li');
    const title = clone.querySelector('.title');
    const genre = clone.querySelector('.genre');
    const platform = clone.querySelector('.platform');
    const description = clone.querySelector('.description');

    // Store game index for event delegation (or null for new game)
    if (gameIndex !== null) {
        li.dataset.gameIndex = gameIndex;
        const game = games[gameIndex];

        // Populate fields with existing game data
        title.innerText = game.title;
        genre.innerText = game.genre;
        platform.innerText = game.platform;
        description.innerText = game.description;

        // Set tag colours
        genre.style.backgroundColor = colourHash(game.genre);
        platform.style.backgroundColor = colourHash(game.platform);
    }

    return li;
}

/**
 * @param {string} sortBy
 */
function renderGames(sortBy) {
    currentSortBy = sortBy;

    // Sort games and track original indices
    const indexedGames = games.map((game, index) => ({ game, index }));
    indexedGames.sort((a, b) => {
        return a.game[sortBy].localeCompare(b.game[sortBy]);
    });

    // Clear existing game entries and recreate add button
    const gamesList = document.getElementById('games');
    gamesList.innerHTML = '';

    const addGameTemplate = document.getElementById('add-game-entry');
    const addGameClone = addGameTemplate.content.cloneNode(true);
    gamesList.appendChild(addGameClone);

    // Render game entries with original indices
    for (const { game, index } of indexedGames) {
        if (isGameEntryValid(game)) {
            gamesList.appendChild(buildGameEntry(game, index));
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

    // Universal button callback
    // monoliths ftw!!!
    const gamesList = document.getElementById('games');
    gamesList.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        // Handle add game button
        if (button.id === 'add-game-button') {
            const addGameEntry = document.getElementById('add-game-entry');
            const editEntry = buildEditGameEntry();
            addGameEntry.replaceWith(editEntry);
            return;
        }

        // Find parent li for game entries
        const li = button.closest('li');
        if (!li) return;

        // Handle delete button
        if (
            button.classList.contains('danger') &&
            !button.classList.contains('discard')
        ) {
            const gameIndex = parseInt(li.dataset.gameIndex);
            if (!isNaN(gameIndex)) {
                games.splice(gameIndex, 1);
                renderGames(currentSortBy);
            }
            return;
        }

        // Handle edit button
        if (
            button.classList.contains('button') &&
            !button.classList.contains('danger') &&
            !button.classList.contains('save')
        ) {
            const gameIndex = parseInt(li.dataset.gameIndex);
            if (!isNaN(gameIndex)) {
                const editLi = buildEditGameEntry(gameIndex);
                li.replaceWith(editLi);
            }
            return;
        }

        // Handle discard button
        if (button.classList.contains('discard')) {
            renderGames(currentSortBy);
            return;
        }

        // Handle save button
        if (button.classList.contains('save')) {
            const title = li.querySelector('.title');
            const genre = li.querySelector('.genre');
            const platform = li.querySelector('.platform');
            const description = li.querySelector('.description');

            const gameData = {
                title: title.innerText.trim(),
                genre: genre.innerText.trim(),
                platform: platform.innerText.trim(),
                description: description.innerText.trim(),
            };

            // Validate
            if (!isGameEntryValid(gameData)) {
                alert('Invalid game data. Please check your inputs.');
                return;
            }

            const gameIndex = li.dataset.gameIndex
                ? parseInt(li.dataset.gameIndex)
                : null;
            if (gameIndex !== null && !isNaN(gameIndex)) {
                // Update existing game
                games[gameIndex].title = gameData.title;
                games[gameIndex].genre = gameData.genre;
                games[gameIndex].platform = gameData.platform;
                games[gameIndex].description = gameData.description;
            } else {
                // Add new game
                games.push(gameData);
            }

            renderGames(currentSortBy);
            return;
        }
    });
}

// where it all begins...
onPageLoad();
