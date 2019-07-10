
// #1 helper function
const playToken = function (board, x, y, player, $jqueryItem) {

  // Backend: place token
  board.move(x, y, board.player);

  // Frontend: place token
  if (player === "X") {
    $jqueryItem.prepend($('<img>', {id:"zucked", class: "token", src: "img/zucked.png"})).css({width: "50px", height: "50px", position: "relative"});
  } else {
    $jqueryItem.prepend($('<img>', {id:"billGates", class: "token", src: "img/billGates.png"})).css({width: "50px", height: "50px", position: "relative"});
  }


};

// #2 helper function:
const clearFrontEndBoard = function () {

  const boardIndicies = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
  for (let i = 0; i < boardIndicies.length; i++) {
    $(`#${boardIndicies[i]}`).text("");
  };

};

// #3 helper function
const animateWinPositions = function (addClass, winPositions, numWinPostions) {

  if (addClass) {

    for (let i = 0; i < numWinPostions; i++) {
      $(`#${winPositions[i]}`).addClass("hinge");
    };

  } else {

    for (let i = 0; i < numWinPostions; i++) {
      $(`#${numWinPostions[i]}`).removeClass("hinge");
    };

  };


}

// #4 helper function
const resetBackend = function () {

  board.reset();

};

// main function
$(document).ready(function () {

  // Initial variables
  $Square = $(".box");

  // #1 function: play token
  $Square.on("click", function (event) {

    const x = $(this).data('x');
    const y = $(this).data('y');

    // cannot click twice on one square
    // if ($(this).text() !== "X" && $(this).text() !== "O") {
    if ($(this).find("img").length < 1) {

      const $currentSquare = $(this);

      // $(this).text(board.player);
      playToken(board, x, y, board.player, $currentSquare)

      // wining move or board is full
      if (board.isWin() || board.isFull()) {

        // update scores
        board.updateScores();

        // animate the win positions
        animateWinPositions(true, board.indiciesOfWin, board.indiciesOfWin.length);

        // set board to blank
        setTimeout(clearFrontEndBoard, 2000);

        // end the game (replace the tokens with end)
        setTimeout(function () {
          const endIndicies = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
          const end = "THEENDXOX";
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
            animateWinPositions(false, board.indiciesOfWin, board.indiciesOfWin.length);

            // reset backend board
            resetBackend();

            // reset front end board
            clearFrontEndBoard();

          });

        }, 6600);

      } else {
        // update player
        board.updatePlayer();
      };

    };

  });

});
