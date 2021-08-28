/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable react/no-deprecated */
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Button, Nav } from "react-bootstrap"
import React from "react"
import {Link} from "react-router-dom"
import '../stylesheets/room.css'
import { playWithAI, playWithHumman,  setIsYourTurn } from "../actions/game-action"
import history from '../helpers/history'
import ModalWait from "./modalWait"


class TypePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFinding: false
     };
     this.openModal = this.openModal.bind(this);
     this.handleClose = this.handleClose.bind(this);
  }




  openModal() {
    this.setState({ isFinding: true });

    const {  playWithHummanProp} = this.props;
    playWithHummanProp();

    const {res} = this.props;
    global.socket.emit('user-send-info', { Username: res.user.username, NickName: res.user.nickName,
                                  Point: res.user.point, Rank: res.user.rank, urlAvatar: res.user.urlAvatar});
    global.socket.on('server-send-ready-play', function(){
      history.push('/game-humman');
    });
  }

  handleClose(){
    global.socket.emit('user-send-cancel_find_match');
  }

  render() {
    const { isFinding } = this.state;
      return(
        <Nav >
          <Nav.Link>
            <Link to="/game-ai">
                <Button  variant="outline-info">Đánh với máy</Button>
            </Link>
          </Nav.Link>

          <Nav.Link>
            <Button onClick={this.openModal} variant="outline-info">Đánh hạng</Button>
            <ModalWait isShow={isFinding} contentBody="Đang tìm đối thủ" contentButton="Thoát" handleClick={this.handleClose}/>
          </Nav.Link>
        </Nav>
      );
  }
}

function mapStateToProps(state) {
  const { yourTurn, xIsNext } = state.game;
  const { res} = state.authentication;
  return { res, yourTurn, xIsNext };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { playWithAIProp: playWithAI, playWithHummanProp: playWithHumman, setIsYourTurnProp: setIsYourTurn },
    dispatch
  );
}

const TypePlayContainer = connect(mapStateToProps,  mapDispatchToProps)(TypePlay);
export default TypePlayContainer;
