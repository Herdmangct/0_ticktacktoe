
// board factory for dynamic board making
// TODO

// TODO: horizontal, vertical and diagonal all 1 function DRYER CODE
// #1 helper function: horizontal looping function
const horizontalWin = function (board, rows, columns, player) {

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {

      let currentPosition = board.board[i][j];

      if (currentPosition === player) {
        board.indiciesOfWin.push(`${i}${j}`)
      } else {
        board.indiciesOfWin = [];
      }

      // win
      if (board.indiciesOfWin.length >= 3) {
        return true;
      }

    }
  }

  return false;

};

const verticalWin = function (board, rows, columns, player) {

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {

      let currentPosition = board.board[j][i];

      if (currentPosition === player) {
        board.indiciesOfWin.push(`${j}${i}`);
      } else {
        board.indiciesOfWin = [];
      }

      // win
      if (board.indiciesOfWin.length >= 3) {
        return true
      }

    }
  }

  return false;

};

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

  return false;

};

// board object
const board = {

  board: [[0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]],
  rows: 3,
  columns: 3,

  player: "X",
  updatePlayer: function () {
    this.player = (this.player === "X") ? "O":"X";
  },

  indiciesOfWin: [],

  move: function (row, column) {

    let movePosition = this.board[row][column];

    if (movePosition === 0) {
      board.board[row][column] = this.player;
    };

  },

  isWin: function () {

    // check horizontal
    // CHANGE THIS>BOARD TO THE BOARD OBJECT
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

  // debugging
  printBoard: function () {

    for (let i = 0; i < this.rows; i++) {
      console.log(this.board[i].join("|"));
    };

  },

  // board refresh function

}
