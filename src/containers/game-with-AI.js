/* eslint-disable func-names */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import {Prompt} from "react-router-dom"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ListGroup, Container, Row, Col} from "react-bootstrap";
import Board from "../components/board";
import "../stylesheets/game.css";
import PlayButtonContainer from "./play-button";
import HistoryContainer from "./history";
import NextPlayerContainer from "./next-player";
import BackNextStepContainer from "./back-next-step";
import { makeMove, playWithAI, playAgain, stop, rivalMove} from "../actions/game-action";
import getBestMove from "../algorithm/AI-player";
import history from "../helpers/history";

class Game extends React.Component {
   
    constructor(props) {
        super(props);
        const { playWithAIProp } = this.props;
        playWithAIProp();
       
      }
    
    componentDidMount(){
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            e.returnValue = '';
        });
        
        history.listen((location, action) =>{
            if(action){
                const { playAgainProp, stopProp } = this.props;
                playAgainProp();
                stopProp(); 
            }
        });
    }
   

    componentWillReceiveProps(preProp){
        const timeOut = setTimeout(function(){
            const {xIsNext, historyState, stepNumber, rivalMoveProp} = preProp;
            if(xIsNext === false){
                const current = historyState[stepNumber];
                const i = getBestMove(current.squares);
                rivalMoveProp(i);
                clearTimeout(timeOut);
            }
        }, 1000);
    }

    render(){
        const { makeMoveProp, listIndexWin, historyState, stepNumber, isStarted, winner } = this.props;
        return (
            <div>
            <Prompt when={isStarted} message="Bạn có muốn thoát?"/>
            <Container className=" height-container">
                <header className="Game-header">
                <h1 className="text-header">Game Caro</h1>
                </header>
                <Row>
                <Col sm={8}>
                    <Board makeMove={(i) => makeMoveProp(i)} 
                        listIndexWin={listIndexWin}
                        historyState={historyState}
                        stepNumber={stepNumber}
                        boardRow="board-row-ai"/>
                </Col>
                <Col sm={4}>
                    <Row>
                    <Col sm={6}>
                        {winner !== '' &&
                            <h4>{winner !== 'Tie'? `${winner} thắng`: winner}</h4>
                        }
                        {winner === '' && isStarted === true &&
                            <h4>
                                <NextPlayerContainer />
                            </h4>
                        }
                        
                    </Col>
                    <Col sm={4}>
                        <PlayButtonContainer /> 
                    </Col>
                    </Row>
                
                    
                    <BackNextStepContainer /> 
                        <div className="scrollbar scrollbar-success">
                        <div className="force-overflow">
                        <ListGroup>
                            <HistoryContainer />
                        </ListGroup>
                        </div>
                    </div>
                    
        
                    
                </Col>
                </Row>
                <div className="Game-footer">
                <h4>Copyright@ Cuong Joker</h4>
                <h4>Ho Chi Minh University of Science</h4>
            </div>
            </Container>
            </div>
            
        );
    }
}
function mapStateToProps(state) {
    const { listIndexWin, historyState, stepNumber, xIsNext, typePlay, isStarted, winner } = state.game;
    return { listIndexWin, historyState, stepNumber, xIsNext, typePlay, isStarted, winner };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ makeMoveProp: makeMove, rivalMoveProp: rivalMove, playWithAIProp: playWithAI, playAgainProp: playAgain, stopProp: stop}, dispatch);
  }
  
  const GameContainerWithAI = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Game);
  export default GameContainerWithAI;
