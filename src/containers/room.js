import React from "react";
import { Col, Row, Container, Navbar, Nav, Table } from "react-bootstrap"
import { Media } from "reactstrap"
import { connect } from 'react-redux'
import TypePlayContainer from "./type-play"
import "../stylesheets/room.css"
import profileImg from "../images/profile.png"
import messages from "../messages"
import userConstants from "../constants/user-constants"

class Room extends React.PureComponent {
  componentDidMount(){
    console.log('componentDidMount', global.socket)
    // global.socket.on('server-send-array-ranking', function(data) {
    //   console.log({data})
    //   if(data) {
    //     const { loadRanking } = this.props
    //     loadRanking(data)
    //   }
    // }.bind(this))
  }

  renderListRanking = () => {
    const { ranking } = this.props
    return (
      ranking?.map((user, index) =>
        <tr key={ index.toString() }>
          <td>{ index + 1 }</td>
          <td>
             <span>
               <Row>
                 <Col xs={10}>
                   { user.nickName }
                 </Col>
                 <Col xs={2}>
                   <Media object width={30}
                          height={30}
                          src={user.urlAvatar !== ''? user.urlAvatar: profileImg} className="rounded-circle"/></Col>
               </Row>
             </span>
          </td>
          <td>{ user.rank }</td>
          <td>{ user.point }</td>
        </tr>
      )
    )
  }

  render(){
    const { res } = this.props
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
        <h2 className="custom-h2-room">{ messages.ranking }</h2>

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
              {this.renderListRanking()}
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
  const { res } = state.authentication
  const { ranking } = state.users
  return { res, ranking }
}
function mapDispatchToProps(dipatch) {
 return {
   loadRanking: (ranking) => dipatch({type: userConstants.LOAD_RANKING, payload: ranking})
 }
}

const RoomContainer = connect(mapStateToProps, mapDispatchToProps)(Room)
export default RoomContainer
