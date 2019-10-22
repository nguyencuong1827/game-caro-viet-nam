/* eslint-disable consistent-return */
import {
  MAKE_MOVE,
  PLAY_AGAIN,
  JUMP_TO,
  BACK_STEP,
  NEXT_STEP
} from '../actions/actionTypes';
import calculateWinner from '../algorithm/calculateWinner';

const initState = {
  historyState: [
    {
      squares: Array(400).fill(null)
    }
  ],
  xIsNext: true,
  winner: null,
  PlayAgain: false,
  stepNumber: 0,
  lastStepNumber: -1,
  listIndexWin: null, 
  listIndexWinBackup: null
};



const game = (state = initState, action) => {
  const { historyState, xIsNext, winner, stepNumber, listIndexWinBackup} = state;
  switch (action.type) {
    case MAKE_MOVE: {
      const i = action.payload;
      const history = historyState.slice(0, stepNumber + 1);
      const current = historyState[history.length - 1];
        const squares = current.squares.slice();
      if (squares[i] || winner) {
        return state;
      }
      squares[i] = xIsNext ? "X" : "O";
      const check = calculateWinner(squares, i);
      if (check) {
        return {
          ...state,
          historyState: history.concat([{
            squares
          }]),
          winner: squares[i],
          PlayAgain: true,
          stepNumber: history.length,
          lastStepNumber: history.length,
          listIndexWin: check,
          listIndexWinBackup: check,
        };
      }

      return {
        ...state,
        historyState: history.concat([{
          squares
        }]),
        xIsNext: !xIsNext,
        stepNumber: history.length
      };
    }

    case PLAY_AGAIN: {
      return {
        ...state,
        historyState: [
          {
            squares: Array(400).fill(null)
          }
        ],
        xIsNext: true,
        winner: null,
        PlayAgain: null,
        stepNumber: 0,
        listIndexWin: null,
        listIndexWinBackup: null
      };
    }

    case JUMP_TO: {
      const step = action.payload;
      if (state.lastStepNumber === step) {
        return {
          ...state,
          stepNumber: step,
          xIsNext: step % 2 === 0,
          listIndexWin: listIndexWinBackup
        };
      }
      return {
        ...state,
        stepNumber: step,
        xIsNext: step % 2 === 0,
        listIndexWin: null
      };
    }

    case BACK_STEP: {
      if (state.stepNumber > 0) {
        return {
          ...state,
          stepNumber: stepNumber - 1,
          xIsNext: !xIsNext,
          listIndexWin: null
        };
      }
      return state;
    }

    case NEXT_STEP: {
      if (state.stepNumber + 1 === state.lastStepNumber) {
        return {
          ...state,
          stepNumber: stepNumber + 1,
          listIndexWin: state.listIndexWinBackup
        };
      }
      if (state.stepNumber < state.historyState.length - 1) {
        return {
          ...state,
          stepNumber: stepNumber + 1,
          xIsNext: !xIsNext,
          listIndexWin: null
        };
      }
      return state;
    }

    default:
      return state;
  }
};

export default game;
