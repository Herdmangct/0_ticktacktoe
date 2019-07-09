
// #1 helper function:
const clearBoard = function () {

  const boardIndicies = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
  for (let i = 0; i < boardIndicies.length; i++) {
    $(`#${boardIndicies[i]}`).text("");
  };

};

// main function
$(document).ready(function () {

  // Initial variables
  $Square = $(".box");
  // gameOver = false;

  // #1 function:
  $Square.on("click", function (event) {

    // if (gameOver) {
    //   return;
    // }

    const x = $(this).data('x');
    const y = $(this).data('y');

    board.move(x, y, board.player);
    $(this).text(board.player);

    if (board.isWin()) {

      // don't run this function again
      // gameOver = true;

      // animate the win positions
      for (let i = 0; i < board.indiciesOfWin.length; i++) {
        $(`#${board.indiciesOfWin[i]}`).addClass("hinge");
      };

      // set board to blank
      setTimeout(clearBoard, 2000);

      // end the game (replace the tokens with end)
      setTimeout(function () {
        const endIndicies = ["00", "01", "02", "10", "11", "12"];
        const end = "THEEND";
        for (let i = 0; i < endIndicies.length; i++) {

          setTimeout(function () {
            $(`#${endIndicies[i]}`).text(end[i]);
          }, 500*(i+1));

        };
      }, 2000);

      // reset the board
      event.stopPropagation(); // stops the on.click from propogating to the window
      $(window).one("click", function () {

        // Reset animation
        for (let i = 0; i < board.indiciesOfWin.length; i++) {
          $(`#${board.indiciesOfWin[i]}`).removeClass("hinge");
        };

        // Reset backend board
        board.reset();

        // Reset front end board
        clearBoard();

        // play again
        // gameOver = false;

      });

    } else {
      // update player
      board.updatePlayer();
    };

  });

});
