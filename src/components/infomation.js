/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-state */
import React from "react";
import { Form, FormLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  userActions  from '../actions/user-action';
import "../stylesheets/style.css";

class InfoPage extends React.Component {
  componentDidMount() {
    const { getInfo } = this.props;
    getInfo();
}

 render(){
  const { info } = this.props;
    return (
      <div className="login">
        <div className="container">
          <h2>Thông tin tài khoản</h2>
          {info &&
              <div className="info-form-grids" data-wow-delay=".5s">
              <Form className="container" >
              <div className="row">
                  <FormLabel className="col-md-4">Họ tên: </FormLabel>
                  <Form.Group className="col-md-8">
                      <Form.Control value={info.fullName} type="text"  required="" disabled/>
                  </Form.Group>
              </div>
              <div className="row">
                  <FormLabel className="col-md-4">Nick name: </FormLabel>
                  <Form.Group className="col-md-8">
                      <Form.Control value={info.nickName} type="text" required="" disabled/>
                  </Form.Group>
              </div>
              <div className="row">
                  <FormLabel className="col-md-4">Tài khoản: </FormLabel>
                  <Form.Group className="col-md-8">
                      <Form.Control value={info.username} type="text" required="" disabled/>
                  </Form.Group>
              </div>
              <div className="row">
                  <FormLabel className="col-md-4">Level: </FormLabel>
                  <Form.Group className="col-md-8">
                      <Form.Control value={info.level} type="text"  required="" disabled/>
                  </Form.Group>
              </div>

              </Form>
              <p>Trở lại 
                <Link to="/">trang chủ</Link>
              </p>
            </div>
          }
         
          
        
        </div>
      </div>
    );
  }
  
}

function mapStateToProps(state) {
  const { info } = state.users;
  return { info };
}
const actionCreators = {
  getInfo: userActions.getInfo
}

const Info = connect(mapStateToProps, actionCreators)(InfoPage);
export default Info;
