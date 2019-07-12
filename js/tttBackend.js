
// Board object helper functions ///////////////////////////////////////////////
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

// AI Helper FUNCTIONS /////////////////////////////////////////////////////////
// #1 AI helper function
const flattenBoard = function (originalBoardObject) {

  // convert zeros in indicies
  indexToCoords = {"00":0, "01":1, "02":2, "10":3, "11":4, "12":5, "20":6, "21":7, "22":8};

  let flatBoard = [];

  for (let i = 0; i < originalBoardObject.rows; i++) {
    for (let j = 0; j < originalBoardObject.columns; j++) {

      // convert 0's into indicies
      if (originalBoardObject.board[i][j] === 0) {
        flatBoard.push(indexToCoords[`${i}${j}`]);
      } else {
        flatBoard.push(originalBoardObject.board[i][j]);
      };

    };
  };

  return flatBoard;

}

// #2 AI helper function
const findEmptySquares = function (flatBoard) {

  emptySquares = [];
  for (let i = 0; i < flatBoard.length; i++) {
    if (flatBoard[i] !== "X" && flatBoard[i] !== "O") {
      emptySquares.push(flatBoard[i]);
    };
  };

  return emptySquares;

};

// #3 AI helper function
const convertIndextoCoordinates = function (index) {

  indexToCoords = {0:"00", 1:"01", 2:"02", 3:"10", 4:"11", 5:"12", 6:"20", 7:"21", 8:"22"};

  return indexToCoords[index];

}

// #4 AI helper function // TODO make this loops
const winFunction = function (board, player) {


 if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)

        ) {
        return true;
    } else {
        return false;
    }
};

humanPlayer = "X";
aiPlayer = "O";

// #5 AI helper function
const moveAI = function (originalBoardObject) {

  // make board an array
  const originalBoard = flattenBoard(originalBoardObject);

  // find best move
  const bestMoveObject = minimax(originalBoard, aiPlayer);
  const bestMove = convertIndextoCoordinates(bestMoveObject.index);

  // return x and y in an array of AI's move
  return bestMove;

}

// #6 AI helper function
const minimax = function (newBoard, player) {

  // available spots
  const emptySquares = findEmptySquares(newBoard);

  // #1 1 Base Case: check terminal states /////////////////////////////////////
  // check terminal states
  // assign 10 for AI win, -10 for AI loss and 0 for AI draw
  if (winFunction(newBoard, humanPlayer)){
     return {score:-10};
  }
	else if (winFunction(newBoard, aiPlayer)){
    return {score:10};
	}
  else if (emptySquares.length === 0){
  	return {score:0};
  }
  //////////////////////////////////////////////////////////////////////////////

  // #2 Find score for each available spot /////////////////////////////////////
  // an array to collect move objects (index:, score:)
  let moves = [];

  // loop through available spots
  for (let i = 0; i < emptySquares.length; i++){

    // store index in available spot
    let move = {};
  	move.index = newBoard[emptySquares[i]];

    // set the empty spot to the current player
    newBoard[emptySquares[i]] = player;

    // Recurse through the tree ////////////////////////////////////////////////
    if (player === aiPlayer){
      let result = minimax(newBoard, humanPlayer);
      move.score = result.score;
    }
    else{
      let result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[emptySquares[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }
  //////////////////////////////////////////////////////////////////////////////

  // #3 get max or min score based on computer or human player /////////////////
  let bestMove;
  if (player === aiPlayer) {
    // if it is the computer's turn loop over the moves and choose the move with the highest score
    let bestScore = -Infinity;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      };
    };
  } else {
    // else loop over the moves and choose the move with the lowest score
    let bestScore = Infinity;
    for(let i = 0; i < moves.length; i++) {
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      };
    };
  };
  //////////////////////////////////////////////////////////////////////////////

  return moves[bestMove];
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

    scores: {"X":0, "O":0, "draws":0},

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
    },

    isFull: function () {

      legalMoves = ["X", "O"];
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board.length; j++) {

          if (!legalMoves.includes(this.board[i][j])) {
            return false;
          };

        };
      };

      return true;

    },

    isEmpty: function () {

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {

          if (this.board[i][j] !== 0) {
            return false;
          };

        };
      };

      return true;

    },

    updateScores: function () {

      if (this.isWin()) {
        this.scores[this.player] += 1;
      } else {
        this.scores["draws"] += 1;
      };

    },

    // helper function
    // Cheat!
    winTheGame: function () {

      this.board = [["X", "X", "X"],
                    [0, 0, 0],
                    [0, 0, 0]];

    }

  };
};

// board object
const board = boardFactory();
