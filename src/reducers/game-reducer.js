/* eslint-disable consistent-return */
import gameConstants from '../constants/game-constants';
import calculateWinner from '../algorithm/calculateWinner';
import socketIOSend from '../socket.io/send';

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
  listIndexWinBackup: null,
  isStarted: false, 
  countTurn: 0,
  typePlay: '',
  socket: null,
  yourTurn: ''
};



function game(state = initState, action) {
  const { historyState, winner, stepNumber, listIndexWinBackup, isStarted, xIsNext, countTurn, socket, typePlay, yourTurn } = state;

 
  switch (action.type) {
    case gameConstants.START: {
      return {
        ...state,
        isStarted: true
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

      console.log(yourTurn);
      if(typePlay === 'HUMMAN' && ((yourTurn === 'X' && xIsNext === false) || (yourTurn === 'O' && xIsNext === true))){
        return state;
      }
      const history = historyState.slice(0, stepNumber + 1);
      const current = historyState[history.length - 1];
      const squares = current.squares.slice();

      const i = action.payload;
     
      

      if (squares[i] || winner) {
        return state;
      }
      squares[i] = xIsNext ? "X" : "O";

      if(typePlay === 'HUMMAN'){
        socketIOSend.sendPositionMove(socket, i);
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
          currentTurn: squares[i]
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
        currentTurn: squares[i]
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
        winner: null,
        PlayAgain: null,
        stepNumber: 0,
        listIndexWin: null,
        listIndexWinBackup: null
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
          listIndexWin: null
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
      const socketTemp = action.payload;
      return {
        ...state,
        typePlay: 'HUMMAN',
        socket: socketTemp,
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
          currentTurn: squares[i]
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
        currentTurn: squares[i]
      };
    }


    default:
      return state;
  }
}

export default game;
