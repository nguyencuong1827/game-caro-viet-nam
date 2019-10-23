import { Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./home";
import LogIn from "./log-in";
import Register from "./register"; 
import Game from "./game"
import Private from './private';
import Info from './infomation'

function Main() {
  return (
    <div>
      <Switch>
        <Route exact path="/info" component={Info} />
        <Private exact path="/game" component={Game} />
        <Route exact path="/" component={Home} />
        <Route exact path="/log-in" component={LogIn} />
        <Route exact path="/sign-in" component={Register} />
      </Switch>
    </div>
  );
}
export default Main;
