import React, { Component } from 'react';
import './App.scss';

var snakeArray = []; 
var snakeMaps = {}; 

var snakeCell = {};
snakeCell.x = 10;
snakeCell.y = 20;


// display a single cell
function GridCell(props) {

  let cellStyle = `grid-cell`;

  if( snakeMaps[ props.gridx + "," + props.gridy]) 
  {
    cellStyle = `grid-snake`;
  }

  console.log(props.gridx + " " + props.gridy);

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

    snakeMaps[this.posHash(pos1)] = 1;
    snakeMaps[this.posHash(pos2)] = 1;
    snakeMaps[this.posHash(pos3)] = 1;

    snakeArray.push(pos1);
    snakeArray.push(pos2);
    snakeArray.push(pos3);
  }

  KeyDown(KeyEvent) {
    // 37 left, 38 up, 39 right, 40
    console.log("Key Pressed " + KeyEvent.keyCode) ;
  }

  updateSnake = () => {
    // snakePositions.shift(); 
    // snakePositions.splice(-1);

    let pos = snakeArray[snakeArray.length-1];
    let posnew = {};
    posnew.x = pos.x;
    posnew.y=pos.y+1;
    snakeArray.push(posnew);
    snakeMaps[this.posHash(posnew)] = 1;

    let posd = snakeArray.shift();
    delete snakeMaps[this.posHash(posd)];

    this.setState({ state: this.state });
  }

  StartGame() {
    this.moveSnakeInterval = setInterval(this.updateSnake, 1000);
  }

  render() {

    

    this.numCells = Math.floor(this.props.size / 15);
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
        onKeyDown={this.KeyDown}
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
