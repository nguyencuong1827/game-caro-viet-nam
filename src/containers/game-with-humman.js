/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PacmanLoader } from "react-spinners";
import { Toast, Form, Accordion, Card, Modal, Button ,Container, Row, Col, Figure} from "react-bootstrap";
import Board from "../components/board";
import "../stylesheets/game.css";
import { makeMove, playWithAI, setYourTurn, rivalMove, setIsYourTurn, backStep, setWinner, playAgain} from "../actions/game-action";
import getBestMove from "../algorithm/AI-player";
import profileImg from '../images/profile.png';
import timer from '../images/timer.gif';
import history from "../helpers/history";

let timeOut;
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
            isLeft: false,
            rivalTurn:'',
            rivalPleaseReturn: false,
            giveUp: false,
            winnerState: '',
            message: '',
            yourMessage: '',
            rivalMessage: '',
            waitingRival: false,
            alertUserQuit: false,
            userPlayAgain: []
            
        }
        this.handlePleaseReturn = this.handlePleaseReturn.bind(this);
        this.handleNotAllow = this.handleNotAllow.bind(this);
        this.handleAllow = this.handleAllow.bind(this);
        this.handleGiveUp = this.handleGiveUp.bind(this);
        this.handleNotAgree = this.handleNotAgree.bind(this);
        this.handleAgree = this.handleAgree.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handlePlayAgain = this.handlePlayAgain.bind(this);
      }

    componentWillMount(){
        const { socket, res, setYourTurnProp, rivalMoveProp, setIsYourTurnProp, backStepProp, setWinnerProp, playAgainProp } = this.props;
        if(socket){
            socket.on('server-send-info-user', function(data){
                this.setState({arrUser: data});
                if(res.user.username === data[0].Username){
                    setYourTurnProp(data[0].YourTurn);
                    if(data[0].YourTurn === 'X'){
                        setIsYourTurnProp(true);
                    }
                    
                    this.setState({isLeft: true,
                        rivalTurn: data[1].YourTurn});
                }
                if(res.user.username === data[1].Username){
                    setYourTurnProp(data[1].YourTurn);
                    if(data[1].YourTurn === 'X'){
                        setIsYourTurnProp(true);
                    }
                    
                    this.setState({isLeft: false,
                        rivalTurn: data[0].YourTurn});
                }
                
                // setTimeout(function(){
                //     if(countTurn === turnTemp){
                //         console.log("Hết giờ");
                //     }
                // }, 16000);
            }.bind(this));
            socket.on('server-send-position-move', function(data){
                rivalMoveProp(data);
            });

            socket.on('server-send-please-return', function(data){
                if(res.user.username !== data){
                    this.setState({rivalPleaseReturn: true});
                }
            }.bind(this));

            socket.on('server-send-allow', function(){
                backStepProp();
            });
            
            socket.on('server-send-give-up', function(data){
                const { arrUser } = this.state;
                if(arrUser[0].Username === data.Username){
                    setWinnerProp(arrUser[1].NickName);
                    this.setState({winnerState: arrUser[1].NickName});
                }
                else{
                    setWinnerProp(arrUser[0].NickName);
                    this.setState({winnerState: arrUser[0].NickName});
                }

            }.bind(this));

            socket.on('server-send-message', function(data){
               if(res.user.username === data.Username){
                    this.setState({yourMessage: data.Message});
               }
               else{
                this.setState({rivalMessage: data.Message});
               }
            }.bind(this));

            socket.on('server-send-have-user-quit', function(){
                this.setState({waitingRival: false, alertUserQuit: true});
            }.bind(this));

            socket.on('server-send-play-again', function(data){
                const { userPlayAgain, arrUser } = this.state;
                userPlayAgain.push(data);
                this.setState({ userPlayAgain });
                if(userPlayAgain.length === 2){
                    clearTimeout(timeOut);
                    playAgainProp();
                    if(res.user.username === arrUser[0].Username && arrUser[0].YourTurn === 'X'){
                        setIsYourTurnProp(true);
                    }
                    if(res.user.username === arrUser[1].Username && arrUser[1].YourTurn === 'X'){
                        setIsYourTurnProp(true);
                    }
                    
                    this.setState({waitingRival: false, });
                }
                
               
                
            }.bind(this));
        }

        this.interval = setInterval(function(){
            this.setState({yourMessage: '', rivalMessage: ''});
            
        }.bind(this), 10000);
       
    }

  
    
    componentWillReceiveProps(Props){
        const {winner, isStarted, isYourTurn} = Props;
        const {arrUser} = this.state
        if(arrUser[0].YourTurn === winner){
            this.setState({winnerState: arrUser[0].NickName});
        }
        if(arrUser[1].YourTurn === winner){
            this.setState({winnerState: arrUser[1].NickName});
        }
        if(isStarted === true && isYourTurn === true){
            console.log(isYourTurn);
                timeOut = setTimeout(function(){
                const { historyState, stepNumber, makeMoveProp} = Props;
                const current = historyState[stepNumber];
                const i = getBestMove(current.squares);
                makeMoveProp(i);
                clearTimeout(timeOut);
                }, 16000);
           
        }
        
      }
   

    handlePleaseReturn(){
        const { socket } = this.props;
        socket.emit('user-send-please-return');
        console.log("Xin quay lại");
    }

    handleNotAllow() {
        this.setState({ rivalPleaseReturn: false });
    }

    handleAllow() {
        this.setState({ rivalPleaseReturn: false });
        const { socket } = this.props;
        socket.emit('user-send-allow');
    }

    

    handleGiveUp(){
        this.setState({ giveUp: true });
    }

    handleAgree(){
        this.setState({ giveUp: false });
        const { socket } = this.props;
        socket.emit('user-send-give-up')
    }

    handleNotAgree(){
        this.setState({ giveUp: false });
    }

    handleCloseAlert(){
        const {socket} = this.props;
        this.setState({ winnerState: '', waitingRival: false });
        socket.disconnect();
        history.push('/room');
    }

    handleChangeMessage(e) {
        const {name, value} = e.target;
        this.setState({ [name]: value});
    }

    handleSendMessage(e){
        e.preventDefault();
        const { socket } = this.props;
        const { message } = this.state;
        if(message !== ''){
          socket.emit('user-send-message', message);
          this.setState({message: ''});
        }
      }
    
    
    handlePlayAgain(){
        const { socket, res } = this.props;
        this.setState({winnerState: '', waitingRival: true});
        socket.emit('user-send-play-again', res.user.username);
    }
      
   
    
    render(){
        const { makeMoveProp, listIndexWin, historyState, stepNumber, yourTurn, res, isYourTurn, isStarted } = this.props;
        const { arrUser, rivalTurn, isLeft, rivalPleaseReturn, giveUp, message, yourMessage, rivalMessage, winnerState, waitingRival, alertUserQuit} = this.state;
       
        return (
            
            <Container className="custom-container-game">
               
                <header className="Game-header">
                <h1 className="text-header">Game Caro</h1>
                </header>
                <Row>
                <Col sm={2}>
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    style={{
                        position: 'relative',
                        minHeight: '100px',
                    }}>
                    {((isLeft === true && yourMessage !== '') || (isLeft === false && rivalMessage !== '')) &&
                        <Toast className="custom-toast-room"
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: "10px",
                        }}>
                        <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">{arrUser[0].NickName}</strong>
                        </Toast.Header>
                        <Toast.Body>{isLeft === true? yourMessage: rivalMessage}</Toast.Body>
                        </Toast>
                    }   
                    
                    </div>
                <Figure>
                    <Figure.Image
                        width={100}
                        height={100}
                        alt="171x180"
                        src={( isStarted === true && ((arrUser[0].Username === res.user.username && isYourTurn === true) ||
                                                   (arrUser[0].Username !== res.user.username && isYourTurn === false)))? timer: profileImg}
                        roundedCircle 
                    />
                  <Figure.Caption className="custom-col-game">
                         
                         <h5>{arrUser[0].NickName}</h5>
                         <h5>{arrUser[0].Rank}</h5>
                         <h5>{isLeft === true? yourTurn: rivalTurn}</h5>
                         {isLeft === true &&
                            <Container>
                                <Button className="humman" onClick={this.handlePleaseReturn}>Xin quay lại </Button>
                                <Button className="humman" onClick={this.handleGiveUp}>Xin thua </Button>
                               
                                <Accordion >
                                    <Card className="custom-card-room">
                                        <Card.Header >
                                        <Accordion.Toggle className="custom-Accordion-room" as={Button} variant="link" eventKey="0">
                                           Chat
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <Form onSubmit={this.handleSendMessage}>
                                                <Form.Control name="message" value={message}  type="text" onChange={this.handleChangeMessage} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
                                                <br/>
                                                <Button className="custom-button-send" variant="warning" type="submit">Gửi</Button>
                                            </Form>
                                            
                                        
                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    </Accordion>
                                    
                                    
                            </Container>
                        }
                     </Figure.Caption>
                    </Figure>
        
                    
                </Col>
                <Col sm={8}>
                    <Board  makeMove={(i) => makeMoveProp(i)} 
                            listIndexWin={listIndexWin}
                            historyState={historyState}
                            stepNumber={stepNumber}
                            boardRow="board-row-humman"/>
                </Col>
                <Col  sm={2}>
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    style={{
                        position: 'relative',
                        minHeight: '100px',
                    }}
                    >
                     {((isLeft === false && yourMessage !== '') || (isLeft === true && rivalMessage !== '')) &&
                    <Toast className="custom-toast-room"
                        style={{
                        position: 'absolute',
                        top: 0,
                        left: "50px",
                        }}
                    >
                        <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">{arrUser[1].NickName}</strong>
                        </Toast.Header>
                        <Toast.Body>{isLeft === false? yourMessage: rivalMessage}</Toast.Body>
                    </Toast>
                    }
                    </div>
                <Figure>
                    <Figure.Image
                        width={100}
                        height={100}
                        alt="171x180"
                        src={( isStarted === true && ((arrUser[1].Username === res.user.username && isYourTurn === true) ||
                                                   (arrUser[1].Username !== res.user.username && isYourTurn === false)))? timer: profileImg}
                        roundedCircle 
                    />
                     <Figure.Caption className="custom-col-game">
                         
                         <h5>{arrUser[1].NickName}</h5>
                         <h5>{arrUser[1].Rank}</h5>
                         <h5>{isLeft === false ? yourTurn: rivalTurn}</h5>
                         {isLeft === false &&
                            <Container>
                                <Button className="humman" onClick={this.handlePleaseReturn} >Xin quay lại </Button>
                                <Button className="humman" onClick={this.handleGiveUp}>Xin thua </Button>
                                
                                <Accordion >
                                    <Card className="custom-card-room">
                                        <Card.Header >
                                        <Accordion.Toggle className="custom-Accordion-room" as={Button} variant="link" eventKey="0">
                                           Chat
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <Form onSubmit={this.handleSendMessage}>
                                                    <Form.Control name="message" value={message}  type="text" onChange={this.handleChangeMessage} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
                                                    <br/>
                                                    <Button className="custom-button-send" variant="warning" type="submit">Gửi</Button>
                                            </Form>
                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    </Accordion>
                            </Container>
                        }
                     </Figure.Caption>
                    </Figure>

                {/* Xác nhận quay lại bước trước  */}
                <Modal show={rivalPleaseReturn} onHide={this.handleNotAllow} className="custom-modal-room"  aria-labelledby="contained-modal-title-vcenter" centered>
               
                    <Modal.Body>
                        <h4>Cho đối thủ xin quay lại bước trước?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.handleAllow}>
                        Đồng ý
                        </Button>
                        <Button variant="outline-info" onClick={this.handleNotAllow}>
                        Hủy
                        </Button>
                    </Modal.Footer>
                </Modal>
                    
                     {/* Xác nhận xin thua */}
                <Modal show={giveUp} onHide={this.handleNotAgree} className="custom-modal-room"  aria-labelledby="contained-modal-title-vcenter" centered>
               
                    <Modal.Body>
                        <h4>Xác nhận xin thua?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.handleAgree}>
                        Đồng ý
                        </Button>
                        <Button variant="outline-info" onClick={this.handleNotAgree}>
                        Hủy
                        </Button>
                    </Modal.Footer>
                 </Modal>   

                  {/* Thông báo chiến thắng */}
                <Modal show={(winnerState !== '')} className="custom-modal-room"  aria-labelledby="contained-modal-title-vcenter" centered>
               
                    <Modal.Body>
                        <h4>{winnerState} chiến thắng!!!</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.handlePlayAgain}>
                            Chơi lại
                        </Button>
                        <Button variant="outline-info" onClick={this.handleCloseAlert}>
                            Thoát
                        </Button>
                    </Modal.Footer>
                </Modal>   

                    {/* Thông báo có người thoát */}
                    <Modal show={alertUserQuit} onHide={this.handleCloseAlert} className="custom-modal-room"  aria-labelledby="contained-modal-title-vcenter" centered>
               
                        <Modal.Body>
                            <h4>Đối thủ đã thoát!!!</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            
                            <Button variant="outline-info" onClick={this.handleCloseAlert}>
                                Thoát
                            </Button>
                        </Modal.Footer>
                    </Modal>   


                {/* Thông báo đang chờ đổi thủ chơi lại */}
                <Modal show={waitingRival} className="custom-modal-room"  aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Body>
                        <Row>
                        <Col xs={8}>
                            <h4>Đang chờ đối thủ chơi lại</h4>
                        </Col>
                        <Col>
                        <div className="custom-PacmanLoader-room">
                            <PacmanLoader
                                loading={waitingRival}
                                color="#00FFCB"
                                margin="5em 0 0 0"
                            />
                        </div>
                        
                        </Col>
                        </Row>
                        
                    
                    </Modal.Body>
                    <Modal.Footer>
                    
                        <Button variant="outline-info" onClick={this.handleCloseAlert}>
                        Thoát
                        </Button>
                    </Modal.Footer>
                </Modal>

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
    const { listIndexWin, historyState, stepNumber, xIsNext,
         typePlay, socket, yourTurn,
          isYourTurn, countTurn, winner, 
          isStarted } = state.game;
    const { res} = state.authentication;
    return { listIndexWin, historyState, stepNumber, xIsNext, 
            typePlay, socket, res, yourTurn, isYourTurn, countTurn, winner, isStarted };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ makeMoveProp: makeMove, 
        playWithAIProp: playWithAI, 
        setYourTurnProp: setYourTurn, 
        rivalMoveProp: rivalMove, 
        setIsYourTurnProp: setIsYourTurn,
        backStepProp: backStep,
        setWinnerProp: setWinner,
        playAgainProp: playAgain}, dispatch);
  }
  
  const GameContainerWithAI = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Game);
  export default GameContainerWithAI;
