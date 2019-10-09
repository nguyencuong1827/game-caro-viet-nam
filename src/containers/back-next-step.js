import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import "../style/game.css";
import { backStep, nextStep } from "../actions/index";

// eslint-disable-next-line react/prefer-stateless-function
class BackNextStep extends React.Component {
  render() {
    const { backStepProp, nextStepProp } = this.props;
    return(
        <div>
            <button type="button" className="btnPlayAgain" onClick={() => backStepProp()}>Trở lại</button>
            <button type="button" className="btnPlayAgain" onClick={() => nextStepProp()}>Tiếp tục</button>
        </div>
    );
  }
    
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { backStepProp: backStep, nextStepProp: nextStep },
    dispatch
  );
}

const BackNextStepContainer = connect(null,  mapDispatchToProps)(BackNextStep);
export default BackNextStepContainer;
