/* eslint-disable react/no-unused-state */
import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  userActions  from '../actions/user-action';
import "../stylesheets/login-register.css";

class ChangePasswordPage extends React.Component {
  constructor(props){
    super(props);
    
 

    this.state = {
      oldPassword:'',
      newPassword:'',
      confirmPassword:''
    } 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
      e.preventDefault();
      const { newPassword, oldPassword, confirmPassword } = this.state;
      console.log("old: " + oldPassword);
      console.log("new:" + newPassword);
      
      if(oldPassword && newPassword && confirmPassword){
          const { changePasswordProp } = this.props;
          changePasswordProp(newPassword, oldPassword, confirmPassword);
      }
  }   

 

  render(){
    const { changing } = this.props;
    const { oldPassword, newPassword, confirmPassword } = this.state;
    return (
      <div className="login">
        <div className="container">
          <h2>Đổi mật khẩu</h2>
          <div className="login-form-grids" data-wow-delay=".5s">
            <Form name="form" onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicPassword">
                <Form.Control name="oldPassword" value={oldPassword} type="password" placeholder="Mật khẩu cũ" required onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control name="newPassword" value={newPassword} type="password" placeholder="Mật khẩu mới" required onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control name="confirmPassword" value={confirmPassword} type="password" placeholder="Xác nhận mật khẩu" required onChange={this.handleChange}/>
              </Form.Group>
             
              <Button variant="primary" type="submit" > 
                {changing &&
                    <Spinner animation="border" variant="danger" size="sm" />
                }
                Đổi mật khẩu
              </Button>
              
            </Form>
            <p>Trở lại
              <Link to="/">trang chủ</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { changing } = state.users;
  return { changing };
}

const actionCreators = {
  changePasswordProp: userActions.changePassword,
  logoutProp: userActions.logout
};

const ChangePassword = connect(mapStateToProps, actionCreators)(ChangePasswordPage);
export default ChangePassword;