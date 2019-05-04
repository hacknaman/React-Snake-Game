import React, { Component } from 'react';
import './App.scss';

var snakeArray = []; 
var snakeMaps = {}; 
var fruitArray = []; 
var fruitMaps = {}; 

var moveDirection = 40;
var numCells = 30;


// 37 left, 38 up, 39 right, 40 down
const DIR_UP = 38;
const DIR_DOWN = 40;
const DIR_LEFT = 37;
const DIR_RIGHT = 39;

const functionMap = {
  37: (value,value2) => {value2.x=value.x-1;},
  39: (value,value2) => {value2.x=value.x+1;},
  38: (value,value2) => {value2.y=value.y-1;},
  40: (value,value2) => {value2.y=value.y+1;}
}

// display a single cell
function GridCell(props) {

  let cellStyle = `grid-cell`;

  if( snakeMaps[ props.gridx + "," + props.gridy]) 
  {
    cellStyle = `grid-snake`;
  }

  if( fruitMaps[ props.gridx + "," + props.gridy]) 
  {
    cellStyle = `grid-fruit`;
  }

  return (
    <div
      className={cellStyle}
      style={{ height: props.size + "px", width: props.size + "px" }}
      />
  );
}

class App extends Component {

  constructor(props) {
    super(props);
    this.InitSnake();
    this.StartGame();
    this.state = { };
  }

  posHash(pos) {
    return pos.x + "," + pos.y
  }

  ResetSnake() {
    snakeMaps = {};
    snakeArray = [];
    let SnakeLength = 5;
    moveDirection = DIR_DOWN;
    for( let i = 0; i<=SnakeLength; ++i )
    {
      let pos = {};
      pos.x = 10;
      pos.y = 20 + i;
      snakeMaps[this.posHash(pos)] = 1;
      snakeArray.push(pos);
    }

  }

  InitSnake() {
    this.ResetSnake();
    this.makeNewFruit(10);
  }

  KeyDownn = (KeyEvent) => {
    // 37 left, 38 up, 39 right, 40 down
    // This is to avoid going into right opposite direction 
    // the snake is going.
    if( Math.abs(moveDirection - KeyEvent.keyCode) === 2) {
      return;
    }

    if ( KeyEvent.keyCode === DIR_RIGHT || KeyEvent.keyCode === DIR_LEFT || KeyEvent.keyCode === DIR_UP || KeyEvent.keyCode === DIR_DOWN) {
      moveDirection = KeyEvent.keyCode;
    }
  }

  makeNewFruit = (x) => {
    let min=0; 
    let max=x-1;  
    let pos = {};
    pos.x = Math.floor(Math.random() * (+max - +min)) + +min; 
    pos.y = Math.floor(Math.random() * (+max - +min)) + +min; 
    fruitMaps[this.posHash(pos)] = 1;
    fruitArray.push(pos);
  }

  updateSnake = () => {

    let pos = snakeArray[snakeArray.length-1];
    let posnew = {};
    posnew.x = pos.x;
    posnew.y = pos.y;

    functionMap[moveDirection](pos,posnew);

    // snake collide with walls
    // posnew.x = Math.min(Math.max(0,posnew.x),numCells);
    // posnew.y = Math.min(Math.max(0,posnew.y),numCells);

    // snake pass through walls
    if (posnew.x < 0) {
      posnew.x=numCells;
    } else if (posnew.x > numCells-1) {
      posnew.x = 0;
    } 
    if (posnew.y < 0) {
      posnew.y=numCells;
    } else if (posnew.y > numCells-1) {
      posnew.y=0;
    } 

    if( snakeMaps[this.posHash(posnew)]) {
      console.log("Game Over!!!");
      this.ResetSnake();
      this.setState({ state: this.state });
      return;
    }

    if(fruitMaps[this.posHash(posnew)]) {
      let posd = fruitArray.shift();
      delete fruitMaps[this.posHash(posd)];
      this.makeNewFruit(numCells);
      snakeArray.push(posnew);
    }

    snakeArray.push(posnew);
    snakeMaps[this.posHash(posnew)] = 1;

    let posd = snakeArray.shift();
    delete snakeMaps[this.posHash(posd)];

    this.setState({ state: this.state });
  }

  StartGame() {
    this.moveSnakeInterval = setInterval(this.updateSnake, 100);
  }

  render = () => {

    this.numCells = Math.floor(this.props.size / 15);
    numCells = this.numCells;
    const cellSize = this.props.size / this.numCells;
    const cellIndexes = Array.from(Array(this.numCells).keys());

    const cells = cellIndexes.map(y => {
      return cellIndexes.map(x => {
        return (
          <GridCell size={cellSize} gridx={x} gridy={y} />
        );
      });
    });

    return (
      <div
        className="snake-board"
        onKeyDown={this.KeyDownn}
        style={{
          width: this.props.size + "px",
          height: this.props.size + "px"
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
          {cells}
        </div>
      </div>
    );
  }
}

export default App;
