
$(document).ready(function () {

  // // positions on board
  // const $00 = $("#00");
  // const $01 = $("#01");
  // const $02 = $("#02");
  //
  // const $10 = $("#10");
  // const $11 = $("#11");
  // const $12 = $("#12");
  //
  // const $20 = $("#20");
  // const $21 = $("#21");
  // const $22 = $("#22");

  const $Square = $(".box");

  // const theEnd = function (isTheEnd) {
  //   if (isTheEnd) {
  //
  //   }
  // }

  // TODO clean this up
  // make into function nice and simple
  //////////////////////////////////////////////////////////////////////////////

  $Square.on("click", function () {

    const x = $(this).data('x');
    const y = $(this).data('y');

    board.move(x, y, board.player);
    $(this).text(board.player);

    if (board.isWin()) {

      // TODO: light up the win positions
      for (let i = 0; i < board.indiciesOfWin.length; i++) {
        console.log($(`${board.indiciesOfWin[i]}`))
      };

      // TODO: end the game (replace the tokens with end)

      // alert("Game Over");
    };

    board.updatePlayer();

  });

  // $00.on("click", function () {
  //
  //   board.move(0, 0, board.player);
  //   $00.text(board.player);
  //
  //   // check if the player has won
  //   if (board.isWin()) {
  //     // TODO make this better
  //     alert("Game Over")
  //   };
  //
  //   board.updatePlayer();
  //
  // });
  //
  // $01.on("click", function () {
  //
  //   board.move(0, 1, board.player);
  //   $01.text(board.player);
  //
  //   // check if the player has won
  //   if (board.isWin()) {
  //     // TODO make this better
  //     alert("Game Over")
  //   };
  //
  //   board.updatePlayer();
  //
  // });
  //
  // $02.on("click", function () {
  //
  //   board.move(0, 2, board.player);
  //   $02.text(board.player);
  //
  //   // check if the player has won
  //   if (board.isWin()) {
  //     // TODO make this better
  //     alert("Game Over")
  //   };
  //
  //   board.updatePlayer();
  //
  // });
  // //////////////////////////////////////////////////////////////////////////////
  //
  // //////////////////////////////////////////////////////////////////////////////
  // $10.on("click", function () {
  //
  //   board.move(1, 0, board.player);
  //   $10.text(board.player);
  //
  //   // check if the player has won
  //   if (board.isWin()) {
  //     // TODO make this better
  //     alert("Game Over")
  //   };
  //
  //   board.updatePlayer();
  //
  // });
  //
  // $11.on("click", function () {
  //
  //   board.move(1, 1, board.player);
  //   $11.text(board.player);
  //
  //   // check if the player has won
  //   if (board.isWin()) {
  //     // TODO make this better
  //     alert("Game Over")
  //   };
  //
  //   board.updatePlayer();
  //
  // });
  //
  // $12.on("click", function () {
  //
  //   board.move(1, 2, board.player);
  //   $12.text(board.player);
  //
  //   // check if the player has won
  //   if (board.isWin()) {
  //     // TODO make this better
  //     alert("Game Over")
  //   };
  //
  //   board.updatePlayer();
  //
  // });
  // //////////////////////////////////////////////////////////////////////////////
  // $20.on("click", function () {
  //
  //   board.move(2, 0, board.player);
  //   $20.text(board.player);
  //
  //   // check if the player has won
  //   if (board.isWin()) {
  //     // TODO make this better
  //     alert("Game Over")
  //   };
  //
  //   board.updatePlayer();
  //
  // });
  //
  // $21.on("click", function () {
  //
  //   board.move(2, 1, board.player);
  //   $21.text(board.player);
  //
  //   // check if the player has won
  //   if (board.isWin()) {
  //     // TODO make this better
  //     alert("Game Over");
  //   };
  //
  //   board.updatePlayer();
  //
  // });
  //
  // $22.on("click", function () {
  //
  //   board.move(2, 2, board.player);
  //   $22.text(board.player);
  //
  //   // check if the player has won
  //   if (board.isWin()) {
  //     // TODO make this better
  //     alert("Game Over")
  //   };
  //
  //   board.updatePlayer();
  //
  // });

});
