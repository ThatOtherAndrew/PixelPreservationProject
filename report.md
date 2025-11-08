## Overview

This assignment involved using vanilla HTML, CSS and JavaScript to design and construct a frontend for a dataset of retro games, implementing a user interface to enable simple CRUD operations in addition to more advanced sorting and searching/filtering functionality. These requirements were fully achieved and implemented, with comprehensive testing to ensure functionality, performance, and accessibility standards were met.

## Design

A design-driven development approach was taken when implementing this project. The first step taken before writing any code was sketching out wireframes on a digital whiteboard app for different states of "game entries", components representing individual games in the dataset. Aiming to make the interface maximally cohesive and intuitive, the game entries were designed as entirely self-contained cards which implement directly creating, reading, updating and deleting their content.

A total of three states were designed for the game entry cards: the default state, an editing state, and a blank placeholder state for creating new entries. All three states were implemented as template components in the final product.

The layout of a card in its default state is optimised for reading by displaying the platform and genre information as "tag" components, which also serves as a visual separator between the game title and description text. The bottom right of the card includes two buttons for editing and deleting the entry, rendered as icons.

![The original design sketch for a game entry card in its default state](/assets/filled_game_entry.png){width=80%}

TODO

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

This section should include one or two paragraphs addressing:

- what you have achieved
- what you found difficult
- what you would have done if you had more time

## Bibliography

.
