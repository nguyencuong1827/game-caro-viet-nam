/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Board from './board';
import logo from '../images/logo.png'
import '../style/game.css';
import PlayAgainContainer from '../containers/play-again';
import HistoryContainer from '../containers/history'
import NextPlayerContainer from '../containers/next-player'
import BackNextStepContainer from '../containers/back-next-step'

class Game extends React.Component {
  
  render() {
    return (
       <div >
        <nav className="navbar navbar-default navbar-custom">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-branch" href="https://www.hcmus.edu.vn">
                <img src={logo} alt="logo"/>
              </a>
            </div>

            <div className="nav navbar-nav navbar-right">
              <a href="https://www.facebook.com/profile.php?id=100006756127324" className="glyphicon glyphicon-user" >Nguyễn Mạnh Cường
                <h4>1612077</h4>
              </a>
            </div>
          </div>
        </nav>
        <div className="container">
          <header className="Game-header">
            <h1 className="text-header">Game Caro</h1>
            <hr/>

          </header>
          <div className="row">
            <div className="col-sm-8">
              <Board />
            </div>
            <div className="col-sm-4">
              <div className="row">
                <div className="col-sm-7">
                  <h3><NextPlayerContainer /></h3>
                </div>
                <div className="col-sm-5">
                  <div><PlayAgainContainer /></div>
                </div>
              </div>

              <BackNextStepContainer />

              <div className="scrollbar scrollbar-success">
                <div className="force-overflow">
                  <ol><HistoryContainer /></ol>
                </div>
              </div>
              
            </div>

          </div>
        </div>
        <div className="Game-header">
          <br/>
          <h4>Copyright@ Cuong Joker</h4>
          <h4>Ho Chi Minh University of Science</h4>
        </div>
      </div>
    );
  }
}
export default Game;