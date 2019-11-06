import { connect } from "react-redux";
import React from "react";
import '../stylesheets/game.css';

// eslint-disable-next-line react/prefer-stateless-function
class NextPlayer extends React.Component {

  render() {
    const {winner,
           xIsNext,
           isStarted
          } = this.props;
    if(isStarted){
      let status;
      if (winner) {
        status = winner === 'Tie' ? 'Hòa!!!': `${winner} thắng!!!`;
      } else {
        status = `Lược ${(xIsNext ? 'bạn: X' : 'máy: O')}`;
      }
      return status;
    }
    return null;
  }
}
function mapStateToProps(state) {
  const { winner, xIsNext, isStarted } = state.game;
  return { winner, xIsNext, isStarted };
}
const NextPlayerContainer = connect (mapStateToProps)(NextPlayer);
export default NextPlayerContainer;
