import React, { useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

const NEW_GAME = gql`
  query NewGame {
    newGame {
      state
      score
      finished
    }
  }
`;
const PROCESS_MOVE = gql`
  mutation Process($type: GameInput!) {
    processGame(game: $type) {
      state
      score
      finished
    }
  }
`;

interface GameProps {
  bestScore: number;
}

export default (props: GameProps) => {
  const { loading, error, data } = useQuery(NEW_GAME);
  const [processMove, { data: Submitdata }] = useMutation(PROCESS_MOVE);
  const onKeyPress = ({ key }: { key: string }) => {
    if (
      key === 'ArrowRight' ||
      key === 'ArrowLeft' ||
      key === 'ArrowDown' ||
      key === 'ArrowUp'
    ) {
      let pressedKey = key.replace('Arrow', '');
      pressedKey = pressedKey.charAt(0).toUpperCase() + pressedKey.slice(1);
      processMove({
        variables: {
          type: {
            state: data.newGame.state,
            score: data.newGame.score,
            direction: pressedKey,
          },
        },
      });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    return () => window.removeEventListener('keydown', onKeyPress);
  });
  if (error) {
    console.error(error);
  }
  console.log(data);
  if (loading) {
    return <p>Loading data...</p>;
  }
  function renderTiles() {
    let tilesArr: any[] = [];
    data.newGame.state.forEach((row: any, rowIndex: number) => {
      row.forEach((cell: number, cellIndex: number) => {
        if (cell > 0) {
          tilesArr.push(
            <div
              className={`tile tile-${cell} tile-position-${rowIndex}-${cellIndex}`}
              key={cell + cellIndex + rowIndex}
            >
              <div className="tile-inner">{cell}</div>
            </div>
          );
        }
      });
    });
    return tilesArr;
  }
  return (
    <>
      <div className="container">
        <div className="heading">
          <h1 className="title">2048</h1>
          <div className="scores-container">
            <div className="score-container">{data.newGame.score}</div>
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
          <div className="tile-container">{renderTiles()}</div>
        </div>
      </div>
    </>
  );
};
