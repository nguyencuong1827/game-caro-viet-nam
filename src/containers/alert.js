/* eslint-disable no-unused-vars */
import { connect } from "react-redux";
import { toast, Bounce } from 'react-toastify';
import React from "react";
import history from "../helpers/history";
import alertActions from "../actions/alert-action";

class AlertPage extends React.Component {
    constructor(props) {
      super(props);
      history.listen((location, action) => {
        // clear alert on location change
        const { clearAlerts } = this.props;
      });
      this.notify = this.notify.bind(this);
    }
     
    notify = () => {
        const { alert } = this.props;
        this.toastId = toast(alert.message, {
        transition: Bounce,
        closeButton: true,
        autoClose: 3000,
        position: 'top-center',
        type: alert.type,
        newestOnTop: true,
        containerId: 'MainPage'
    })
  };




    render() {
        const { alert } = this.props;
        return (
         <div>
            {alert.message &&
                this.notify()
            }
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
  
  export default connect(
    mapStateToProps,
    actionCreators
  )(AlertPage);

  