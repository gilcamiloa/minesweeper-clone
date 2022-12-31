import { React, Component } from 'react';
import Scorekeeper from './components/Scorekeeper/Scorekeeper';
import Grid from './components/Grid/Grid';
import Footer from './components/Footer/Footer';
import './app.scss';

class App extends Component
{

  constructor() {
    super();

    this.state = {
      gameStatus: "waiting", // can be running, waiting, or ended
      time: 0, // in seconds, will format later
      flagCount: 10,
      openCells: 0,
      mines: 10,
      rows: 10,
      columns: 10
    };

    this.baseState = this.state;
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.gameStatus === "running") {
      this.checkForWinner();
    }
  }


  checkForWinner = () => {
    if (this.state.mines + this.state.openCells >= this.state.rows * this.state.columns) {
      this.setState({
        gameStatus: "winner"
      }, alert("you won!"))
    }
  }

  componentWillMount() {
    this.intervals = [];
  }

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  };

  reset = () => {
    this.intervals.map(clearInterval);
    this.setState(Object.assign({}, this.baseState), () => {
      this.intervals = [];
    });
  };

  tick = () => {
    if (this.state.openCells > 0 && this.state.gameStatus === "running") {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  };

  endGame = () => {
    this.setState({
      gameStatus: "Game Over." //previously 'ended'
    });
  };

  changeFlagAmount = amount => {
    this.setState({ flagCount: this.state.flagCount + amount });
  };

  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.gameStatus !== "running") {
      this.setState(
        {
          gameStatus: "running"
        },
        this.setInterval(this.tick, 1000)
      );
    }
    this.setState(prevState => {
      return { openCells: prevState.openCells + 1 };
    });
  };
  render() {
    return (
      <div className='app'>
        <div className="browser">
          <div className="browser-left">
            <h1>Minesweeper</h1>
          </div>
          <div className="browser-right">
            <div className='browser-buttons browser-minimize'><strong>_</strong></div>
            <div className='browser-buttons browser-enlarge'><strong>☐</strong></div>
            <div className='browser-buttons browser-close'><strong>X</strong></div>
          </div>
        </div>
        <div className="minesweeper">
          <Scorekeeper  time={this.state.time}
                        flagsUsed={this.state.flagCount}
                        reset={this.reset}
                        status={this.state.gameStatus} />
          <Grid         openCells={this.state.openCells}
                        mines={this.state.mines}
                        rows={this.state.rows}
                        columns={this.state.columns}
                        endGame={this.endGame}
                        status={this.state.gameStatus}
                        onCellClick={this.handleCellClick}
                        changeFlagAmount={this.changeFlagAmount} />
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
