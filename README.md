Snake game using JS OOP classes:
- The following was implemented in the Project:

1. INTERFACE REQUIREMENTS
- The screen should have a playing field measuring 10 by 10 cells.
- There should be a window above the playing field that shows the player's current number of points. At the start of the game, the number of points is 0.
- The best result (record) of this user is indicated under the window with the number of points. If the user is playing the game for the first time, the best score does not need to be displayed.
- After finishing the game, a button appears that allows you to restart the game.

2. FUNCTIONAL REQUIREMENTS
- Use classic JavaScript, without additional libraries.
- Each cell on the field must be assigned two coordinates: x (horizontal) and y (vertical).
- The display of a snake and an apple is carried out by assigning certain classes to the desired cells, changing the appearance of the cells: for example, the snake class colors the cell green, and the apple class adds a red circle inside the cell.
- The movement of the snake is carried out by removing/adding the corresponding classes to certain cells.
- The speed of the snake's movement is one cell per 0.5 seconds or two cells per second.
- The apple appears in a random place on the field.
- The best result (record) should be stored in localStorage. After completing the game, check to see if the player has broken their previous high score and, if so, update the value in localStorage. The next time you start the game, the record should appear under the field with the number of points earned.
- Implement the principle of encapsulation within classes. Properties and methods must be separated:
  to external - those that can be used from the outside,
  internal - those that should be accessible only within the class.

  3.RULES OF THE GAME
 - At the beginning of the game, the snake is located in the middle of the field. Its initial length is two cells.
- The game starts when you click anywhere on the field. An apple appears in a random place on the field, and the snake begins to move. Using the arrows on the keyboard you can move the snake in the desired direction.
- After the snake's head lands on a cell with an apple, the apple is considered eaten: the player receives one point, the apple disappears from this cell and appears in another place, and the size of the snake increases by one cell.
- If the snake's head touches its own body, the game ends. If a player beats their points record, the record value is overwritten. A button also appears that allows you to start the game again.
- If the snake hits a “wall” (the edge of the field), the game is over.

Link to the Project: https://antropovag.github.io/snake_game/
