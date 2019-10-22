import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../stylesheets/style.css";

function SignIn() {
  return (
    <div className="login register">
      <div className="container">
        <h2>Điền vào các mục sau</h2>
      

        <div className="login-form-grids" data-wow-delay=".5s">
          <Form>
          <h6>Thông tin cá nhân</h6>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Họ tên" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="text" placeholder="Nickname" />
            </Form.Group>

            <h6>Thông tin tài khoản</h6>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Tên đăng nhập" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Mật khẩu" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Xác nhận mật khẩu" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Đăng ký
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

export default SignIn;
