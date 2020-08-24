import React from 'react';
import { useQuery, gql } from '@apollo/client';

export default () => {
  return (
    <>
      <div className="container">
        <div className="heading">
          <h1 className="title">2048</h1>
          <div className="scores-container">
            <div className="score-container">0</div>
            <div className="best-container">0</div>
          </div>
        </div>

        <div className="above-game">
          <p className="game-intro">
            Join the numbers and get to the <strong>2048 tile!</strong>
          </p>
          <a className="restart-button">New Game</a>
        </div>
        <div className="game-container">
          <div className="grid-container">
            <div className="grid-row">
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
            </div>
            <div className="grid-row">
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
            </div>
            <div className="grid-row">
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
            </div>
            <div className="grid-row">
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
            </div>
          </div>
          <div className="tile-container"></div>
        </div>
      </div>
    </>
  );
};
