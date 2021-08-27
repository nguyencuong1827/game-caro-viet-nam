import { Link } from "react-router-dom"
import { Navbar, Nav, Button } from "react-bootstrap"
import { connect } from "react-redux"
import React from "react"
import userActions from "../actions/user-action"
import "../stylesheets/navigation.css"
import history from "../helpers/history"
import UserBox from "./userBox"
import messages from '../messages'

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this)
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
      <Navbar fixed="top" collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand>
          <Link className="custom-text" to="/">
            Trang chủ
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {res && (
            <Nav className="ml-auto">
              <UserBox />
            </Nav>
          )}
          {!res && (
            <Nav className="ml-auto">
              <Link to="/login">
                  <Button className="custom-button" variant="outline-info">
                    {messages.login}
                  </Button>
                </Link>
              <Link to="/register">
                  <Button className="custom-button custom-button-top" variant="outline-info">
                    {messages.sign_in}
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

const NavigationContainer = connect(
  mapStateToProps,
  actionCreators
)(Navigation);
export default NavigationContainer;
