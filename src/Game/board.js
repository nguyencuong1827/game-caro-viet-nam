import React from 'react';
import Square from './square'
import './game.css';

class Board extends React.Component {
  renderSquareNormal(i) {
    return (
      <Square
        layout='square'
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderSquareWin(i) {
    return (
      <Square
        layout='square bold'
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
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
        let listIndexWin = this.props.listIndexWin;
        while(listIndexWin && temp < listIndexWin.length){
          if(squareKey === listIndexWin[temp]){
            return <span key={squareKey}>{this.renderSquareWin(squareKey)}</span>
          }
          temp++;
        }
        return <span key={squareKey}>{this.renderSquareNormal(squareKey)}</span>; 
      });
      return <div className="board-row" key={i}>{squares}</div> // Tương tự như trên
    });
    return <div>{board}</div>
  }
}


export default Board;