import React from "react";
import { ListGroup } from "react-bootstrap";
import Board from "./board";
import "../stylesheets/game.css";
import PlayAgainContainer from "../containers/play-again";
import HistoryContainer from "../containers/history";
import NextPlayerContainer from "../containers/next-player";
import BackNextStepContainer from "../containers/back-next-step";

function Game() {
  return (
    <div>
      <div className="container height-container">
        <header className="Game-header">
          <h1 className="text-header">Game Caro</h1>
        </header>
        <div className="row">
          <div className="col-sm-8">
            <Board />
          </div>
          <div className="col-sm-4">
            <div className="row">
              <div className="col-sm-7">
                <h4>
                  <NextPlayerContainer />
                </h4>
              </div>
              <div className="col-sm-5">
                <div>
                  <PlayAgainContainer />
                </div>
              </div>
            </div>

            <BackNextStepContainer />

            <div className="scrollbar scrollbar-success">
              <div className="force-overflow">
                <ListGroup>
                  <HistoryContainer />
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
        <div className="Game-footer">
        <h4>Copyright@ Cuong Joker</h4>
        <h4>Ho Chi Minh University of Science</h4>
      </div>
      </div>
    </div>
    
  );
}
export default Game;
