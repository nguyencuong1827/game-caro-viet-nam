import React from 'react';
import './game.css';

function Square(props) {
  const { value } = props;
  const { layout } = props;
  const { onClick } = props;
  return (
    <button type="button" className={layout} data-pro={value} onClick={onClick}>
      {value}
    </button>
  );
}
  export default Square;