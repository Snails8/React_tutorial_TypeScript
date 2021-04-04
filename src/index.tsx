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