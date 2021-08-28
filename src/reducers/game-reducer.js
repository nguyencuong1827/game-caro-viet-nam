/* eslint-disable consistent-return */
import gameConstants from '../constants/game-constants';
import calculateWinner from '../algorithm/calculateWinner';


const initState = {
  historyState: [
    {
      squares: Array(400).fill(null)
    }
  ],
  xIsNext: true,
  winner: '',
  PlayAgain: false,
  stepNumber: 0,
  lastStepNumber: -1,
  listIndexWin: null,
  listIndexWinBackup: null,
  isStarted: false,
  countTurn: 0,
  typePlay: '',
  yourTurn: '',
  isYourTurn: false
};



function game(state = initState, action) {
  const { historyState, winner, stepNumber, listIndexWinBackup, isStarted, xIsNext, countTurn, typePlay, yourTurn, isYourTurn } = state;


  switch (action.type) {
    case gameConstants.START: {
      return {
        ...state,
        isStarted: true
      }
    }
    case gameConstants.STOP: {
      return {
        ...state,
        isStarted: false
      }
    }
    case gameConstants.MAKE_MOVE: {
      if(isStarted === false){
        return state;
      }
      if(countTurn === 399){
        return {
          ...state,
          winner: "Tie"
        };
      }

      //

      if(typePlay === 'AI' && xIsNext === false){
        return state;
      }
      if(typePlay === 'HUMMAN' && ((yourTurn === 'X' && xIsNext === false) || (yourTurn === 'O' && xIsNext === true))){
        return state;
      }
      // if(isYourTurn === false){
      //   return state;
      // }
      const history = historyState.slice(0, stepNumber + 1);
      const current = historyState[history.length - 1];
      const squares = current.squares.slice();

      const i = action.payload;

      if (squares[i] || winner) {
        return state;
      }
      squares[i] = xIsNext ? "X" : "O";

      if(typePlay === 'HUMMAN'){
        global.socket.emit('user-send-position-move', i);
        // socketIOSend.sendPositionMove(socket, i);
      }
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
          currentTurn: squares[i],
          isStarted: false
        };
      }



      return {
        ...state,
        historyState: history.concat([{
          squares
        }]),
        xIsNext: !xIsNext,
        stepNumber: history.length,
        countTurn: countTurn + 1,
        currentTurn: squares[i],
        isYourTurn: false
      };
    }



    case gameConstants.PLAY_AGAIN: {
      return {
        ...state,
        historyState: [
          {
            squares: Array(400).fill(null)
          }
        ],
        xIsNext: true,
        winner: '',
        PlayAgain: null,
        stepNumber: 0,
        listIndexWin: null,
        listIndexWinBackup: null,
        isStarted: true,
        countTurn: 0,
        isYourTurn: false
      };
    }

    case gameConstants.JUMP_TO: {
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

    case gameConstants.BACK_STEP: {
      if (state.stepNumber > 0) {
        return {
          ...state,
          stepNumber: stepNumber - 1,
          xIsNext: !xIsNext,
          listIndexWin: null,
          isYourTurn: !isYourTurn
        };
      }
      return state;
    }

    case gameConstants.NEXT_STEP: {
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

    case gameConstants.PLAY_WITH_AI: {
      return {
        ...state,
        typePlay: 'AI'
      };
    }

    case gameConstants.PLAY_WITH_HUMMAN: {
      // const socketTemp = action.payload;
      return {
        ...state,
        typePlay: 'HUMMAN',
        // socket: socketTemp,
        isStarted: true
      };
    }

    case gameConstants.SET_YOUR_TURN: {
      const yourTurnTemp = action.payload;
      return {
        ...state,
        yourTurn: yourTurnTemp
      };
    }

    case gameConstants.RIVAL_MOVE: {
      if(isStarted === false){
        return state;
      }
      if(countTurn === 399){
        return {
          ...state,
          winner: "Tie"
        };
      }
      const history = historyState.slice(0, stepNumber + 1);
      const current = historyState[history.length - 1];
      const squares = current.squares.slice();

      const i = action.payload;



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
          currentTurn: squares[i],
          isStarted: false
        };
      }

      return {
        ...state,
        historyState: history.concat([{
          squares
        }]),
        xIsNext: !xIsNext,
        stepNumber: history.length,
        countTurn: countTurn + 1,
        currentTurn: squares[i],
        isYourTurn: true
      };
    }
    case gameConstants.SET_IS_YOUR_TURN: {
      const temp = action.payload;
      return{
        ...state,
        isYourTurn: temp
      }
    }

    case gameConstants.SET_WINNER: {
      const temp = action.payload;
      return{
        ...state,
        winner: temp,
        isStarted: false
      }
    }
    case gameConstants.RESET_WINNER: {
      return{
        ...state,
        winner: '',
        isStarted: false
      }
    }
    case gameConstants.RESET_ALL_GAME: {
      return initState
    }

    default:
      return state;
  }

}

export default game;
