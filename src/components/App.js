/* eslint-disable no-unused-vars */
import {  Router } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, Jumbotron } from "react-bootstrap"
import React from "react";
import Navigation from "./navigation";
import Main from "./main";
import history from "../helpers/history";
import alertActions from "../actions/alert-action";
import "../stylesheets/style.css";

class AppPage extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      const { clearAlerts } = this.props;
      clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;

    return (
     
        <div className="container">
            {alert.message &&
              <Jumbotron>
                 <Alert variant={alert.type} >{alert.message}</Alert>
              </Jumbotron>
            }
            
            
            <Router history={history}>
              <Navigation />
              <Main />
            </Router>
          </div>
      
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const App = connect(
  mapStateToProps,
  actionCreators
)(AppPage);
export default App;
