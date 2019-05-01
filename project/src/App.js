import React, { Component } from 'react';
import './App.scss';

var snakeArray = []; 
var snakeMaps = {}; 

var snakeCell = {};
snakeCell.x = 10;
snakeCell.y = 20;

var moveDirection = 40;

var numCells = 30;

// display a single cell
function GridCell(props) {

  let cellStyle = `grid-cell`;

  if( snakeMaps[ props.gridx + "," + props.gridy]) 
  {
    cellStyle = `grid-snake`;
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

    this.state = {
      snake: [],
      food: [],
      status: 0,
      direction: 39
    };

  }

  posHash(pos) {
    return pos.x + "," + pos.y
  }

  InitSnake() {

    let pos1 = {};
    pos1.x = 10;
    pos1.y = 20;

    let pos2 = {};
    pos2.x = 10;
    pos2.y = 21;

    let pos3 = {};
    pos3.x = 10;
    pos3.y = 22;

    let pos4 = {};
    pos4.x = 10;
    pos4.y = 23;

    let pos5 = {};
    pos5.x = 10;
    pos5.y = 24;

    let pos6 = {};
    pos6.x = 10;
    pos6.y = 25;

    let pos7 = {};
    pos7.x = 10;
    pos7.y = 26;

    snakeMaps[this.posHash(pos1)] = 1;
    snakeMaps[this.posHash(pos2)] = 1;
    snakeMaps[this.posHash(pos3)] = 1;
    snakeMaps[this.posHash(pos4)] = 1;
    snakeMaps[this.posHash(pos5)] = 1;
    snakeMaps[this.posHash(pos6)] = 1;
    snakeMaps[this.posHash(pos7)] = 1;

    snakeArray.push(pos1);
    snakeArray.push(pos2);
    snakeArray.push(pos3);
    snakeArray.push(pos4);
    snakeArray.push(pos5);
    snakeArray.push(pos6);
    snakeArray.push(pos7);
  }

  KeyDownn = (KeyEvent) => {
    // 37 left, 38 up, 39 right, 40 down
    if(moveDirection === 40 && KeyEvent.keyCode === 38) {
      return;
    }

    if(moveDirection === 38 && KeyEvent.keyCode === 40) {
      return;
    }

    if(moveDirection === 37 && KeyEvent.keyCode === 39) {
      return;
    }

    if(moveDirection === 39 && KeyEvent.keyCode === 37) {
      return;
    }

    if ( KeyEvent.keyCode === 37 || KeyEvent.keyCode === 39 || KeyEvent.keyCode === 38 || KeyEvent.keyCode === 40) {
      moveDirection = KeyEvent.keyCode;
    }
    console.log("Key Pressed " + KeyEvent.keyCode) ;
  }

  updateSnake = () => {
    // snakePositions.shift(); 
    // snakePositions.splice(-1);

    let pos = snakeArray[snakeArray.length-1];
    let posnew = {};
    posnew.x = pos.x;
    posnew.y = pos.y;

    // 37 left, 38 up, 39 right, 40 down
    if ( moveDirection === 37) {
      posnew.x=pos.x-1;
    } else if (moveDirection === 39) {
      posnew.x=pos.x+1;
    } else if (moveDirection === 38) {
      posnew.y=pos.y-1;
    } else if (moveDirection === 40) {
      posnew.y=pos.y+1;
    }

    if (posnew.x < 0) {
      posnew.x=numCells;
    } else if (posnew.x > numCells) {
      posnew.x = 0;
    } 

    if (posnew.y < 0) {
      posnew.y=numCells;
    } else if (posnew.y > numCells) {
      posnew.y=0;
    } 

    if( snakeMaps[ posnew.x  + "," + posnew.y]) 
    {
      console.log("Game Over!!!");
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

  render() {

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
