import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import React from 'react';
import '../style/game.css';
import {playAgain} from '../actions/index';

// eslint-disable-next-line react/prefer-stateless-function
class BtnPlayAgain extends React.Component {

  render(){
    const {playAgainProp, winner} = this.props;
    if(winner){
      return (
        <button type="button" className="btnPlayAgain" onClick={() => playAgainProp()}>Chơi lại</button>
      );
    }
    return null;
  }
  
}
function mapStateToProps(state){
    return {winner: state.winner};
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({playAgainProp: playAgain}, dispatch);
}

const PlayAgainContainer =  connect(mapStateToProps , mapDispatchToProps)(BtnPlayAgain);
export default PlayAgainContainer;