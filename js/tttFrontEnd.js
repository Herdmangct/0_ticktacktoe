
// Easter Egg helper functions
// #1 Easter Egg helper function
const easterEggClick = function ($EasterEgg1) {

  // make button fall
  $EasterEgg1.addClass("hinge");

  // make button disappear
  setInterval(function () {
    $EasterEgg1.removeClass("hinge");
    $EasterEgg1.hide();
  }, 2000)

};

// #2 Easter Egg helper function
const aIButtonFallsAway = function ($AIPlayer) {

  // make button fall
  $AIPlayer.addClass("hinge");

  // make button disappear
  setInterval(function () {
    $AIPlayer.removeClass("hinge");
    $AIPlayer.hide();
  }, 2000)

}

// Game Play helper functions
// #1 Game Play helper function
const xoOrImages = function (useImages, $currentSquare) {

  if (useImages) {
    return ($currentSquare.find("img").length < 1);
  } else {
    return ($currentSquare.text() !== "X" && $currentSquare.text() !== "O");
  }

}

// #2 Game Play helper function
const playToken = function (useImages, board, x, y, player, $jqueryItem) {

  // Backend: place token
  board.move(x, y);

  // Frontend: place token
  if (useImages) {

    if (player === "X") {
      $jqueryItem.prepend($('<img>', {id:"zucked", class: "token", src: "img/zucked.png"})).css({width: "50px", height: "50px", position: "relative"});
    } else {
      $jqueryItem.prepend($('<img>', {id:"billGates", class: "token", src: "img/billGates.png"})).css({width: "50px", height: "50px", position: "relative"});
    };

  } else {

    $jqueryItem.text(board.player);

  };

};

// #3 Game Play helper function
const clearFrontEndBoard = function () {

  const boardIndicies = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
  for (let i = 0; i < boardIndicies.length; i++) {
    $(`#${boardIndicies[i]}`).text("");
    $(`#${boardIndicies[i]} img`).remove();
  };

};

// #4 Game Play helper function
const printTheEnd = function () {

  const endIndicies = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
  const end = "THEENDXOX";
  for (let i = 0; i < endIndicies.length; i++) {

    setTimeout(function () {
      $(`#${endIndicies[i]}`).text(end[i]);
    }, 500*(i+1));

  };

}

// #5 Game Play helper function
const animateWinPositions = function (addClass, winPositions, numWinPostions) {

  if (addClass) {

    for (let i = 0; i < numWinPostions; i++) {
      $(`#${winPositions[i]}`).addClass("hinge");
    };

  } else {

    for (let i = 0; i < numWinPostions; i++) {
      $(`#${winPositions[i]}`).removeClass("hinge");
    };

  };


}

// #6 Game Play helper function
const resetBackend = function () {

  board.reset();

};

// #7 Game Play helper function
// calls 1) animateWinPositions 2) resetBackend 3) clearFrontEndBoard
const endGameReset = function () {

  $(window).one("click", function () {

    // Reset animation
    let addClass = false;
    animateWinPositions(addClass, board.indiciesOfWin, board.indiciesOfWin.length);

    // reset backend board
    resetBackend();

    // reset front end board
    clearFrontEndBoard();

  });

};

// #8 Game Play helper function
// const isWinOrIsFull = function (isWin, isFull, winPositions, numWinPostions) {



// };

// AI PLAYER FUNCTIONS
// #1 AI player function
// const playAI = function (board) {
//
//   // Backend: place token
//   // returns x and y coordinates
//   coordinates = board.moveAI();
//   console.log(coordinates);
//
//   // Front end square to send play to
//   // $jqueryItem = $(`#${coordinates[0]}${coordinates[1]}`);
//
//   // Frontend: place token
//   // if (useImages) {
//   //
//   //   if (player === "X") {
//   //     $jqueryItem.prepend($('<img>', {id:"zucked", class: "token", src: "img/zucked.png"})).css({width: "50px", height: "50px", position: "relative"});
//   //   } else {
//   //     $jqueryItem.prepend($('<img>', {id:"billGates", class: "token", src: "img/billGates.png"})).css({width: "50px", height: "50px", position: "relative"});
//   //   };
//   //
//   // } else {
//   //
//   //   $jqueryItem.text(board.player);
//   //
//   // };
//
// };

// main function
$(document).ready(function () {

  // Initial variables
  $Square = $(".box");
  $EasterEgg1 = $("button[name='Tech']");
  $AIPlayer = $("button[name='AIPlayer']");

  let useImages = false;
  let playAgainstAI = false;

  // #1 function: turn on easter egg
  $EasterEgg1.one("click", function () {

    // button falls away
    easterEggClick($EasterEgg1);

    // turn on images
    useImages = true;

  })

  // #2 function: turn on AI player
  $AIPlayer.one("click", function () {

    aIButtonFallsAway($AIPlayer);

    playAgainstAI = true;

  });

  // #3 function: play game
  $Square.on("click", function (event) {

    // make AI button fall away if they play a move first
    if (board.isEmpty()) {

      aIButtonFallsAway($AIPlayer);

    }

    const $currentSquare = $(this);
    const x = $currentSquare.data('x');
    const y = $currentSquare.data('y');
    gameOver = false;

    let hasntBeenClicked = board.board[x][y] !== "X" && board.board[x][y] !== "O";

    if (hasntBeenClicked && !board.isWin() && !board.isFull()) {

      //////////////////////////////////////////////////////////////////////////
      // HUMAN PLAYER
      playToken(useImages, board, x, y, board.player, $currentSquare);

      // wining move or board is full
      if (board.isWin() || board.isFull()) {

        // update scores
        board.updateScores();

        // animate the win positions
        animateWinPositions(true, board.indiciesOfWin, board.indiciesOfWin.length);

        // set board to blank
        setTimeout(clearFrontEndBoard, 2000);

        // end the game (replace the tokens with end)
        setTimeout(printTheEnd, 2000);

        // wait till animation is over then reset the board
        event.stopPropagation(); // stops the on.click from propogating to the window
        setTimeout(endGameReset, 6600);

      } // else if (playAgainstAI) {

      //  board.updatePlayer();

        ////////////////////////////////////////////////////////////////////////
        // AI PLAYER
        // TODO!!!
        // playAI(board);

    //  }

      else {
        // update player
        board.updatePlayer();

      };


    };

  });

});
