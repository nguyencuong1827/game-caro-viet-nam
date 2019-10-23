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
    this.handleClick = this.handleClick.bind(this);
    this.handleLink = this.handleLink.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { logout } = this.props;
    logout();
    history.push("/log-in");
  }

  handleLink(e) {
    e.preventDefault();
    history.push("/game");
  }

  render() {
    const { res } = this.props;
    console.log(res);
    return (
      <Navbar
        className="custom-nav"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
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
            <Nav.Link onClick={this.handleLink}>Game caro</Nav.Link>
          </Nav>
          {res && (
            <Nav>
              <DropdownButton className="custom-text" variant="outline-danger" title={res.user.nickName}>
                <Dropdown.Item href="/info" eventKey="1">Thông tin tài khoản</Dropdown.Item>
                <Dropdown.Item onClick={this.handleClick} eventKey="2">Đăng xuất</Dropdown.Item>
              </DropdownButton>

              
            </Nav>
          )}
          {!res && (
            <Nav>
              <Nav.Link>
                <Link to="/log-in">
                  <Button className="custom-text" variant="outline-danger">
                    Đăng nhập
                  </Button>
                </Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/sign-in">
                  <Button className="custom-text" variant="outline-danger">
                    Đăng ký
                  </Button>
                </Link>
              </Nav.Link>
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
