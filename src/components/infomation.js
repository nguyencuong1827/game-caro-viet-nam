/* eslint-disable react/no-deprecated */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-state */
import React from "react";
import { Form, FormLabel, Button, Row, Col, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  userActions  from '../actions/user-action';
import "../stylesheets/login-register.css";

class InfoPage extends React.Component {

  constructor(props){
    super(props);
  

    this.state = {
      fullName: '',
      nickName: ''
    } 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    const { getInfoProp } = this.props;
    getInfoProp();
  }

  componentWillReceiveProps(newProp){
    const { info } = newProp;
    if(info){
      this.setState({ fullName: info.fullName, nickName: info.nickName });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
      e.preventDefault();
      const { info } = this.props;

      const { fullName, nickName } = this.state;
      if (fullName !== info.fullName || nickName !== info.nickName) {
        const { updateInfoProp } = this.props;
        updateInfoProp(fullName, nickName);
      }
  }   



 render(){
  const { info, updating } = this.props;
  const { fullName, nickName } = this.state;
 
    return (
      <div className="login">
        <div className="container">
          <h2>Thông tin tài khoản</h2>
          {info &&
              <div className="info-form-grids" >
              <Form className="container" onSubmit={this.handleSubmit}>
              <Row>
                  <Col xs={4}>
                    <FormLabel>Họ tên: </FormLabel>
                  </Col>
                  <Col>
                    <Form.Group>
                        <Form.Control name="fullName" value={fullName} type="text"  required onChange={this.handleChange}/>
                    </Form.Group>
                  </Col>
                  
              </Row>
              <Row>
                <Col xs={4}>
                  <FormLabel>Nick name: </FormLabel>
                </Col>
                <Col>
                  <Form.Group>
                      <Form.Control name="nickName" value={nickName} type="text" required onChange={this.handleChange}/>
                  </Form.Group>
                </Col>
                  
              </Row>
              <Row>
                  <Col xs={4}>
                    <FormLabel>Tài khoản: </FormLabel>
                  </Col>
                  <Col>
                    <Form.Group>
                        <Form.Control value={info.username} type="text" required="" disabled/>
                    </Form.Group>
                  </Col>
              </Row>
              <Row>
                  <Col xs={4}>
                    <FormLabel>Bậc: </FormLabel>
                  </Col>
                  <Col>
                    <Form.Group>
                        <Form.Control value={info.rank} type="text"  required="" disabled/>
                    </Form.Group>
                  </Col>
                  
              </Row>
              <Row>
                  <Col xs={4}>
                    <FormLabel>Điểm: </FormLabel>
                  </Col>
                  <Col>
                    <Form.Group>
                        <Form.Control value={info.point} type="text"  required="" disabled/>
                    </Form.Group>
                  </Col>
                  
              </Row>
              <Row>
                <Col>
                  {updating &&
                      <Spinner animation="border" variant="danger" size="sm" />
                  }
                  <Button type="submit">Cập nhật</Button>
                </Col>
                <Col>
                  <p>Trở lại 
                    <Link to="/">trang chủ</Link>
                   </p>
                </Col>
              </Row>
              
              </Form>
              
              
            </div>
          }
         
          
        
        </div>
      </div>
    );
  }
  
}

function mapStateToProps(state) {
  const { info, updating } = state.users;
  return { info, updating };
}
const actionCreators = {
  getInfoProp: userActions.getInfo,
  updateInfoProp: userActions.updateInfo
}

const Info = connect(mapStateToProps, actionCreators)(InfoPage);
export default Info;
