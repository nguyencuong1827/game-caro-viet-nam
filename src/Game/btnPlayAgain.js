import React from 'react';
import './game.css';

function BtnPlayAgain(props) {
  const { onClick } = props;
  return (
    <button type="button" className="btnPlayAgain" onClick={onClick}>Chơi lại</button>
  );
}

export default BtnPlayAgain;