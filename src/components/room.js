/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Col, Row, Container, Navbar, Nav, Table } from "react-bootstrap";
import { connect } from 'react-redux';
import TypePlayContainer from "../containers/type-play";
import "../stylesheets/room.css";

class RoomPage extends React.Component {
  
  render(){
    const { res } = this.props;
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
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

const Room = connect(mapStateToProps)(RoomPage);
export default Room;