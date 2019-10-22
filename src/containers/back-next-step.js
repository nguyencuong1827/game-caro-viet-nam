import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-bootstrap"
import React from "react";
import '../stylesheets/game.css';
import { backStep, nextStep } from "../actions/index";

// eslint-disable-next-line react/prefer-stateless-function
class BackNextStep extends React.Component {
  render() {
    const { backStepProp, nextStepProp } = this.props;
    return(
        <div>
            <Button className="btnPlayAgain" onClick={() => backStepProp()}>Trở lại</Button>
            <Button className="btnPlayAgain" onClick={() => nextStepProp()}>Tiếp tục</Button>
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
