import { ButtonGroup, Container } from "react-bootstrap";
import React from "react";
import Square from "./square";
import "../stylesheets/game.css";

function Board(props){
    
    const matrixSize = 20; // Lấy kích cỡ của ma trận bằng props gửi từ Game qua
    const rows = Array(matrixSize).fill(null); // Tạo rows là một Array để tiện sử dụng hàm map()
    const cols = rows; // Ma trận vuông nên cols = rows
    const board = rows.map((row, i) => {
      const squares = cols.map((col, j) => {
        const squareKey = i * matrixSize + j;
        return (
          <span key={squareKey}><Square index={squareKey} 
                                        makeMove={() => props.makeMove(squareKey)} 
                                        listIndexWin={props.listIndexWin}
                                        historyState={props.historyState}
                                        stepNumber={props.stepNumber}/>
          </span>
        );
      });
      return (
        <div className={props.boardRow} key={i.toString()}>
          {squares}
        </div>
      );
    });
    return <div className="custom-container-game">{board}</div>;
}

export default Board;
