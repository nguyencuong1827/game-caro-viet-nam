import React from "react"
import { Router } from "react-router-dom"
import Alert from "../containers/alert"
import Navigation from "../containers/navigation"
import Main from "./main"
import "../stylesheets/login-register.css"
import history from "../helpers/history"
import SocketController from "../containers/SocketController"


function App(){
  return(
    <div className="container">
        <Alert />
        <Router history={history} >
          <Navigation />
          <Main />
        </Router>
      <SocketController />
      </div>

  )
}
export default App
