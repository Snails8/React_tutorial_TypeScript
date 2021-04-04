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