import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { type } from 'os';

type SquareState = 'O' | 'X' | null

type SquareProps = {
  value: SquareState
  onClick: () => void
}

const Square = (props: SquareProps) => (
  <button className='square' onClick={props.onClick}>
    {props.value}
  </button>
)