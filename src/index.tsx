import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { type } from 'os';

type SquareState = 'O' | 'X' | null

type SquareProps = {
  value: SquareState
  onClick: () => void 
}

// 型は(props:SquareProps)=>JSX.Element
const Square = (props: SquareProps) => (
  <button className='square' onClick={props.onClick}>
    {props.value}
  </button>
)

type BoardState = Repeat<SquareState, 9>

type BoardProps = {
  squares: BoardState
  onClick: (i: number) => void
}

const Board = (props: BoardProps) => {
  const renderSquare = (i: number) => (
    <Square value={props.square[i]} onClick={() => props.onClick} />
  )

  return (
    <div>
      <div className='board-row'>
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
    </div>
    <div className='board-row'>
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
    </div>
    <div className='board-row'>
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare}
    </div>
    </div>
  )
}

type Step = {
  readonly squares: BoardState
  readonly xIsNext: boolean
}

type GameState = {
  readonly history: readonly Step[]
  readonly stepNumber: number
}

const Game = () => {
  const [state, setState] = useState<GameState>({
    history: [
      {
        squares: [null, null, null, null, null, null, null, null, null],
        xIsNext: true,
      },
      stepNumber: 0,
    ]
  })

  const current = state.history[state.stepNumber]
  const winner = calculateWinner(current.squares)
  let status: string
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player: ${current.xIsNext ? 'X' : 'O'}`
}

const handleClick = (i: number) => {
  if (winner || current.squares[i]) {
    return
  }

  const next: Step = (({ squares, xIsNext }) => {
    const nextSquares = squares.slice() as BoardState
    nextSquares[i] = xIsNext ? 'X' : 'O'
    return {
      squares: nextSquares,
      xIsNext: !xIsNext,
    }
  }) (current)

  setState(({ history, stepNumber }) => {
    const newHistory = history.slice(0, stepNumber + 1).concat(next)

    return {
      history: newHistory,
      stepNumber: newHistory.length - 1,
    }
  })
}

const jumpTo = (move: number) => {
  setState(prev => ({
    ...prev,
    stepNumber: move,
  }))
}

const moves = state.history.map((step, move) => {
  const desc = move > 0 ? `Go to move #${move}` : 'Go to game start'
  return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{desc}</button>
    </li>
  )
})
}