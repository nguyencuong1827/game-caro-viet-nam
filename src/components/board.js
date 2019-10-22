import React from "react";
import SquareContainer from "../containers/square";
import "../stylesheets/game.css";

function Board(){
    const matrixSize = 20; // Lấy kích cỡ của ma trận bằng props gửi từ Game qua
    const rows = Array(matrixSize).fill(null); // Tạo rows là một Array để tiện sử dụng hàm map()
    const cols = rows; // Ma trận vuông nên cols = rows
    const board = rows.map((row, i) => {
      const squares = cols.map((col, j) => {
        const squareKey = i * matrixSize + j;
        return (
          <span key={squareKey}><SquareContainer index={squareKey} /></span>
        );
      });
      return (
        <div className="board-row" key={i.toString()}>
          {squares}
        </div>
      );
    });
    return <div>{board}</div>;
}

export default Board;
