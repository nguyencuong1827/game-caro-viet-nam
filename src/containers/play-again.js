import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { Button } from "react-bootstrap"
import React from 'react';
import '../stylesheets/game.css';
import {playAgain} from '../actions/game-action';

// eslint-disable-next-line react/prefer-stateless-function
class BtnPlayAgain extends React.Component {

  render(){
    const {playAgainProp, winner} = this.props;
    if(winner){
      return (
        <Button className="btnPlayAgain" onClick={() => playAgainProp()}>Chơi lại</Button>
      );
    }
    return null;
  }
  
}
function mapStateToProps(state){
  const { winner } = state.game
    return { winner };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({playAgainProp: playAgain}, dispatch);
}

const PlayAgainContainer =  connect(mapStateToProps , mapDispatchToProps)(BtnPlayAgain);
export default PlayAgainContainer;