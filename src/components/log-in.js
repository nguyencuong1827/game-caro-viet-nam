/* eslint-disable react/no-unused-state */
import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  userActions  from '../actions/user-action';
import "../stylesheets/style.css";

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
                Đăng nhập
              </Button>
              {loggingIn &&
                  <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
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