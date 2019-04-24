import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

// display a single cell
function GridCell(props) {
  return (
    <div
      className={`grid-cell`}
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
      // 0 = not started, 1 = in progress, 2= finished
      status: 0,
      // using keycodes to indicate direction
      direction: 39
    };

  }

  render() {
    // each cell should be approximately 15px wide, so calculate how many we need
    this.numCells = Math.floor(this.props.size / 15);
    const cellSize = this.props.size / this.numCells;
    const cellIndexes = Array.from(Array(this.numCells).keys());
    const cells = cellIndexes.map(y => {
      return cellIndexes.map(x => {

        return (
          <GridCell size={cellSize} key={x + " " + y} />
        );
      });
    });

    return (
      <div
        className="snake-board"
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
