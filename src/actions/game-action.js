import gameConstants from "../constants/game-constants";

const start = () => {
  return {
    type: gameConstants.START
  }
}

const makeMove = (index) => {
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

export {
  start,
  makeMove,
  playAgain,
  jumpTo,
  backStep,
  nextStep
};
