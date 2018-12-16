import * as React from 'react';

interface ISquareProps  {
  value: string;
  onClick: () => void; 
}

const Square = ({value, onClick}: ISquareProps) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

interface IBoardProps  {
  squares: string[];
  onClick: ((i: number) => () => void); 
}

const Board = ({squares, onClick}: IBoardProps) => {
  const renderSquare = (i: number )=> (
    <Square
        value={squares[i]}
        onClick={onClick(i)}
      />
  )
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const App = () => {
  const [history, setHistory] = React.useState([
    {
      squares: Array(9).fill(null)
    }
  ]);
  const [stepNumber, setStepNumber] = React.useState(0);
  const [xIsNext, setXIsNext] = React.useState(true);

  const handleClick = (i: number) => {
    const h = history.slice(0, stepNumber + 1);
    const current = h[h.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(history.concat([
      {
        squares
      }
    ]));
    setStepNumber(h.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const renderHistory = history;
  const renderCurrent = renderHistory[stepNumber];
  const winner = calculateWinner(renderCurrent.squares);

  const moves = renderHistory.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    const clickMove = () => jumpTo(move);
    return (
      <li key={move}>
        <button onClick={clickMove}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  const clickBoard = (i: number) => () => handleClick(i);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={renderCurrent.squares}
          onClick={clickBoard}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const calculateWinner = (squares: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
