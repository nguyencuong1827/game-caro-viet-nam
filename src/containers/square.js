import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import "../style/game.css";
import { makeMove } from "../actions/index";

// eslint-disable-next-line react/prefer-stateless-function
class Square extends React.Component {
  render() {
    const {
      index,
      makeMoveProp,
      historyState,
      stepNumber,
      listIndexWin
    } = this.props;
    const current = historyState[stepNumber];
    let temp = 0;

    // Tô đậm square nếu có người chiến thắng
    while (listIndexWin && temp < listIndexWin.length) {
      if (index === listIndexWin[temp]) {
        return (
          <button
            type="button"
            className="square bold"
            data-pro={current.squares[index]}
            onClick={() => makeMoveProp(index)}
          >
            {current.squares[index]}
          </button>
        );
      }
      temp += 1;
    }
    return (
      <button
        type="button"
        className="square"
        data-pro={current.squares[index]}
        onClick={() => makeMoveProp(index)}
      >
        {current.squares[index]}
      </button>
    );
  }
}
function mapStateToProps(state) {
  return {historyState: state.historyState,
          stepNumber: state.stepNumber,
          listIndexWin: state.listIndexWin};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ makeMoveProp: makeMove }, dispatch);
}

const SquareContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Square);
export default SquareContainer;