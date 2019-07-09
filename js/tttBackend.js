
// TODO: horizontal, vertical and diagonal all 1 function DRYER CODE
// #1 helper function: horizontal looping function
const horizontalWin = function (board, rows, columns, player) {

  for (let i = 0; i < rows; i++) {
    board.indiciesOfWin = [];
    for (let j = 0; j < columns; j++) {

      let currentPosition = board.board[i][j];

      if (currentPosition === player) {
        board.indiciesOfWin.push(`${i}${j}`)
      };

      // win
      if (board.indiciesOfWin.length >= 3) {
        return true;
      };

    }
  }

  // clean the indicies array if nothing found
  board.indiciesOfWin = [];
  return false;

};

// #2 helper function: verticial looping function
const verticalWin = function (board, rows, columns, player) {

  for (let i = 0; i < columns; i++) {
    board.indiciesOfWin = [];
    for (let j = 0; j < rows; j++) {

      let currentPosition = board.board[j][i];

      if (currentPosition === player) {
        board.indiciesOfWin.push(`${j}${i}`);
      };

      // win
      if (board.indiciesOfWin.length >= 3) {
        return true
      };

    }
  }

  // clean the indicies array if nothing found
  board.indiciesOfWin = [];
  return false;

};

// #3 helper function: diagonalWin looping function
const diagonalWin = function (board, rows, columns, player) {

  // diagonal 1 (right to left)
  for (let i = 0; i < rows; i++) {

    let currentPosition = board.board[i][i];

    if (currentPosition === player) {
      board.indiciesOfWin.push(`${i}${i}`);
    } else {
      board.indiciesOfWin = [];
    };

    // win
    if (board.indiciesOfWin.length >= 3) {
      return true;
    };

  };

  // clear board for checking next horizontal
  board.indiciesOfWin = [];

  // diagonal 2 (left right)
  let i = 0;
  let j = 2;
  while (i < rows && j >= 0) {

    let currentPosition = board.board[i][j];

    if (currentPosition === player) {
      board.indiciesOfWin.push(`${i}${j}`);
    } else {
      board.indiciesOfWin = [];
    };

    // win
    if (board.indiciesOfWin.length >= 3) {
      return true
    };

    // loop control
    i++
    j--

  };

  // clear board after horizontal
  board.indiciesOfWin = [];
  return false;

};
////////////////////////////////////////////////////////////////////////////////

// #1 function: board factory
const boardFactory = function () {

  return {

    // attributes
    board: [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]],

    rows: 3,

    columns: 3,

    player: "X",

    indiciesOfWin: [],

    // functions
    updatePlayer: function () {
      this.player = (this.player === "X") ? "O":"X";
    },

    move: function (row, column) {

      let movePosition = this.board[row][column];

      if (movePosition === 0) {
        board.board[row][column] = this.player;
      };

    },

    isWin: function () {

      // debugger;
      // check horizontal
      if (horizontalWin(this, this.rows, this.columns, this.player)) {
        return true;
      };

      // check vertical
      if (verticalWin(this, this.rows, this.columns, this.player)) {
        return true;
      };

      // check diagonal
      if (diagonalWin(this, this.rows, this.columns, this.player)) {
        return true;
      };

      // else
      return false;
    },

    reset: function () {
      // reset board
      this.board = [[0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]],

      // reset player
      this.player = "X"

      // reset indiciesOfWin
      this.indiciesOfWin = [];
    }

  };
};

// board object
const board = boardFactory();
