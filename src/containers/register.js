/* eslint-disable react/no-unused-state */
import React from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import  userActions  from '../actions/user-action';
import "../stylesheets/login-register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      nickName: '',
      username: '',
      password: '',
      confirmPassword: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name]: value});
}

handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { fullName, nickName, username, password, confirmPassword } = this.state;
    const user = {
      fullName,
      nickName,
      username,
      password,
    }

    if (user.fullName && user.nickName && user.username && user.password ) {
        const { register } = this.props;
        register(user, confirmPassword);
    }
}

  render(){
    const { registering  } = this.props;
    const { fullName, nickName, username, password, confirmPassword } = this.state;
    return (
      <div className="login">
        <div className="container">
          <h2>Điền vào các mục sau</h2>
        
  
          <div className="login-form-grids" data-wow-delay=".5s">
            <Form name="form" onSubmit={this.handleSubmit}>
            <h6>Thông tin cá nhân</h6>
              <Form.Group controlId="formBasicName">
                <Form.Control name="fullName" value={fullName} type="text" placeholder="Họ tên" required onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicNickName">
                <Form.Control name="nickName" value={nickName} type="text" placeholder="Nickname" required onChange={this.handleChange}/>
              </Form.Group>
  
              <h6>Thông tin tài khoản</h6>
              <Form.Group controlId="formBasicUsername">
                <Form.Control name="username" value={username} type="text" placeholder="Tài khoản" required onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control name="password" value={password} type="password" placeholder="Mật khẩu" required onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Control name="confirmPassword" value={confirmPassword} type="password" placeholder="Xác nhận mật khẩu" required onChange={this.handleChange}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                Đăng ký
                {registering && 
                  <FontAwesomeIcon className="ml-2 opacity-8" icon={faFan} spin/>
                }
                
              </Button>
             
            </Form>
            <p>Trở lại 
              <Link to="/">trang chủ</Link>
            </p>
            <ToastContainer />
          </div>
        
        </div>
      </div>
    );
  }
  
}
function mapStateToProps(state) {
  const { registering } = state.registration;
  return { registering};
}

const actionCreators = {
  register: userActions.register
}

const RegisterContainer = connect(mapStateToProps, actionCreators)(Register);
export default RegisterContainer;
