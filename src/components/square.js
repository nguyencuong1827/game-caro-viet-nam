import { Button } from "react-bootstrap"
import React from "react";
import '../stylesheets/game.css';

// eslint-disable-next-line react/prefer-stateless-function
function Square(props) {
    const {
      index,
      makeMove,
      listIndexWin, 
      historyState,
      stepNumber, 
    } = props;
    const current = historyState[stepNumber];
    let temp = 0;
    // Tô đậm square nếu có người chiến thắng
    while (listIndexWin && temp < listIndexWin.length) {
      if (index === listIndexWin[temp]) {
        return (
          <Button 
            variant="light"
            type="button"
            className="square bold"
            data-pro={current.squares[index]}
            onClick={() => makeMove(index)}
          >
            {current.squares[index]}
          </Button>
        );
      }
      temp += 1;
    }
    return (
      <Button 
        variant="light"
        type="button"
        className="square"
        data-pro={current.squares[index]}
        onClick={() => makeMove(index)}
      >
        {current.squares[index]}
      </Button>
    );
  
}

export default Square;
