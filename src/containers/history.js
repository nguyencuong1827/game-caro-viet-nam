import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ListGroup, Button } from "react-bootstrap";
import React from "react";
import '../stylesheets/game.css';
import {jumpTo} from "../actions/game-action";

// eslint-disable-next-line react/prefer-stateless-function
class History extends React.Component {

  render() {
    const {
      historyState,
      stepNumber, 
      jumpToProp
    } = this.props;

    const moves = historyState.map((step, move) => {
      const desc = move ? `Đi đến bước ${move}` : "Trở về ban đầu";
      const selected = move === stepNumber ? "step selected" : "step";
      return (
        <ListGroup.Item key={move.toString()} className="list-group-custom">
          <Button  className={selected} onClick={() => jumpToProp(move)}>
            {desc}
          </Button>
        </ListGroup.Item>
      );
    });
    return moves;
  }
}
function mapStateToProps(state) {
  const { historyState, stepNumber } = state.game;
  return { historyState, stepNumber };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ jumpToProp: jumpTo }, dispatch);
}

const HistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
export default HistoryContainer;
