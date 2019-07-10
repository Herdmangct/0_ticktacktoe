
// #1 helper function:
const clearFrontEndBoard = function () {

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

    // cannot click twice on one square
    if ($(this).text() !== "X" && $(this).text() !== "O") {
      board.move(x, y, board.player);
      $(this).text(board.player);

      // wining move or board is full
      if (board.isWin() || board.isFull()) {

        // don't run this function again
        // gameOver = true;

        // animate the win positions
        for (let i = 0; i < board.indiciesOfWin.length; i++) {
          $(`#${board.indiciesOfWin[i]}`).addClass("hinge");
        };

        // set board to blank
        setTimeout(clearFrontEndBoard, 2000);

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

        // wait till animation is over then reset the board
        setTimeout(function () {

          event.stopPropagation(); // stops the on.click from propogating to the window
          $(window).one("click", function () {

            // Reset animation
            for (let i = 0; i < board.indiciesOfWin.length; i++) {
              $(`#${board.indiciesOfWin[i]}`).removeClass("hinge");
            };

            board.reset(); // reset backend board

            clearFrontEndBoard();

            // play again
            // gameOver = false;

          });

        }, 5100);

      } else {
        // update player
        board.updatePlayer();
      };

    };

  });

});
