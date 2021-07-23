/* eslint-disable no-undef */
/* eslint-disable one-var */
/* eslint-disable react/sort-comp */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Prompt } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Toast, Form, Accordion, Card, Modal, Button ,Container, Row, Col, Figure} from "react-bootstrap";
import { Media } from "reactstrap";
import Board from "../components/board";
import "../stylesheets/game.css";
import { makeMove, playWithAI, setYourTurn, rivalMove, setIsYourTurn, backStep, setWinner, playAgain, resetWinner} from "../actions/game-action";
import userActions from "../actions/user-action";
import getBestMove from "../algorithm/AI-player";
import profileImg from '../images/profile.png';
import timer from '../images/timer.gif';
import history from "../helpers/history";
import ModalNotify from "./modalAccept";
import ModalWait from "./modalWait";

let timeOutMakeMove, timeOutYourMessage, timeOutRivalMessage;
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
            userPlayAgain: [],
            confirmQuit: true
        }
        this.handlePleaseReturn = this.handlePleaseReturn.bind(this);
        this.handleNotAllow = this.handleNotAllow.bind(this);
        this.handleAllow = this.handleAllow.bind(this);
        this.handleGiveUp = this.handleGiveUp.bind(this);
        this.handleNotAgree = this.handleNotAgree.bind(this);
        this.handleAgree = this.handleAgree.bind(this);
        this.handleQuit = this.handleQuit.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handlePlayAgain = this.handlePlayAgain.bind(this);

      }



    componentWillMount(){
        this.setState({confirmQuit: true});
        const { res, setYourTurnProp, rivalMoveProp, setIsYourTurnProp, backStepProp, setWinnerProp, playAgainProp } = this.props;
        if(global.socket){
            global.socket.on('server-send-info-user', function(data){
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
            global.socket.on('server-send-position-move', function(data){
                rivalMoveProp(data);
            });

            global.socket.on('server-send-please-return', function(data){
                if(res.user.username !== data){
                    this.setState({rivalPleaseReturn: true});
                }
            }.bind(this));

            global.socket.on('server-send-allow', function(){
                backStepProp();
            });
            global.socket.on('server-send-not-allow', function(data){
                if(res.user.username !== data){
                    this.notifyNotAllowReturn();
                }
            }.bind(this));

            global.socket.on('server-send-give-up', function(data){
                // console.log(data);
                setWinnerProp(data.YourTurn === 'X'? 'O': 'X');
            });

            global.socket.on('server-send-message', function(data){
               if(res.user.username === data.Username){
                    this.setState({yourMessage: data.Message});
                    clearTimeout(timeOutYourMessage);
                    timeOutYourMessage = setTimeout(function(){
                        this.handleClearMessage('yourMessage');
                    }.bind(this), 5000);
                }
               else{
                    this.setState({rivalMessage: data.Message});
                    clearTimeout(timeOutRivalMessage);
                    timeOutRivalMessage = setTimeout(function(){
                        this.handleClearMessage('rivalMessage');
                    }.bind(this), 5000);
                }
            }.bind(this));

            global.socket.on('server-send-have-user-quit', function(data){
                setWinnerProp(data === 'X'? 'O': 'X');
                this.setState({waitingRival: false, alertUserQuit: true, confirmQuit: false});
            }.bind(this));

            global.socket.on('server-send-play-again', function(data){
                const { userPlayAgain, arrUser } = this.state;
                userPlayAgain.push(data);
                this.setState({ userPlayAgain });
                if(userPlayAgain.length % 2 === 0){
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

            global.socket.on('server-send-array-ranking', function(data){
                localStorage.setItem('arrayRanking', JSON.stringify(data));
            });
        }




        // this.interval = setInterval(function(){
        //     this.setState({yourMessage: '', rivalMessage: ''});

        // }.bind(this), 10000);

        // window.removeEventListener('beforeunload', this.beforeunload.bind(this));
        // history.listen((location, action) => {
        //     console.log(action, location);
        //     if(action){
        //         this.setState({ winnerState: '', waitingRival: false, confirmQuit: false});
        //         const {yourTurn, updatePointAndRankProp, res} = this.props;
        //         const {arrUser} = this.state;
        //         console.log('Cập nhật');
        //         // updatePointAndRankProp('lose', res.user.numberNegativePoint, res.user.point, res.user.rank, arrUser[0].YourTurn !== yourTurn? arrUser[0].Rank: arrUser[1].Rank);
        //         const { playAgainProp} = this.props;
        //         playAgainProp();
        //         if(location.pathname !== '/game-humman'){
        //             console.log('Thông báo');
        //             global.socket.emit('user-send-quit-room');
        //         }

        //     }
        // });
    }


    componentDidMount(){
        window.addEventListener('beforeunload', this.beforeunload.bind(this));


    }


    componentWillReceiveProps(Props){
        const { isStarted, isYourTurn} = Props;
        const { winner } = Props;
        const {arrUser} = this.state
        const {yourTurn} = Props;
        const {updatePointAndRankProp, resetWinnerProp} = this.props;
        if(winner !== ''){
            // console.log(winner, ' chiến thắng');
            // Thông báo người chiến thắng
            this.setState({winnerState: arrUser[0].YourTurn === winner? arrUser[0].NickName: arrUser[1].NickName, confirmQuit: false});
            const { res } = this.props;

            // Cập nhật điểm và hạng
            updatePointAndRankProp(yourTurn === winner? 'win': 'lose', res.user.numberNegativePoint, res.user.point, res.user.rank, arrUser[0].YourTurn !== yourTurn? arrUser[0].Rank: arrUser[1].Rank);
            resetWinnerProp();
        }
        if(isStarted === true && isYourTurn === true){
            // console.log("Đúng");
            timeOutMakeMove = setTimeout(function(){
            const { historyState, stepNumber, makeMoveProp} = Props;
            const current = historyState[stepNumber];
            const i = getBestMove(current.squares);
            makeMoveProp(i, timeOutMakeMove);
            }, 16000);
        }
      }

    beforeunload(e) {
        e.returnValue = "Bạn có muốn reload?";
        return "Bạn có muốn reload?"
    }

    notifyNotAllowReturn = () => {
        this.toastId = toast("Đối thủ không cho bạn quay lại!!!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 3000,
        position: 'top-center',
        type: 'warning',
        newestOnTop: true
    })};

    handleClearMessage(type){
        if(type === 'yourMessage'){
            this.setState({yourMessage: ''});
        }
        else{
            this.setState({rivalMessage: ''});
        }
    }

    handlePleaseReturn(){
        global.socket.emit('user-send-please-return');
    }

    handleNotAllow() {
        this.setState({ rivalPleaseReturn: false });
        global.socket.emit('user-send-not-allow');
    }

    handleAllow() {
        this.setState({ rivalPleaseReturn: false });
        global.socket.emit('user-send-allow');
        clearTimeout(timeOutMakeMove);
    }



    handleGiveUp(){
        this.setState({ giveUp: true });
    }

    handleAgree(){
        this.setState({ giveUp: false });
        global.socket.emit('user-send-give-up')
    }

    handleNotAgree(){
        this.setState({ giveUp: false });
    }

    handleQuit(){
        const {playAgainProp} = this.props;
        this.setState({ winnerState: '', waitingRival: false });
        playAgainProp();
        clearTimeout(timeOutMakeMove);
        history.replace('/room');
    }

    handleChangeMessage(e) {
        const {name, value} = e.target;
        this.setState({ [name]: value});
    }

    handleSendMessage(e){
        e.preventDefault();
        const { message } = this.state;
        if(message !== ''){
          global.socket.emit('user-send-message', message);
          this.setState({message: ''});
        }
      }


    handlePlayAgain(){
        const { res } = this.props;
        this.setState({winnerState: '', waitingRival: true, confirmQuit: false});

        global.socket.emit('user-send-play-again', res.user.username);
        clearTimeout(timeOutMakeMove);
    }



    render(){
        const { makeMoveProp, listIndexWin, historyState, stepNumber, yourTurn, res, isYourTurn, isStarted } = this.props;
        const { arrUser, rivalTurn, isLeft, rivalPleaseReturn, giveUp, message, yourMessage,
             rivalMessage, winnerState, waitingRival, alertUserQuit, confirmQuit} = this.state;

        return (

            <Container className="custom-container-game">
                <Prompt when={false} message="Bạn có muốn thoát?"/>
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
                    <Media
                        width={100}
                        height={100}
                        src={( isStarted === true && ((arrUser[0].Username === res.user.username && isYourTurn === true) ||
                                                   (arrUser[0].Username !== res.user.username && isYourTurn === false)))? timer: arrUser[0].urlAvatar? arrUser[0].urlAvatar: profileImg}
                        className="rounded-circle avatar-user"
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
                                            <Form autoComplete="off" onSubmit={this.handleSendMessage}>
                                                <Form.Control name="message" value={message}  type="text" onChange={this.handleChangeMessage} onFocus={this.handleFocus} onBlur={this.handleBlur} autoComplete="off"/>
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
                    <Board  makeMove={(i) => makeMoveProp(i, timeOutMakeMove)}
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
                    }} >
                     {((isLeft === false && yourMessage !== '') || (isLeft === true && rivalMessage !== '')) &&
                        <Toast className="custom-toast-room"
                        style={{
                        position: 'absolute',
                        top: 0,
                        left: "50px",
                        }}>
                            <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">{arrUser[1].NickName}</strong>
                            </Toast.Header>
                            <Toast.Body>{isLeft === false? yourMessage: rivalMessage}</Toast.Body>
                        </Toast>
                        }
                    </div>
                    <Figure>
                        <Media
                            width={100}
                            height={100}
                            src={( isStarted === true && ((arrUser[1].Username === res.user.username && isYourTurn === true) ||
                                                    (arrUser[1].Username !== res.user.username && isYourTurn === false)))? timer: arrUser[1].urlAvatar? arrUser[1].urlAvatar: profileImg}
                            className="rounded-circle avatar-user"/>
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
                        <ModalNotify isShow={rivalPleaseReturn} type="accept" contentBody="Cho đối thủ xin quay lại bước trước?" contentButton_1="Đồng ý"
                                handleClick_1={this.handleAllow} contentButton_2="Hủy" handleClick_2={this.handleNotAllow}/>

                        {/* Xác nhận xin thua */}
                        <ModalNotify isShow={giveUp} type="accept" contentBody="Xác nhận xin thua?" contentButton_1="Đồng ý"
                                handleClick_1={this.handleAgree} contentButton_2="Hủy" handleClick_2={this.handleNotAgree}/>



                        {/* Thông báo chiến thắng */}
                        <ModalNotify isShow={winnerState !== ''} type="accept" contentBody={`${winnerState} chiến thắng!!!`} contentButton_1="Chơi lại"
                                    handleClick_1={this.handlePlayAgain} contentButton_2="Thoát" handleClick_2={this.handleQuit}/>


                        {/* Thông báo có người thoát */}
                        <ModalNotify isShow={alertUserQuit && winnerState === ''} type="normal" contentBody="Đối thủ đã thoát, bạn là người chiến thắng!!!" contentButton_2="Thoát" handleClick_2={this.handleQuit}/>


                        {/* Thông báo đang chờ đổi thủ chơi lại */}
                        <ModalWait isShow={waitingRival} contentBody="Đang chờ đối thủ chơi lại" contentButton="Thoát" handleClick={this.handleQuit}/>


                    </Col>
                </Row>
                <div className="Game-footer">
                <h4>Copyright@ Cuong Joker</h4>
                <h4>Ho Chi Minh University of Science</h4>
            </div>
            <ToastContainer />
            </Container>



        );
    }
}
function mapStateToProps(state) {
    const { listIndexWin, historyState, stepNumber, xIsNext,
         typePlay, yourTurn,
          isYourTurn, countTurn, winner,
          isStarted } = state.game;
    const { res} = state.authentication;
    return { listIndexWin, historyState, stepNumber, xIsNext,
            typePlay, res, yourTurn, isYourTurn, countTurn, winner, isStarted };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ makeMoveProp: makeMove,
        playWithAIProp: playWithAI,
        setYourTurnProp: setYourTurn,
        rivalMoveProp: rivalMove,
        setIsYourTurnProp: setIsYourTurn,
        backStepProp: backStep,
        setWinnerProp: setWinner,
        playAgainProp: playAgain,
        updatePointAndRankProp: userActions.updatePointAndRank,
        resetWinnerProp: resetWinner}, dispatch);
  }

  const GameContainerWithAI = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Game);
  export default GameContainerWithAI;
