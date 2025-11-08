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

## Testing

This section should describe how you tested your program. In CS2003 we
will not be using stacscheck, so you must describe how you ensured
that your program was complete and worked correctly. Please check
individual practical specifications as they may also include specific
tests. For all practical reports, you _must_ include a table of tests
that looks like the following:

---

What is being Pre-conditions Expected Actual
tested Outcome Outcome

---

The purpose of What needs to What do you What do you
this test. be set up for want to see? actually see?
the test.

---

: A testing table {#tbl:table}

## Evaluation

This section should include one or two paragraphs evaluating the
success of your submission compared to what you were asked to do.

## Conclusion

My implementation of this assignment successfully implements all features detailed in the project specification. Its greatest strength is the UI/UX, which I believe is the most polished aspect of my submission, and meets a high standard of usability, accessibility, and performance. This assignment was a good exercise for me in vanilla JavaScript, putting aside convenient abstractions offered by frameworks and libraries to focus on lower-level DOM manipulation and event handling.

The greatest technical challenge for me was maintaining code quality when implementing reactive features such as editing and sorting data, as without e.g. a signal-driven framework, it was easy for the code to become tangled and difficult to maintain. My greatest non-technical challenge was time management, which I struggled with severely and it resulted in a late submission despite an extension.

Given more time, an extension to this project would be to connect it to a backend database for persistent data storage, instead of an ephemeral "mock dataset" which is lost on refreshing the page.

## Bibliography

.
