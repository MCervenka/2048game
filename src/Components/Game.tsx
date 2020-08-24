import React, { useEffect, useState } from 'react';
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
  const [gameData, setGameData] = useState(data);
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
            state: gameData.state,
            score: gameData.score,
            direction: pressedKey,
          },
        },
      }).then((res) => {
        setGameData(res.data.processGame);
      });
    }
  };
  function renderTiles() {
    let tilesArr: any[] = [];
    gameData?.state.forEach((row: any, rowIndex: number) => {
      row.forEach((cell: number, cellIndex: number) => {
        if (cell > 0) {
          tilesArr.push(
            <div
              className={`tile tile-${cell} tile-position-${cellIndex + 1}-${
                rowIndex + 1
              }`}
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
  function restart(e: any) {
    e.preventDefault();
    setGameData(data.newGame);
  }
  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    return () => window.removeEventListener('keydown', onKeyPress);
  });
  useEffect(() => {
    if (data?.newGame) {
      setGameData(data.newGame);
    }
  }, [loading]);
  if (error) {
    console.error(error);
  }
  console.log(data);
  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <>
      <div className="container">
        <div className="heading">
          <h1 className="title">2048</h1>
          <div className="scores-container">
            <div className="score-container">{gameData?.score}</div>
            <div className="best-container">{props.bestScore}</div>
          </div>
        </div>

        <div className="above-game">
          <p className="game-intro">
            Join the numbers and get to the <strong>2048 tile!</strong>
          </p>
          <a className="restart-button" onClick={restart}>
            New Game
          </a>
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
