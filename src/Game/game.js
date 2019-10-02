import React from 'react';
import Board from './board';
import BtnPlayAgain from './btnPlayAgain';
import logo from '../logo.png'
import calculateWinner from './calculateWinner'
import './game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyState: [{
        squares: Array(400).fill(null),
      }],
      xIsNext: true,
      winner: null,
      PlayAgain: null,
      stepNumber: 0,
      lastStepNumber: 0,
      listIndexWin: null,
    };
  }

  btnPlayAgainClick() {
    this.setState({
      historyState: [{
        squares: Array(400).fill(null),
      }],
      xIsNext: true,
      winner: null,
      PlayAgain: null,
      stepNumber: 0,
      listIndexWin: null,
      listIndexWinBackup: null
    });
  }


  handleClick(i) {
    const { historyState } = this.state;
    const { winner } = this.state;
    const { stepNumber } = this.state;
    const { xIsNext } = this.state;
    const history = historyState.slice(0, stepNumber + 1);
    const current = historyState[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || winner) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    const listIndexWin = calculateWinner(squares, i);
    if (listIndexWin) {
      listIndexWin.push(i);

      this.setState({
        historyState: history.concat([{
          squares
        }]),
        winner: squares[i],
        PlayAgain: this.renderBtnPlayAgain(),
        stepNumber: history.length,
        lastStepNumber: history.length,
        listIndexWin,
        listIndexWinBackup: listIndexWin
      });
      return;
    }

    this.setState({
      historyState: history.concat([{
        squares
      }]),
      xIsNext: !xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    const { lastStepNumber } = this.state;
    const { listIndexWinBackup } = this.state;
    if (lastStepNumber === step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        listIndexWin: listIndexWinBackup
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
    const { stepNumber } = this.state;
    const { xIsNext } = this.state;
    if (stepNumber > 0) {
      this.setState({
        stepNumber: stepNumber - 1,
        xIsNext: !xIsNext,
        listIndexWin: null
      });
    }

  }

  nextStep() {
    const { stepNumber } = this.state;
    const { lastStepNumber } = this.state;
    const { listIndexWinBackup } = this.state;
    const { historyState } = this.state;
    const { xIsNext } = this.state;
    if (stepNumber === lastStepNumber) {
      this.setState({
        listIndexWin: listIndexWinBackup
      });
    }
    if (stepNumber < historyState.length - 1) {
      this.setState({
        stepNumber: stepNumber + 1,
        xIsNext: !xIsNext,
        listIndexWin: null
      });
    }
  }
  
  renderBtnPlayAgain() {
    return (
      <BtnPlayAgain
        onClick={() => this.btnPlayAgainClick()}
      />
    );
  }

  render() {
    const { historyState } = this.state;
    const { stepNumber } = this.state;
    const { listIndexWin } = this.state;
    const { PlayAgain } = this.state;
    const current = historyState[stepNumber];
  

    const moves = historyState.map((step, move) => {
      const desc = move ? `Đi đến bước ${move}` : 'Trở về ban đầu';
      const selected = (move === stepNumber ? 'step selected' : 'step');
      return (
        <li key={move.toString()}>
          <button type="button" className={selected} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    const { winner } = this.state;
    const { xIsNext } = this.state;
    if (winner) {
      status = `${winner} thắng!!!`;
    } else {
      status = `Lược kế tiếp: ${(xIsNext ? 'X' : 'O')}`;
    }
    return (
      <div >
        <nav className="navbar navbar-default navbar-custom">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-branch" href="https://www.hcmus.edu.vn">
                <img src={logo} alt="logo"/>
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
            <hr/>

          </header>
          <div className="row">
            <div className="col-sm-8">
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                listIndexWin={listIndexWin}
              />
            </div>
            <div className="col-sm-4">
              <div className="row">
                <div className="col-sm-7">
                  <h3>{status}</h3>
                </div>
                <div className="col-sm-5">
                  <div>{PlayAgain}</div>
                </div>
              </div>

              <button type="button" className="btnPlayAgain" onClick={() => { this.backStep() }}>Trở lại</button>
              <button type="button" className="btnPlayAgain" onClick={() => { this.nextStep() }}>Tiếp tục</button>

              <div className="scrollbar scrollbar-success">
                <div className="force-overflow">
                  <ol>{moves}</ol>
                </div>
              </div>
              
            </div>

          </div>
        </div>
        <div className="Game-header">
          <br/>
          <h4>Copyright@ Cuong Joker</h4>
          <h4>Ho Chi Minh University of Science</h4>
        </div>
      </div>
    );
  }
}
export default Game;