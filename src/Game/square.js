import React from 'react';
import './game.css';
function Square(props) {
  return (
    <button className={props.layout} data-pro={props.value} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  export default Square;