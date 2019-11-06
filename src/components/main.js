import { Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./home";
import LogIn from "./log-in";
import Register from "./register"; 
import GameWithAI from "../containers/game-with-AI";
import GameWithHumman from "../containers/game-with-humman";
import Private from './private';
import Info from './infomation';
import Room from './room';
import ChangePassword from './change-password';


function Main() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Private.PrivateInfo exact path="/info" component={Info} />
        <Private.PrivateChangePassword exact path="/change-password" component={ChangePassword} />
        <Private.PrivateRoom exact path="/room" component={Room} />
        <Route exact path="/game/ai" component={GameWithAI}/>
        <Route exact path="/game/humman" component={GameWithHumman}/>
        <Private.IsLogin exact path="/login" component={LogIn} />
        <Private.IsLogin exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}
export default Main;
