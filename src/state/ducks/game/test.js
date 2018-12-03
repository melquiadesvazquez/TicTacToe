// game/test.js

import reducer from './reducers';
import * as actions from './actions';
import * as operations from './operations';

const emptyBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

const drawBoard = [
  [2, 2, 1],
  [1, 1, 2],
  [2, 1, 1]
];

const player1WinBoard = [
  [2, 2, 0],
  [1, 1, 1],
  [2, 2, 0]
];

// TODO: consider breaking out into specific test files

describe('Game Duck', () => {
  // removed reducers section for brevity
  // describe('Reducers', () => { ... });

  // note that we are only test our complex operations since
  // the reducers already test the simple actions
  describe('operations', () => {
    const { checkWinner, playTurn } = operations;

    it('should dispatch a winner', () => {
      const dispatch = jest.fn();
      const board = player1WinBoard;
      const player = 1;

      const winnerAction = actions.winner(1);
      const gameoverAction = actions.gameover();

      checkWinner(board, player)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(winnerAction);
      expect(dispatch.mock.calls[1][0]).toEqual(gameoverAction);
    });

    it('should dispatch a draw', () => {
      const dispatch = jest.fn();
      const board = drawBoard;
      const player = 1;

      const winnerAction = actions.winner(0);
      const gameoverAction = actions.gameover();

      checkWinner(board, player)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(winnerAction);
      expect(dispatch.mock.calls[1][0]).toEqual(gameoverAction);
    });

    it('should not dispatch if game is in progress', () => {
      const dispatch = jest.fn();
      const board = emptyBoard;
      const player = 1;

      checkWinner(board, player)(dispatch);

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should play a turn', () => {
      const dispatch = jest.fn();

      let player = 1;
      let row = 0;
      let col = 0;

      const move1 = actions.movePlayer(player, row, col);
      const switch1 = actions.switchPlayer(2); // the operation will switch

      playTurn(player, row, col)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(move1);
      expect(dispatch.mock.calls[1][0]).toEqual(switch1);

      player = 2;
      row = 1;
      col = 1;

      const move2 = actions.movePlayer(player, row, col);
      const switch2 = actions.switchPlayer(1); // the operation will switch

      playTurn(player, row, col)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(dispatch.mock.calls[2][0]).toEqual(move2);
      expect(dispatch.mock.calls[3][0]).toEqual(switch2);
    });
  });
});
