import gameConstants from "../constants/game-constants";

const start = () => {
  return {
    type: gameConstants.START
  }
}
const stop = () => {
  return {
    type: gameConstants.STOP
  }
}

const makeMove = (index, timeOut) => {
  clearTimeout(timeOut);
  return {
    type: gameConstants.MAKE_MOVE,
    payload: index
  };
}


const playAgain = () => {
  return {
    type: gameConstants.PLAY_AGAIN
  };
}

const jumpTo = (step) => {
  return {
    type: gameConstants.JUMP_TO,
    payload: step
  };
}

const backStep = () => {
  return {
    type: gameConstants.BACK_STEP
  };
}

const nextStep = () => {
  return {
    type: gameConstants.NEXT_STEP
  };
}

const playWithAI = () => {
  return {
    type: gameConstants.PLAY_WITH_AI
  };
}

const playWithHumman = () => {
  return {
    type: gameConstants.PLAY_WITH_HUMMAN,
    // payload: socket
  };
}

const setYourTurn = (yourTurn) => {
  return {
    type: gameConstants.SET_YOUR_TURN,
    payload: yourTurn
  };
}

const rivalMove = (index) => {
  return {
    type: gameConstants.RIVAL_MOVE,
    payload: index
  };
}
const setIsYourTurn = (isYourTurn) => {
  return {
    type: gameConstants.SET_IS_YOUR_TURN,
    payload: isYourTurn
  };
}

const setWinner = (winner) => {
  console.log(winner);
  return {
    type: gameConstants.SET_WINNER,
    payload: winner
  };
}
function resetWinner(){
  return {
      type: gameConstants.RESET_WINNER
  }
}


export {
  start,
  stop,
  makeMove,
  playAgain,
  jumpTo,
  backStep,
  nextStep,
  playWithAI,
  playWithHumman,
  setYourTurn,
  rivalMove,
  setIsYourTurn,
  setWinner,
  resetWinner,
};
