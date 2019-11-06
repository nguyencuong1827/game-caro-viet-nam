/* eslint-disable react/no-deprecated */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Nav, Modal, Row, Col} from "react-bootstrap";
import { PacmanLoader } from "react-spinners";
import React from "react";
import config from "../config/apiConfig";
import '../stylesheets/room.css';
import { playWithAI, playWithHumman,  setIsYourTurn} from "../actions/game-action";
import  history  from '../helpers/history';

const io = require('socket.io-client');

class TypePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      isFinding: false
     };
     this.closeModal = this.closeModal.bind(this);
     this.openModal = this.openModal.bind(this);
  }

  

  // componentDidMount(){
  //   const { socket } = this.state;
  //   console.log(socket);
  //   if(!socket){
  //     return;
  //   }
  //   socket.on('server-send-ready-play', function(data){
  //     console.log(data.Username);
  //     console.log(data.Point);
  //   });
  // }




  closeModal() {
    this.setState({ isFinding: false });
    const { socket } = this.state;
    socket.disconnect();
  }
  
  openModal() {
    this.setState({ isFinding: true });
    
    const socket = io(config.apiUrlHeroku);
    this.setState({ socket });


    const {  playWithHummanProp} = this.props;
    playWithHummanProp(socket);

    const {res} = this.props;
    socket.emit('user-send-username-point', {Username: res.user.username, NickName: res.user.nickName, Point: res.user.point, Rank: res.user.rank});
    socket.on('server-send-ready-play', function(){
      history.push('/game/humman');
    });
    
  }


  render() {
    const { isFinding } = this.state;
      return(
        <Nav >
            <Nav.Link href="/game/ai">
                <Button  variant="outline-info">Đánh với máy</Button>
            </Nav.Link>
          <Nav.Link>

          <Button  onClick={() => {this.openModal()}} variant="outline-info">Đánh hạng</Button>
          </Nav.Link>
           
           
               <Modal show={isFinding} onHide={this.closeModal} className="custom-modal-room"  aria-labelledby="contained-modal-title-vcenter" centered>
               
               <Modal.Body>
                 <Row>
                   <Col xs={8}>
                      <h4>Đang tìm kiếm đối thủ</h4>
                   </Col>
                   <Col>
                   <div className="custom-PacmanLoader-room">
                     <PacmanLoader
                        loading={isFinding}
                        color="#00FFCB"
                        margin="5em 0 0 0"
                      />
                   </div>
                   
                   </Col>
                 </Row>
                 
              
               </Modal.Body>
               <Modal.Footer>
               
                 <Button variant="outline-info" onClick={this.closeModal}>
                   Thoát
                 </Button>
               </Modal.Footer>
             </Modal>
           
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
