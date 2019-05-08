import React, { Component } from 'react';
import './App.scss';

const DIR_UP = 38;
const DIR_DOWN = 40;
const DIR_LEFT = 37;
const DIR_RIGHT = 39;

const MoveFunctionMap = {
  37: (InVal,OutVal) => {OutVal.x=InVal.x-1;},
  39: (InVal,OutVal) => {OutVal.x=InVal.x+1;},
  38: (InVal,OutVal) => {OutVal.y=InVal.y-1;},
  40: (InVal,OutVal) => {OutVal.y=InVal.y+1;}
}

const INIT_SNAKE_LEN = 5;

// display a single cell
function GridCell(props) {

  let CellStyle = `grid-cell`;

  if( props.snakeMaps[ props.gridx + "," + props.gridy]) 
  {
    CellStyle = `grid-snake`;
  }

  if( props.fruitMaps[ props.gridx + "," + props.gridy]) 
  {
    CellStyle = `grid-fruit`;
  }

  return (
    <div
      className={CellStyle}
      style={{ height: props.size + "px", width: props.size + "px" }}
    />
  );
}

class App extends Component {

  constructor (props) {
    super(props);
    this.SnakeArray = []; 
    this.SnakeMaps = {}; 
    this.FruitArray = []; 
    this.FruitMaps = {}; 
    this.MoveDirection = DIR_DOWN;
    this.NumCells = Math.floor(this.props.size / 15);
    this.Score = 0;

    this.InitSnake();
    this.StartGame();
    this.state = { };

    this.CellSize = this.props.size / this.NumCells;
    this.CellIndexes = Array.from(Array(this.NumCells).keys());
  }

  PosHash = (pos) => {
    return pos.x + "," + pos.y;
  }

  ResetSnake = () => {
    this.SnakeMaps = {};
    this.SnakeArray = [];
    this.MoveDirection = DIR_DOWN;
    this.Score = 0;
    for( let i = 0; i<=INIT_SNAKE_LEN; ++i )
    {
      let pos = {};
      pos.x = this.NumCells/2;
      pos.y = this.NumCells/2 + i;
      this.SnakeMaps[this.PosHash(pos)] = 1;
      this.SnakeArray.push(pos);
    }
  }

  InitSnake = () => {
    this.ResetSnake();
    this.makeNewFruit(10);
  }

  KeyDowned = (KeyEvent) => {
    // This is to avoid going into right opposite direction 
    // the snake is going.
    if( Math.abs(this.MoveDirection - KeyEvent.keyCode) === 2) {
      return;
    }

    if ( KeyEvent.keyCode === DIR_RIGHT || KeyEvent.keyCode === DIR_LEFT || KeyEvent.keyCode === DIR_UP || KeyEvent.keyCode === DIR_DOWN) {
      this.MoveDirection = KeyEvent.keyCode;
    }
  }

  makeNewFruit = (x) => {
    let min=0; 
    let max=x-1;  
    let pos = {};
    pos.x = Math.floor(Math.random() * (max - min)) + min; 
    pos.y = Math.floor(Math.random() * (max - min)) + min; 
    this.FruitMaps[this.PosHash(pos)] = 1;
    this.FruitArray.push(pos);
  }

  updateSnake = () => {

    let pos = this.SnakeArray[this.SnakeArray.length-1];
    let posnew = {};
    posnew.x = pos.x;
    posnew.y = pos.y;

    MoveFunctionMap[this.MoveDirection](pos,posnew);

    // snake collide with walls
    // posnew.x = Math.min(Math.max(0,posnew.x),this.NumCells);
    // posnew.y = Math.min(Math.max(0,posnew.y),this.NumCells);

    // snake pass through walls
    if (posnew.x < 0) {
      posnew.x=this.NumCells;
    } else if (posnew.x > this.NumCells-1) {
      posnew.x = 0;
    } 
    if (posnew.y < 0) {
      posnew.y=this.NumCells;
    } else if (posnew.y > this.NumCells-1) {
      posnew.y=0;
    } 

    if(this.SnakeMaps[this.PosHash(posnew)]) {
      console.log("Game Over!!!");
      this.ResetSnake();
      this.setState({ state: this.state });
      return;
    }

    if(this.FruitMaps[this.PosHash(posnew)]) {
      let posd = this.FruitArray.shift();
      delete this.FruitMaps[this.PosHash(posd)];
      this.makeNewFruit(this.NumCells);
      this.SnakeArray.push(posnew);
      this.Score+=10;
    }

    this.SnakeArray.push(posnew);
    this.SnakeMaps[this.PosHash(posnew)] = 1;

    let posd = this.SnakeArray.shift();
    delete this.SnakeMaps[this.PosHash(posd)];

    this.setState({ state: this.state });
  }

  StartGame() {
    this.moveSnakeInterval = setInterval(this.updateSnake, 100);
  }

  render = () => {
    const Cells = this.CellIndexes.map(y => {
      return this.CellIndexes.map(x => {
        return (
          <GridCell size={this.CellSize} gridx={x} gridy={y} snakeMaps={this.SnakeMaps} fruitMaps={this.FruitMaps}/>
        );
      });
    });

    return (
      <div
        className="snake-board"
        onKeyDown={this.KeyDowned}
        style={{
          width: this.props.size + "px",
          height: this.props.size + 10 + "px"
        }}
        ref={el => (this.el = el)}
        tabIndex={-1}
        >
        <div
          className="grid"
          style={{
            width: this.props.size + "px",
            height: this.props.size + "px"
          }}
          >
          {Cells}
        </div>
        <div>Score: {this.Score}</div>
      </div>
    );
  }
}

export default App;
