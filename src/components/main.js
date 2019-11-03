import { Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./home";
import LogIn from "./log-in";
import Register from "./register"; 
import Game from "../containers/game"
import Private from './private';
import Info from './infomation';
import Room from './room';

function Main() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Private.PrivateInfo exact path="/info" component={Info} />
        <Private.PrivateRoom exact path="/room" component={Room} />
        <Private.PrivateGame exact path="/game" component={Game}/>
        <Private.IsLogin exact path="/login" component={LogIn} />
        <Private.IsLogin exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}
export default Main;
