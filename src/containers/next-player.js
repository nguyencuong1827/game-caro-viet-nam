import { connect } from "react-redux";
import React from "react";
import '../stylesheets/game.css';

// eslint-disable-next-line react/prefer-stateless-function
class NextPlayer extends React.Component {

  render() {
    const {xIsNext} = this.props;
          
     const status = `Lược ${(xIsNext ? 'bạn: X' : 'máy: O')}`;
     return status;
    }
    
}
function mapStateToProps(state) {
  const {xIsNext } = state.game;
  return {xIsNext };
}
const NextPlayerContainer = connect (mapStateToProps)(NextPlayer);
export default NextPlayerContainer;
