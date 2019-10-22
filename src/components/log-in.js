import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../stylesheets/style.css";

function LogIn() {
  return (
    <div className="login">
      <div className="container">
        <h2>Đăng nhập</h2>
        <div className="login-form-grids" data-wow-delay=".5s">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Tên đăng nhập" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Mật khẩu" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Nhớ mật khẩu" />
            </Form.Group>
            <Button variant="primary" type="submit">
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

export default LogIn;
