/* eslint-disable react/no-unused-state */
import React from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons';
import{ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  userActions  from '../actions/user-action';
import "../stylesheets/login-register.css";

class LogIn extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      username: '',
      password: ''
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

      this.setState({ submitted: true });
      const { username, password } = this.state;
      if (username && password) {
        const { login } = this.props;
        const r = login(username, password);
        console.log(r);
      }
  }   

 

  render(){
    const { loggingIn } = this.props;
    const { username, password } = this.state;
    return (
      <div className="login">
        <div className="container">
          <h2>Đăng nhập</h2>
          <div className="login-form-grids" data-wow-delay=".5s">
            <Form name="form" onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control name="username" value={username} type="text" placeholder="Tài khoản" required onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control name="password" value={password} type="password" placeholder="Mật khẩu" required onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Nhớ mật khẩu" />
              </Form.Group>
              <Button variant="primary" type="submit" > 
                Đăng nhập
                {loggingIn &&
                    <FontAwesomeIcon className="ml-2 opacity-8" icon={faFan} spin/>
                }
                
              </Button>
              
            </Form>
            <p>
              <Link to="/register">Đăng ký!</Link> (hoặc) trở lại
              <Link to="/">Trang chủ</Link>
            </p>
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login 
};

const LoginContainer = connect(mapStateToProps, actionCreators)(LogIn);
export default LoginContainer;