import { Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./home";
import LogIn from "./log-in";
import SignIn from "./sign-in"; 
import Game from "./game"

function Main() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Game} />
        <Route exact path="/log-in" component={LogIn} />
        <Route exact path="/sign-in" component={SignIn} />
      </Switch>
    </div>
  );
}
export default Main;
