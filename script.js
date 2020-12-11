'use strict'

const domBoard = document.querySelector('#board');
const board = [
  0,0,0,
  0,0,0,
  0,0,0
];
const player = {
  current: 'x',
  next: 'o'
};

const createBoard = () => {
  for (let i = 0; i < 9; i++) {
    const div = document.createElement('div');
    changeDivParameters(div, 'tile', i, () => onClick(div));
    domBoard.append(div);
  }
};

const deleteBoardChildren = () => {
  const boardChildren = document.querySelectorAll('#board > *');
  boardChildren.forEach(element => element.remove());
};

const resetBoardValues = () => {
  board.forEach((callback, index, array) => array[index] = 0);
};

const resetGame = () => {
  deleteBoardChildren();
  resetBoardValues();
  Object.assign(player, {current: 'x', next: 'o'});
};

const changeDivParameters = (element, className, id, onclick) => {
  Object.assign(element, {className, id, onclick});
};

const swapPlayer = () => {
  [player.current, player.next] = [player.next, player.current];
};

const makeChangeOnBoard = (id, currentPlayer) => {
  board[id] = currentPlayer === 'x' ? 1 : -1;
};

const makeChangeOnScreen = (element, currentPlayer) => {
  element.innerHTML = `<span class="tileText">${currentPlayer}</span>`;
};

const isMovePossible = (id) => board[id] === 0;

const isGameOver = () => {
  return (Math.abs(board[0] + board[1] + board[2]) === 3 ||
    Math.abs(board[3] + board[4] + board[5]) === 3 ||
    Math.abs(board[6] + board[7] + board[8]) === 3 ||
    Math.abs(board[0] + board[3] + board[6]) === 3 ||
    Math.abs(board[1] + board[4] + board[7]) === 3 ||
    Math.abs(board[2] + board[5] + board[8]) === 3 ||
    Math.abs(board[0] + board[4] + board[8]) === 3 ||
    Math.abs(board[2] + board[4] + board[6]) === 3);
};

const showWinner = (currentPlayer) => {
  alert(`Congratulations ${currentPlayer}!`);
  makeGame();
};

const onClick = (element) => {
  if (isMovePossible(element.id) && !isGameOver()) {
    makeChangeOnBoard(element.id, player.current);
    makeChangeOnScreen(element, player.current);
    isGameOver() ? showWinner(player.current) : swapPlayer();
  }
};

const makeGame = () => {
  resetGame();
  createBoard();
};

makeGame();