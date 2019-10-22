import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import React from "react";
import '../stylesheets/navigation.css';

function Navigation() {
  return (
    <Navbar className="custom-nav" collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <Navbar.Brand>
        <Link className="custom-text" to="/" >Trang chủ</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="https://www.hcmus.edu.vn" target="_blank">HCMUS</Nav.Link>
          <Nav.Link href="https://www.facebook.com/profile.php?id=100006756127324" target="_blank">Tác giả</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>
            <Link to="/log-in"> <Button className="custom-text" variant="outline-danger">Đăng nhập</Button></Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/sign-in"> <Button className="custom-text" variant="outline-danger">Đăng ký</Button></Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Navigation;
