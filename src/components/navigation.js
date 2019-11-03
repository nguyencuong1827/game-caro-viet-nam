/* eslint-disable class-methods-use-this */
/* eslint-disable react/prefer-stateless-function */
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import React from "react";
import userActions from "../actions/user-action";
import "../stylesheets/navigation.css";
import history from "../helpers/history";

class NavigationPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    const { logout } = this.props;
    logout();
    history.push("/login");
  }


  render() {
    const { res } = this.props;
    return (
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link className="custom-text" to="/">
            Trang chủ
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="https://www.hcmus.edu.vn" target="_blank">
              HCMUS
            </Nav.Link>
            <Nav.Link
              href="https://www.facebook.com/profile.php?id=100006756127324"
              target="_blank"
            >
              Tác giả
            </Nav.Link>
          </Nav>
          {res && (
            <Nav>
              <DropdownButton alignRight variant="outline-info" title={res.user.nickName}>
                <Dropdown.Item href="/info" eventKey="1">Thông tin tài khoản</Dropdown.Item>
                <Dropdown.Item onClick={this.handleLogout} eventKey="2">Đăng xuất</Dropdown.Item>
              </DropdownButton>

              
            </Nav>
          )}
          {!res && (
            <Nav>
              <Link to="/login">
                  <Button className="custom-button" variant="outline-info">
                    Đăng nhập
                  </Button>
                </Link>
              <Link to="/register">
                  <Button className="custom-button" variant="outline-info">
                    Đăng ký
                  </Button>
                </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
function mapStateToProps(state) {
  const { res } = state.authentication;
  return { res };
}

const actionCreators = {
  logout: userActions.logout
};

const Navigation = connect(
  mapStateToProps,
  actionCreators
)(NavigationPage);
export default Navigation;
