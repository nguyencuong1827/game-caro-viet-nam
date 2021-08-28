import { Button } from "react-bootstrap"
import React from "react"
import '../stylesheets/game.css'

function Square(props) {
    const {
      index,
      listIndexWin,
      historyState,
      stepNumber,
      preStep
    } = props;
    const current = historyState[stepNumber];
    let temp = 0;

    const makeMove = () => {
      props.makeMove(index)
    }

    // Highlight winner
    while (listIndexWin && temp < listIndexWin.length) {
      if (index === listIndexWin[temp]) {
        return (
          <Button
            variant="light"
            type="button"
            className="square bold"
            data-pro={ current.squares[index] }
          >
            { current.squares[index] }
          </Button>
        )
      }
      temp += 1
    }
    return (
      <Button
        variant="light"
        type="button"
        className={ preStep === index ? "square bold" : "square" }
        data-pro={ current.squares[index] }
        onClick={ makeMove }
      >
        { current.squares[index] }
      </Button>
    );

}

export default Square
