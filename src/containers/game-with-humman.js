/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row, Col, Figure} from "react-bootstrap";
import Board from "../components/board";
import "../stylesheets/game.css";
import { makeMove, playWithAI, setYourTurn, rivalMove} from "../actions/game-action";
import getBestMove from "../algorithm/AI-player";
import profileImg from '../images/profile.png'

class Game extends React.Component {
   
    constructor(props) {
        super(props);
        this.state={
            arrUser: [{
                NickName:'',
                Point:'',
                Rank: '',
                YourTurn: ''
            }, {
                NickName:'',
                Point:'',
                Rank: '',
                YourTurn: ''
            }],
            yourTurn: ''
        }
        
      }

    componentDidMount(){
        const { socket, res, setYourTurnProp, rivalMoveProp } = this.props;
        if(socket){
            socket.on('server-send-info-user', function(data){
                this.setState({arrUser: data});
                if(res.user.username === data[0].Username){
                    setYourTurnProp(data[0].YourTurn);
                    console.log(data[0].YourTurn);
                }
                if(res.user.username === data[1].Username){
                    setYourTurnProp(data[1].YourTurn);
                    console.log(data[0].YourTurn);
                }
            }.bind(this));
            socket.on('server-send-position-move', function(data){
                rivalMoveProp(data);
            });
        }
     
    }

    render(){
        const { makeMoveProp, listIndexWin, historyState, stepNumber } = this.props;
        const { arrUser } = this.state;
        return (
            
            <Container className="custom-container-game">
                <header className="Game-header">
                <h1 className="text-header">Game Caro</h1>
                </header>
                <Row>
                <Col   sm={2}>
                    
                <Figure>
                    <Figure.Image
                        width={100}
                        height={100}
                        alt="171x180"
                        src={profileImg}
                        roundedCircle 
                    />
                    <Figure.Caption>
                         <h4>{arrUser[0].NickName }</h4>
                         <h4>{arrUser[0].Rank}</h4>
                    </Figure.Caption>
                    </Figure>
        
                    
                </Col>
                <Col sm={8}>
                    <Board  makeMove={(i) => makeMoveProp(i)} 
                            listIndexWin={listIndexWin}
                            historyState={historyState}
                            stepNumber={stepNumber}/>
                </Col>
                <Col  sm={2}>
                    
                <Figure>
                    <Figure.Image
                        width={100}
                        height={100}
                        alt="171x180"
                        src={profileImg}
                        roundedCircle 
                    />
                    <Figure.Caption>
                         <h4>{arrUser[1].NickName }</h4>
                         <h4>{arrUser[1].Rank}</h4>
                    </Figure.Caption>
                    </Figure>
        
                    
                </Col>
                </Row>
                <div className="Game-footer">
                <h4>Copyright@ Cuong Joker</h4>
                <h4>Ho Chi Minh University of Science</h4>
            </div>
            </Container>
            
        );
    }
}
function mapStateToProps(state) {
    const { listIndexWin, historyState, stepNumber, xIsNext, typePlay, socket } = state.game;
    const { res} = state.authentication;
    return { listIndexWin, historyState, stepNumber, xIsNext, typePlay, socket, res };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ makeMoveProp: makeMove, playWithAIProp: playWithAI, setYourTurnProp: setYourTurn, rivalMoveProp: rivalMove}, dispatch);
  }
  
  const GameContainerWithAI = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Game);
  export default GameContainerWithAI;
