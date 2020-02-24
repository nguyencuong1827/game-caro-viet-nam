import { Switch, Route, withRouter } from "react-router-dom";
import React from "react";
import Home from "./home";
import LogIn from "../containers/login";
import Register from "../containers/register"; 
import GameWithAI from "../containers/game-with-AI";
import GameWithHumman from "../containers/game-with-humman";
import Private from './private';
import Info from '../containers/infomation';
import Room from '../containers/room';
import ChangePassword from '../containers/change-password';


function Main() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Private.IsLogin exact path="/info" component={Info} />
        <Private.IsLogin exact path="/change-password" component={ChangePassword} />
        <Private.IsLogin exact path="/room" component={Room} />
        <Private.IsLogin exact path="/game-ai" component={GameWithAI}/>
        <Private.PlayWithHumman exact path="/game-humman" component={GameWithHumman}/>
        <Private.IsNotLogin exact path="/login" component={LogIn} />
        <Private.IsNotLogin exact path="/register" component={Register} />
      </Switch>
    </div>
  );
 
}
export default withRouter(Main);
