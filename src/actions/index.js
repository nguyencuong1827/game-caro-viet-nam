import {
  MAKE_MOVE,
  PLAY_AGAIN,
  JUMP_TO,
  BACK_STEP,
  NEXT_STEP
} from "./actionTypes";

const makeMove = (index) => {
  return {
    type: MAKE_MOVE,
    payload: index
  };
}

const playAgain = () => {
  return {
    type: PLAY_AGAIN
  };
}

const jumpTo = (step) => {
  return {
    type: JUMP_TO,
    payload: step
  };
}

const backStep = () => {
  return {
    type: BACK_STEP
  };
}

const nextStep = () => {
  return {
    type: NEXT_STEP
  };
}

export {
  makeMove,
  playAgain,
  jumpTo,
  backStep,
  nextStep
};
