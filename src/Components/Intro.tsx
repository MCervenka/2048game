import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { TScore } from '../types';
import Login from './Login';
import Register from './Register';
import Game from './Game';

const HIGH_SCORES = gql`
  query GetHighScores {
    allScores(orderBy: "score_DESC") {
      player {
        name
      }
      score
    }
  }
`;
export default () => {
  const { loading, error, data } = useQuery(HIGH_SCORES);
  const [showPopUp, setShowPopUp] = useState(false);
  const [login, setLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState<any>(null);
  const [newGame, setNewGame] = useState(false);
  function togglePopUp() {
    setShowPopUp(!showPopUp);
  }
  function toggleLogin() {
    setLogin(true);
    togglePopUp();
  }
  function toggleRegister() {
    setLogin(false);
    togglePopUp();
  }
  if (error) {
    console.error(error);
  }
  return newGame ? (
    <Game bestScore={data.allScores[0]?.score || 0} />
  ) : (
    <div className="container">
      <div className="text-center">
        <h1>2048</h1>
        <h2>LeaderBoard</h2>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <pre>
          <table className="w-100">
            <tbody>
              {data?.allScores?.map((score: TScore, index: number) => (
                <tr key={index} className="table-row">
                  <td>{index}</td>
                  <td>{score.player.name}</td>
                  <td className="text-right">{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            {!loggedIn && (
              <>
                <button className="button-white" onClick={toggleLogin}>
                  Log in
                </button>
                <button className="button-black" onClick={toggleRegister}>
                  Register
                </button>
              </>
            )}
            {loggedIn && (
              <button className="button-white" onClick={() => setNewGame(true)}>
                New Game
              </button>
            )}
          </div>
          <div className="text-center">
            {loggedIn
              ? `Hello ${loggedIn.name}, nice to see you again!`
              : 'Log in or register to start a new game'}
          </div>
        </pre>
      )}
      {showPopUp && (
        <>
          <div className="pop-up-container" onClick={togglePopUp}></div>
          <div className="pop-up">
            {login ? (
              <Login toggle={togglePopUp} setLoggedInUser={setLoggedIn} />
            ) : (
              <Register toggle={togglePopUp} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
