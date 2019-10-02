import React from 'react';
import Square from './square';
import './game.css';

class Board extends React.Component {
  renderSquareNormal(i) {
    const { squares } = this.props;
    const { onClick } = this.props;
    return (
      <Square
        layout='square'
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  renderSquareWin(i) {
    const { squares } = this.props;
    const { onClick } = this.props;
    return (
      <Square
        layout='square bold'
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

 
  render() {
    const matrixSize = 20; // Lấy kích cỡ của ma trận bằng props gửi từ Game qua
    const rows = Array(matrixSize).fill(null); // Tạo rows là một Array để tiện sử dụng hàm map()
    const cols = rows; // Ma trận vuông nên cols = rows
    const board = rows.map((row, i) => {
      const squares = cols.map((col, j) => {
        const squareKey = i * matrixSize + j;
        let temp = 0;
        const { listIndexWin } = this.props;
        while(listIndexWin && temp < listIndexWin.length){
          if(squareKey === listIndexWin[temp]){
            return <span key={squareKey}>{this.renderSquareWin(squareKey)}</span>
          }
          temp += 1;
        }
        return <span key={squareKey}>{this.renderSquareNormal(squareKey)}</span>; 
      });
      return <div className="board-row" key={i.toString()}>{squares}</div> // Tương tự như trên
    });
    return <div>{board}</div>
  }
}


export default Board;