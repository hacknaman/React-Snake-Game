import React, { Component } from 'react';
import './App.scss';

var snakePositions = {}; 

var snakeCell = {};
snakeCell.x = 10;
snakeCell.y = 20;


// display a single cell
function GridCell(props) {

  let cellStyle = `grid-cell`;

  if( snakePositions[ props.gridx + " " + props.gridy]) 
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

    this.state = {
      snake: [],
      food: [],
      status: 0,
      direction: 39
    };

  }

  InitSnake() {
    snakePositions[10 + " " + 20] = 1;
    snakePositions[10 + " " + 21] = 1;
    snakePositions[10 + " " + 22] = 1;
  }

  KeyDown(KeyEvent) {
    // 37 left, 38 up, 39 right, 40
    console.log("Key Pressed " + KeyEvent.keyCode) ;
  }

  updateSnake() {
    //snakePositions.shift(); 
    snakePositions.splice(-1);
    //this.setState({ state: this.state });
  }

  StartGame() {
    this.moveSnakeInterval = setInterval(this.updateSnake, 100);
  }

  render() {

    this.InitSnake();
    this.StartGame();

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
