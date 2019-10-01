import React from 'react';
import './game.css';
function BtnPlayAgain(props) {
  return (
    <button className="btnPlayAgain" onClick={props.onClick}>Chơi lại</button>
  );
}
export default BtnPlayAgain;