import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-bootstrap"
import React from "react";
import '../stylesheets/game.css';
import { backStep, nextStep } from "../actions/game-action";

// eslint-disable-next-line react/prefer-stateless-function
class BackNextStep extends React.Component {
  render() {
    const { backStepProp, nextStepProp, isStarted } = this.props;
    if(isStarted){
      return(
        <div>
            <Button className="play" onClick={() => backStepProp()}>Trở lại</Button>
            <Button className="play" onClick={() => nextStepProp()}>Tiếp tục</Button>
        </div>
      );
    }
    return null;
  }
    
}

function mapStateToProps(state) {
  const { isStarted } = state.game;
  return { isStarted };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { backStepProp: backStep, nextStepProp: nextStep },
    dispatch
  );
}

const BackNextStepContainer = connect(mapStateToProps,  mapDispatchToProps)(BackNextStep);
export default BackNextStepContainer;
