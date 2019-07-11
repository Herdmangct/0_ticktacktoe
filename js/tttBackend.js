// 11111
function emptyIndexies(board){
  return  board.filter(s => s != "O" && s != "X");
}

// 22222
function winning(board, player){
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
}

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

// AI Helper FUNCTIONS

//TODO
///////////////////////////////////////////////////////////////
// #1 helper function
const flattenBoard = function (origiBoardObject) {

  // convert zeros in indicies
  indexToCoords = {"00":0, "01":1, "02":2, "10":3, "11":4, "12":5, "20":6, "21":7, "22":8};

  let flatBoard = [];

  for (let i = 0; i < origiBoardObject.rows; i++) {
    for (let j = 0; j < origiBoardObject.columns; j++) {

      // convert 0's into indicies
      if (origiBoardObject.board[i][j] === 0) {
        flatBoard.push(indexToCoords[`${i}${j}`]);
      } else {
        flatBoard.push(origiBoardObject.board[i][j]);
      };

    };
  };

  return flatBoard;

}

// #2 helper function
const findEmptySquares = function (flatBoard) {

  emptySquares = [];
  for (let i = 0; i < flatBoard.length; i++) {
    if (flatBoard[i] !== "X" && flatBoard[i] !== "O") {
      emptySquares.push(flatBoard[i]);
    };
  };

  return emptySquares;

};

// #3 helper function
const convertIndextoCoordinates = function (index) {

  indexToCoords = {0:"00", 1:"01", 2:"02", 3:"10", 4:"11", 5:"12", 6:"20", 7:"21", 8:"22"};

  return indexToCoords[index];

}

// #4 helper function
// TODO fix this up
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

////////////////////////////////////////////////////////////////////////////////
huPlayer = "X";
aiPlayer = "O";

// #2 helper function
const moveAI = function (origiBoardObject) {

  // make board an array
  const origBoard = flattenBoard(origiBoardObject);

  // find best move
  // const bestMoveObject = miniMax(origBoard, aiPlayer);
  const bestMoveObject = minimax(origBoard, aiPlayer);
  console.log(bestMoveObject);
  const bestMove = convertIndextoCoordinates(bestMoveObject.index);

  // return x and y of AI's move
  return bestMove;

}

const minimax = function (newBoard, player) {

  //available spots
  var availSpots = emptyIndexies(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winFunction(newBoard, huPlayer)){
     return {score:-10};
  }
	else if (winFunction(newBoard, aiPlayer)){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
};

////////////////////////////////////////////////////////////////////////////////


// #3 newboard and player
// const miniMax = function (newBoard, player) {
//
//   // available spots indexes of flat board
//   const availableSpots = findEmptySquares(newBoard);
//
//   // score
//   if (winFunction(newBoard, player)) {
//     return {score:10};
//   } else if (winFunction(newBoard, player)) {
//     return {score:-10};
//   } else if (availableSpots.length === 0) {
//     return {score:0};
//   };
//
//   // collect scores from each of the empty spots in the board
//   let moves = [];
//   for (let i = 0; i < availableSpots.length; i++) {
//
//     // store each available spot in a move variable
//     let move = {};
//     move.index = newBoard[availableSpots[i]];
//
//     // set empty spot to current player
//     newBoard[availableSpots[i]] = player;
//
//     // collect score resulted from calling miniMax on opponent
//     if (player === "O") {
//       let result = miniMax(newBoard, "X");
//       move.score = result.score;
//     }
//     else {
//       result = miniMax(newBoard, "O");
//       move.score = result.score;
//     }
//
//     // reset the spot to empty
//     newBoard[availableSpots[i]] = move.index;
//
//     // push the move into the array
//     moves.push(move);
//
//   };
//
//     // AI turn loop over moves and choose move with highest score
//     let bestMove;
//     if (player === "O") {
//       let bestScore = -Infinity;
//       for (let i = 0; i < moves.length; i++) {
//
//         if (moves[i].score > bestScore) {
//           bestScore = moves[i].score;
//           bestMove = i;
//         };
//
//       };
//
//     } else {
//
//       // choose lowest score for human player
//       let minScore = Infinity;
//       for (let i = 0; i < moves.length; i++) {
//
//         if (moves[i].score < minScore) {
//           minScore = moves[i].score;
//           bestMove = i;
//         };
//
//       };
//
//     };
//
//     return moves[bestMove];
//
//
// }
///////////////////////////////////////////////////////////////

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

    scores: {"X":0, "Y":0, "draws":0},

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

    // moveAI: function () {
    //
    //   // get indicies of all empty squares
    //   // const emptySquares = findEmptySquares(this.board, this.rows, this.columns);
    //
    //   // find best move
    //   bestMove = miniMax(board, board.player);
    //
    //   // play that move on the board
    //   this.move(bestMove[0], bestMove[1]);
    //
    //   // return x and y of AI's move
    //   return bestMove;
    //
    //   // create search tree
    //
    //   // minimax algorithm
    //
    // },

    // helper function
    winTheGame: function () {

      this.board = [[this.player, this.player, this.player],
                    [0, 0, 0],
                    [0, 0, 0]];

    }

  };
};

// board object
const board = boardFactory();
