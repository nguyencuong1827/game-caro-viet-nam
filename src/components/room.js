/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable react/no-deprecated */
import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Col, ListGroup, Row, Container, Navbar, Nav, Table } from "react-bootstrap";

import "../stylesheets/room.css";

const io = require('socket.io-client');

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

	componentWillMount() {
  
  }

  componentDidMount(){
   
  }

  render(){
    

    return (
      <Container className="custom-container-room">
        <Row>
          <Col/>
          <Col xs={12}>
            <Navbar className="custom-nav-room" collapseOnSelect  expand="lg" bg="dark" variant="dark">
              <Navbar.Brand className="mr-auto text-wrap">Hạng của bạn: Đồng - 123 điểm</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"/>
                <Nav >
                  <Nav.Link>
                    <Button  variant="outline-info">Đánh với máy</Button>
                  </Nav.Link>
                  <Nav.Link>
                    <Button variant="outline-info">Đánh hạng</Button>
                  </Nav.Link>
                </Nav>
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
export default Room;
