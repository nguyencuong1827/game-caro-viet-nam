import React from 'react';
import Board from './board'
import BtnPlayAgain from './btnPlayAgain'
import logo from '../logo.png'
import calculateWinner from './calculateWinner'
import './game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(400).fill(null),
      }],
      xIsNext: true,
      winner: null,
      BtnPlayAgain: null,
      stepNumber: 0,
      lastStepNumber: 0,
      listIndexWin: null,
    };
  }
  btnPlayAgainClick() {
    this.setState({
      history: [{
        squares: Array(400).fill(null),
      }],
      xIsNext: true,
      winner: null,
      BtnPlayAgain: null,
      stepNumber: 0,
      listIndexWin: null,
      listIndexWinBackup: null
    });
  }

  renderBtnPlayAgain() {
    return (
      <BtnPlayAgain
        onClick={() => this.btnPlayAgainClick()}
      />
    );
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || this.state.winner) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    let listIndexWin = calculateWinner(squares, i);
    if (listIndexWin) {
      listIndexWin.push(i);

      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        winner: squares[i],
        BtnPlayAgain: this.renderBtnPlayAgain(),
        stepNumber: history.length,
        lastStepNumber: history.length,
        listIndexWin: listIndexWin,
        listIndexWinBackup: listIndexWin
      });
      return;
    }

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }
  jumpTo(step) {
    if (this.state.lastStepNumber === step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        listIndexWin: this.state.listIndexWinBackup
      });
    }
    else {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        listIndexWin: null
      });
    }
  }
  backStep() {
    if (this.state.stepNumber > 0) {
      this.setState({
        stepNumber: this.state.stepNumber - 1,
        xIsNext: !this.state.xIsNext,
        listIndexWin: null
      });
    }

  }
  nextStep() {
    if (this.state.stepNumber === this.state.lastStepNumber) {
      this.setState({
        listIndexWin: this.state.listIndexWinBackup
      });
    }
    if (this.state.stepNumber < this.state.history.length - 1) {
      this.setState({
        stepNumber: this.state.stepNumber + 1,
        xIsNext: !this.state.xIsNext,
        listIndexWin: null
      });
    }
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const desc = move ?
        'Đi trến bước ' + move :
        'Trở về ban đầu';
      let selected = (move === this.state.stepNumber ? 'step selected' : 'step');
      return (
        <li key={move}>
          <button className={selected} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (this.state.winner) {
      status = this.state.winner + ' thắng !!!';
    } else {
      status = 'Lượt kế tiếp: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div >
        <nav className="navbar navbar-default navbar-custom">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-branch" href="https://www.hcmus.edu.vn">
                <img src={logo}  alt="logo"></img>
              </a>
            </div>

            <div className="nav navbar-nav navbar-right">
              <a href="https://www.facebook.com/profile.php?id=100006756127324" className="glyphicon glyphicon-user" >Nguyễn Mạnh Cường
                <h4>1612077</h4>
              </a>
            </div>
          </div>
        </nav>
        <div className="container">
          <header className="Game-header">
            <h1 className="text-header">Game Caro</h1>
            <hr></hr>

          </header>
          <div className="row">
            <div className="col-sm-8">
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                listIndexWin={this.state.listIndexWin}
              />
            </div>
            <div className="col-sm-4">
              <div className="row">
                <div className="col-sm-7">
                  <h3>{status}</h3>
                </div>
                <div className="col-sm-5">
                  <div>{this.state.BtnPlayAgain}</div>
                </div>
              </div>

              <button className="btnPlayAgain" onClick={() => { this.backStep() }}>Trở lại</button>
              <button className="btnPlayAgain" onClick={() => { this.nextStep() }}>Tiếp tục</button>
              <div class="scrollbar scrollbar-success">
                <div class="force-overflow">
                  <ol>{moves}</ol>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="Game-header">
          <br></br>
          <h4>Copyright@ Cuong Joker</h4>
          <h4>Ho Chi Minh University of Science</h4>
        </div>
      </div>
    );
  }
}
export default Game;