import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { Button } from "react-bootstrap"
import React from 'react';
import '../stylesheets/game.css';
import {playAgain, start} from '../actions/game-action';

// eslint-disable-next-line react/prefer-stateless-function
class PlayButton extends React.Component {

  render(){
    const {playAgainProp, winner, isStarted, startProp} = this.props;
    if(winner){
      return (
        <Button className="play play-again" onClick={() => playAgainProp()}>Chơi lại</Button>
      );
    }
    if(!isStarted){
      return (
        <Button className="play" onClick={() => startProp()}>Bắt đầu</Button>
      );
    }
    return null;
  }
  
}
function mapStateToProps(state){
  const { winner, isStarted } = state.game
    return { winner, isStarted };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({playAgainProp: playAgain, startProp: start}, dispatch);
}

const PlayButtonContainer =  connect(mapStateToProps , mapDispatchToProps)(PlayButton);
export default PlayButtonContainer;