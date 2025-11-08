## Overview

This assignment involved using vanilla HTML, CSS and JavaScript to design and construct a frontend for a dataset of retro games, implementing a user interface to enable simple CRUD operations in addition to more advanced sorting and searching/filtering functionality. These requirements were fully achieved and implemented, with comprehensive testing to ensure functionality, performance, and accessibility standards were met.

## Design

### User Interface

A design-driven development approach was taken when implementing this project. The first step taken before writing any code was sketching out wireframes on a digital whiteboard app for different states of "game entries", components representing individual games in the dataset. Aiming to make the interface maximally cohesive and intuitive, the game entries were designed as entirely self-contained cards which implement directly creating, reading, updating and deleting their content.

A total of three states were designed for the game entry cards: the default state, an editing state, and a blank placeholder state for creating new entries. All three states were implemented as template components in the final product.

{{< pagebreak >}}

The layout of a card in its default state is optimised for reading by displaying the platform and genre information as "tag" components, which also serves as a visual separator between the game title and description text. The bottom right of the card includes two buttons for editing and deleting the entry, rendered as icons.

![The original design sketch for a game entry card in its default state](/assets/filled_game_entry.png){width=80%}

A card in its editing state keeps the same element layout as the default state, instead of constructing a separate layout for form input, to maintain visual consistency and improve ease of use. Editable fields are given a darker background and border to signal to the user that they can be modified. The Edit and Delete buttons are replaced with Save and Discard buttons respectively, such that the destructive action (deleting and discarding) is kept in the same position to reduce user error.

![The original design sketch for a game entry card in its editing state](/assets/edit_game_entry.png){width=60%}

{{< pagebreak >}}

The placeholder card for creating a new entry is kept very minimal, with only a plus icon to indicate that no data exists yet and that clicking the card will allow the user to create a new game entry.

![The original design sketch for the new game entry placeholder](/assets/new_game_entry.png){width=50%}

### Code quality

The frontend source code in the `src/` directory was separated by purpose into multiple files and directories. The purpose of each is detailed below:

- `index.html`: The main HTML file, containing the web page structure and template components, and linking to relevant JS, CSS, and asset files.
- `games.js`: The initial state of the retro games dataset, downloaded as per the project specification. The file was unmodified as requested with the exception of fixing a text encoding error with apostrophe characters.
- `script.js`: The main JavaScript file, containing functions for initialising the reactive elements of the web page, and manipulating the dataset from `games.js`.
- `style.css`: The main CSS file, containing global styles for the web page.
- `assets/`: A directory containing assets used in the web page, such as the Departure Mono font used for the header (under `assets/fonts/`) and icons used for buttons (under `assets/icons/`).

Some aspects of static type checking were introduced to reduce bugs during development and improve IDE autocompletion when writing code. Since the project requred the use of vanilla JavaScript, using TypeScript syntax was not an option. Thus, JSDoc comments were added to functions to specify parameter and return types, and a `globals.d.ts` file was added to define the `Game` object records used in `games.js` and manipulated in `script.js`.

In order to achieve a consistent code style, the Prettier code formatter was used to automatically format code on save in the IDE. The `.prettierrc` configuration file was added to specify formatting options, and the `.prettierignore` file excludes the `games.js` file from being reformatted to keep it as close to the original as possible.

## Testing

Due to the frontend-oriented nature of this assignment, an automated testing framework was deemed too impractical to implement, and manual comprehensive user testing was used instead.

The following test plan was created:

- Functionality
  - Initial dataset is loaded correctly?
    - Invalid dataset entries are skipped?
    - Invalid entries are logged to console?
  - Individual CRUD operations work correctly?
    - Data is validated upon creation/editing?
    - Attempting to add duplicate game is prevented gracefully?
  - Sorting and filtering works correctly?
    - New / edited entries are sorted/filtered by their new values?
    - Sorting and filtering can be combined?
- User experience
  - Page layout is responsive to screen size?
  - No unexpected errors in console?
  - UI is intuitive to use?
    - Users can perform CRUD operations?
    - Users can search and filter?
- Performance
  - Initial page load is fast?
  - UI interactions are smooth and without lag?
  - Lighthouse benchmark results are satisfactory?
- Accessibility
  - All interactive elements are keyboard-navigable?
  - Sufficient colour contrast for text and interactive elements?
  - Images and buttons have alt text and hover text?
  - Page is usable with vision deficiencies?
  - Page is usable with touchscreen devices?

### Functionality

Shown below is a table summarising the functionality tests performed, and the results found:

| What is being tested | Pre-conditions | Expected Outcome | Actual Outcome |
|:--|:--|:--|:--|
| **Dataset Loading** |
| Initial dataset loads | Fresh page load | All 13 games displayed | All 13 games displayed correctly |
| Invalid entry handling | Invalid game in `games.js` | Entry not displayed, console warning logged | Entry skipped, console warning logged |
| Console logging | Invalid entry present | Warning message in console | Warning displayed in console |
| **Create Operations** |
| Add valid game | Add game with valid data | Game added to list | Game added successfully |
| Invalid title length | Add game with 41+ char title | Alert shown, game not added | Invalid data alert, game not added |
| Invalid platform | Add game with non-whitelisted platform | Alert shown, game not added | Alert shown, game not added |
| Invalid genre length | Add game with 21+ char genre | Alert shown, game not added | Alert shown, game not added |
| Invalid description length | Add game with 201+ char description | Alert shown, game not added | Alert shown, game not added |
| Missing required fields | Add game with blank fields | Alert shown, game not added | Alert shown, game not added |
| Duplicate game detection | Add duplicate title+platform | Duplicate alert shown, game not added | Duplicate alert shown, game not added |
| Case-insensitive duplicate | Add "SUPER MARIO BROS." on NES | Detected as duplicate | Duplicate detected correctly |
| **Read Operations** |
| Display game data | Page loaded | All game fields displayed | All fields displayed correctly |
| Tag colours | Multiple games with same platform/genre | Consistent colours for matching tags | Colours consistent and deterministic |
| **Update Operations** |
| Edit with valid data | Edit game with valid changes | Game updated, changes reflected | Game updated successfully |
| Edit with invalid data | Edit game with invalid data | Alert shown, original data retained | Alert shown, data unchanged |
| Edit to duplicate | Edit to match existing game | Duplicate alert, original data retained | Duplicate detected, data preserved |
| Discard changes | Edit then discard | Changes discarded, original data shown | Changes discarded correctly |
| **Delete Operations** |
| Delete game | Click delete button | Game removed from list | Game deleted successfully |
| Delete persistence | Delete then sort/filter | Deleted game does not reappear | Deletion persists correctly |
| **Sorting** |
| Sort by title | Select "Sort by Title" | Games sorted alphabetically by title | Sorted correctly by title |
| Sort by platform | Select "Sort by Platform" | Games sorted alphabetically by platform | Sorted correctly by platform |
| Sort by genre | Select "Sort by Genre" | Games sorted alphabetically by genre | Sorted correctly by genre |
| Sort with new entry | Add game whilst sorting active | New game in correct sorted position | New game inserted correctly |
| Sort with edited entry | Edit game whilst sorting active | Edited game moves to correct position | Edited game re-sorted correctly |
| **Search/Filtering** |
| Case-insensitive search | Type "mario" in search | Games matching "Mario" displayed | Case-insensitive search works |
| Partial matching | Type "chron" in search | "Chrono Trigger" displayed | Partial matching works correctly |
| No matches | Type "xyz123" in search | No games shown, add button visible | Empty results handled correctly |
| Clear search | Enter then clear search | All games reappear | Search clears correctly |
| **Combined Operations** |
| Search + sort | Search then change sort | Filtered results sorted | Search and sort combine correctly |
| Sort + search | Sort then search | Filtered results maintain sort | Sort and search combine correctly |
| Edit during search | Edit filtered game | Game visibility updates based on changes | Edited values filtered correctly |
| Add during search/sort | Add game with filters active | New game filtered and sorted correctly | New game handled correctly |

### User experience

In order to accurately test user experience, A friend was asked to perform a series of tasks on the web page, and provide feedback on the intuitiveness of the interface and any issues they encountered.

Below is a table summarising the tests performed and any relevant notes:

| Task | Notes |
| --- | --- |
| Add the Platformer game "Super Mario Bros" for NES, with the description "stomp goomba" | No issues observed |
| Delete all SNES games | User attempted to search for SNES, however only titles were searched |
| Edit Castlevania to Castlevania II for SNES | No issues observed |
TODO

### Performance

In order to obtain metricised performance results for the web page, the Chrome DevTools Lighthouse tab was used to test the page performance on a variety of metrics and obtain a final performance score.

Since Lighthouse produces the best results for live web pages hosted on domains, the `tunnel.thatother.dev` domain was configured to serve the local webpage using Cloudflare Zero Trust to create a tunnel to a local web server, served using `python3 -m http.server`.

The results are shown below:

TODO

## Evaluation

This section should include one or two paragraphs evaluating the
success of your submission compared to what you were asked to do.

## Conclusion

My implementation of this assignment successfully implements all features detailed in the project specification. Its greatest strength is the UI/UX, which I believe is the most polished aspect of my submission, and meets a high standard of usability, accessibility, and performance. This assignment was a good exercise for me in vanilla JavaScript, putting aside convenient abstractions offered by frameworks and libraries to focus on lower-level DOM manipulation and event handling.

The greatest technical challenge for me was maintaining code quality when implementing reactive features such as editing and sorting data, as without e.g. a signal-driven framework, it was easy for the code to become tangled and difficult to maintain. My greatest non-technical challenge was time management, which I struggled with severely and it resulted in a late submission despite an extension.

Given more time, an extension to this project would be to connect it to a backend database for persistent data storage, instead of an ephemeral "mock dataset" which is lost on refreshing the page.

## Bibliography

MDN Web Docs: https://developer.mozilla.org/en-US/ (accessed Nov 2025)
Cloudflare Tunnel - Cloudflare One docs: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/ (accessed Nov 2025)
CSS Grid Layout Guide: https://css-tricks.com/snippets/css/complete-guide-grid/ (accessed Nov 2025)
