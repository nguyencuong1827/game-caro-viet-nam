/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable react/no-deprecated */
import React from "react";
import { Button, Form, Col, ListGroup, Row} from "react-bootstrap";
import typingGIF from "../images/typing.gif";
import "../stylesheets/room.css";

const io = require('socket.io-client');

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      listUserActive: [],
      username: '', 
      isSuccess: false,
      message: '',
      listAllMessage: [],
      userTyping: ''
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSendUsername = this.handleSendUsername.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

	componentWillMount() {
    const socket = io('http://localhost:7727');
    this.setState({ socket });
  }

  componentDidMount(){
    const { socket, listAllMessage } = this.state;
    let { isSuccess, listUserActive, userTyping } = this.state;
    socket.on('server-send-fail-register', function(){
      alert('Tên đã có người đăng ký');
    }); 
    socket.on('server-send-success-register', function(){
      isSuccess = true;
      alert('Đăng ký thành công');  
      this.setState({ isSuccess });
    }.bind(this));
    
    socket.on('server-send-list-user-active', function(data){
        listUserActive = data;
        this.setState({ listUserActive });
    }.bind(this));

    socket.on('server-send-message', function(data){
      listAllMessage.push(data);
      this.setState({ listAllMessage });
    }.bind(this));
    socket.on('have-an-user-is-typing', function(data){
      userTyping = data;
      this.setState({ userTyping });
    }.bind(this));
    socket.on('have-an-user-stop-typing', function(){
      userTyping = '';
      this.setState({ userTyping });
    }.bind(this));
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({ [name]: value});
  }



  handleSendUsername(e){
    e.preventDefault();
    const { socket, username } = this.state;
    if(username !== null)
      socket.emit('client-send-username', username);
  }
  
  handleLogout(e){
    e.preventDefault();
    const { socket } = this.state;
    let { username, isSuccess} = this.state;
    socket.emit('logout');
    username = '';
    isSuccess = false;
    this.setState({ username, isSuccess });
  }

  handleSendMessage(e){
    e.preventDefault();
    const { message, socket } = this.state;
    if(message !== ''){
      socket.emit('user-send-message', message);
      this.setState({message: ''});
    }
  }

  handleFocus(e){
    e.preventDefault();
    const { socket } = this.state;
    socket.emit('user-is-typing');
  }

  handleBlur(e){
    e.preventDefault();
    const { socket } = this.state;
    socket.emit('user-stop-typing');
  }
  
  render(){
    const { listUserActive, username, isSuccess, message, listAllMessage, userTyping} = this.state;
    const listUser = listUserActive.map((data, i) => {
      return(
        <ListGroup.Item as="li" className="item-user" key={i.toString()}>
        {data}
       </ListGroup.Item>
      );
     
    });

    const listMessage = listAllMessage.map((data, i) => {
      let styleItem;
      if(data.username === username){
        styleItem = 'item-message-right';
      }
      else{
        styleItem = 'item-message-left';
      }
      return(
        <ListGroup.Item as="li" className={styleItem} key={i.toString()}>
          {data.username}: {data.content}
        </ListGroup.Item>
      );
     
    });

    return (
      <div id="wrapper">
        {isSuccess === false &&
          <div id="login-form">
              <h3>Đăng ký tên</h3>
              <Form onSubmit={this.handleSendUsername}>
                <Row>
                  <Col>
                    <Form.Control name="username"  value={username} type="text" required onChange={this.handleChange}/>
                  </Col>
                  <Col>
                  <Button variant="primary" type="submit">Đăng ký</Button>
                  </Col>
                </Row>
              </Form>
          </div>
        }

        {isSuccess !== false &&
          <div id="chat-form">
            <div id="left">
              <div id="box-title">Đang hoạt động</div>
              <div id="box-content">
                <ListGroup className="list-group-user">{listUser}</ListGroup>
              </div>
            </div>
            <div id="right">
              <div id="say-hi">
                Hello <span >{username}</span>
                <Button onClick={this.handleLogout}>Đăng xuất</Button>
              </div>
                <div id="list-messages">
                  <ListGroup className="list-group-message">{listMessage}</ListGroup>
                 
                </div>
                
                <Form onSubmit={this.handleSendMessage}>
                  <Row>
                    {userTyping !== '' &&
                    <div className="user-typing">
                      <span >{userTyping} đang soạn tin <img width='20px' alt="" src={typingGIF}/> </span>
                    </div>
                    }
                  </Row>
                  
                  <Row>
                    <Col>
                      <Form.Control name="message" value={message} type="text" onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
                    </Col>
                    <Col>
                    <Button variant="warning" type="submit">Gửi</Button>
                    </Col>
                  </Row>
              </Form>
            </div>
          </div>
        }
      </div>
    );
  }
  
}
export default Home;
