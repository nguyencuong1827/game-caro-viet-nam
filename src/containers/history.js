import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import "../style/game.css";
import { jumpTo} from "../actions/index";

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
        <li key={move.toString()}>
          <button type="button" className={selected} onClick={() => jumpToProp(move)}>
            {desc}
          </button>
        </li>
      );
    });
    return moves;
  }
}
function mapStateToProps(state) {
  return {historyState: state.historyState,
          stepNumber: state.stepNumber};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ jumpToProp: jumpTo }, dispatch);
}

const HistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
export default HistoryContainer;
