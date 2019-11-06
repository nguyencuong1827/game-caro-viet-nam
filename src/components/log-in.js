/* eslint-disable react/no-unused-state */
import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  userActions  from '../actions/user-action';
import "../stylesheets/login-register.css";

class LogInPage extends React.Component {
  constructor(props){
    super(props);
    
    const { logout } = this.props;
    logout(); 

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
        login(username, password);
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
                {loggingIn &&
                    <Spinner animation="border" variant="danger" size="sm" />
                }
                Đăng nhập
              </Button>
              
            </Form>
            <p>
              <Link to="/sign-in">Đăng ký!</Link> (hoặc) trở lại
              <Link to="/">Trang chủ</Link>
            </p>
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
  login: userActions.login,
  logout: userActions.logout
};

const LogIn = connect(mapStateToProps, actionCreators)(LogInPage);
export default LogIn;