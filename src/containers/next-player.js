import { connect } from "react-redux";
import React from "react";
import '../stylesheets/game.css';

// eslint-disable-next-line react/prefer-stateless-function
class NextPlayer extends React.Component {

  render() {
    const {winner,
           xIsNext
          } = this.props;
    let status;
    if (winner) {
      status = `${winner} thắng!!!`;
    } else {
      status = `Lược kế tiếp: ${(xIsNext ? 'X' : 'O')}`;
    }
    return status;
  }
}
function mapStateToProps(state) {
  return {winner: state.winner,
          xIsNext: state.xIsNext};
}
const NextPlayerContainer = connect (mapStateToProps)(NextPlayer);
export default NextPlayerContainer;
