/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-deprecated */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Col, Row, Container, Navbar, Nav, Table } from "react-bootstrap";
import { Media } from "reactstrap";
import { connect } from 'react-redux';
import TypePlayContainer from "./type-play";
import "../stylesheets/room.css";
import profileImg from "../images/profile.png"

class Room extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
        arrRanking: []
    }
  }

   componentWillMount(){
    global.socket.on('server-send-array-ranking', function(data){
      this.setState({arrRanking: data});
    }.bind(this));

  }

  componentDidMount(){
    // global.socket.on('server-send-array-ranking', function(data){
    //   this.setState({arrRanking: data});
    // }.bind(this));
    this.setState({arrRanking: JSON.parse(localStorage.getItem('arrayRanking'))});
  }
  
  render(){
    const { res } = this.props;
    const { arrRanking } = this.state;
    let list;
    if(arrRanking){
      console.log(arrRanking);
      list = arrRanking.map((user, i) => 
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <span>
                    <Row>
                      <Col xs={10}>
                        {user.nickName}
                      </Col>
                      <Col xs={2}>
                        <Media object width={30}
                        height={30}
                        src={user.urlAvatar !== ''? user.urlAvatar: profileImg} className="rounded-circle"/>
                      </Col>
                    </Row>
                    
                  </span>
                </td>
                <td>{user.rank}</td>
                <td>{user.point}</td>
              </tr>
      );
    }
    return (
      <Container className="custom-container-room">
        <Row>
          <Col/>
          <Col xs={12}>
            <Navbar className="custom-nav-room" collapseOnSelect  expand="lg" bg="dark" variant="dark">
              <Navbar.Brand className="mr-auto text-wrap">Hạng của bạn: {res.user.rank} - {res.user.point} điểm</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"/>
  
                <TypePlayContainer />
                
              </Navbar.Collapse>
            </Navbar>
          </Col>
          <Col/>
          
        </Row>
        <br/>
        <h2 className="custom-h2-room">Bảng xếp hạng</h2>
        
        <Row>
          <Col/>
          
          <Col xs={12}>
            <Table className="custom-table-room" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>STT</th>
                <th>Cờ thủ</th>
                <th>Hạng</th>
                <th>Điểm</th>
              </tr>
            </thead>
            <tbody>
              {list}
            </tbody>
          </Table>  
          </Col>
          <Col />
        </Row>  
  
      </Container>
    );
  }
  
}
function mapStateToProps(state) {
  const { res } = state.authentication;
  return { res };
}

const RoomContainer = connect(mapStateToProps)(Room);
export default RoomContainer;